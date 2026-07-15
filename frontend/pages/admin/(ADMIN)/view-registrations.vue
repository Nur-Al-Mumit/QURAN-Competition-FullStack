<template>
  <div class="p-6 bg-gray-50 min-h-screen attendance-sheet print:p-0 print:m-0">
    <div v-if="loading" class="text-center text-gray-600">
      Loading attendance data...
    </div>

    <div v-else>
      <div
        v-for="group in attendanceData"
        :key="group.examiner.id"
        class="mb-12 examiner-group"
      >
        <h1 class="text-2xl font-bold mb-2 text-center text-primary">
          বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
        </h1>
        <h1 class="text-xl font-bold mb-6 text-center leading-[20px]">
          Seat Plan
        </h1>

        <div class="mb-6">
          <h2 class="text-xl font-semibold text-emerald-700">
            Examiner: {{ group.examiner.name }}
          </h2>
          <div class="flex gap-2">
            <p class="text-sm font-bold">
              Room: {{ group.examiner.room_number }}
            </p>
            <!-- <p class="text-sm font-bold">Phone: {{ group.examiner.phone }}</p> -->
          </div>
        </div>

        <div class="print:w-full">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100 text-center">
                <th class="p-2 border">Serial</th>
                <th class="p-2 border">Reg No</th>
                <th class="p-2 border">Name</th>
                <th class="p-2 border">Phone</th>
                <th class="p-2 border">Exam Time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in group.students"
                :key="student.reg_no"
                class="hover:bg-gray-50 text-center"
              >
                <td class="p-2 border font-semibold">{{ student.serial }}</td>
                <td class="p-2 border">{{ student.reg_no }}</td>
                <td class="p-2 border">{{ student.name_en }}</td>
                <td class="p-2 border">{{ student.phone }}</td>
                <td class="p-2 border">{{ student.exam_time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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

  const printPage = () => {
    window.print();
  };

  onMounted(fetchAttendanceData);
</script>

<style scoped>
  @media print {
    @page {
      /* size: portrait; */
      size: A4 portrait;
      margin: 0;
    }
    .examiner-group {
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
  }
</style>
