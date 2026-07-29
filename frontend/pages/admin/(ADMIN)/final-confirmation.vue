<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">
        Final Confirmation Management
      </h1>
      <p class="text-sm text-gray-500">
        Manage participant confirmation status for the final contest.
      </p>
    </div>

    <!-- Filters -->
    <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <!-- Season Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Season
          </label>
          <select
            v-model="filters.season_id"
            @change="fetchData"
            :disabled="loading"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
          >
            <option value="">All Seasons</option>
            <option
              v-for="season in seasons"
              :key="season.id"
              :value="season.id"
            >
              {{ season.name }} ({{ season.year }})
              <template v-if="season.is_active">— Active</template>
            </option>
          </select>
        </div>

        <!-- Search -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, reg no, or serial..."
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-600 py-20">
      Loading data...
    </div>

    <div v-else>
      <!-- Section: Mahir -->
      <section class="mb-8">
        <h2
          class="text-lg font-bold text-emerald-700 border-l-4 border-emerald-500 pl-2 mb-3"
        >
          Mahir (الماهر) — Expert
          <span class="font-normal text-gray-500">
            ({{ filtered.mahir.length }})
          </span>
        </h2>
        <div class="overflow-x-auto bg-white rounded-xl shadow-sm border">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100 text-center text-sm">
                <th class="p-2 border w-12">#</th>
                <th class="p-2 border w-24">Serial</th>
                <th class="p-2 border w-32">Reg No</th>
                <th class="p-2 border">Name</th>
                <th class="p-2 border w-32">Criteria</th>
                <th class="p-2 border w-48">Confirmation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!filtered.mahir.length">
                <td
                  colspan="6"
                  class="p-3 border text-center text-gray-400 text-sm"
                >
                  No Mahir students.
                </td>
              </tr>
              <tr
                v-for="row in filtered.mahir"
                :key="'mahir-' + row.user_id"
                class="text-center text-sm hover:bg-gray-50"
              >
                <td class="p-2 border font-semibold">{{ row.sl }}</td>
                <td class="p-2 border font-semibold whitespace-nowrap">
                  {{ row.serial }}
                </td>
                <td class="p-2 border whitespace-nowrap">{{ row.reg_no }}</td>
                <td class="p-2 border text-left">{{ row.name_en }}</td>
                <td class="p-2 border whitespace-nowrap">
                  {{ row.criteria_id || "—" }}
                </td>
                <td class="p-2 border">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
                        getStatusClass(row.user_id) === 'yes'
                          ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500'
                          : 'bg-gray-100 text-gray-500 hover:bg-emerald-50',
                      ]"
                      @click="
                        setStatus(row, 1)
                      "
                      :disabled="saving === row.user_id"
                    >
                      YES
                    </button>
                    <button
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
                        getStatusClass(row.user_id) === 'no'
                          ? 'bg-red-100 text-red-700 ring-2 ring-red-500'
                          : 'bg-gray-100 text-gray-500 hover:bg-red-50',
                      ]"
                      @click="
                        setStatus(row, 2)
                      "
                      :disabled="saving === row.user_id"
                    >
                      NO
                    </button>
                    <span
                      v-if="saving === row.user_id"
                      class="text-xs text-gray-400"
                    >
                      Saving...
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section: Mubtadi -->
      <section class="mb-8">
        <h2
          class="text-lg font-bold text-emerald-700 border-l-4 border-emerald-500 pl-2 mb-3"
        >
          Mubtadi (المبتدئ) — Beginner
          <span class="font-normal text-gray-500">
            ({{ filtered.mubtadi.length }})
          </span>
        </h2>
        <div class="overflow-x-auto bg-white rounded-xl shadow-sm border">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100 text-center text-sm">
                <th class="p-2 border w-12">#</th>
                <th class="p-2 border w-24">Serial</th>
                <th class="p-2 border w-32">Reg No</th>
                <th class="p-2 border">Name</th>
                <th class="p-2 border w-32">Criteria</th>
                <th class="p-2 border w-48">Confirmation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!filtered.mubtadi.length">
                <td
                  colspan="6"
                  class="p-3 border text-center text-gray-400 text-sm"
                >
                  No Mubtadi students.
                </td>
              </tr>
              <tr
                v-for="row in filtered.mubtadi"
                :key="'mubtadi-' + row.user_id"
                class="text-center text-sm hover:bg-gray-50"
              >
                <td class="p-2 border font-semibold">{{ row.sl }}</td>
                <td class="p-2 border font-semibold whitespace-nowrap">
                  {{ row.serial }}
                </td>
                <td class="p-2 border whitespace-nowrap">{{ row.reg_no }}</td>
                <td class="p-2 border text-left">{{ row.name_en }}</td>
                <td class="p-2 border whitespace-nowrap">
                  {{ row.criteria_id || "—" }}
                </td>
                <td class="p-2 border">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
                        getStatusClass(row.user_id) === 'yes'
                          ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500'
                          : 'bg-gray-100 text-gray-500 hover:bg-emerald-50',
                      ]"
                      @click="
                        setStatus(row, 1)
                      "
                      :disabled="saving === row.user_id"
                    >
                      YES
                    </button>
                    <button
                      :class="[
                        'px-3 py-1 rounded-full text-xs font-semibold transition-colors',
                        getStatusClass(row.user_id) === 'no'
                          ? 'bg-red-100 text-red-700 ring-2 ring-red-500'
                          : 'bg-gray-100 text-gray-500 hover:bg-red-50',
                      ]"
                      @click="
                        setStatus(row, 2)
                      "
                      :disabled="saving === row.user_id"
                    >
                      NO
                    </button>
                    <span
                      v-if="saving === row.user_id"
                      class="text-xs text-gray-400"
                    >
                      Saving...
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Empty state -->
      <div
        v-if="!filtered.mahir.length && !filtered.mubtadi.length"
        class="text-center text-gray-500 bg-white rounded-xl border py-16"
      >
        No data available for this season.
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({ layout: "split" });

  const seasons = ref([]);
  const filters = ref({ season_id: "" });
  const sections = ref({ mahir: [], mubtadi: [] });
  const loading = ref(true);
  const saving = ref(null);
  const searchQuery = ref("");

  // Track existing confirmations: { user_id: { status, id } }
  const existingConfirmations = ref({});

  const fetchSeasons = async () => {
    try {
      const { data } = await useAdminAuthenticatedAxios(
        "/admin/result-card/seasons",
        null,
        null,
        "GET",
      );
      if (data?.data?.seasons) {
        seasons.value = data.data.seasons;
        const activeId = data.data.active_season_id;
        if (activeId && filters.value.season_id === "") {
          filters.value.season_id = String(activeId);
        }
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load seasons",
        3000,
      );
    }
  };

  /**
   * Fetches all mahir/mubtadi participants with their confirmation status
   * from a single admin endpoint.
   */
  const fetchData = async () => {
    loading.value = true;
    try {
      const query = filters.value.season_id
        ? `?season_id=${filters.value.season_id}`
        : "";

      const { data } = await useAdminAuthenticatedAxios(
        `/admin/final-confirmation/data${query}`,
        null,
        null,
        "GET",
      );

      const payload = data?.data;
      if (payload) {
        const s = payload.sections || {};
        sections.value = {
          mahir: s.mahir || [],
          mubtadi: s.mubtadi || [],
        };

        // Build confirmation map from the response (each row has
        // confirmation_status).
        const confMap = {};
        [...(s.mahir || []), ...(s.mubtadi || [])].forEach((row) => {
          if (row.confirmation_status) {
            confMap[row.user_id] = { status: row.confirmation_status };
          }
        });
        existingConfirmations.value = confMap;
      } else {
        sections.value = { mahir: [], mubtadi: [] };
        existingConfirmations.value = {};
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load data",
        3000,
      );
      sections.value = { mahir: [], mubtadi: [] };
      existingConfirmations.value = {};
    } finally {
      loading.value = false;
    }
  };

  const getStatusClass = (userId) => {
    const conf = existingConfirmations.value[userId];
    if (!conf) return "";
    return conf.status === 1 ? "yes" : "no";
  };

  /**
   * Set confirmation status for a participant.
   */
  const setStatus = async (row, status) => {
    saving.value = row.user_id;
    try {
      await useAdminAuthenticatedAxios(
        "/admin/final-confirmation/store",
        {
          user_id: row.user_id,
          user_competition_form_id: row.user_competition_form_id,
          season_id: filters.value.season_id,
          criteria_id: row.criteria_id || null,
          status: status,
        },
        null,
        "POST",
      );

      // Update local state optimistically
      existingConfirmations.value[row.user_id] = { status };
      window.showSuccess("Success!", "Confirmation updated.", 2000);
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to update confirmation",
        3000,
      );
    } finally {
      saving.value = null;
    }
  };

  // Client-side search across name, reg_no, serial
  const matches = (row, q) => {
    if (!q) return true;
    const hay = [row.name_en || "", row.reg_no || "", row.serial || ""]
      .join(" ")
      .toLowerCase();
    return hay.includes(q.toLowerCase());
  };

  const filtered = computed(() => {
    const q = searchQuery.value.trim();
    return {
      mahir: sections.value.mahir.filter((r) => matches(r, q)),
      mubtadi: sections.value.mubtadi.filter((r) => matches(r, q)),
    };
  });

  onMounted(async () => {
    await fetchSeasons();
    await fetchData();
  });
</script>
