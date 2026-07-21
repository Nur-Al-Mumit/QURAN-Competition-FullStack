<template>
  <div class="p-6 bg-gray-50 min-h-screen attendance-sheet print:p-0 print:m-0">
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
      Loading attendance data...
    </div>

    <div v-else>
      <!-- Examiner wise group -->
      <div
        v-for="group in groups"
        :key="group.examiner.id"
        class="mb-12 examiner-group"
      >
        <!-- Cover Page for Each Examiner -->
        <div
          class="cover-page w-full h-screen bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8 print:mb-0"
        >
          <div
            class="relative h-full flex flex-col items-center justify-center p-8"
          >
            <!-- Header -->
            <div class="text-center mb-14">
              <h1 class="text-4xl font-bold text-emerald-800 mb-4">
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
              </h1>
              <div class="w-24 h-1 bg-emerald-600 mx-auto mb-8"></div>
            </div>

            <!-- Examiner Info Card -->
            <div
              class="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5 shadow-lg max-w-2xl w-full"
            >
              <div class="text-center">
                <h3
                  class="text-emerald-600 text-xl font-semibold uppercase tracking-widest mb-4"
                >
                  Examiner Details
                </h3>

                <div class="space-y-6">
                  <div>
                    <label
                      class="text-emerald-700 font-medium text-lg block mb-2"
                    >
                      Name:
                    </label>
                    <div class="text-3xl font-bold text-emerald-900 uppercase">
                      {{ group.examiner.name }}
                    </div>
                  </div>

                  <div class="flex justify-center gap-12">
                    <div>
                      <label
                        class="text-emerald-700 font-medium text-lg block mb-2"
                      >
                        Room Number:
                      </label>
                      <div class="text-6xl font-black text-emerald-800">
                        {{ group.examiner.room_number }}
                      </div>
                    </div>

                    <div>
                      <label
                        class="text-emerald-700 font-medium text-lg block mb-2"
                      >
                        Total Students:
                      </label>
                      <div class="text-6xl font-black text-emerald-800">
                        {{ group.students.length }}
                      </div>
                    </div>
                  </div>

                  <!-- Exam Time Section -->
                  <div class="mt-8 pt-6 border-t border-emerald-200">
                    <div class="flex items-center justify-center gap-3">
                      <div>
                        <div class="text-xl font-bold text-emerald-800">
                          {{ examTimeRange.start }}
                        </div>
                      </div>
                      <div class="border-t-3 border-emerald-500 w-8"></div>
                      <div>
                        <div class="text-xl font-bold text-emerald-800">
                          {{ examTimeRange.end }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="text-center mt-16">
              <div class="w-24 h-1 bg-emerald-600 mx-auto mb-4"></div>
              <p class="text-gray-600 text-lg font-medium">
                Attendance Sheet & Examination Record
              </p>
              <p class="text-gray-500 text-sm mt-2">
                {{ examDayLabel }}
              </p>
              <p
                v-if="group.examiner.letter"
                class="text-emerald-700 text-sm mt-1 font-semibold"
              >
                Group: {{ group.examiner.letter }}
              </p>
            </div>
          </div>
        </div>

        <div class="attendance-content">
          <!-- Students Table -->
          <div class="print:w-full">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-100 text-center">
                  <th class="p-2 border w-12">#</th>
                  <th class="p-2 border w-24">Reg No</th>
                  <th class="p-2 border w-32">Name</th>
                  <th class="p-2 border w-12">
                    Training,
                    <br />
                    Education
                  </th>
                  <th class="p-2 border w-30">Exam Time</th>
                  <th class="p-2 border w-64">Comments</th>
                  <th class="p-2 border w-40">Decision</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="student in group.students"
                  :key="student.reg_no"
                  class="hover:bg-gray-50 text-center avoid-break"
                >
                  <td
                    class="p-2 border text-center font-semibold whitespace-nowrap"
                  >
                    {{ student.serial }}
                  </td>
                  <td class="p-2 border">{{ student.reg_no }}</td>
                  <td class="p-2 border">{{ student.name_en }}</td>
                  <td class="p-2 border text-center">
                    <span
                      :class="
                        student.need_training === 'Yes'
                          ? 'text-rose-600 font-semibold'
                          : 'text-emerald-600'
                      "
                    >
                      {{ student.need_training }}
                    </span>
                    <br />
                    <span>{{ student.education_background }}</span>
                  </td>
                  <td class="p-2 border whitespace-nowrap">
                    {{ student.exam_time }}
                  </td>
                  <td class="p-2 border align-top h-150px"></td>
                  <td class="p-2 border align-top">
                    <select
                      v-model="student.result_category_id"
                      :disabled="saving[student.attendance_allocation_id]"
                      @change="saveDecision(student)"
                      class="print:hidden w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                    >
                      <option :value="null">—</option>
                      <option
                        v-for="cat in resultCategories"
                        :key="cat.id"
                        :value="cat.id"
                      >
                        {{ cat.name }}
                      </option>
                    </select>
                    <!-- Empty box shown only when printing -->
                    <span class="hidden print:block">&nbsp;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Print Button -->
      <div class="text-center print:hidden">
        <button
          @click="printPage"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Print Attendance Sheet
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "split",
  });

  const seasons = ref([]);
  const filters = ref({ season_id: "" });

  const groups = ref([]);
  const examDay = ref(null);
  const resultCategories = ref([]);
  const loading = ref(true);

  // Per-row saving flags keyed by attendance_allocation_id
  const saving = ref({});

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
      if (payload) {
        groups.value = payload.groups || [];
        examDay.value = payload.exam_day || null;
        resultCategories.value = payload.result_categories || [];
      } else {
        groups.value = [];
        examDay.value = null;
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load attendance data",
        3000,
      );
    } finally {
      loading.value = false;
    }
  };

  // Auto-save a single student's decision (no Save button).
  const saveDecision = async (student) => {
    const allocationId = student.attendance_allocation_id;
    const previous = student.result_category_id;

    saving.value = { ...saving.value, [allocationId]: true };
    try {
      const { data } = await useAdminAuthenticatedAxios(
        "/admin/viva-result/decision",
        {
          user_id: student.user_id,
          user_competition_form_id: student.user_competition_form_id,
          season_id: filters.value.season_id,
          attendance_allocation_id: allocationId,
          result_category_id: student.result_category_id,
        },
        null,
        "POST",
      );

      // Sync any server-normalised value back onto the row.
      if (data?.data?.result_category_id !== undefined) {
        student.result_category_id = data.data.result_category_id;
      }
    } catch (err) {
      // Revert optimistic change on failure.
      student.result_category_id = previous;
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to save decision",
        3000,
      );
    } finally {
      saving.value = { ...saving.value, [allocationId]: false };
    }
  };

  // Cover-page exam-time range. Prefers the season's exam-day event;
  // falls back to deriving from the students' own exam_time values.
  const examTimeRange = computed(() => {
    if (examDay.value?.start_date && examDay.value?.end_date) {
      const fmt = (val) => {
        const d = new Date(val);
        return d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      };
      return {
        start: fmt(examDay.value.start_date),
        end: fmt(examDay.value.end_date),
      };
    }
    return derivedExamTimeRange(groups.value);
  });

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

  // Fallback time-range computation from student exam_time values,
  // kept identical to the previous behaviour.
  const derivedExamTimeRange = (groups) => {
    const students = (groups || []).flatMap((g) => g.students || []);
    if (students.length === 0) return { start: "N/A", end: "N/A" };

    const firstWithTime = students.find(
      (s) => s.exam_time && s.exam_time.includes(" - "),
    );
    const lastWithTime = [...students]
      .reverse()
      .find((s) => s.exam_time && s.exam_time.includes(" - "));

    if (!firstWithTime || !lastWithTime) return { start: "N/A", end: "N/A" };

    return {
      start: firstWithTime.exam_time.split(" - ")[0],
      end: lastWithTime.exam_time.split(" - ")[1],
    };
  };

  const printPage = () => {
    window.print();
  };

  onMounted(async () => {
    await fetchSeasons();
    await fetchData();
  });
</script>

<style scoped>
  /* Print-specific CSS for page break */
  @media print {
    @page {
      size: landscape;
      margin: 0;
      padding: 30px;
      /* padding: 30px 0 30px 0; */
    }

    .examiner-group {
      page-break-after: always;
    }

    .cover-page {
      page-break-after: always;
    }

    .attendance-content {
      page-break-after: always;
    }

    .attendance-sheet,
    .attendance-sheet * {
      visibility: visible;
    }

    .attendance-sheet {
      position: absolute;
      left: 0;
      top: 0;
      width: 100% !important;
      max-width: none !important;
    }

    .avoid-break {
      page-break-inside: avoid;
    }
  }

  .h-150px {
    height: 157px;
  }
</style>
