<template>
  <div>
    <div class="min-h-screen bg-gray-50 lottery-page">
      <!-- Control Panel (Hidden in print) -->
      <div class="print:hidden bg-white shadow-sm border-b p-4 mb-6">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold text-emerald-800 mb-4">
            Quran Competition Lottery Chunks Generator
          </h1>
          <div class="text-gray-600 mb-4">
            Total Chunks: {{ lotteryChunks.length }}
          </div>
          <button
            @click="printChunks"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🖨️ Print Lottery Chunks
          </button>
        </div>
      </div>

      <!-- Lottery Chunks Grid -->
      <div class="max-w-7xl mx-auto p-4">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="chunk in lotteryChunks"
            :key="chunk.serialNumber"
            class="lottery-chunk bg-white border-2 border-dashed border-emerald-300 rounded p-1 min-w-[300px]"
          >
            <!-- Competition Title -->
            <div class="text-center mb-1">
              <div
                class="text-xs font-bold text-emerald-800 print:text-xs leading-tight"
              >
                বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা
              </div>
              <div class="text-xs text-emerald-600 print:text-xs">
                ১৪৪৮ হিজরি
              </div>
            </div>

            <!-- Serial Number -->
            <div class="text-center mb-2">
              <div
                class="bg-emerald-100 border border-emerald-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto print:w-6 print:h-6"
              >
                <span class="text-sm font-bold text-emerald-800 print:text-xs">
                  {{ chunk.serialNumber }}
                </span>
              </div>
            </div>

            <!-- Surah Name (Full) -->
            <div class="text-center mb-2">
              <div
                class="text-xs font-bold text-emerald-900 print:text-xs leading-tight"
              >
                {{ chunk.surah }}
              </div>
            </div>

            <!-- Verses -->
            <div
              class="text-center flex justify-center items-center gap-2 font-bold text-sm text-emerald-800"
            >
              <div class="">
                <template v-if="chunk.verses.end !== null">
                  {{ convertToBanglaNumbers(chunk.verses.start) }}-{{
                    convertToBanglaNumbers(chunk.verses.end)
                  }}
                </template>
                <template v-else>
                  {{ convertToBanglaNumbers(chunk.verses.start) }}
                </template>
              </div>
              <span>|</span>
              <div class="">
                <template v-if="chunk.verses.end !== null">
                  {{ chunk.verses.start }}-{{ chunk.verses.end }}
                </template>
                <template v-else>
                  {{ chunk.verses.start }}
                </template>
              </div>
              <span>|</span>
              <div class="">
                <template v-if="chunk.verses.end !== null">
                  {{ convertToArabicNumbers(chunk.verses.start) }}-{{
                    convertToArabicNumbers(chunk.verses.end)
                  }}
                </template>
                <template v-else>
                  {{ convertToArabicNumbers(chunk.verses.start) }}
                </template>
              </div>
            </div>

            <!-- Note for all chunks -->
            <div class="text-center mt-2">
              <div class="text-xs text-red-600 font-medium print:text-xs">
                <template v-if="chunk.verses.end !== null">
                  আপনাকে
                  {{ convertToBanglaNumbers(chunk.verses.start) }}-{{
                    convertToBanglaNumbers(chunk.verses.end)
                  }}
                  নম্বর আয়াতসমূহ তিলাওয়াত করতে হবে
                </template>
                <template v-else>
                  আপনাকে শুধুমাত্র এই
                  {{ convertToBanglaNumbers(chunk.verses.start) }} নম্বর আয়াতটি
                  তিলাওয়াত করতে হবে
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: false,
  });

  const questions = ref([
    {
      id: 1,
      surah: "আল-মুলক | Al-Mulk | سورة الملك",
      verses: [
        { id: 1, start: 1, end: 7 },
        { id: 2, start: 8, end: 16 },
        { id: 3, start: 17, end: 24 },
        { id: 4, start: 25, end: 30 },
      ],
    },
    {
      id: 2,
      surah: "আল-মুযযাম্মিল | Al-Muzzammil | سورة المزمل",
      verses: [
        { id: 1, start: 1, end: 11 },
        { id: 2, start: 12, end: 19 },
        { id: 3, start: 20, end: null },
      ],
    },
  ]);

  const lotteryChunks = ref([]);

  // Generate lottery chunks
  const generateLotteryChunks = () => {
    const chunks = [];
    let serialNumber = 1;

    // Create a circular pattern for questions
    const allVerses = [];
    questions.value.forEach((question) => {
      question.verses.forEach((verse) => {
        allVerses.push({
          surah: question.surah,
          verses: verse,
        });
      });
    });

    // Generate 29 chunks (number of students)
    for (let i = 0; i < 29; i++) {
      const questionIndex = i % allVerses.length;
      const selectedQuestion = allVerses[questionIndex];

      chunks.push({
        serialNumber: serialNumber++,
        surah: selectedQuestion.surah,
        verses: selectedQuestion.verses,
      });
    }

    return chunks;
  };

  // Initialize chunks
  lotteryChunks.value = generateLotteryChunks();

  // Convert numbers to different number systems
  const convertToArabicNumbers = (number) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return number
      .toString()
      .split("")
      .map((digit) => arabicNumbers[parseInt(digit)])
      .join("");
  };

  const convertToBanglaNumbers = (number) => {
    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
      .toString()
      .split("")
      .map((digit) => banglaNumbers[parseInt(digit)])
      .join("");
  };

  const printChunks = () => {
    window.print();
  };
</script>

<style>
  @media print {
    @page {
      size: A4 landscape;
      /* margin: 10mm; */
    }

    body {
      margin: 0;
      padding: 0;
    }

    .lottery-page,
    .lottery-page *,
    .lottery-chunk,
    .lottery-chunk * {
      visibility: visible;
    }

    .lottery-chunk {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    /* Ensure colors print correctly */
    * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }

  .lottery-chunk {
    min-height: 100px;
  }

  @media print {
    .lottery-chunk {
      min-height: 80px;
    }
  }
</style>
