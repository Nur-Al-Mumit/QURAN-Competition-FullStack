<template>
  <div class="p-6 bg-gray-50 min-h-screen result-sheet print:p-0 print:m-0">
    <!-- Season filter header (screen only) -->
    <div class="mb-6 rounded-lg bg-white p-6 shadow-sm print:hidden">
      <h2 class="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
      <div
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        <!-- Season Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Season
          </label>
          <select
            v-model="filters.season_id"
            @change="fetchData"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
      </div>
    </div>

    <div v-if="loading" class="text-center text-gray-600">
      Loading result data...
    </div>

    <div v-else>
      <!-- Sheet header -->
      <div class="result-header mb-6">
        <div class="text-center border-b-2 border-emerald-700 pb-3 mb-3">
          <h1 class="text-2xl font-bold text-emerald-800">
            বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
          </h1>
          <p class="text-sm text-gray-600 mt-1">Result Sheet</p>
        </div>
      </div>

      <!-- Section 1: Mahir -->
      <section class="mb-10 result-section">
        <h2 class="section-title">
          Section 1 — Mahir (الماهر) — Expert
          <span class="font-normal text-gray-500">
            ({{ sections.mahir.length }})
          </span>
        </h2>
        <table class="result-table w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-center">
              <th class="p-2 border w-12">#</th>
              <th class="p-2 border w-20">Serial</th>
              <th class="p-2 border w-28">Reg No</th>
              <th class="p-2 border">Name</th>
              <th class="p-2 border w-40">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!sections.mahir.length">
              <td colspan="5" class="p-3 border text-center text-gray-400">
                No Mahir students.
              </td>
            </tr>
            <tr
              v-for="row in sections.mahir"
              :key="'mahir-' + row.serial"
              class="text-center avoid-break"
            >
              <td class="p-2 border font-semibold">{{ row.sl }}</td>
              <td class="p-2 border font-semibold whitespace-nowrap">{{ row.serial }}</td>
              <td class="p-2 border whitespace-nowrap">{{ row.reg_no }}</td>
              <td class="p-2 border text-left">{{ row.name_en }}</td>
              <td class="p-2 border text-emerald-700 font-semibold">Mahir</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Section 2: Mubtadi -->
      <section class="mb-10 result-section">
        <h2 class="section-title">
          Section 2 — Mubtadi (المبتدئ) — Beginner
          <span class="font-normal text-gray-500">
            ({{ sections.mubtadi.length }})
          </span>
        </h2>
        <table class="result-table w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-center">
              <th class="p-2 border w-12">#</th>
              <th class="p-2 border w-20">Serial</th>
              <th class="p-2 border w-28">Reg No</th>
              <th class="p-2 border">Name</th>
              <th class="p-2 border w-40">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!sections.mubtadi.length">
              <td colspan="5" class="p-3 border text-center text-gray-400">
                No Mubtadi students.
              </td>
            </tr>
            <tr
              v-for="row in sections.mubtadi"
              :key="'mubtadi-' + row.serial"
              class="text-center avoid-break"
            >
              <td class="p-2 border font-semibold">{{ row.sl }}</td>
              <td class="p-2 border font-semibold whitespace-nowrap">{{ row.serial }}</td>
              <td class="p-2 border whitespace-nowrap">{{ row.reg_no }}</td>
              <td class="p-2 border text-left">{{ row.name_en }}</td>
              <td class="p-2 border text-emerald-700 font-semibold">Mubtadi</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Section 3: Fail / Not Selected (present but didn't qualify) -->
      <section class="mb-10 result-section">
        <h2 class="section-title section-title--fail">
          Section 3 — Not Selected
          <span class="font-normal text-gray-500">({{ other.length }})</span>
        </h2>
        <table class="result-table w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-center">
              <th class="p-2 border w-12">#</th>
              <th class="p-2 border w-20">Serial</th>
              <th class="p-2 border w-28">Reg No</th>
              <th class="p-2 border">Name</th>
              <th class="p-2 border w-40">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!other.length">
              <td colspan="5" class="p-3 border text-center text-gray-400">
                No failed students.
              </td>
            </tr>
            <tr
              v-for="row in other"
              :key="'other-' + row.serial"
              class="text-center avoid-break"
            >
              <td class="p-2 border font-semibold">{{ row.sl }}</td>
              <td class="p-2 border font-semibold whitespace-nowrap">{{ row.serial }}</td>
              <td class="p-2 border whitespace-nowrap">{{ row.reg_no }}</td>
              <td class="p-2 border text-left">{{ row.name_en }}</td>
              <td class="p-2 border text-red-700 font-semibold">Not Selected</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Section 4: Absent -->
      <section class="mb-10 result-section">
        <h2 class="section-title section-title--absent">
          Section 4 — Absent
          <span class="font-normal text-gray-500">
            ({{ sections.absent.length }})
          </span>
        </h2>
        <table class="result-table w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-center">
              <th class="p-2 border w-12">#</th>
              <th class="p-2 border w-20">Serial</th>
              <th class="p-2 border w-28">Reg No</th>
              <th class="p-2 border">Name</th>
              <th class="p-2 border w-40">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!sections.absent.length">
              <td colspan="5" class="p-3 border text-center text-gray-400">
                No absent students.
              </td>
            </tr>
            <tr
              v-for="row in sections.absent"
              :key="'absent-' + row.serial"
              class="text-center avoid-break"
            >
              <td class="p-2 border font-semibold">{{ row.sl }}</td>
              <td class="p-2 border font-semibold whitespace-nowrap">{{ row.serial }}</td>
              <td class="p-2 border whitespace-nowrap">{{ row.reg_no }}</td>
              <td class="p-2 border text-left">{{ row.name_en }}</td>
              <td class="p-2 border text-red-600 font-semibold">Absent</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Print Button -->
      <div class="text-center print:hidden">
        <button
          @click="printPage"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Print Result Sheet
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Inject the portrait @page rule inline into <head>. Some browsers
  // ignore `size` from async/code-split CSS chunks but reliably honor an
  // inline <style> in the document head — this guarantees portrait print.
  useHead({
    style: [
      {
        innerHTML: "@media print{ @page{ size: A4 portrait; margin: 12mm; } }",
      },
    ],
  });

  const seasons = ref([]);
  const filters = ref({ season_id: "" });

  const sections = ref({ mahir: [], mubtadi: [], absent: [] });
  const other = ref([]);
  const loading = ref(true);

  const fetchSeasons = async () => {
    try {
      const endPoint = "/admin/result-card/seasons";
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
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
      const endPoint = `/admin/result-card/data${query}`;
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
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

  const printPage = () => {
    window.print();
  };

  onMounted(async () => {
    await fetchSeasons();
    await fetchData();
  });
</script>

<style>
  @media print {
    @page {
      size: A4 portrait;
      margin: 12mm;
    }
  }
</style>

<style scoped>
  .section-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #047857; /* emerald-700 */
    border-left: 4px solid #10b981;
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .section-title--absent {
    color: #b91c1c; /* red-700 */
    border-left-color: #ef4444;
  }

  .section-title--fail {
    color: #b91c1c; /* red-700 */
    border-left-color: #ef4444;
  }

  @media print {
    .result-sheet,
    .result-sheet * {
      visibility: visible;
    }

    .result-sheet {
      position: absolute;
      left: 0;
      top: 0;
      width: 100% !important;
      max-width: none !important;
      padding: 0 !important;
      margin: 0 !important;
      background: #fff !important;
    }

    /* .result-section {
      page-break-inside: avoid;
    } */

    .result-table {
      width: 100% !important;
      table-layout: auto;
    }
  }
</style>
