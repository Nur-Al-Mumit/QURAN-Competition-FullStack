<template>
  <div class="sm:p-6 min-h-screen final-attendance-view print:p-0 print:m-0">
    <div class="max-w-7xl mx-auto">
      <!-- Header + filters (screen only) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 print:hidden">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-xl font-bold text-gray-900">
              Final Attendance View
            </h1>
            <p class="text-sm text-gray-500 mt-0.5">
              All final attendance &amp; confirmation records — grouped by criteria and season.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center gap-3 w-full sm:w-auto">
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700 whitespace-nowrap">
                Season
              </label>
              <select
                v-model="filters.season_id"
                @change="fetchData"
                class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-0 flex-1"
                :disabled="loading"
              >
                <option value="">All Seasons</option>
                <option v-for="s in seasons" :key="s.id" :value="s.id">
                  {{ s.year }}
                  <template v-if="s.is_active"> — Active</template>
                </option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700 whitespace-nowrap">
                Search
              </label>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Name or Reg No…"
                class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-48"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div
        v-if="records.length"
        class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 print:mb-4"
      >
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div class="text-2xl font-bold text-gray-900">{{ records.length }}</div>
          <div class="text-xs text-gray-500 mt-0.5">Total Records</div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div class="text-2xl font-bold text-emerald-600">{{ confirmedCount }}</div>
          <div class="text-xs text-gray-500 mt-0.5">Confirmed</div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div class="text-2xl font-bold text-blue-600">{{ presentCount }}</div>
          <div class="text-xs text-gray-500 mt-0.5">Present</div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div class="text-2xl font-bold text-red-600">{{ absentCount }}</div>
          <div class="text-xs text-gray-500 mt-0.5">Absent</div>
        </div>
      </div>

      <!-- Loading -->
      <div
        v-if="loading"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500 text-sm"
      >
        Loading records…
      </div>

      <!-- No Data -->
      <div
        v-else-if="!records.length"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500 text-sm"
      >
        No final attendance records found.
      </div>

      <!-- No Search Results -->
      <div
        v-else-if="!filteredRecords.length && filters.search"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-400 text-sm"
      >
        No matching records for "{{ filters.search }}".
      </div>

      <!-- Tables -->
      <template v-else>
        <!-- Print-only header -->
        <div
          class="hidden print:block text-center border-b-2 border-emerald-700 pb-2 mb-4"
        >
          <h1 class="text-2xl font-bold text-emerald-800">
            বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা ১৪৪৮ হিজরী
          </h1>
          <p class="text-sm text-gray-600 mt-1">Final Attendance Sheet</p>
        </div>

        <!-- Al-Mahir Section -->
        <div
          v-if="mahirRecords.length"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
        >
          <div
            class="bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-3 flex items-center justify-between"
          >
            <h2 class="text-white font-bold text-sm">
              Al-Mahir (الماهر) — Expert
            </h2>
            <span class="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {{ mahirRecords.length }}
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="bg-gray-50 text-gray-700">
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide w-10">#</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide min-w-[180px]">Name</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Reg No</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Phone</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide text-center">Season</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide text-center">Confirmation</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide text-center">Attendance</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Consideration</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, i) in mahirRecords"
                  :key="row.user_id + '-' + row.season_id + '-' + row.criteria_id"
                  class="hover:bg-gray-50"
                >
                  <td class="p-3 border-b text-gray-500">{{ i + 1 }}</td>
                  <td class="p-3 border-b">
                    <div class="font-medium text-gray-900">
                      {{ row.name_en || row.name_bn }}
                    </div>
                    <div v-if="row.name_bn && row.name_en" class="text-xs text-gray-400">
                      {{ row.name_bn }}
                    </div>
                  </td>
                  <td class="p-3 border-b text-gray-600 font-mono text-xs whitespace-nowrap">
                    {{ row.reg_no }}
                  </td>
                  <td class="p-3 border-b text-gray-600 whitespace-nowrap text-xs">
                    {{ row.phone }}
                  </td>
                  <td class="p-3 border-b text-center text-xs text-gray-600">
                    {{ row.season_year }}
                  </td>
                  <td class="p-3 border-b text-center">
                    <span
                      v-if="row.confirmation_status === 1"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"
                    >Confirmed</span>
                    <span
                      v-else-if="row.confirmation_status === 0"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800"
                    >Not Confirmed</span>
                    <span
                      v-else
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600"
                    >Pending</span>
                  </td>
                  <td class="p-3 border-b text-center">
                    <span
                      v-if="row.attendance_status === 1"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"
                    >Present</span>
                    <span
                      v-else-if="row.attendance_status === 2"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800"
                    >Absent</span>
                    <span
                      v-else-if="row.attendance_status === 3"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"
                    >Late</span>
                    <span
                      v-else
                      class="text-gray-400 text-xs"
                    >—</span>
                  </td>
                  <td class="p-3 border-b text-xs text-gray-600 max-w-[200px] truncate" :title="row.has_consideration || ''">
                    {{ row.has_consideration || '—' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Al-Mubtadi Section -->
        <div
          v-if="mubtadiRecords.length"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6"
        >
          <div
            class="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 flex items-center justify-between"
          >
            <h2 class="text-white font-bold text-sm">
              Al-Mubtadi (المبتدئ) — Beginner
            </h2>
            <span class="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {{ mubtadiRecords.length }}
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="bg-gray-50 text-gray-700">
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide w-10">#</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide min-w-[180px]">Name</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Reg No</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Phone</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide text-center">Season</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide text-center">Confirmation</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide text-center">Attendance</th>
                  <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Consideration</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, i) in mubtadiRecords"
                  :key="row.user_id + '-' + row.season_id + '-' + row.criteria_id"
                  class="hover:bg-gray-50"
                >
                  <td class="p-3 border-b text-gray-500">{{ i + 1 }}</td>
                  <td class="p-3 border-b">
                    <div class="font-medium text-gray-900">
                      {{ row.name_en || row.name_bn }}
                    </div>
                    <div v-if="row.name_bn && row.name_en" class="text-xs text-gray-400">
                      {{ row.name_bn }}
                    </div>
                  </td>
                  <td class="p-3 border-b text-gray-600 font-mono text-xs whitespace-nowrap">
                    {{ row.reg_no }}
                  </td>
                  <td class="p-3 border-b text-gray-600 whitespace-nowrap text-xs">
                    {{ row.phone }}
                  </td>
                  <td class="p-3 border-b text-center text-xs text-gray-600">
                    {{ row.season_year }}
                  </td>
                  <td class="p-3 border-b text-center">
                    <span
                      v-if="row.confirmation_status === 1"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"
                    >Confirmed</span>
                    <span
                      v-else-if="row.confirmation_status === 0"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800"
                    >Not Confirmed</span>
                    <span
                      v-else
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600"
                    >Pending</span>
                  </td>
                  <td class="p-3 border-b text-center">
                    <span
                      v-if="row.attendance_status === 1"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"
                    >Present</span>
                    <span
                      v-else-if="row.attendance_status === 2"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800"
                    >Absent</span>
                    <span
                      v-else-if="row.attendance_status === 3"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800"
                    >Late</span>
                    <span
                      v-else
                      class="text-gray-400 text-xs"
                    >—</span>
                  </td>
                  <td class="p-3 border-b text-xs text-gray-600 max-w-[200px] truncate" :title="row.has_consideration || ''">
                    {{ row.has_consideration || '—' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </template>

      <!-- Print Button (screen only) -->
      <div v-if="records.length" class="text-center mt-6 print:hidden">
        <button
          @click="printPage"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Print Sheet
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: "split" });

useHead({
  style: [
    {
      innerHTML:
        "@media print{ @page{ size: A4 portrait; margin: 10mm; } }",
    },
  ],
});

const seasons = ref([]);
const records = ref([]);
const filters = ref({ season_id: "", search: "" });
const loading = ref(false);

// Group records by criteria
const filteredRecords = computed(() => {
  const q = filters.value.search.trim().toLowerCase();
  if (!q) return records.value;
  return records.value.filter(
    (r) =>
      (r.name_en || "").toLowerCase().includes(q) ||
      (r.name_bn || "").toLowerCase().includes(q) ||
      (r.reg_no || "").toLowerCase().includes(q),
  );
});

const mahirRecords = computed(
  () => filteredRecords.value.filter((r) => r.criteria_id === 1),
);

const mubtadiRecords = computed(
  () => filteredRecords.value.filter((r) => r.criteria_id === 2),
);

// Summary stats
const confirmedCount = computed(
  () => records.value.filter((r) => r.confirmation_status === 1).length,
);

const presentCount = computed(
  () => records.value.filter((r) => r.attendance_status === 1).length,
);

const absentCount = computed(
  () => records.value.filter((r) => r.attendance_status === 2).length,
);

const fetchData = async () => {
  loading.value = true;
  try {
    const params = filters.value.season_id
      ? `?season_id=${filters.value.season_id}`
      : "";
    const { data } = await useAdminAuthenticatedAxios(
      `/admin/volunteer/final-attendance-view${params}`,
      null,
      null,
      "GET",
    );
    records.value = data?.data?.records || [];
    if (data?.data?.seasons) {
      seasons.value = data.data.seasons;
    }
  } catch (err) {
    window.showError?.(
      "Error!",
      err?.response?.data?.message || "Failed to load data",
      3000,
    );
    records.value = [];
  } finally {
    loading.value = false;
  }
};

const printPage = () => {
  window.print();
};

onMounted(async () => {
  await fetchData();
});
</script>

<style scoped>
@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  .final-attendance-view,
  .final-attendance-view * {
    visibility: visible !important;
  }

  .final-attendance-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100% !important;
    max-width: none !important;
    padding: 0 !important;
    margin: 0 !important;
    background: #fff !important;
  }
}

@media print {
  tr {
    page-break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }

  table {
    width: 100% !important;
    table-layout: auto;
    font-size: 11px;
  }
}
</style>
