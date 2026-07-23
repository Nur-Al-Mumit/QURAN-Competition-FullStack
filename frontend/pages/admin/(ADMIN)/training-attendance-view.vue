<template>
  <div class="sm:p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Header + season filter -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-xl font-bold text-gray-900">Training Attendance View</h1>
            <p class="text-sm text-gray-500 mt-0.5">
              Recorded attendance (from QR scans) per student per training date.
            </p>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <label class="text-sm font-medium text-gray-700 whitespace-nowrap">Season</label>
            <select
              v-model="filters.season_id"
              @change="fetchData"
              class="flex-1 sm:flex-none min-w-0 max-w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
      </div>

      <!-- States -->
      <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500 text-sm">
        Loading attendance…
      </div>
      <div
        v-else-if="!students.length || !dates.length"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-400 text-sm"
      >
        No data for this season.
      </div>

      <!-- Attendance table -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-sm">
            <thead>
              <tr class="bg-gray-100 text-gray-700">
                <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide w-10">#</th>
                <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide min-w-[180px]">Name</th>
                <th class="p-3 border-b text-xs font-semibold uppercase tracking-wide">Phone</th>
                <th
                  v-for="d in dates"
                  :key="d.date"
                  :class="[
                    'p-3 border-b text-xs font-semibold uppercase tracking-wide text-center w-20',
                    d.is_off_day ? 'bg-amber-100 text-amber-700' : '',
                  ]"
                >
                  <div>{{ formatShort(d.date) }}</div>
                  <div class="font-normal normal-case opacity-70">{{ formatDay(d.date) }}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(student, i) in students"
                :key="student.user_id || student.reg_no || i"
                class="hover:bg-gray-50"
              >
                <td class="p-3 border-b text-gray-500">{{ i + 1 }}</td>
                <td class="p-3 border-b">
                  <div class="font-medium text-gray-900">{{ student.name_en || student.name_bn }}</div>
                  <div class="text-xs text-gray-400">{{ student.reg_no }}</div>
                </td>
                <td class="p-3 border-b text-gray-600 whitespace-nowrap">{{ student.phone }}</td>
                <td
                  v-for="d in dates"
                  :key="d.date"
                  :class="[
                    'p-3 border-b text-center font-semibold',
                    d.is_off_day ? 'bg-amber-50 text-amber-300' : cellClass(student, d.date),
                  ]"
                >
                  <span v-if="d.is_off_day">—</span>
                  <span v-else>{{ cellLabel(student, d.date) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({ layout: "split" });

  const seasons = ref([]);
  const filters = ref({ season_id: "" });
  const students = ref([]);
  const dates = ref([]);
  const attendance = ref({}); // { [user_id]: { [date]: status } }
  const loading = ref(false);

  const formatShort = (date) =>
    new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short" });

  const formatDay = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "short" });

  const statusFor = (student, date) => {
    if (!student.user_id) return null;
    const recorded = attendance.value[student.user_id]?.[date] ?? null;
    if (recorded !== null) return recorded;
    // No recorded row → default to Absent (2), but only for sessions
    // that have already happened (date < today). Today and future dates
    // stay blank until attendance is recorded.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(date) < today) return 2;
    return null;
  };

  // 1 = Present (green), 2 = Absent (red), 3 = Late (amber), blank = grey.
  const cellClass = (student, date) => {
    const s = statusFor(student, date);
    if (s === 1) return "bg-emerald-50 text-emerald-700";
    if (s === 2) return "bg-red-50 text-red-700";
    if (s === 3) return "bg-amber-50 text-amber-700";
    return "text-gray-300";
  };

  const cellLabel = (student, date) => {
    const s = statusFor(student, date);
    if (s === 1) return "P";
    if (s === 2) return "A";
    if (s === 3) return "L";
    return "—";
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

  const fetchData = async () => {
    if (!filters.value.season_id) {
      students.value = [];
      dates.value = [];
      attendance.value = {};
      return;
    }
    loading.value = true;
    try {
      const { data } = await useAdminAuthenticatedAxios(
        `/admin/training-dates/attendance-view?season_id=${filters.value.season_id}`,
        null,
        null,
        "GET"
      );
      students.value = data?.data?.students || [];
      dates.value = data?.data?.training_dates || [];
      attendance.value = data?.data?.attendance || {};
    } catch (err) {
      window.showError?.(
        "Error!",
        err?.response?.data?.message || "Failed to load attendance",
        3000
      );
      students.value = [];
      dates.value = [];
      attendance.value = {};
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await fetchSeasons();
    await fetchData();
  });
</script>
