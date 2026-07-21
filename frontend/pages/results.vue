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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h1
          class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-3"
        >
          ফলাফল — Result
        </h1>
        <p class="text-gray-600">বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি</p>
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
                (name, phone, reg no, or serial)
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
        Loading result data...
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
            :note="mubtadiNote"
            :note-detail="mubtadiNoteDetail"
          />

          <!-- Section 3: Fail -->
          <ResultSection
            v-if="filtered.other.length"
            title="Section 3 — Not Selected"
            :count="filtered.other.length"
            :total="other.length"
            tone="red"
            badge-text="Not Selected"
            badge-tone="red"
            :rows="filtered.other"
          />

          <!-- Section 4: Absent -->
          <ResultSection
            v-if="filtered.absent.length"
            title="Section 4 — Absent"
            :count="filtered.absent.length"
            :total="sections.absent.length"
            tone="red"
            badge-text="Absent"
            badge-tone="red"
            :rows="filtered.absent"
          />

          <!-- Everything empty but no search (no data at all) -->
          <div
            v-if="
              !filtered.mahir.length &&
              !filtered.mubtadi.length &&
              !filtered.other.length &&
              !filtered.absent.length
            "
            class="text-center text-gray-500 bg-white rounded-2xl border border-gray-200 py-16"
          >
            No result data available for this season.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Public result page — no auth required. Calls the public
  // /result-card/* endpoints (registered without middleware) via the
  // plain useAxios composable (no Bearer token).

  const seasons = ref([]);
  const filters = ref({ season_id: "" });

  const sections = ref({ mahir: [], mubtadi: [], absent: [] });
  const other = ref([]);
  const loading = ref(true);

  // Client-side search query. Empty by default → the whole list shows.
  const searchQuery = ref("");

  // Training notice shown for the Mubtadi (Beginner) section.
  // `note` = short summary always visible under the section header;
  // `noteDetail` = full HTML rendered inside the detail modal.
  const mubtadiNote =
    "Mubtadi (المبتدئ) — Beginner ক্যাটাগরিতে যারা সুযোগ পেয়েছেন, তাদের জন্য এই ৫ দিনের ট্রেইনিং সেশনটি বাধ্যতামূলক এবং Mahir (الماهر) — Expert গ্রুপের জন্য এটি ঐচ্ছিক (Optional)। বিস্তারিত জানতে নিচের বাটনে ক্লিক করুন।";

  const mubtadiNoteDetail = `
    <p><strong>Mubtadi (المبتدئ) — Beginner</strong> ক্যাটাগরিতে যারা সুযোগ পেয়েছেন, তাদের জন্য এই ৫ দিনের ট্রেইনিং সেশনটি <strong>বাধ্যতামূলক</strong> এবং <strong>Mahir (الماهر) — Expert</strong> গ্রুপের জন্য এটি <strong>ঐচ্ছিক (Optional)</strong>।</p>
    <p>Beginner ক্যাটাগরির বিজয়ী/মনোনীত অংশগ্রহণকারীদের ৫ দিনের ট্রেইনিং সেশনের মধ্যে <strong>ন্যূনতম ৩ দিন</strong> উপস্থিত থাকতে হবে, অন্যথায় প্রতিযোগিতায় অংশগ্রহণের জন্য যোগ্য বলে বিবেচিত হবেন না।</p>
    <div class="rounded-lg bg-emerald-50 border border-emerald-200 p-4 space-y-2">
      <p><strong>📅 তারিখ ও সময়:</strong> ২২ জুলাই ২০২৬, মাগরিবের সালাতের পর</p>
      <p><strong>📍 স্থান/ভেন্যু:</strong> হেরিটেজ হাইটস এন্ড ব্যাংকুয়েট হল, মেট্রোপলিটন মার্কেট (২য় তলা), সুবহানীঘাট, সিলেট <span class="text-gray-500">(প্রাইমারি রাউন্ড অনুষ্ঠিত হওয়ার স্থান)</span>।</p>
    </div>
    <p class="text-sm text-gray-500 italic">(উল্লেখ্য, অংশগ্রহণকারীরা চাইলে ভেন্যুতে গিয়েও সালাত আদায় করতে পারবেন; সেখানে সালাত আদায়ের সুব্যবস্থা থাকবে।)</p>
  `;

  const fetchSeasons = async () => {
    try {
      const { data } = await useAxios(
        "/result-card/seasons",
        null,
        null,
        "GET",
      );
      if (data?.data?.seasons) {
        seasons.value = data.data.seasons;
        // Default to the active season so the first load always shows
        // the current season's results.
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
        `/result-card/data${query}`,
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
          absent: s.absent || [],
        };
        other.value = payload.other || [];
      } else {
        sections.value = { mahir: [], mubtadi: [], absent: [] };
        other.value = [];
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load result data",
        3000,
      );
      sections.value = { mahir: [], mubtadi: [], absent: [] };
      other.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Filters each section by the search query across name / phone /
  // reg_no / serial (case-insensitive). When the query is empty the
  // sections are returned unchanged so the whole list is visible.
  const matches = (row, q) => {
    if (!q) return true;
    const hay = [
      row.name_en || "",
      row.phone || "",
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
      absent: sections.value.absent.filter((r) => matches(r, q)),
      other: other.value.filter((r) => matches(r, q)),
    };
  });

  const hasAnyMatch = computed(
    () =>
      filtered.value.mahir.length ||
      filtered.value.mubtadi.length ||
      filtered.value.absent.length ||
      filtered.value.other.length,
  );

  onMounted(async () => {
    await fetchSeasons();
    await fetchData();
  });
</script>
