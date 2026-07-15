<template>
  <div>
    <div class="min-h-screen bg-gray-50">
      <!-- Control Panel (Hidden in print) -->
      <div class="print:hidden bg-white shadow-sm border-b p-0 mb-6">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-2xl font-bold text-emerald-800 mb-4">
            Examiner Attendance Sheet Generator
          </h1>
          <div class="text-gray-600 mb-4">
            Total Attendance Sheets: {{ examiners.length }}
          </div>
          <button
            @click="printAllSheets"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Print All Attendance Sheets
          </button>
        </div>
      </div>

      <!-- All Attendance Sheets (Printable) - Each on separate page -->
      <div class="max-w-4xl mx-auto attendance-sheets">
        <div
          v-for="(examiner, index) in examiners"
          :key="examiner.id"
          :class="[
            'w-full h-[297mm] bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8',
            'print:mb-0 print:break-after-page',
          ]"
        >
          <!-- Main Content - Full Page -->
          <div class="relative h-full p-12 flex flex-col">
            <!-- Header -->
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-emerald-800 mb-2">
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
              </h1>
              <div class="w-16 h-1 bg-emerald-600 mx-auto mb-4"></div>
              <h2 class="text-2xl font-semibold text-emerald-700 mb-6">
                ATTENDANCE SHEET
              </h2>
            </div>

            <!-- Cover Page -->
            <div
              class="w-full h-[297mm] bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8 print:mb-0 print:break-after-page"
            >
              <!-- Cover Page Content -->
              <div
                class="relative h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 print:bg-white"
              >
                <!-- Decorative Border -->
                <div
                  class="absolute inset-8 border-4 border-emerald-600 rounded-lg opacity-20"
                ></div>
                <div
                  class="absolute inset-12 border-2 border-emerald-400 rounded-lg opacity-30"
                ></div>

                <!-- Main Content -->
                <div class="text-center z-10 px-8">
                  <!-- Islamic Pattern Decoration -->
                  <div class="mb-12">
                    <div
                      class="w-32 h-32 mx-auto mb-8 bg-emerald-600 rounded-full flex items-center justify-center"
                    >
                      <div class="text-white text-4xl font-bold">☪</div>
                    </div>
                  </div>

                  <!-- Main Title -->
                  <h1
                    class="text-5xl font-bold text-emerald-800 mb-8 leading-tight"
                  >
                    বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা
                  </h1>
                  <div class="text-3xl font-semibold text-emerald-700 mb-12">
                    ১৪৪৮ হিজরি
                  </div>

                  <!-- Decorative Line -->
                  <div class="flex items-center justify-center mb-12">
                    <div class="w-16 h-1 bg-emerald-600"></div>
                    <div class="w-4 h-4 bg-emerald-600 rounded-full mx-4"></div>
                    <div class="w-16 h-1 bg-emerald-600"></div>
                  </div>

                  <!-- Subtitle -->
                  <h2 class="text-4xl font-bold text-emerald-800 mb-8">
                    ATTENDANCE SHEETS
                  </h2>
                  <div class="text-2xl font-semibold text-emerald-600 mb-16">
                    FOR EXAMINERS
                  </div>

                  <!-- Date Range -->
                  <div
                    class="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-emerald-200 mb-16"
                  >
                    <div class="text-emerald-600 text-lg font-semibold mb-2">
                      COMPETITION PERIOD
                    </div>
                    <div class="text-2xl font-bold text-emerald-800">
                      3rd August - 7th August, 2025
                    </div>
                  </div>

                  <!-- Footer Info -->
                  <div class="text-emerald-600 text-lg">
                    <div class="font-semibold mb-2">
                      Total Examiners: {{ examiners.length }}
                    </div>
                    <div class="text-sm opacity-75">
                      Individual attendance tracking sheets
                    </div>
                  </div>
                </div>

                <!-- Bottom Decoration -->
                <div
                  class="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                >
                  <div class="flex space-x-2">
                    <div class="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <div class="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Examiner Info -->
            <div class="mb-8">
              <!-- <div class="text-lg font-semibold text-emerald-600 mb-2">
                EXAMINER NAME:
              </div> -->
              <div
                class="text-2xl font-bold text-emerald-900 uppercase border-b-2 border-emerald-200 pb-2"
              >
                {{ examiner.name }}
              </div>
            </div>

            <!-- Date Table -->
            <div class="flex-1">
              <table class="w-full border-collapse border-2 border-emerald-800">
                <!-- Table Header -->
                <thead>
                  <tr class="bg-emerald-100">
                    <th
                      class="border-2 border-emerald-800 p-4 text-emerald-800 font-bold text-lg w-[200px]"
                    >
                      DATE
                    </th>
                    <th
                      class="border-2 border-emerald-800 p-4 text-emerald-800 font-bold text-lg w-[350px]"
                    >
                      START TIME
                    </th>
                    <th
                      class="border-2 border-emerald-800 p-4 text-emerald-800 font-bold text-lg w-[350px]"
                    >
                      END TIME
                    </th>
                    <th
                      class="border-2 border-emerald-800 p-4 text-emerald-800 font-bold text-lg w-[150px]"
                    >
                      SIGNATURE
                    </th>
                  </tr>
                </thead>
                <!-- Table Body -->
                <tbody>
                  <tr
                    v-for="date in attendanceDates"
                    :key="date.display"
                    class="h-20"
                  >
                    <td
                      class="border-2 border-emerald-800 p-4 text-center font-semibold text-emerald-900 text-sm"
                    >
                      {{ date.display }}
                    </td>
                    <td class="border-2 border-emerald-800 p-4 text-center">
                      <!-- Empty for manual filling -->
                    </td>
                    <td class="border-2 border-emerald-800 p-4 text-center">
                      <!-- Empty for manual filling -->
                    </td>
                    <td class="border-2 border-emerald-800 p-4 text-center">
                      <!-- Empty for manual signature -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Footer Instructions -->
            <div class="mt-8 text-sm text-gray-600 text-center">
              <p class="font-semibold">Instructions:</p>
              <p>
                Please fill in your start time, end time, and signature for each
                day of attendance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "print",
  });

  const examiners = ref([
    {
      id: 2,
      name: "Ustadh Mufti Muaddab",
      room_number: "201",
    },
    {
      id: 3,
      name: "Imaam Md. Sadiqur Rahman",
      room_number: "202",
    },
    {
      id: 4,
      name: "Imaam Ahmed Abdul Basit",
      room_number: "203",
    },
    {
      id: 5,
      name: "Sheikh Majedul Islam Madani",
      room_number: "204",
    },
    {
      id: 6,
      name: "Imaam MD. Yousuf Ali",
      room_number: "205",
    },
  ]);

  // Generate dates from 3 Aug 2025 to 7 Aug 2025
  const attendanceDates = ref([
    { display: "3 August 2025 (Sunday)", date: "2025-08-03" },
    { display: "4 August 2025 (Monday)", date: "2025-08-04" },
    { display: "5 August 2025 (Tuesday)", date: "2025-08-05" },
    { display: "6 August 2025 (Wednesday)", date: "2025-08-06" },
    { display: "7 August 2025 (Thursday)", date: "2025-08-07" },
  ]);

  const printAllSheets = () => {
    window.print();
  };
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

    .attendance-sheets,
    .attendance-sheets * {
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

    /* Ensure table borders print correctly */
    table,
    th,
    td {
      border-collapse: collapse;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
