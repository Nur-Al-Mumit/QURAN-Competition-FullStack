<template>
  <div class="page-wrap">
    <!-- Screen-only control bar -->
    <div class="controls print:hidden">
      <h1 class="controls-title">Invitation Card</h1>
      <p class="controls-sub">
        বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা — বিশেষ আমন্ত্রণপত্র
      </p>
      <div class="controls-actions">
        <button class="btn btn-primary" :disabled="downloading" @click="printCard">
          🖨️ Print (PDF)
        </button>
        <button
          class="btn btn-secondary"
          :disabled="downloading"
          @click="downloadCard"
        >
          <span v-if="downloading">Generating…</span>
          <span v-else>⬇️ Download PNG</span>
        </button>
      </div>
    </div>

    <!-- The card (print + html2canvas target) -->
    <div class="card-stage">
      <ClientOnly>
        <InvitationCard :date="eventDate" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  // Edit this to set the event date shown on the card.
  const eventDate = ref("[Insert Date Here]");

  const downloading = ref(false);

  const printCard = () => {
    window.print();
  };

  // Mirrors the proven export in pages/(student)/registration/token.vue
  const downloadCard = async () => {
    if (downloading.value) return;
    downloading.value = true;
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const card = document.getElementById("invitation-card");
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
      link.download = "invitation-card.png";
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

<style scoped>
  .page-wrap {
    min-height: 100vh;
    background: linear-gradient(180deg, #eef2f0, #e2ebe5);
    padding: 28px 16px 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }

  .controls {
    width: 100%;
    max-width: 800px;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 4px 18px rgba(27, 67, 50, 0.08);
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    border: 1px solid #e2e8e4;
  }
  .controls-title {
    font-size: 22px;
    font-weight: 700;
    color: #1b4332;
    margin: 0;
  }
  .controls-sub {
    font-family: "Hind Siliguri", "kalpurush", sans-serif;
    font-size: 15px;
    color: #2d6a4f;
    margin: 0 0 6px;
  }
  .controls-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
  .btn {
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    padding: 10px 20px;
    border-radius: 10px;
    transition: all 0.2s ease;
  }
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .btn-primary {
    background: #2d6a4f;
    color: #fff;
  }
  .btn-primary:hover:not(:disabled) {
    background: #1b4332;
  }
  .btn-secondary {
    background: linear-gradient(135deg, #d4af37, #aa771c);
    color: #fff;
  }
  .btn-secondary:hover:not(:disabled) {
    filter: brightness(1.05);
  }

  .card-stage {
    /* Card is fixed 800px wide on desktop; scales down on smaller screens */
    display: flex;
    justify-content: center;
    width: 100%;
  }

  /* ===== Print: only the card, full page ===== */
  @media print {
    .page-wrap {
      background: #fff;
      padding: 0;
      gap: 0;
    }
    .card-stage {
      width: 100%;
    }
  }

  @page {
    size: auto;
    margin: 0;
  }
</style>
