<template>
  <div class="id-card-page">
    <!-- ===================== SCREEN CONTROL BAR (hidden when printing) ===================== -->
    <div class="control-bar print:hidden">
      <div class="control-inner">
        <div class="control-left">
          <NuxtLink to="/admin/dashboard" class="back-link">← Dashboard</NuxtLink>
          <label class="season-label">Season</label>
          <select
            v-model="filters.season_id"
            @change="fetchData"
            class="season-select"
            :disabled="loading"
          >
            <option value="">All Seasons</option>
            <option
              v-for="season in seasons"
              :key="season.id"
              :value="season.id"
            >
              {{ season.name }} ({{ season.year }})
              <template v-if="season.is_active">— Active</template>
            </option>
          </select>
        </div>

        <div class="control-right">
          <span class="count-badge" v-if="!loading">
            {{ cards.length }} card{{ cards.length === 1 ? "" : "s" }}
          </span>
          <button
            @click="printAll"
            :disabled="loading || !cards.length"
            class="btn btn-print"
          >
            🖨️ Print All
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== LOADING / EMPTY ===================== -->
    <div v-if="loading" class="state-msg">Loading training-pass cards…</div>

    <div v-else-if="!cards.length" class="state-msg">
      No Mubtadi training-pass students found for this season.
    </div>

    <!-- ===================== CARDS GRID ===================== -->
    <!-- Cards tile in a grid (2 per row) both on screen and in print. In print
         the grid fills the A4 page and the browser paginates naturally;
         break-inside:avoid keeps each card intact across page breaks. -->
    <div class="cards-grid">
      <div
        v-for="(student, index) in cards"
        :key="student.reg_no || index"
        class="card-page"
      >
      <div class="id-card" :id="`id-card-${index}`">
        <!-- Top accent -->
        <div class="accent-top"></div>

        <!-- HEADER (competition name, centered) -->
        <div class="hdr">
          <p class="hdr-comp">বিশুদ্ধ কুরআন প্রতিযোগিতা</p>
          <p class="hdr-year">১৪৪৮ হিজরি</p>
        </div>

        <!-- PASS LABEL -->
        <div class="pass-strip">
          <span class="pass-label-bn">প্রশিক্ষণ পাস কার্ড</span>
          <span class="pass-mubtadi">Mubtadi · المبتدئ</span>
        </div>

        <!-- NAME -->
        <div class="name-block">
          <p class="name-bn">{{ student.name_bn || "—" }}</p>
          <p class="name-en">{{ student.name_en || "" }}</p>
        </div>

        <!-- QR (middle) -->
        <div class="qr-wrap">
          <canvas
            :ref="(el) => setQrCanvas(el, index)"
            class="qr-canvas"
          ></canvas>
          <p class="qr-caption">Scan to verify</p>
        </div>

        <!-- FOOTER ROW (reg no / group / serial) -->
        <div class="card-footer">
          <div class="footer-item">
            <span class="footer-lbl">Reg No</span>
            <span class="footer-val">{{ student.reg_no || "—" }}</span>
          </div>
          <div class="footer-item">
            <span class="footer-lbl">Group</span>
            <span class="footer-val">{{ student.group || "—" }}</span>
          </div>
          <div class="footer-item">
            <span class="footer-lbl">Serial</span>
            <span class="footer-val">{{ student.serial || "—" }}</span>
          </div>
        </div>

        <!-- ORG FOOTER (logo + org name side by side, centered) -->
        <div class="org-footer">
          <img src="~/assets/imgs/logo.png" alt="Logo" class="org-logo" />
          <span class="org-name">এসো কুরআন শিখি</span>
        </div>

        <!-- Bottom accent -->
        <div class="accent-bot"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import QRCode from "qrcode";
  useHead({
    style: [
      {
        innerHTML: "@media print{ @page{ size: A4 portrait; margin: 0; } }",
      },
    ],
  });

  definePageMeta({
    layout: "split",
  });

  const seasons = ref([]);
  const filters = ref({ season_id: "" });
  const cards = ref([]);
  const loading = ref(true);

  // Canvas refs collected by index (one QR per card). Using a callback ref
  // because v-for + ref string is unreliable in Vue 3.
  const qrCanvases = {};
  const setQrCanvas = (el, index) => {
    if (el) {
      qrCanvases[index] = el;
    } else {
      delete qrCanvases[index];
    }
  };

  // Generate a QR for a single card once its canvas is mounted.
  const generateQR = async (canvas, content) => {
    if (!canvas || !content) return;
    try {
      await QRCode.toCanvas(canvas, content, {
        width: 150,
        margin: 1,
        color: { dark: "#1a1a1a", light: "#FFFFFF" },
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  // Render QRs for every card after data has loaded and DOM is updated.
  const renderAllQRs = async () => {
    await nextTick();
    cards.value.forEach((student, index) => {
      generateQR(qrCanvases[index], student.reg_no);
    });
  };

  const fetchSeasons = async () => {
    try {
      const endPoint = "/admin/training-id-card/seasons";
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET",
      );

      if (data?.data?.seasons) {
        seasons.value = data.data.seasons;
        const activeId = data.data.active_season_id;
        if (activeId && filters.value.season_id === "") {
          filters.value.season_id = String(activeId);
        }
      }
    } catch (err) {
      window.showError?.(
        "Error!",
        err?.response?.data?.message || "Failed to load seasons",
        3000,
      );
    }
  };

  const fetchData = async () => {
    loading.value = true;
    try {
      const query = filters.value.season_id
        ? `?season_id=${filters.value.season_id}`
        : "";
      const endPoint = `/admin/training-id-card/data${query}`;
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET",
      );

      cards.value = data?.data?.cards || [];
      await renderAllQRs();
    } catch (err) {
      window.showError?.(
        "Error!",
        err?.response?.data?.message || "Failed to load card data",
        3000,
      );
      cards.value = [];
    } finally {
      loading.value = false;
    }
  };

  const printAll = () => {
    window.print();
  };

  onMounted(async () => {
    await fetchSeasons();
    await fetchData();
  });
</script>

<style scoped>
  /* ===================== SCREEN LAYOUT ===================== */
  .id-card-page {
    min-height: 100vh;
    background: #f3f4f6; /* gray-100 */
    padding-bottom: 2rem;
  }

  .control-bar {
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .control-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0.85rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .control-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .back-link {
    font-size: 0.85rem;
    font-weight: 600;
    color: #2563eb;
    text-decoration: none;
    padding: 0.3rem 0.5rem;
    border-radius: 0.4rem;
    transition: background 0.15s ease;
  }
  .back-link:hover {
    background: #eff6ff;
  }

  .season-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #374151;
  }

  .season-select {
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.45rem 0.7rem;
    font-size: 0.85rem;
    background: #fff;
    color: #111827;
    min-width: 220px;
  }
  .season-select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }

  .control-right {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .count-badge {
    font-size: 0.8rem;
    font-weight: 600;
    color: #065f46;
    background: #d1fae5;
    padding: 0.3rem 0.7rem;
    border-radius: 9999px;
  }

  .btn {
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1.1rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .btn-print {
    background: #2563eb;
    color: #fff;
  }
  .btn-print:hover:not(:disabled) {
    background: #1d4ed8;
  }

  .state-msg {
    text-align: center;
    color: #6b7280;
    padding: 4rem 1rem;
    font-size: 0.95rem;
  }

  /* ===================== CARD GRID (screen + print) =====================
     Cards tile in a grid so what you see matches what prints. CR80 cards are
     85.6mm wide, so 2 columns fit an A4 page (2×85.6mm + gap ≈ 177mm < 210mm).
     break-inside:avoid keeps a card from splitting across pages. */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 85.6mm);
    gap: 6mm;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .card-page {
    display: flex;
    align-items: center;
    justify-content: center;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* ===================== ID CARD =====================
     CR80-ish aspect (~85.6×54mm). Sized in mm so it prints to true card
     dimensions for cutting. */
  .id-card {
    width: 85.6mm;
    height: 54mm;
    background: #ffffff;
    border-radius: 3mm;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    color: #111827;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .accent-top {
    height: 2mm;
    /* background: linear-gradient(90deg, #059669, #10b981); */
  }
  .accent-bot {
    height: 1.2mm;
    /* background: linear-gradient(90deg, #10b981, #059669); */
    margin-top: auto;
  }

  /* HEADER — competition name centered at the top */
  .hdr {
    text-align: center;
    padding: 1.4mm 2.5mm 1mm;
  }
  .hdr-comp {
    font-size: 2.4mm;
    font-weight: 700;
    color: #047857;
    margin: 0;
    line-height: 1.1;
  }
  .hdr-year {
    font-size: 1.8mm;
    font-weight: 600;
    color: #6b7280;
    margin: 0.3mm 0 0;
    line-height: 1.1;
  }

  /* PASS STRIP */
  .pass-strip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5mm;
    background: #ecfdf5;
    border-top: 0.3mm solid #a7f3d0;
    border-bottom: 0.3mm solid #a7f3d0;
    padding: 0.6mm 2.5mm;
  }
  .pass-label-bn {
    font-size: 2mm;
    font-weight: 700;
    color: #065f46;
  }
  .pass-mubtadi {
    font-size: 1.6mm;
    font-weight: 600;
    color: #047857;
    background: #fff;
    border: 0.3mm solid #6ee7b7;
    border-radius: 9999px;
    padding: 0.1mm 1.2mm;
  }

  /* NAME + QR row: name on the left, QR on the right */
  .name-block {
    padding: 1mm 2.5mm 0;
  }
  .name-bn {
    font-size: 3mm;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .name-en {
    font-size: 2mm;
    color: #4b5563;
    margin: 0;
    line-height: 1.1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* QR centered in the middle of the card */
  .qr-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0.5mm 0;
  }
  .qr-canvas {
    width: 16mm !important;
    height: 16mm !important;
  }
  .qr-caption {
    font-size: 1.5mm;
    color: #9ca3af;
    margin: 0.3mm 0 0;
  }

  /* FOOTER */
  .card-footer {
    display: flex;
    justify-content: space-between;
    gap: 1mm;
    padding: 0.8mm 2.5mm 1mm;
    border-top: 0.2mm solid #f3f4f6;
  }
  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    flex: 1;
  }
  .footer-lbl {
    font-size: 1.4mm;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  .footer-val {
    font-size: 2mm;
    font-weight: 700;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* ORG FOOTER — logo + org name side by side, centered, at the bottom */
  .org-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 0.3mm solid #f3f4f6;
    gap: 1.2mm;
    padding: 1mm 2.5mm;
  }
  .org-logo {
    width: 5mm;
    height: 5mm;
    object-fit: contain;
    flex-shrink: 0;
  }
  .org-name {
    font-size: 2.2mm;
    font-weight: 700;
    color: #047857;
    white-space: nowrap;
  }

  /* ===================== PRINT (card-specific, scoped) ===================== */
  @media print {
    .id-card-page {
      background: #fff !important;
    }

    .cards-grid {
      grid-template-columns: repeat(2, 85.6mm);
      gap: 6mm;
      padding: 8mm; /* A4 margins */
    }

    .id-card {
      box-shadow: none;
      border: 0.2mm dashed #cbd5e1; /* guide line for cutting */
    }
  }
</style>

<!-- Global (non-scoped) print rules. Must NOT be scoped because it targets
     body * — i.e. the layout chrome (Navbar / Sidebar / Footer) which lives
     outside this component and cannot be reached by scoped styles. The
     visibility pattern hides everything, then re-shows only this page's
     card grid, so print output contains nothing but the cards. -->
<style>
  @media print {
    /* Hide EVERYTHING on the page first. visibility:hidden keeps the layout
       boxes (so pagination still works) but paints nothing — the layout's
       Navbar / Sidebar / Footer vanish from print. */
    body * {
      visibility: hidden !important;
    }

    /* Re-show only the card grid and its descendants. */
    .id-card-page,
    .id-card-page * {
      visibility: visible !important;
    }

    /* Lift the card grid to the top-left of the page so it isn't offset by
       the (now invisible) layout padding/nav. */
    .id-card-page {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    /* Control bar / loading state must never print. */
    .id-card-page .control-bar,
    .id-card-page .state-msg {
      display: none !important;
    }
  }
</style>
