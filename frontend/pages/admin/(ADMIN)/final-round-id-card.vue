<template>
  <div class="id-card-page">
    <!-- ===================== SCREEN CONTROL BAR (hidden when printing) ===================== -->
    <div class="control-bar print:hidden">
      <div class="control-inner">
        <div class="control-left">
          <NuxtLink to="/admin/dashboard" class="back-link">
            ← Dashboard
          </NuxtLink>
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
    <div v-if="loading" class="state-msg">Loading final-round ID cards…</div>

    <div v-else-if="!cards.length" class="state-msg">
      No final-round contestants found.
    </div>

    <!-- ===================== CARDS ===================== -->
    <div v-if="!loading && cards.length">
      <!-- FRONT SIDES -->
      <div class="cards-grid fronts-section">
        <div
          v-for="(student, index) in cards"
          :key="'front-' + (student.reg_no || index)"
          class="card-wrapper"
        >
          <div class="preview-label">FRONT — {{ student.name_en }}</div>

          <div class="id-card card-front">
            <!-- Header -->
            <div class="hdr">
              <p class="hdr-comp">বিশুদ্ধ কুরআন প্রতিযোগিতা</p>
              <p class="hdr-year">১৪৪৮ হিজরি</p>
            </div>

            <!-- QR code -->
            <div class="qr-wrap">
              <img
                v-if="qrDataUrls[index]"
                :src="qrDataUrls[index]"
                alt="QR"
                class="qr-img"
              />
              </div>

            <!-- Info rows -->
              <div class="info-rows">
                <div class="info-row">
                  <span class="info-lbl">Name (BN)</span>
                  <span class="info-val name-val">{{ student.name_bn || "—" }}</span>
                </div>
                <div class="info-row">
                  <span class="info-lbl">Name (EN)</span>
                  <span class="info-val">{{ student.name_en || "" }}</span>
                </div>
                <div class="info-row">
                  <span class="info-lbl">Reg No</span>
                  <span class="info-val">{{ student.reg_no || "—" }}</span>
                </div>
                <div class="info-row">
                  <span class="info-lbl">Criteria</span>
                  <span class="info-val">{{ student.criteria_label?.en }} ({{ student.criteria_ar }})</span>
                </div>
              </div>

          </div>
        </div>
      </div>

      <!-- BACK SIDES -->
      <div class="cards-grid backs-section">
        <div
          v-for="(student, index) in cards"
          :key="'back-' + (student.reg_no || index)"
          class="card-wrapper"
        >
          <div class="preview-label">BACK — {{ student.name_en }}</div>

          <div class="id-card card-back">
            <!-- Center content: Logo -->
            <div class="back-top">
              <img
                src="~/assets/imgs/logo.png"
                alt="Organization Logo"
                class="back-logo"
              />
              <p class="back-org-name">এসো কুরআন শিখি</p>
            </div>

            <!-- Centered QR + contact -->
            <div class="back-main">
              <div class="back-qr-section">
                <img
                  v-if="orgQrUrl"
                  :src="orgQrUrl"
                  alt="Organization QR"
                  class="back-qr"
                />
              </div>
              <div class="back-contact">
                <span class="back-contact-item">eshoquranshikhi.org</span>
                <span class="back-contact-item pt-8">Contact Info</span>
                <span class="back-contact-item">01 805 777 332</span>
              </div>
            </div>

          </div>
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

  const cards = ref([]);
  const loading = ref(true);

  // Pre-generated QR data-URLs keyed by card index.
  const qrDataUrls = ref({});
  const orgQrUrl = ref("");

  const generateOrgQR = async () => {
    try {
      orgQrUrl.value = await QRCode.toDataURL("https://eshoquranshikhi.org/", {
        width: 120,
        margin: 1,
        color: { dark: "#1a1a1a", light: "#FFFFFF" },
      });
    } catch (error) {
      console.error("Error generating org QR code:", error);
    }
  };

  const generateAllQRCodes = async (cardList) => {
    const urls = {};
    await Promise.all(
      cardList.map(async (student, index) => {
        if (!student.reg_no) return;
        try {
          urls[index] = await QRCode.toDataURL(student.reg_no, {
            width: 150,
            margin: 1,
            color: { dark: "#1a1a1a", light: "#FFFFFF" },
          });
        } catch (error) {
          console.error("Error generating QR code:", error);
        }
      }),
    );
    qrDataUrls.value = urls;
  };

  const fetchData = async () => {
    loading.value = true;
    try {
      const endPoint = "/admin/final-round-id-card/data";
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET",
      );

      cards.value = data?.data?.cards || [];
      await generateAllQRCodes(cards.value);
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
    await generateOrgQR();
    await fetchData();
  });
</script>

<style scoped>
  /* ===================== SCREEN LAYOUT ===================== */
  .id-card-page {
    min-height: 100vh;
    background: #f3f4f6;
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
    flex-direction: column;
    justify-content: center;
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

  /* ===================== CARD GRID ===================== */
  .cards-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem 1rem;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .preview-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #6b7280;
    padding: 0.15rem 0.5rem;
    background: #e5e7eb;
    border-radius: 0.25rem;
  }

  /* ===================== ID CARD (shared) ===================== */
  /* 54mm × 85.6mm — portrait orientation */
  .id-card {
    width: 54mm;
    height: 85.6mm;
    background: #ffffff;
    border-radius: 0;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    color: #111827;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ===================== FRONT SIDE ===================== */
  /* Header */
  .hdr {
    margin-top: 20px;
    text-align: center;
    padding: 1.5mm 3mm 1mm;
    flex-shrink: 0;
  }
  .hdr-comp {
    font-size: 3.5mm;
    font-weight: 800;
    color: #047857;
    margin: 0;
    line-height: 1.15;
    letter-spacing: 0.02em;
  }
  .hdr-year {
    font-size: 2.5mm;
    font-weight: 600;
    color: #6b7280;
    margin: 0.3mm 0 0;
    line-height: 1.1;
  }

  /* QR code */
  .qr-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex: 1;
    flex-shrink: 0;
  }
  .qr-img {
    width: 16mm;
    height: 16mm;
    object-fit: contain;
  }
  /* Info rows (stacked vertically in portrait) */
  .info-rows {
    display: flex;
    flex-direction: column;
    gap: 1mm;
    padding: 3mm;
    border-top: 0.2mm solid #f3f4f6;
    flex-shrink: 0;
  }
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .info-lbl {
    font-size: 2mm;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    font-weight: 600;
  }
  .info-val {
    font-size: 2.5mm;
    font-weight: 700;
    color: #111827;
    text-align: right;
    max-width: 65%;
  }
  .name-val {
    font-size: 3mm;
    font-weight: 800;
    text-align: right;
  }
  .name-val {
    font-size: 3mm;
    font-weight: 800;
  }

  /* ===================== BACK SIDE ===================== */
  .back-divider {
    height: 0.3mm;
    margin: 0 5mm;
    background: linear-gradient(
      90deg,
      transparent,
      #10b981,
      #059669,
      #10b981,
      transparent
    );
    flex-shrink: 0;
  }

  .back-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3mm 3mm 0;
    flex-shrink: 0;
  }
  .back-logo {
    width: 16mm;
    height: 16mm;
    object-fit: contain;
    opacity: 0.9;
  }
  .back-org-name {
    font-size: 4mm;
    font-weight: 800;
    color: #047857;
    margin: 2mm 0 0;
    line-height: 1.1;
  }
  .back-org-name-en {
    font-size: 2.5mm;
    font-weight: 500;
    color: #6b7280;
    margin: 0.5mm 0 0;
    line-height: 1.1;
  }



    .back-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .back-qr-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 3mm 2mm;
    flex-shrink: 0;
  }
  .back-qr {
    width: 14mm;
    height: 14mm;
    object-fit: contain;
    opacity: 0.85;
  }


  .back-contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5mm;
    padding: 2mm 3mm 4mm;
    flex-shrink: 0;
  }
  .back-contact-item {
    font-size: 2.2mm;
    color: #374151;
    font-weight: 600;
  }




  /* ===================== PRINT STYLES ===================== */
  @media print {
    .id-card-page {
      background: #fff !important;
    }

    .preview-label {
      display: none !important;
    }

    .cards-grid {
      display: grid !important;
      grid-template-columns: repeat(3, 54mm);
      gap: 4mm 6mm;
      padding: 6mm;
      justify-content: center;
    }

    /* Backs section forces a new page before it (duplex alignment) */
    .backs-section {
      break-before: page;
    }

    .card-wrapper {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .id-card {
      box-shadow: none;
      border: 0.2mm dashed #cbd5e1;
    }
  }
</style>

<!-- Global (non-scoped) print rules -->
<style>
  @media print {
    body * {
      visibility: hidden !important;
    }

    .id-card-page,
    .id-card-page * {
      visibility: visible !important;
    }

    .id-card-page {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    .id-card-page .control-bar,
    .id-card-page .state-msg {
      display: none !important;
    }
  }
</style>
