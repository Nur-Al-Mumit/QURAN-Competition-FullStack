<template>
  <div>
    <div class="min-h-screen bg-gray-50">
      <!-- Control Panel (Hidden in print) -->
      <div class="print:hidden bg-white shadow-sm border-b p-4 mb-6">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-2xl font-bold text-emerald-800 mb-4">
            Door Label Generator
          </h1>

          <div class="text-gray-600 mb-4">
            Total Labels: {{ examiners.length }}
          </div>

          <button
            @click="printAllLabels"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Print All Labels
          </button>
        </div>
      </div>

      <!-- All Door Labels (Printable) - Each on separate page -->
      <div class="max-w-4xl mx-auto door-labels">
        <div
          v-for="(examiner, index) in examiners"
          :key="examiner.id"
          :class="[
            'w-full h-[297mm] bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8',
            'print:mb-0 print:break-after-page',
          ]"
        >
          <!-- Main Content - Full Page -->
          <div
            class="relative h-full flex flex-col items-center justify-center"
          >
            <div class="text-center mb-32">
              <h1 class="text-[44px] font-bold text-emerald-800 mb-4">
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি
              </h1>
              <div class="w-24 h-1 bg-emerald-600 mx-auto mb-32"></div>
              <div
                class="text-emerald-600 text-2xl font-semibold uppercase tracking-widest mb-2"
              >
                Room Number
              </div>
              <div
                class="text-[350px] font-black text-emerald-800 leading-none"
              >
                {{ examiner.room_number }}
              </div>
            </div>
            <!-- Examiner Name (Large) -->
            <div class="text-center">
              <div
                class="text-emerald-600 text-2xl font-semibold uppercase tracking-widest mb-8"
              >
                Examiner
              </div>
              <div
                class="text-4xl font-bold text-emerald-900 leading-tight text-center uppercase"
              >
                {{ examiner.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

  const printAllLabels = () => {
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

    .door-labels,
    .door-labels * {
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
  }
</style>
