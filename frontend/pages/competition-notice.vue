<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50/40 px-4 py-7 flex flex-col items-center gap-7"
  >
    <!-- Screen-only control bar -->
    <div
      class="print:hidden w-full max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-md px-6 py-5 flex flex-col items-center gap-2"
    >
      <h1 class="text-2xl font-bold text-emerald-900 m-0">প্রতিযোগিতা নোটিশ</h1>
      <p
        class="font-[Hind_Siliguri,kalpurush] text-[15px] text-emerald-700 mt-0 mb-1.5"
      >
        বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা ১৪৪৮ হিজরী — জরুরি নোটিশ
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          class="border-none cursor-pointer font-semibold text-[15px] px-5 py-2.5 rounded-xl transition-all duration-200 text-white bg-emerald-700 hover:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="downloading"
          @click="printCard"
        >
          🖨️ Print (PDF)
        </button>
        <button
          class="border-none cursor-pointer font-semibold text-[15px] px-5 py-2.5 rounded-xl transition-all duration-200 text-white bg-gradient-to-br from-amber-400 to-amber-700 hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="downloading"
          @click="downloadCard"
        >
          <span v-if="downloading">Generating…</span>
          <span v-else>⬇️ Download PNG</span>
        </button>
      </div>
    </div>

    <!-- The notice (print + html2canvas target) -->
    <div class="flex justify-center w-full">
      <ClientOnly>
        <CompetitionNotice />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const downloading = ref(false);

  const printCard = () => {
    window.print();
  };

  // Mirrors the proven export in pages/invitation-card.vue
  const downloadCard = async () => {
    if (downloading.value) return;
    downloading.value = true;
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const card = document.getElementById("competition-notice");
      if (!card) return;
      const canvas = await html2canvas(card, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: card.scrollWidth,
        windowHeight: card.scrollHeight,
      });
      const link = document.createElement("a");
      link.download = "competition-notice.png";
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download error:", err);
      // Graceful fallback so the user can still save via the browser.
      window.print();
    } finally {
      downloading.value = false;
    }
  };
</script>

<style>
  /* Print + page-size rules must be global (not scoped) to affect @page and
     the root layout container during window.print(). */
  @media print {
    .min-h-screen {
      background: #fff !important;
      padding: 0 !important;
      gap: 0 !important;
    }
  }
  @page {
    size: auto;
    margin: 0;
  }
</style>
