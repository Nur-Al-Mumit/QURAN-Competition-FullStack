<template>
  <div>
    <div class="min-h-screen bg-gray-50 exam-sheet">
      <!-- Control Panel (Hidden in print) -->
      <div class="print:hidden bg-white shadow-sm border-b p-4 mb-6">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center justify-between mb-4">
            <NuxtLink to="/admin/dashboard" class="text-blue-600 hover:underline font-medium">
              ← Dashboard
            </NuxtLink>
          </div>
          <h1 class="text-2xl font-bold text-emerald-800 mb-4">
            Final Round Mark Sheet Generator
          </h1>
          <div class="text-gray-600 mb-4">
            Total Students: {{ students.length }}
          </div>
          <button
            @click="printMarkSheets"
            :disabled="loading || !students.length"
            class="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Print Mark Sheets
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20 text-gray-500">
        Loading mark sheet data…
      </div>

      <!-- Empty -->
      <div v-else-if="!students.length" class="text-center py-20 text-gray-500">
        No students found.
      </div>

      <!-- Cover Page -->
      <div v-if="!loading && students.length" class="w-full bg-white shadow-lg print:shadow-none relative overflow-hidden mb-8 print:mb-0 print:break-after-page">
        <div class="relative min-h-[297mm] flex flex-col items-center justify-center">
          <div class="absolute inset-8 border-4 border-emerald-600 rounded-lg opacity-20"></div>
          <div class="absolute inset-12 border-1 border-emerald-400 rounded-lg opacity-30"></div>
          <div class="text-center z-10 px-8">
            <h1 class="text-5xl font-bold text-emerald-800 mb-8 leading-tight">বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা</h1>
            <div class="text-3xl font-semibold text-emerald-700 mb-12">১৪৪৮ হিজরি</div>
            <div class="flex items-center justify-center mb-12">
              <div class="w-16 h-1 bg-emerald-600"></div>
              <div class="w-4 h-4 bg-emerald-600 rounded-full mx-4"></div>
              <div class="w-16 h-1 bg-emerald-600"></div>
            </div>
            <h2 class="text-4xl font-bold text-emerald-800 mb-16">FINAL ROUND MARK SHEET</h2>
          </div>
          <div class="text-center mt-16">
            <div class="w-24 h-1 bg-emerald-600 mx-auto mb-4"></div>
            <p class="text-gray-600 text-lg font-medium">Final Round Examination</p>
          </div>
          <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div class="flex space-x-2">
              <div class="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <div class="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <div class="w-3 h-3 bg-emerald-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mark Sheets -->
      <div v-if="!loading && students.length">
        <div
          v-for="studentPair in chunkedStudents"
          :key="studentPair[0]?.reg_no"
          class="print:break-before-page"
        >
          <div class="max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
            <!-- Page Header -->
            <div class="text-center mb-4">
              <h1 class="text-lg font-bold text-emerald-800 mb-1">
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
              </h1>
              <div class="w-12 h-0.5 bg-emerald-600 mx-auto mb-1"></div>
              <h2 class="text-base font-semibold text-emerald-700 mb-3">
                MARK SHEET
              </h2>
            </div>

            <!-- Students Container -->
            <div class="flex-1 flex flex-col justify-between">
              <!-- First Student -->
              <div>
                <div v-if="studentPair[0]" class="student-mark-sheet">
                  <div class="mb-3">
                    <div class="text-[16px] text-emerald-600 font-medium flex gap-2">
                      <div>NAME: {{ studentPair[0].name_en.toUpperCase() }}</div>
                      <span>|</span>
                      <div>REG. NO: {{ studentPair[0].reg_no }}</div>
                      <span>|</span>
                      <div>CRITERIA: {{ studentPair[0].criteria_label?.en }}</div>
                    </div>
                  </div>

                  <div class="mark-box"></div>
                </div>
              </div>

              <!-- Spacer -->
              <div v-if="studentPair.length > 1" class="flex-shrink-0 py-6 flex justify-center items-center">
                <div class="w-full border-t-2 border-emerald-200 relative">
                  <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                    <div class="text-sm text-emerald-600 font-medium text-center">• • •</div>
                  </div>
                </div>
              </div>

              <!-- Second Student -->
              <div>
                <div v-if="studentPair[1]" class="student-mark-sheet">
                  <div class="text-center mb-3">
                    <div class="text-[16px] text-emerald-600 font-medium flex gap-2">
                      <div>NAME: {{ studentPair[1].name_en.toUpperCase() }}</div>
                      <span>|</span>
                      <div>REG. NO: {{ studentPair[1].reg_no }}</div>
                      <span>|</span>
                      <div>CRITERIA: {{ studentPair[1].criteria_label?.en }}</div>
                    </div>
                  </div>

                  <div class="mark-box"></div>
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

  const students = ref([]);
  const loading = ref(true);

  const fetchData = async () => {
    loading.value = true;
    try {
      const endPoint = "/admin/final-round-id-card/data";
      const { data } = await useAdminAuthenticatedAxios(endPoint, null, null, "GET");
      const cards = data?.data?.cards || [];
      // Sort: criteria_id=1 (Mahir) first, then criteria_id=2 (Mubtadi)
      students.value = [...cards].sort((a, b) => (a.criteria_id || 0) - (b.criteria_id || 0));
    } catch (err) {
      window.showError?.("Error!", err?.response?.data?.message || "Failed to load data", 3000);
      students.value = [];
    } finally {
      loading.value = false;
    }
  };

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

  onMounted(async () => {
    await fetchData();
  });
</script>

<style>
    .mark-box {
    width: 100%;
    height: 320px;
    border: 1px solid black;
  }

  @media print {
    @page {
      size: A4;
    }
    body {
      margin: 0;
      padding: 0;
    }
    .exam-sheet, .exam-sheet * {
      visibility: visible;
    }
    .print\:break-after-page {
    page-break-after: always;
  }
  .print\:break-before-page {
      page-break-before: always;
    }
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
