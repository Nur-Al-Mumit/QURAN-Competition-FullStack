<template>
  <div
    class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page header -->
      <div class="text-center mb-10">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6"
        >
          <svg
            class="w-10 h-10 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1
          class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-3"
        >
          Final Confirmation — চূড়ান্ত নিশ্চয়ণ
        </h1>
        <p class="text-gray-600">
          বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
        </p>
      </div>

      <!-- Controls: season + search -->
      <div
        class="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 mb-8"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Season -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Season
            </label>
            <select
              v-model="filters.season_id"
              @change="fetchData"
              :disabled="loading"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
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
              <span class="text-gray-400 font-normal">
                (name, reg no, or serial)
              </span>
            </label>
            <div class="relative">
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search a participant..."
                class="w-full rounded-lg border border-gray-300 pl-10 pr-9 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-600 py-20">
        Loading final confirmation data...
      </div>

      <!-- Sections -->
      <div v-else>
        <!-- No search match at all -->
        <div
          v-if="searchQuery && !hasAnyMatch"
          class="text-center text-gray-500 bg-white rounded-2xl border border-gray-200 py-16"
        >
          <svg
            class="w-12 h-12 mx-auto text-gray-300 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          No participant found for
          <span class="font-semibold">"{{ searchQuery }}"</span>
          .
        </div>

        <template v-else>
          <!-- Section 1: Mahir -->
          <ResultSection
            v-if="filtered.mahir.length"
            title="Section 1 — Mahir (الماهر) — Expert"
            :count="filtered.mahir.length"
            :total="sections.mahir.length"
            tone="emerald"
            badge-text="Mahir"
            badge-tone="emerald"
            :rows="filtered.mahir"
            status-field="status"
          />

          <!-- Section 2: Mubtadi -->
          <ResultSection
            v-if="filtered.mubtadi.length"
            title="Section 2 — Mubtadi (المبتدئ) — Beginner"
            :count="filtered.mubtadi.length"
            :total="sections.mubtadi.length"
            tone="emerald"
            badge-text="Mubtadi"
            badge-tone="emerald"
            :rows="filtered.mubtadi"
            status-field="status"
          />

          <!-- Everything empty but no search (no data at all) -->
          <div
            v-if="
              !filtered.mahir.length && !filtered.mubtadi.length
            "
            class="text-center text-gray-500 bg-white rounded-2xl border border-gray-200 py-16"
          >
            No final confirmation data available for this season.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Public final confirmation page — no auth required.
  // Calls the public /final-confirmation/* endpoints via useAxios.

  const seasons = ref([]);
  const filters = ref({ season_id: "" });

  const sections = ref({ mahir: [], mubtadi: [] });
  const loading = ref(true);
  const criteriaMap = ref({});

  // Client-side search query. Empty by default → the whole list shows.
  const searchQuery = ref("");

  const fetchSeasons = async () => {
    try {
      const { data } = await useAxios(
        "/final-confirmation/seasons",
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

  const fetchData = async () => {
    loading.value = true;
    try {
      const query = filters.value.season_id
        ? `?season_id=${filters.value.season_id}`
        : "";
      const { data } = await useAxios(
        `/final-confirmation/data${query}`,
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
        // Build a criteria name map from criteria_id values in the data.
        const map = {};
        [...(s.mahir || []), ...(s.mubtadi || [])].forEach((row) => {
          if (row.criteria_id) {
            map[row.criteria_id] = `Criteria #${row.criteria_id}`;
          }
        });
        criteriaMap.value = map;
      } else {
        sections.value = { mahir: [], mubtadi: [] };
        criteriaMap.value = {};
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load final confirmation data",
        3000,
      );
      sections.value = { mahir: [], mubtadi: [] };
      criteriaMap.value = {};
    } finally {
      loading.value = false;
    }
  };

  // Filters each section by the search query across name / reg_no / serial.
  const matches = (row, q) => {
    if (!q) return true;
    const hay = [
      row.name_en || "",
      row.reg_no || "",
      row.serial || "",
    ]
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

  const hasAnyMatch = computed(
    () =>
      filtered.value.mahir.length || filtered.value.mubtadi.length,
  );

  onMounted(async () => {
    await fetchSeasons();
    await fetchData();
  });
</script>
