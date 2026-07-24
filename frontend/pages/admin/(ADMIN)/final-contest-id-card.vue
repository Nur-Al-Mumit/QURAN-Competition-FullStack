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
    <div v-if="loading" class="state-msg">Loading final-contest ID cards…</div>

    <div v-else-if="!cards.length" class="state-msg">
      No final-contest (Mahir) contestants found.
    </div>

    <!-- ===================== CARDS ===================== -->
    <!-- On screen: single-column preview with FRONT/BACK labels per contestant.
         In print: cards reflow into a 2-column A4 grid; fronts-grid + backs-grid
         are separated by break-before for duplex printing. CSS media queries
         handle the switch. QR codes are pre-generated as data-URL <img> tags. -->
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
            <div class="accent-top"></div>
            <div class="hdr">
              <p class="hdr-comp">বিশুদ্ধ কুরআন প্রতিযোগিতা</p>
              <p class="hdr-year">১৪৪৮ হিজরি</p>
            </div>
            <div class="tier-strip">
              <span class="tier-left"></span>
              <span class="tier-text">Final Competition Pass Card</span>
              <span class="tier-divider">|</span>
              <span class="tier-badge">দক্ষ · الماهر · Expert</span>
              <span class="tier-right"></span>
            </div>
            <div class="name-block">
              <p class="name-bn">{{ student.name_bn || "—" }}</p>
              <p class="name-en">{{ student.name_en || "" }}</p>
            </div>
            <div class="qr-wrap">
              <img
                v-if="qrDataUrls[index]"
                :src="qrDataUrls[index]"
                alt="QR"
                class="qr-img"
              />
              <p class="qr-caption">Scan to verify</p>
            </div>
            <div class="card-footer">
              <div class="footer-item">
                <span class="footer-lbl">Reg No</span>
                <span class="footer-val">{{ student.reg_no || "—" }}</span>
              </div>
              <div class="footer-item">
                <span class="footer-lbl">Serial</span>
                <span class="footer-val">{{ student.serial || "—" }}</span>
              </div>
              <div class="footer-item">
                <span class="footer-lbl">Season</span>
                <span class="footer-val">{{ student.season_id || "—" }}</span>
              </div>
            </div>
            <div class="org-footer">
              <img src="~/assets/imgs/logo.png" alt="Logo" class="org-logo" />
              <span class="org-name">এসো কুরআন শিখি</span>
            </div>
            <div class="accent-bot"></div>
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
            <div class="accent-top"></div>
            <div class="hdr">
              <p class="hdr-comp">বিশুদ্ধ কুরআন প্রতিযোগিতা</p>
              <p class="hdr-sub">নির্দেশনা — Instructions</p>
            </div>
            <div class="back-divider"></div>
            <div class="instructions-list">
              <div
                v-for="(instr, i) in instructions"
                :key="i"
                class="instr-item"
              >
                <span class="instr-bullet"></span>
                <div class="instr-text">
                  <span class="instr-bn">{{ instr.bn }}</span>
                  <span class="instr-en">{{ instr.en }}</span>
                </div>
              </div>
            </div>
            <div class="back-spacer"></div>
            <div class="org-footer-back">
              <img src="~/assets/imgs/logo.png" alt="Logo" class="org-logo" />
              <span class="org-name">এসো কুরআন শিখি</span>
              <img v-if="orgQrUrl" :src="orgQrUrl" alt="QR" class="org-qr" />
            </div>
            <div class="accent-bot"></div>
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

  // Dynamic instruction items — edit this array to update the back side.
  const instructions = [
    {
      bn: "পরীক্ষা শুরুর সময় (দুপুর ১২:০০টা)",
      en: "Exam Start Time: 12:00 PM",
    },
    {
      bn: "স্বালাত ও দুপুরের খাবার (১:০০টা - ২:০০টা)",
      en: "Salah And Lunch Break: 1:00 PM - 2:00 PM",
    },
    {
      bn: "পুরস্কার বিতরণী অনুষ্ঠান (বিকাল ৪:০০টা)",
      en: "Prize Ceremony: 4:00 PM",
    },
    {
      bn: "নিজের মুসহাফ (কুরআনের কপি) সাথে আনতে হবে",
      en: "Bring your own Mushaf (Quran copy)",
    },
    {
      bn: "পরীক্ষা শুরুর ১৫ মিনিট পূর্বে লটারির মাধ্যমে সকল পরীক্ষার্থীর সিরিয়াল নির্ধারণ করা হবে",
      en: "All candidates serial numbers will be determined by lottery 15 minutes before the exam starts",
    },
    {
      bn: "নিজ পরীক্ষা শুরু হওয়ার ৫ মিনিট পূর্বে প্রশ্নের লটারি তুলে প্রস্তুতি গ্রহণ করতে হবে",
      en: "Each candidate must draw their question 5 minutes before their turn",
    },
    {
      bn: "পরীক্ষায় মোট ২টি প্রশ্ন থাকবে: ১টি পরীক্ষার্থীর নিজ পছন্দের (সর্বোচ্চ ১ পৃষ্ঠা) এবং ১টি লটারির অজানা প্রশ্ন। মোট পড়ার সময় ৭ মিনিট।",
      en: "The exam consists of 2 questions: 1 candidate's choice (max 1 page) and 1 unknown draw. Total recitation time is 7 minutes.",
    },
  ];

  // Pre-generated QR data-URLs keyed by card index.
  // Using data URLs (base64 images) instead of canvas refs — no DOM timing issues.
  const qrDataUrls = ref({});
  const orgQrUrl = ref("");

  const generateOrgQR = async () => {
    try {
      orgQrUrl.value = await QRCode.toDataURL("https://eshoquranshikhi.org/", {
        width: 100,
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
      const endPoint = "/admin/final-contest-id-card/data";
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET",
      );

      cards.value = data?.data?.cards || [];
      // Generate QR codes from data — no canvas needed
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
  /* Screen: single column centered, both sections visible sequentially.
     Print: 2-column A4 grid; backs-section forces a new page for duplex. */
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

  /* ===================== ID CARD (shared front & back) ===================== */
  .id-card {
    width: 97mm;
    height: 68.25mm;
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

  /* HEADER */
  .hdr {
    text-align: center;
    padding: 2mm 3mm 1.5mm;
    flex-shrink: 0;
  }
  .hdr-comp {
    font-size: 3.2mm;
    font-weight: 700;
    color: #047857;
    margin: 0;
    line-height: 1.1;
  }
  .hdr-year {
    font-size: 2.4mm;
    font-weight: 600;
    color: #6b7280;
    margin: 0.5mm 0 0;
    line-height: 1.1;
  }

  /* TIER STRIP — elegant horizontal bar with decorative lines */
  .tier-strip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5mm;
    padding: 0.8mm 3mm;
    flex-shrink: 0;
  }
  .tier-left,
  .tier-right {
    flex: 1;
    height: 0.2mm;
    background: #047857;
  }
  .tier-text {
    font-size: 2.6mm;
    font-weight: 600;
    color: #374151;
    white-space: nowrap;
  }
  .tier-divider {
    font-size: 2mm;
    color: #d1d5db;
  }
  .tier-badge {
    font-size: 2.2mm;
    font-weight: 700;
    color: #047857;
    white-space: nowrap;
    letter-spacing: 0.03em;
  }
  .hdr-sub {
    font-size: 2.4mm;
    font-weight: 600;
    color: #374151;
    margin: 0.5mm 0 0;
    line-height: 1.1;
  }

  /* NAME BLOCK (front only) */
  .name-block {
    flex-shrink: 0;
  }
  .name-bn {
    font-size: 4mm;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    padding: 1.5mm 3mm 0;
  }
  .name-en {
    font-size: 2.8mm;
    color: #4b5563;
    margin: 0;
    line-height: 1.1;
    white-space: nowrap;
    overflow: hidden;
    padding: 0mm 3mm 0;
  }

  /* QR CODE (front only) — using <img> with data-URL src */
  .qr-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0.5mm 0;
    min-height: 0;
  }
  .qr-img {
    margin-top: 2px;
    width: 18mm;
    height: 18mm;
    object-fit: contain;
  }
  .qr-caption {
    font-size: 2mm;
    color: #9ca3af;
    margin: 0.5mm 0 0;
  }

  /* FOOTER ROW (front only) */
  .card-footer {
    display: flex;
    justify-content: space-between;
    gap: 1mm;
    padding: 1.5mm 3mm 1.5mm;
    border-top: 0.3mm solid #f3f4f6;
    flex-shrink: 0;
  }
  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    flex: 1;
  }
  .footer-lbl {
    font-size: 1.8mm;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
  .footer-val {
    font-size: 2.5mm;
    font-weight: 700;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* ORG FOOTER (front & back) */
  .org-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 0.3mm solid #f3f4f6;
    gap: 1.5mm;
    padding: 1.5mm 3mm;
    flex-shrink: 0;
  }
  .org-footer-back {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 0.3mm solid #f3f4f6;
    gap: 1.5mm;
    padding: 1mm 2mm;
    flex-shrink: 0;
  }
  .org-logo {
    width: 7mm;
    height: 7mm;
    object-fit: contain;
    flex-shrink: 0;
  }
  .org-qr {
    width: 6mm;
    height: 6mm;
    object-fit: contain;
    flex-shrink: 0;
    opacity: 0.8;
  }
  .org-name {
    font-size: 3mm;
    font-weight: 700;
    color: #047857;
    white-space: nowrap;
  }

  /* ===================== BACK SIDE SPECIFIC ===================== */
  .back-divider {
    height: 0.3mm;
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

  .instructions-list {
    padding: 1.5mm 4mm 0;
    display: flex;
    flex-direction: column;
    gap: 1.2mm;
    flex: 1;
  }

  .instr-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5mm;
  }

  .instr-icon {
    font-size: 3mm;
    line-height: 1;
    flex-shrink: 0;
    margin-top: 0.3mm;
  }
  .instr-bullet {
    width: 1.5mm;
    height: 1.5mm;
    background: #059669;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 1mm;
  }

  .instr-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .instr-bn {
    font-size: 8px;
    font-weight: 600;
    color: #111827;
    line-height: 1.15;
  }

  .instr-en {
    font-size: 7px;
    color: #6b7280;
    line-height: 1.2;
  }

  .back-spacer {
    flex: 1;
  }

  /* ===================== PRINT STYLES ===================== */
  @media print {
    .id-card-page {
      background: #fff !important;
    }

    /* Hide preview labels */
    .preview-label {
      display: none !important;
    }

    .cards-grid {
      display: grid !important;
      grid-template-columns: repeat(2, 97mm);
      gap: 4mm;
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

<!-- Global (non-scoped) print rules. Must NOT be scoped because it targets
     body * — i.e. the layout chrome (Navbar / Sidebar / Footer) which lives
     outside this component. The visibility pattern hides everything, then
     re-shows only this page's card grids. -->
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
