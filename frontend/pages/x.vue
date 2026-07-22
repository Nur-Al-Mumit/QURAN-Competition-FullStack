```vue
<template>
  <div>
    <div class="min-h-screen bg-gray-50">
      <!-- Control Panel (Hidden in print) -->
      <div class="print:hidden bg-white shadow-sm border-b p-4 mb-6">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold text-emerald-800 mb-4">
            Student Attendance Sheet Generator
          </h1>
          <div class="text-gray-600 mb-4">
            Total Students: {{ students.length }} | Competition Period: 3-7
            August 2025
          </div>
          <button
            @click="printAttendanceSheet"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Print Student Attendance Sheet
          </button>
        </div>
      </div>

      <!-- Cover Page -->
      <div
        class="print-only cover-page max-w-7xl mx-auto h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 print:bg-white print:shadow-none print:mb-8"
      >
        <!-- Decorative Border -->
        <div
          class="absolute inset-8 border-4 border-emerald-600 rounded-lg opacity-20"
        ></div>
        <div
          class="absolute inset-12 border-1 border-emerald-400 rounded-lg opacity-30"
        ></div>

        <!-- Main Content -->
        <div class="text-center z-10 px-8">
          <!-- Main Title -->
          <h1 class="text-5xl font-bold text-emerald-800 mb-8 leading-tight">
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
            ATTENDANCE SHEET
          </h2>

          <!-- Date Range -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-emerald-200 mb-16"
          >
            <div class="text-emerald-600 text-lg font-semibold mb-2">
              TRAINING PERIOD
            </div>
            <div class="text-2xl font-bold text-emerald-800">
              3rd August - 7th August, 2025
            </div>
          </div>

          <!-- Footer Info -->
          <div class="text-emerald-600 text-lg">
            <div class="font-semibold mb-2">
              Total Students: {{ students.length }}
            </div>
          </div>
        </div>

        <!-- Bottom Decoration -->
        <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div class="flex space-x-2">
            <div class="w-3 h-3 bg-emerald-600 rounded-full"></div>
            <div class="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <div class="w-3 h-3 bg-emerald-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Attendance Sheets -->
      <div
        v-for="(chunk, chunkIndex) in studentChunks"
        :key="chunkIndex"
        class="max-w-7xl mx-auto attendance-sheet page-break"
      >
        <div
          class="w-full bg-white shadow-lg print:shadow-none print:w-full relative overflow-hidden mb-8 print:mb-0"
        >
          <!-- Main Content -->
          <div class="relative p-8 print:p-6">
            <!-- Header (Repeated on each page) -->
            <div class="text-center mb-6 print-header">
              <h1 class="text-3xl font-bold text-emerald-800 mb-2">
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
              </h1>
              <div class="w-16 h-1 bg-emerald-600 mx-auto mb-4"></div>
              <h2 class="text-2xl font-semibold text-emerald-700 mb-2">
                STUDENT ATTENDANCE SHEET
              </h2>
              <div class="text-lg text-emerald-600 font-medium">
                Training Period: 3rd August - 7th August, 2025
              </div>
            </div>

            <!-- Instructions (Repeated on each page) -->
            <div
              class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 print:bg-gray-100 print-instructions"
            >
              <div class="text-[12px] text-emerald-800 font-semibold">
                <strong>Instructions:</strong>
                Mark
                <strong>"P"</strong>
                for Present,
                <strong>"L"</strong>
                for Late,
                <strong>"A"</strong>
                for Absent in the top section, then provide signature below the
                line for each day.
              </div>
            </div>

            <!-- Attendance Table -->
            <div class="overflow-x-auto">
              <table
                class="w-full border-collapse border-1 border-emerald-800 text-sm"
              >
                <!-- Table Header -->
                <thead>
                  <tr class="bg-emerald-100">
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-xs w-8"
                    >
                      #
                    </th>
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-xs min-w-40"
                    >
                      STUDENT NAME
                    </th>
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-xs w-20"
                    >
                      PHONE
                    </th>
                    <!-- Combined Attendance and Signature columns -->
                    <th
                      v-for="date in attendanceDates"
                      :key="date.date"
                      class="border-1 border-emerald-800 text-emerald-800 font-bold text-xs w-24"
                    >
                      <div class="p-1">
                        <div class="text-xs">{{ date.shortDate }} 25</div>
                        <div class="text-xs opacity-75">{{ date.day }}</div>
                        <div
                          class="text-xs border-t border-emerald-600 mt-1 pt-1"
                        >
                          P/L/A & Sign
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <!-- Table Body -->
                <tbody>
                  <tr
                    v-for="(student, index) in chunk"
                    :key="index"
                    class="h-16"
                  >
                    <!-- Serial Number -->
                    <td
                      class="border-1 border-emerald-800 p-1 text-center font-semibold text-emerald-900 text-xs"
                    >
                      {{ chunkIndex * studentsPerPage + index + 1 }}
                    </td>
                    <!-- Student Name -->
                    <td
                      class="border-1 border-emerald-800 p-1 font-medium text-emerald-900 text-xs uppercase"
                    >
                      {{ student.name_en }}
                    </td>
                    <!-- Phone -->
                    <td
                      class="border-1 border-emerald-800 p-1 text-center text-xs text-emerald-700"
                    >
                      {{ student.phone }}
                    </td>
                    <!-- Combined Attendance and Signature columns -->
                    <td
                      v-for="date in attendanceDates"
                      :key="'att-sig-' + date.date + '-' + index"
                      class="border-1 border-emerald-800 p-1 text-center align-top"
                    >
                      <div class="flex flex-col h-full">
                        <!-- Attendance Mark (P/L/A) -->
                        <div class="h-6"></div>
                        <!-- Dividing Line -->
                        <hr class="border-t border-emerald-600 my-1" />
                        <!-- Signature Space -->
                        <div class="h-6"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Footer -->
            <div class="mt-6 text-xs text-gray-600 text-center">
              <div class="mb-2">
                <strong>Total Students:</strong>
                {{ students.length }} |
                <strong>Training Days:</strong>
                {{ attendanceDates.length }}
              </div>
              <div>
                Please ensure all students mark their attendance (P/L/A) above
                the line and provide signature below the line for each day.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  definePageMeta({
    layout: "print",
  });

  const students = ref([
    { name_en: "hossain mohamed Zakaria", phone: "01701970188" },
    { name_en: "KHANDAKER TANVIR ISLAM", phone: "01629273890" },
    { name_en: "NISHAT ANJUM", phone: "01740384071" },
    { name_en: "Md. Ayahnoor Ahmed Riyad", phone: "01314903719" },
    { name_en: "MD Abdullah Al Rafiz", phone: "01601235810" },
    { name_en: "MD. AMBIA HUSSAIN", phone: "01745584514" },
    { name_en: "Ahmad Razee", phone: "01675412589" },
    { name_en: "Tarek Anam Sami", phone: "01707980607" },
    { name_en: "Zakariya bin Zahid", phone: "01708429182" },
    { name_en: "Tofayel Ahmed", phone: "01734060018" },
    { name_en: "Md Imadul Khalique Chowdhury", phone: "01745709844" },
    { name_en: "Md. Toyobur Rahman", phone: "01644244364" },
    { name_en: "Md. Tajul Islam", phone: "01913378088" },
    { name_en: "Saifur Rahman", phone: "01758976790" },
    { name_en: "Tahmid Hasan Musa", phone: "01614044130" },
    { name_en: "Saidul Islam Maruf", phone: "01331526868" },
    { name_en: "Ruhul Amin Reza", phone: "01902059418" },
    { name_en: "md abdur rahman Nayeem", phone: "01831703778" },
    { name_en: "Ayad Alabi Shanto", phone: "01819900941" },
    { name_en: "Mahdi Al Mahfuz", phone: "01300913794" },
    { name_en: "Monjur alom naeem", phone: "01322534096" },
    { name_en: "Mudassir Ahmed", phone: "01728334458" },
    { name_en: "Hasnath Abdus Salique", phone: "01327044009" },
    { name_en: "Ahmad Mainul Hasan", phone: "01758092545" },
    { name_en: "Md Sadat Hussein Khan", phone: "01717023978" },
    { name_en: "MOJNU MIAH", phone: "01746674126" },
    { name_en: "Md Tofayel Ahmed", phone: "01857439417" },
    { name_en: "Mohammad Ashraful Huda", phone: "01711484905" },
    { name_en: "Md Abdul baki Chowdhury", phone: "01317564800" },
  ]);

  // Generate dates from 3 Aug 2025 to 7 Aug 2025
  const attendanceDates = ref([
    { shortDate: "22 July", day: "Sun", date: "2025-07-22" },
    { shortDate: "23 July", day: "Mon", date: "2025-07-23" },
    { shortDate: "25 July", day: "Tue", date: "2025-07-25" },
    { shortDate: "26 July", day: "Wed", date: "2025-07-26" },
    { shortDate: "27 July", day: "Thu", date: "2025-07-27" },
  ]);

  // Split students into chunks of 10 for pagination
  const studentsPerPage = 10;
  const studentChunks = computed(() => {
    const chunks = [];
    for (let i = 0; i < students.value.length; i += studentsPerPage) {
      chunks.push(students.value.slice(i, i + studentsPerPage));
    }
    return chunks;
  });

  const printAttendanceSheet = () => {
    window.print();
  };
</script>

<style scoped>
  @media print {
    body {
      margin: 0;
      padding: 0;
    }

    .attendance-sheet,
    .cover-page,
    .cover-page *,
    .attendance-sheet * {
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

    .print\\:mb-0 {
      margin-bottom: 0 !important;
    }

    .print\\:p-6 {
      padding: 1.5rem !important;
    }

    .print\\:bg-gray-100 {
      background-color: #f3f4f6 !important;
    }

    /* Ensure table borders print correctly */
    table,
    th,
    td {
      border-collapse: collapse;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Ensure text is readable when printed */
    .text-emerald-800,
    .text-emerald-900 {
      color: #065f46 !important;
    }

    .text-emerald-700 {
      color: #047857 !important;
    }

    .text-emerald-600 {
      color: #059669 !important;
    }

    /* Adjust cell height for print */
    tr {
      height: 4rem !important;
    }

    /* Force page break before each attendance sheet */
    .page-break {
      page-break-before: always;
    }

    /* Ensure cover page is on its own page */
    .cover-page {
      page-break-after: always;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    /* Ensure table header repeats on each page */
    thead {
      display: table-header-group;
    }

    /* Ensure header and instructions are visible on each page */
    .print-header,
    .print-instructions {
      display: block !important;
    }
  }

  /* Screen styles */
  .cover-page {
    display: none;
  }

  .print-only {
    display: none;
  }

  @media print {
    .print-only {
      display: flex !important;
    }

    /* Remove backdrop blur for print (not supported) */
    .backdrop-blur-sm {
      backdrop-filter: none !important;
    }

    /* Ensure white background for print */
    .bg-white\/80 {
      background-color: #ffffff !important;
    }
  }
</style>
```
