<template>
  <div class="p-6 bg-gray-50 min-h-screen attendance-sheet print:p-0 print:m-0">
    <div v-if="loading" class="text-center text-gray-600">
      Loading attendance data...
    </div>

    <div v-else>
      <!-- Examiner wise group -->
      <div
        v-for="group in attendanceData"
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
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি
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
                          {{ getExamTimeRange(group.students).start }}
                        </div>
                      </div>
                      <div class="border-t-3 border-emerald-500 w-8"></div>
                      <div>
                        <div class="text-xl font-bold text-emerald-800">
                          {{ getExamTimeRange(group.students).end }}
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
              <p class="text-gray-500 text-sm mt-2">2 August, 2025</p>
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

  const attendanceData = ref([]);
  const loading = ref(true);

  const fetchAttendanceData = async () => {
    try {
      const endPoint = "/registration/get-attendance-allocation";
      const { data } = await useAxios(endPoint, null, null, "POST");
      attendanceData.value = data.data;
    } catch (error) {
      console.error("Error loading attendance data", error);
    } finally {
      loading.value = false;
    }
  };

  const getExamTimeRange = (students) => {
    if (!students || students.length === 0) {
      return { start: "N/A", end: "N/A" };
    }

    // Find first student with a valid exam_time
    const firstWithTime = students.find(s => s.exam_time && s.exam_time.includes(" - "));
    // Find last student with a valid exam_time
    const lastWithTime = [...students].reverse().find(s => s.exam_time && s.exam_time.includes(" - "));

    if (!firstWithTime || !lastWithTime) {
      return { start: "N/A", end: "N/A" };
    }

    const start = firstWithTime.exam_time.split(" - ")[0];
    const end = lastWithTime.exam_time.split(" - ")[1];

    return { start, end };
  };

  const printPage = () => {
    window.print();
  };

  onMounted(fetchAttendanceData);
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
