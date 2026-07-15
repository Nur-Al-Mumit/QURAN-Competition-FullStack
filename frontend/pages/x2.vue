<template>
  <div>
    <div class="min-h-screen bg-gray-50">
      <!-- Control Panel (Hidden in print) -->
      <div class="print:hidden bg-white shadow-sm border-b p-4 mb-6">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold text-emerald-800 mb-4">
            Competition Attendance Sheet Generator
          </h1>
          <div class="text-gray-600 mb-4">
            Total Students: {{ students.length }} | Competition Date: 9 August
            2025
          </div>
          <button
            @click="printAttendanceSheet"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Print Competition Attendance Sheet
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
            COMPETITION ATTENDANCE SHEET
          </h2>

          <!-- Date Range -->
          <div
            class="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-emerald-200 mb-16"
          >
            <div class="text-emerald-600 text-lg font-semibold mb-2">
              COMPETITION DAY
            </div>
            <div class="text-2xl font-bold text-emerald-800">
              9 August, 2025
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
      <!-- Attendance Sheet (Single Table for All Students) -->
      <div class="max-w-7xl mx-auto attendance-sheet page-break">
        <div
          class="w-full bg-white shadow-lg print:shadow-none print:w-full relative overflow-hidden mb-8 print:mb-0"
        >
          <!-- Main Content -->
          <div class="relative p-8 print:p-6">
            <!-- Header -->
            <div class="text-center mb-6 print-header">
              <h1 class="text-3xl font-bold text-emerald-800 mb-2">
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
              </h1>
              <div class="w-16 h-1 bg-emerald-600 mx-auto mb-4"></div>
              <h2 class="text-2xl font-semibold text-emerald-700 mb-2">
                COMPETITION ATTENDANCE SHEET
              </h2>
              <div class="text-lg text-emerald-600 font-medium">
                Competition Date: 9 August, 2025
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table
                class="w-full border-collapse border-1 border-emerald-800 text-[16px]"
              >
                <thead>
                  <tr class="bg-emerald-100">
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] w-8"
                    >
                      #
                    </th>
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] min-w-36"
                    >
                      STUDENT NAME
                    </th>
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] min-w-28"
                    >
                      REG NO
                    </th>
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] w-48"
                    >
                      PHONE
                    </th>
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] w-48"
                    >
                      TIME
                    </th>
                    <th
                      class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] w-40"
                    >
                      SIGNATURE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(student, index) in students"
                    :key="index"
                    class="h-16"
                  >
                    <td
                      class="border-1 border-emerald-800 p-1 text-center font-semibold text-emerald-900 text-[16px]"
                    >
                      {{ index + 1 }}
                    </td>
                    <td
                      class="border-1 border-emerald-800 p-1 font-medium text-emerald-900 text-[16px] uppercase whitespace-nowrap"
                    >
                      {{ student.name_en }}
                    </td>
                    <td
                      class="border-1 border-emerald-800 p-1 text-center text-[16px] text-emerald-700"
                    >
                      {{ student.reg_no }}
                    </td>
                    <td
                      class="border-1 border-emerald-800 p-1 text-center text-[16px] text-emerald-700"
                    >
                      {{ student.phone }}
                    </td>
                    <td
                      class="border-1 border-emerald-800 p-1 text-center align-top"
                    ></td>
                    <td
                      class="border-1 border-emerald-800 p-1 text-center align-top"
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-6 text-[16px] text-gray-600 text-center">
            <div class="mb-2">
              <strong>Total Students:</strong>
              {{ students.length }} |
              <strong>Competition Date:</strong>
              9 August, 2025
            </div>
            <div>
              Please ensure all students provide their signature to confirm
              attendance.
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

  const students = ref([
    {
      reg_no: "RC129411",
      name_en: "hossain mohamed Zakaria",
      phone: "01701970188",
    },
    {
      reg_no: "RC140238",
      name_en: "KHANDAKER TANVIR ISLAM",
      phone: "01629273890",
    },
    { reg_no: "RC143160", name_en: "NISHAT ANJUM", phone: "01740384071" },
    {
      reg_no: "RC145134",
      name_en: "Md. Ayahnoor Ahmed Riyad",
      phone: "01314903719",
    },
    {
      reg_no: "RC146370",
      name_en: "MD Abdullah Al Rafiz",
      phone: "01601235810",
    },
    { reg_no: "RC159885", name_en: "MD. AMBIA HUSSAIN", phone: "01745584514" },
    { reg_no: "RC172646", name_en: "Ahmad Razee", phone: "01675412589" },
    { reg_no: "RC173375", name_en: "Tarek Anam Sami", phone: "01707980607" },
    { reg_no: "RC184229", name_en: "Zakariya bin Zahid", phone: "01708429182" },
    { reg_no: "RC185620", name_en: "Tofayel Ahmed", phone: "01734060018" },
    {
      reg_no: "RC186930",
      name_en: "Md Imadul Khalique Chowdhury",
      phone: "01745709844",
    },
    { reg_no: "RC189395", name_en: "Md. Toyobur Rahman", phone: "01644244364" },
    { reg_no: "RC193231", name_en: "Md. Tajul Islam", phone: "01913378088" },
    { reg_no: "RC198474", name_en: "Saifur Rahman", phone: "01758976790" },
    { reg_no: "RC1100224", name_en: "Tahmid Hasan Musa", phone: "01614044130" },
    {
      reg_no: "RC1102569",
      name_en: "Saidul Islam Maruf",
      phone: "01331526868",
    },
    { reg_no: "RC1104504", name_en: "Ruhul Amin Reza", phone: "01902059418" },
    {
      reg_no: "RC1107176",
      name_en: "md abdur rahman Nayeem",
      phone: "01831703778",
    },
    { reg_no: "RC1126205", name_en: "Ayad Alabi Shanto", phone: "01819900941" },
    { reg_no: "RC1127990", name_en: "Mahdi Al Mahfuz", phone: "01300913794" },
    { reg_no: "RC1133555", name_en: "Monjur alom naeem", phone: "01322534096" },
    { reg_no: "RC1138783", name_en: "Mudassir Ahmed", phone: "01728334458" },
    {
      reg_no: "RC1151533",
      name_en: "Hasnath Abdus Salique",
      phone: "01327044009",
    },
    {
      reg_no: "RC1153960",
      name_en: "Ahmad Mainul Hasan",
      phone: "01758092545",
    },
    {
      reg_no: "RC1154271",
      name_en: "Md Sadat Hussein Khan",
      phone: "01717023978",
    },
    { reg_no: "RC1157319", name_en: "MOJNU MIAH", phone: "01746674126" },
    { reg_no: "RC1163954", name_en: "Md Tofayel Ahmed", phone: "01857439417" },
    {
      reg_no: "RC1175661",
      name_en: "Mohammad Ashraful Huda",
      phone: "01711484905",
    },
    {
      reg_no: "RC1182992",
      name_en: "Md Abdul baki Chowdhury",
      phone: "01317564800",
    },
  ]);

  const printAttendanceSheet = () => {
    window.print();
  };
</script>

<style scoped>
  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }
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
