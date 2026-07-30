<template>
  <div>
    <div class="min-h-screen bg-gray-50 exam-sheet">
      <!-- Control Panel (Hidden in print) -->
      <div class="print:hidden bg-white shadow-sm border-b p-4 mb-6">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold text-emerald-800 mb-4">
            Student Competition Mark Sheet Generator
          </h1>
          <div class="text-gray-600 mb-4">
            Total Students: {{ students.length }} | Competition Period: 3-7
            August 2025
          </div>
          <button
            @click="printMarkSheets"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Print Competition Mark Sheets
          </button>
        </div>
      </div>

      <!-- Examiner Cover Pages and Student Mark Sheets -->
      <div v-for="examiner in examiners" :key="examiner.id">
        <!-- Examiner Cover Page -->
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
              class="absolute inset-12 border-1 border-emerald-400 rounded-lg opacity-30"
            ></div>

            <!-- Main Content -->
            <div class="text-center z-10 px-8">
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
                EXAMINER’S COPY
              </h2>

              <!-- Examiner Info -->
              <div
                class="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-emerald-200 mb-16"
              >
                <div class="text-emerald-600 text-lg font-semibold mb-2">
                  EXAMINER INFORMATION
                </div>
                <div class="text-2xl font-bold text-emerald-800 mb-2">
                  {{ examiner.name.toUpperCase() }}
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="text-center mt-16">
              <div class="w-24 h-1 bg-emerald-600 mx-auto mb-4"></div>
              <p class="text-gray-600 text-lg font-medium">
                Examination Report
              </p>
              <div class="text-lg text-emerald-700">9 August, 2025</div>
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
        </div>

        <!-- Mark Sheets (2 students per page) -->
        <div
          v-for="studentPair in chunkedStudents"
          :key="studentPair[0]?.reg_no"
          class="print:break-before-page"
        >
          <div class="max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
            <!-- Page Header (appears once per page) -->
            <div class="text-center mb-4">
              <h1 class="text-lg font-bold text-emerald-800 mb-1">
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
              </h1>
              <div class="w-12 h-0.5 bg-emerald-600 mx-auto mb-1"></div>
              <h2 class="text-base font-semibold text-emerald-700 mb-3">
                MARK SHEET
              </h2>

              <!-- Instructions (appears once per page) -->
              <div
                class="bg-emerald-50 border border-emerald-200 rounded-lg p-2 mb-4 print:bg-gray-100"
              >
                <div class="text-sm text-emerald-800">
                  <strong>Instructions:</strong>
                  For each section (Fluency, Makhraj + Shifaat, Tajweed), mark a
                  tally for each mistake. Deduct marks based on tallies. Each
                  tally will minus -0.5 marks. Bonus Melody (10 marks) is used
                  as a tiebreaker if the main score (50 marks) is equal. Total
                  main score: 50 marks.
                </div>
              </div>
            </div>

            <!-- Students Container -->
            <div class="flex-1 flex flex-col justify-between">
              <!-- First Student -->
              <div>
                <!-- Removed flex-1 here -->
                <div v-if="studentPair[0]" class="student-mark-sheet">
                  <!-- Student Info Only -->
                  <div class="mb-3">
                    <div
                      class="text-[16px] text-emerald-600 font-medium flex gap-2"
                    >
                      <div>
                        NAME: {{ studentPair[0].name_en.toUpperCase() }}
                      </div>
                      <span>|</span>
                      <div>REG. NO: {{ studentPair[0].reg_no }}</div>
                      <span>|</span>
                      <div>SURAH/AYATH:</div>
                    </div>
                  </div>

                  <!-- Mark Sheet Table -->
                  <div class="overflow-hidden">
                    <table
                      class="w-full border-collapse border-1 border-emerald-800"
                    >
                      <thead>
                        <tr class="bg-emerald-100">
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/4"
                          >
                            FOCUS
                          </th>
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/4"
                          >
                            TALLY
                          </th>
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/2"
                            colspan="2"
                          >
                            MARKS
                          </th>
                        </tr>
                        <tr class="bg-emerald-100">
                          <th class="border border-emerald-800 p-2"></th>
                          <th class="border border-emerald-800 p-2"></th>
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/4"
                          >
                            Full Marks
                          </th>
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/4"
                          >
                            Marks Obtained
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-medium text-emerald-900 text-sm"
                          >
                            Fluency
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            10
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-medium text-emerald-900 text-sm"
                          >
                            Makhraj + Shifaat
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            20
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-medium text-emerald-900 text-sm"
                          >
                            Tajweed
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            20
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-medium text-emerald-900 text-sm"
                          >
                            Bonus Melody (Tiebreaker)
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            10
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-bold text-emerald-900 text-sm"
                          >
                            Total Main Score
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            50 + (Bonus 10)
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Spacer between mark sheets -->
              <div
                v-if="studentPair.length > 1"
                class="flex-shrink-0 py-6 flex justify-center items-center"
              >
                <div class="w-full border-t-2 border-emerald-200 relative">
                  <div
                    class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4"
                  >
                    <div
                      class="text-sm text-emerald-600 font-medium text-center"
                    >
                      • • •
                    </div>
                  </div>
                </div>
              </div>

              <!-- Second Student -->
              <div>
                <!-- Removed flex-1 here -->
                <div v-if="studentPair[1]" class="student-mark-sheet">
                  <!-- Student Info Only -->
                  <div class="text-center mb-3">
                    <div
                      class="text-[16px] text-emerald-600 font-medium flex gap-2"
                    >
                      <div>
                        NAME: {{ studentPair[1].name_en.toUpperCase() }}
                      </div>
                      <span>|</span>
                      <div>REG. NO: {{ studentPair[1].reg_no }}</div>
                      <span>|</span>
                      <div>SURAH/AYATH:</div>
                    </div>
                  </div>

                  <!-- Mark Sheet Table -->
                  <div class="overflow-hidden">
                    <table
                      class="w-full border-collapse border-1 border-emerald-800"
                    >
                      <thead>
                        <tr class="bg-emerald-100">
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/4"
                          >
                            FOCUS
                          </th>
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/4"
                          >
                            TALLY
                          </th>
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/2"
                            colspan="2"
                          >
                            MARKS
                          </th>
                        </tr>
                        <tr class="bg-emerald-100">
                          <th class="border border-emerald-800 p-2"></th>
                          <th class="border border-emerald-800 p-2"></th>
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/4"
                          >
                            Full Marks
                          </th>
                          <th
                            class="border border-emerald-800 p-2 text-emerald-800 font-bold text-sm w-1/4"
                          >
                            Marks Obtained
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-medium text-emerald-900 text-sm"
                          >
                            Fluency
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            10
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-medium text-emerald-900 text-sm"
                          >
                            Makhraj + Shifaat
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            20
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-medium text-emerald-900 text-sm"
                          >
                            Tajweed
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            20
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-medium text-emerald-900 text-sm"
                          >
                            Bonus Melody (Tiebreaker)
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            10
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                        <tr class="h-10">
                          <td
                            class="border border-emerald-800 p-2 font-bold text-emerald-900 text-sm"
                          >
                            Total Main Score
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          >
                            50 + (Bonus 10)
                          </td>
                          <td
                            class="border border-emerald-800 p-2 text-center text-sm"
                          ></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div
                class="mt-4 text-[13px] text-gray-600 text-center flex-shrink-0"
              >
                <div class="mb-1">
                  <strong>Competition Date:</strong>
                  9th August, 2025
                </div>
                <div>
                  Examiners should mark tallies for mistakes and calculate marks
                  for each section. Use Bonus Melody for tiebreaking if needed.
                </div>
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
    layout: false,
  });

  const examiners = ref([
    { id: 1, name: "Ustadh Mufti Muaddab" },
    { id: 2, name: "Sheikh Majedul Islam Madani" },
    { id: 3, name: "Imaam Md. Sadiqur Rahman" },
    { id: 4, name: "Imaam Ahmed Abdul Basit" },
  ]);

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

  const chunkedStudents = computed(() => {
    const result = [];
    for (let i = 0; i < students.value.length; i += 2) {
      result.push(students.value.slice(i, i + 2));
    }
    return result;
  });

  const printMarkSheets = () => {
    window.print();
  };
</script>

<style>
  @media print {
    @page {
      size: A4;
    }

    body {
      margin: 0;
      padding: 0;
    }

    .mark-sheet,
    .exam-sheet,
    .exam-sheet *,
    .mark-sheet * {
      visibility: visible !important;
    }

    .id-card-page,
    .id-card-page * {
      visibility: visible !important;
    }
    .print\:break-after-page {
      page-break-after: always;
    }

    .print\:break-before-page {
      page-break-before: always;
    }

    /* Ensure colors print correctly */
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
