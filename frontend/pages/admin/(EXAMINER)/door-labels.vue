<template>
  <div>
    <div class="min-h-screen bg-gray-50">
      <!-- Control Panel (Hidden in print) -->
      <div class="print:hidden bg-white shadow-sm border-b p-4 mb-6">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-2xl font-bold text-emerald-800 mb-4">
            Door Label Generator
          </h1>

          <!-- Season Filter -->
          <div class="mb-4 max-w-xs">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Season
            </label>
            <select
              v-model="filters.season_id"
              @change="fetchData"
              :disabled="loading"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
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

          <div class="text-gray-600 mb-4">
            <span v-if="loading">Loading...</span>
            <span v-else>Total Labels: {{ examiners.length }}</span>
          </div>

          <button
            @click="printAllLabels"
            :disabled="loading || !examiners.length"
            class="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Print All Labels
          </button>
        </div>
      </div>

      <!-- All Door Labels (Printable) - Each on separate page -->
      <div v-if="loading" class="max-w-4xl mx-auto py-20 text-center text-gray-600">
        Loading examiners...
      </div>

      <div v-else-if="!examiners.length" class="max-w-4xl mx-auto py-20 text-center text-gray-500">
        No examiners found for this season.
      </div>

      <div v-else class="max-w-4xl mx-auto door-labels">
        <div
          v-for="examiner in examiners"
          :key="examiner.id + '-' + examiner.letter"
          :class="[
            'w-full h-[297mm] bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8',
            'print:mb-0 print:break-after-page',
          ]"
        >
          <!-- Main Content - Full Page -->
          <div
            class="relative h-full flex flex-col items-center justify-center"
          >
            <div class="text-center mb-32">
              <h1 class="text-[44px] font-bold text-emerald-800 mb-4">
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
              </h1>
              <div class="w-24 h-1 bg-emerald-600 mx-auto mb-32"></div>
              <div
                class="text-emerald-600 text-2xl font-semibold uppercase tracking-widest mb-2"
              >
                Room Number
              </div>
              <div
                class="text-[350px] font-black text-emerald-800 leading-none"
              >
                {{ examiner.room_number }}
              </div>
            </div>
            <!-- Examiner Name (Large) -->
            <div class="text-center">
              <div
                class="text-emerald-600 text-2xl font-semibold uppercase tracking-widest mb-8"
              >
                Examiner
              </div>
              <div
                class="text-4xl font-bold text-emerald-900 leading-tight text-center uppercase"
              >
                {{ examiner.name }}
              </div>
              <div
                v-if="examiner.letter"
                class="mt-6 text-2xl font-semibold text-emerald-700"
              >
                Group: {{ examiner.letter }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Door labels are driven by the same viva-result payload: each group's
  // examiner carries the id / name / room_number / canonical letter, so we
  // reuse that endpoint instead of maintaining a separate hardcoded list.
  // Defaults to the active season on first load.

  const seasons = ref([]);
  const filters = ref({ season_id: "" });

  // Unique examiners (one label each), preserving the A, B, C... order
  // returned by the backend.
  const examiners = ref([]);
  const loading = ref(true);

  const fetchSeasons = async () => {
    try {
      const endPoint = "/admin/viva-result/seasons";
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET",
      );

      if (data?.data?.seasons) {
        seasons.value = data.data.seasons;
        // Default to the active season so the first load always reflects
        // the current season's examiner / room assignments.
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

  const fetchData = async () => {
    loading.value = true;
    try {
      const query = filters.value.season_id
        ? `?season_id=${filters.value.season_id}`
        : "";
      const endPoint = `/admin/viva-result/data${query}`;
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET",
      );

      const payload = data?.data;
      const groups = payload?.groups || [];

      // De-duplicate by examiner id (an examiner could theoretically head
      // multiple groups); keep the first occurrence so room/group stays
      // consistent with the A, B, C... ordering.
      const seen = new Set();
      const list = [];
      for (const g of groups) {
        const ex = g.examiner;
        if (!ex) continue;
        const key = ex.id ?? ex.room_number ?? ex.letter;
        if (seen.has(key)) continue;
        seen.add(key);
        list.push({
          id: ex.id,
          name: ex.name || "—",
          room_number: ex.room_number || "—",
          letter: ex.letter || "",
        });
      }
      examiners.value = list;
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load examiner data",
        3000,
      );
      examiners.value = [];
    } finally {
      loading.value = false;
    }
  };

  const printAllLabels = () => {
    window.print();
  };

  onMounted(async () => {
    await fetchSeasons();
    await fetchData();
  });
</script>

<style scoped>
  @media print {
    @page {
      size: A4;
      margin: 0;
    }

    body {
      margin: 0;
      padding: 0;
    }

    .door-labels,
    .door-labels * {
      visibility: visible;
    }

    .print\\:hidden {
      display: none !important;
    }

    .print\\:shadow-none {
      box-shadow: none !important;
    }

    .print\\:w-full {
      width: 100% !important;
    }

    .print\\:h-screen {
      height: 100vh !important;
    }

    .print\\:mb-0 {
      margin-bottom: 0 !important;
    }

    .print\\:break-after-page {
      break-after: page !important;
    }
  }
</style>
