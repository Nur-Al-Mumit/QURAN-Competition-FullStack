<template>
  <div class="p-6 bg-gray-50 min-h-screen portrait-sheet print:p-0 print:m-0">
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
      Loading serial data...
    </div>

    <div v-else>
      <!-- Per-group serial sheet -->
      <div
        v-for="group in groups"
        :key="group.examiner.letter"
        class="mb-12 portrait-group"
      >
        <!-- Group header -->
        <div class="portrait-header mb-4">
          <div class="flex items-center justify-between border-b-2 border-emerald-700 pb-2">
            <h1 class="text-xl font-bold text-emerald-800">
              বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
            </h1>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-700">
                Group: {{ group.examiner.letter }}
              </div>
              <div class="text-xs text-gray-500">
                Room: {{ group.examiner.room_number }}
              </div>
            </div>
          </div>
          <div class="mt-1 flex items-center justify-between text-xs text-gray-600">
            <span>Examiner: {{ group.examiner.name || '—' }}</span>
            <span>{{ examDayLabel }}</span>
          </div>
        </div>

        <!-- Students Table -->
        <div class="print:w-full">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100 text-center">
                <th class="p-2 border w-16">Serial</th>
                <th class="p-2 border w-24">Room No</th>
                <th class="p-2 border w-28">Reg No</th>
                <th class="p-2 border">Name</th>
                <th class="p-2 border w-40">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in group.students"
                :key="student.attendance_allocation_id"
                class="hover:bg-gray-50 text-center avoid-break"
              >
                <td class="p-2 border text-center font-semibold whitespace-nowrap">
                  {{ student.serial }}
                </td>
                <td class="p-2 border whitespace-nowrap">
                  {{ group.examiner.room_number }}
                </td>
                <td class="p-2 border whitespace-nowrap">
                  {{ student.reg_no }}
                </td>
                <td class="p-2 border text-left">{{ student.name_en }}</td>
                <td class="p-2 border whitespace-nowrap">{{ student.phone }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="!groups.length" class="text-center text-gray-500 py-12">
        No serial data found for this season.
      </div>

      <!-- Print Button -->
      <div class="text-center print:hidden">
        <button
          @click="printPage"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Print Serial Sheet
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

  const groups = ref([]);
  const examDay = ref(null);
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
        // Default to the active season so the first load always shows
        // the current season's data.
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

  // Reuses the same payload as the viva-result page; we only render the
  // serial / room-no / reg-no / name / phone columns here.
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
      if (payload) {
        groups.value = payload.groups || [];
        examDay.value = payload.exam_day || null;
      } else {
        groups.value = [];
        examDay.value = null;
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load serial data",
        3000,
      );
    } finally {
      loading.value = false;
    }
  };

  const examDayLabel = computed(() => {
    if (examDay.value?.start_date) {
      return new Date(examDay.value.start_date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    return "";
  });

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
  @media print {
    .portrait-sheet,
    .portrait-sheet * {
      visibility: visible;
    }

    .portrait-sheet {
      position: absolute;
      left: 0;
      top: 0;
      width: 100% !important;
      max-width: none !important;
      padding: 0 !important;
      margin: 0 !important;
      background: #fff !important;
    }

    .portrait-group {
      page-break-after: always;
    }

    .avoid-break {
      page-break-inside: avoid;
    }

    table {
      width: 100% !important;
      table-layout: auto;
    }
  }
</style>
