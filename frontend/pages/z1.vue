<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Control Panel (Hidden in print) -->
    <div class="print:hidden bg-white shadow-sm border-b p-4 mb-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-emerald-800 mb-4">
          Lottery Chunk Generator
        </h1>
        <div class="text-gray-600 mb-4">
          Total Students: {{ students.length }}
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
    <div class="grid grid-cols-3 gap-4 print:gap-2 print:grid-cols-3">
      <div
        v-for="(student, index) in students"
        :key="index"
        class="chunk border-2 border-dashed border-emerald-600 p-4 bg-white shadow-md rounded-lg text-center print:shadow-none print:break-inside-avoid"
      >
        <div class="text-lg font-bold text-emerald-800 mb-2">
          Name: {{ student.name_en.toUpperCase() }}
        </div>
        <div class="text-md font-semibold text-emerald-700 mb-2">
          Serial Number: {{ index + 1 }}
        </div>
        <div class="text-md font-semibold text-emerald-700 mb-2">
          Surah: {{ assignedQuestions[index].surah }}
        </div>
        <div class="text-md font-semibold text-emerald-700">
          Ayat: {{ assignedQuestions[index].start }} -
          {{ assignedQuestions[index].end }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  const questions = ref([
    {
      id: 1,
      surah: "আল-মুলক | Al-Mulk | سورة الملك",
      verses: [
        { id: 1, start: 1, end: 5 },
        { id: 2, start: 6, end: 10 },
        { id: 3, start: 11, end: 15 },
        { id: 4, start: 16, end: 20 },
      ],
    },
    {
      id: 1,
      surah: "আল-মুযযাম্মিল | Al-Muzzammil | سورة المزمل",
      verses: [
        { id: 1, start: 1, end: 6 },
        { id: 2, start: 7, end: 11 },
        { id: 3, start: 12, end: 16 },
        { id: 4, start: 17, end: 20 },
      ],
    },
  ]);

  // Generate 29 dummy students since full list not provided
  const students = ref(
    Array.from({ length: 29 }, (_, i) => ({
      name_en:
        i < 4
          ? [
              "hossain mohamed Zakaria",
              "KHANDAKER TANVIR ISLAM",
              "NISHAT ANJUM",
              "Md. Ayahnoor Ahmed Riyad",
            ][i]
          : `Student ${i + 1}`,
      reg_no: `QURAN-2025-${String(i + 1).padStart(3, "0")}`,
    }))
  );

  // Flatten all verse chunks
  const allVerses = computed(() => {
    let verses = [];
    questions.value.forEach((q) => {
      q.verses.forEach((v) => {
        verses.push({
          surah: q.surah,
          start: v.start,
          end: v.end,
        });
      });
    });
    return verses;
  });

  // Assign questions cycling through the chunks
  const assignedQuestions = computed(() => {
    return students.value.map(
      (_, index) => allVerses.value[index % allVerses.value.length]
    );
  });

  const printChunks = () => {
    window.print();
  };
</script>

<style scoped>
  @media print {
    @page {
      margin: 1cm;
    }

    .chunk {
      height: 8cm; /* Adjust size for chunks to fit multiple per page */
      page-break-inside: avoid;
    }

    .grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5cm;
    }
  }
</style>
