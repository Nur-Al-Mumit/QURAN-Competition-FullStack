<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <!-- Header + season filter -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h1 class="text-xl font-bold text-gray-900">Training Dates</h1>
            <p class="text-sm text-gray-500 mt-0.5">
              Configure the training days for a season. Mark a date as
              <span class="font-semibold text-amber-600">Off day</span> for holidays
              inside the period.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700">Season</label>
            <select
              v-model="filters.season_id"
              @change="fetchDates"
              class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              :disabled="loading"
            >
              <option value="">Select season</option>
              <option v-for="s in seasons" :key="s.id" :value="s.id">
                {{ s.name }} ({{ s.year }})
                <template v-if="s.is_active">— Active</template>
              </option>
            </select>
          </div>
        </div>

        <!-- Add date form -->
        <div class="flex flex-wrap items-end gap-3 pt-4 border-t border-gray-100">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Date</label>
            <input
              v-model="form.date"
              type="date"
              class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="flex items-center gap-2 pb-2">
            <input
              v-model="form.is_off_day"
              id="is-off-day"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
            />
            <label for="is-off-day" class="text-sm text-gray-700">Off day</label>
          </div>
          <div class="flex-1 min-w-[160px]">
            <label class="block text-xs font-medium text-gray-600 mb-1">Note</label>
            <input
              v-model="form.note"
              type="text"
              placeholder="e.g. Weekly holiday"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            @click="addDate"
            :disabled="!filters.season_id || !form.date || saving"
            class="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            {{ saving ? "Adding…" : "+ Add Date" }}
          </button>
        </div>
      </div>

      <!-- Dates table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div v-if="loading" class="p-8 text-center text-gray-500 text-sm">
          Loading training dates…
        </div>
        <div
          v-else-if="!filters.season_id"
          class="p-8 text-center text-gray-400 text-sm"
        >
          Select a season to view its training dates.
        </div>
        <div
          v-else-if="!dates.length"
          class="p-8 text-center text-gray-400 text-sm"
        >
          No training dates configured for this season yet.
        </div>
        <table v-else class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-gray-700">
              <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">#</th>
              <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Date</th>
              <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Day</th>
              <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Off Day</th>
              <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Note</th>
              <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(d, i) in dates"
              :key="d.id"
              class="hover:bg-gray-50"
              :class="{ 'bg-amber-50/50': d.is_off_day }"
            >
              <td class="p-3 border-b text-sm text-gray-500">{{ i + 1 }}</td>
              <td class="p-3 border-b text-sm font-medium text-gray-900">
                {{ formatDate(d.date) }}
              </td>
              <td class="p-3 border-b text-sm text-gray-600">{{ formatDay(d.date) }}</td>
              <td class="p-3 border-b">
                <button
                  @click="toggleOffDay(d)"
                  :class="[
                    'text-xs font-semibold px-2.5 py-1 rounded-full transition-colors',
                    d.is_off_day
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
                  ]"
                >
                  {{ d.is_off_day ? "OFF" : "No" }}
                </button>
              </td>
              <td class="p-3 border-b text-sm text-gray-600">
                {{ d.note || "—" }}
              </td>
              <td class="p-3 border-b text-right">
                <button
                  @click="removeDate(d)"
                  class="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({ layout: "split" });

  const seasons = ref([]);
  const filters = ref({ season_id: "" });
  const dates = ref([]);
  const loading = ref(false);
  const saving = ref(false);

  const form = ref({
    date: "",
    is_off_day: false,
    note: "",
  });

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDay = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  };

  const fetchSeasons = async () => {
    try {
      const { data } = await useAdminAuthenticatedAxios(
        "/admin/training-dates/seasons",
        null,
        null,
        "GET"
      );
      if (data?.data?.seasons) {
        seasons.value = data.data.seasons;
        const activeId = data.data.active_season_id;
        if (activeId) filters.value.season_id = String(activeId);
      }
    } catch (err) {
      window.showError?.(
        "Error!",
        err?.response?.data?.message || "Failed to load seasons",
        3000
      );
    }
  };

  const fetchDates = async () => {
    if (!filters.value.season_id) {
      dates.value = [];
      return;
    }
    loading.value = true;
    try {
      const { data } = await useAdminAuthenticatedAxios(
        `/admin/training-dates/index?season_id=${filters.value.season_id}`,
        null,
        null,
        "GET"
      );
      dates.value = data?.data?.training_dates || [];
    } catch (err) {
      window.showError?.(
        "Error!",
        err?.response?.data?.message || "Failed to load training dates",
        3000
      );
      dates.value = [];
    } finally {
      loading.value = false;
    }
  };

  const addDate = async () => {
    saving.value = true;
    try {
      const payload = {
        season_id: parseInt(filters.value.season_id),
        date: form.value.date,
        is_off_day: !!form.value.is_off_day,
        note: form.value.note || null,
      };
      const { data } = await useAdminAuthenticatedAxios(
        "/admin/training-dates/store",
        payload,
        null,
        "POST"
      );
      if (data?.data?.training_date) {
        dates.value.push(data.data.training_date);
        // Re-sort by date client-side.
        dates.value.sort((a, b) => new Date(a.date) - new Date(b.date));
        form.value = { date: "", is_off_day: false, note: "" };
        window.showSuccess?.("Success!", "Date added", 2000);
      }
    } catch (err) {
      window.showError?.(
        "Error!",
        err?.response?.data?.message || "Failed to add date",
        3000
      );
    } finally {
      saving.value = false;
    }
  };

  const toggleOffDay = async (d) => {
    try {
      const { data } = await useAdminAuthenticatedAxios(
        `/admin/training-dates/${d.id}`,
        { is_off_day: !d.is_off_day },
        null,
        "PUT"
      );
      if (data?.data?.training_date) {
        const idx = dates.value.findIndex((x) => x.id === d.id);
        if (idx !== -1) dates.value[idx] = data.data.training_date;
      }
    } catch (err) {
      window.showError?.(
        "Error!",
        err?.response?.data?.message || "Failed to update",
        3000
      );
    }
  };

  const removeDate = async (d) => {
    if (!confirm(`Delete ${formatDate(d.date)}?`)) return;
    try {
      await useAdminAuthenticatedAxios(
        `/admin/training-dates/${d.id}`,
        null,
        null,
        "DELETE"
      );
      dates.value = dates.value.filter((x) => x.id !== d.id);
      window.showSuccess?.("Success!", "Date deleted", 2000);
    } catch (err) {
      window.showError?.(
        "Error!",
        err?.response?.data?.message || "Failed to delete",
        3000
      );
    }
  };

  onMounted(async () => {
    await fetchSeasons();
    await fetchDates();
  });
</script>
