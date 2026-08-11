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
          <span class="count-badge">
            {{ teachers.length }} card{{ teachers.length === 1 ? "" : "s" }}
          </span>
          <button @click="printAll" class="btn btn-print">
            🖨️ Print All
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== CARDS ===================== -->
    <div v-if="teachers.length">
      <!-- FRONT SIDES -->
      <div class="cards-grid fronts-section">
        <div
          v-for="(teacher, index) in teachers"
          :key="'front-' + index"
          class="card-wrapper"
        >
          <div class="preview-label">FRONT — {{ teacher.name }}</div>

          <div class="id-card card-front">
            <!-- Header -->
            <div class="hdr">
              <img
                src="~/assets/imgs/logo.png"
                alt="Organization Logo"
                class="hdr-logo"
              />
              <p class="hdr-org">এসো কুরআন শিখি</p>
              <p class="hdr-comp">{{ teacher.designation }}</p>
            </div>

            <!-- Avatar -->
            <div class="avatar-wrap">
              <img
                :src="
                  teacher.gender === 'male'
                    ? maleAvatar
                    : femaleAvatar
                "
                :alt="teacher.gender === 'male' ? 'Male' : 'Female'"
                class="avatar-img"
              />
            </div>

            <!-- Name -->
            <div class="info-rows">
              <div class="info-row">
                <span class="info-val name-val">{{ teacher.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BACK SIDES -->
      <div class="cards-grid backs-section">
        <div
          v-for="(teacher, index) in teachers"
          :key="'back-' + index"
          class="card-wrapper"
        >
          <div class="preview-label">BACK — {{ teacher.name }}</div>

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
  import maleAvatar from "~/assets/imgs/avatar-male.svg";
  import femaleAvatar from "~/assets/imgs/avatar-female.png";

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

  // Hardcoded teacher data
  const teachers = ref([
    {
      name: "হাফিজ ইমন আহমদ",
      designation: "প্রশিক্ষক",
      gender: "male",
    },
    {
      name: "হাফিজ মুদ্দাচ্ছির আহমদ মাশহুদ",
      designation: "প্রশিক্ষক",
      gender: "male",
    },
    {
      name: "উম্মে আয়ান",
      designation: "প্রশিক্ষিকা",
      gender: "female",
    },
  ]);

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

  const printAll = () => {
    window.print();
  };

  onMounted(async () => {
    await generateOrgQR();
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
    margin-top: 15px;
    text-align: center;
    padding: 2mm 3mm 1mm;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5mm;
  }
  .hdr-logo {
    width: 10mm;
    height: 10mm;
    object-fit: contain;
  }
  .hdr-org {
    font-size: 3.5mm;
    font-weight: 800;
    color: #047857;
    margin: 0;
    line-height: 1.15;
    letter-spacing: 0.04em;
  }
  .hdr-comp {
    margin-top: 50px !important;
    font-size: 4mm;
    font-weight: 800;
    color: #047857;
    margin: 0;
    line-height: 1.15;
    letter-spacing: 0.04em;
  }

  /* Avatar */
  .avatar-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex: 1;
    flex-shrink: 0;
  }
  .avatar-img {
    width: 20mm;
    height: 20mm;
    object-fit: contain;
  }

  /* Name area at bottom of card */
  .info-rows {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5mm;
    padding: 3mm;
    border-top: 0.2mm solid #f3f4f6;
    flex-shrink: 0;
    padding-bottom: 50px;
  }
  .info-row {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .info-val {
    font-size: 2.5mm;
    font-weight: 700;
    color: #111827;
  }
  .name-val {
    font-size: 3.5mm;
    font-weight: 800;
    text-align: center;
    width: 100%;
    text-align: center;
  }

  /* ===================== BACK SIDE ===================== */
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
