<template>
  <div class="token-page" id="token-page">
    <!-- Action bar (screen only) -->
    <div class="action-bar" v-if="registeredFormStore.registeredForm?.phone">
      <div class="action-inner">
        <div class="action-msg">
          <span class="action-check">✓</span>
          <span>আলহামদুলিল্লাহ আপনার রেজিস্ট্রেশন সফল হয়েছে</span>
        </div>
        <div class="action-btns">
          <button @click="downloadCard(false)" class="btn btn-dl" :disabled="downloading">
            {{ downloading ? '⏳ সংরক্ষণ হচ্ছে...' : '📥 ছবি ডাউনলোড' }}
          </button>
          <button @click="printCard" class="btn btn-pr">🖨️ প্রিন্ট</button>
        </div>
      </div>
    </div>

    <!-- ==================== CARD ==================== -->
    <div class="card-outer" v-if="registeredFormStore.registeredForm?.phone">
      <div id="registration-card" class="card">

        <!-- Top accent -->
        <div class="accent-top"></div>

        <!-- HEADER -->
        <div class="hdr">
          <img src="~/assets/imgs/logo.png" alt="Logo" class="hdr-logo" />
          <div class="hdr-center">
            <h1 class="hdr-org">এসো কুরআন শিখি</h1>
            <p class="hdr-comp">বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা ১৪৪৮ হিজরি</p>
          </div>
          <div class="hdr-qr">
            <canvas
              v-if="registeredFormStore.registeredForm?.reg_no"
              ref="qrCanvas"
              class="qr"
            ></canvas>
          </div>
        </div>

        <!-- TITLE STRIP -->
        <div class="title-strip">
          <span>রেজিস্ট্রেশন কার্ড</span>
          <span>নং: <strong>{{ registeredFormStore.registeredForm.reg_no }}</strong></span>
        </div>

        <!-- BODY -->
        <div class="body">

          <!-- COL 1 -->
          <div class="col">
            <div class="sec">
              <div class="sec-title">ব্যক্তিগত তথ্য</div>
              <table class="info-table">
                <tr>
                  <td class="lbl">নাম (বাংলা)</td>
                  <td class="val val-name">{{ registeredFormStore.registeredForm.name_bn }}</td>
                </tr>
                <tr>
                  <td class="lbl">Name (EN)</td>
                  <td class="val">{{ registeredFormStore.registeredForm.name_en }}</td>
                </tr>
                <tr>
                  <td class="lbl">জন্ম তারিখ</td>
                  <td class="val">{{ formatDate(registeredFormStore.registeredForm.dob) }}</td>
                </tr>
                <tr>
                  <td class="lbl">মোবাইল</td>
                  <td class="val">{{ registeredFormStore.registeredForm.phone }}</td>
                </tr>
                <tr v-if="registeredFormStore.registeredForm.email">
                  <td class="lbl">ইমেইল</td>
                  <td class="val">{{ registeredFormStore.registeredForm.email }}</td>
                </tr>
                <tr>
                  <td class="lbl">পেশা</td>
                  <td class="val">{{ registeredFormStore.registeredForm.occupation }}</td>
                </tr>
                <tr>
                  <td class="lbl">ঠিকানা</td>
                  <td class="val">{{ registeredFormStore.registeredForm.address }}</td>
                </tr>
              </table>
            </div>

            <div class="sec">
              <div class="sec-title">শিক্ষাগত তথ্য</div>
              <table class="info-table">
                <tr>
                  <td class="lbl">শিক্ষা ব্যবস্থা</td>
                  <td class="val">
                    {{
                      registeredFormStore.registeredForm.education_background == 1 ? 'সাধারণ (General)'
                      : registeredFormStore.registeredForm.education_background == 2 ? 'মাদরাসা (Madrasa)'
                      : registeredFormStore.registeredForm.education_background == 3 ? 'উভয় (General + Madrasa)'
                      : '—'
                    }}
                  </td>
                </tr>
                <tr v-if="registeredFormStore.registeredForm.school_name">
                  <td class="lbl">স্কুল</td>
                  <td class="val">{{ registeredFormStore.registeredForm.school_name }}</td>
                </tr>
                <tr v-if="registeredFormStore.registeredForm.college_name">
                  <td class="lbl">কলেজ</td>
                  <td class="val">{{ registeredFormStore.registeredForm.college_name }}</td>
                </tr>
                <tr v-if="registeredFormStore.registeredForm.university_name">
                  <td class="lbl">বিশ্ববিদ্যালয়</td>
                  <td class="val">{{ registeredFormStore.registeredForm.university_name }}</td>
                </tr>
                <tr v-if="registeredFormStore.registeredForm.madrasah_name">
                  <td class="lbl">মাদরাসা</td>
                  <td class="val">{{ registeredFormStore.registeredForm.madrasah_name }}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- COL 2 -->
          <div class="col">
            <div class="sec">
              <div class="sec-title">রেজিস্ট্রেশন বিবরণ</div>
              <div class="reg-box">
                <span class="reg-lbl">রেজিস্ট্রেশন নম্বর</span>
                <span class="reg-val">{{ registeredFormStore.registeredForm.reg_no }}</span>
              </div>
              <table class="info-table">
                <tr>
                  <td class="lbl">Season</td>
                  <td class="val">{{ registeredFormStore.registeredForm.season_id }}</td>
                </tr>
                <tr>
                  <td class="lbl">রেজি. তারিখ</td>
                  <td class="val">{{ formatDate(registeredFormStore.registeredForm.created_at) }}</td>
                </tr>
                <tr>
                  <td class="lbl">তেলাওয়াত</td>
                  <td class="val">{{ registeredFormStore.registeredForm.is_recitation ? 'হ্যাঁ' : 'না' }}</td>
                </tr>
                <tr>
                  <td class="lbl">প্রশিক্ষণ</td>
                  <td class="val">{{ registeredFormStore.registeredForm.need_training ? 'প্রয়োজন' : 'দরকার নেই' }}</td>
                </tr>
              </table>
            </div>

            <!-- Exam schedule -->
            <div class="sec sec-exam" v-if="examTime || registeredFormStore.allocation">
              <div class="sec-title sec-title-exam">পরীক্ষার সময়সূচি</div>
              <table class="info-table">
                <tr v-if="examTime">
                  <td class="lbl">সময়</td>
                  <td class="val val-bold">{{ examTime }}</td>
                </tr>
                <tr>
                  <td class="lbl">স্থান</td>
                  <td class="val">হেরিটেজ হাইটস এন্ড ব্যাংকুয়েট হল মেট্রোপলিটন মার্কেট (২য় তলা), সুবহানীঘাট, সিলেট</td>
                </tr>
              </table>
              <div class="alloc" v-if="registeredFormStore.allocation">
                <div class="alloc-item">
                  <span class="alloc-lbl">গ্রুপ</span>
                  <span class="alloc-val">{{ registeredFormStore.allocation.group }}</span>
                </div>
                <div class="alloc-item">
                  <span class="alloc-lbl">সিরিয়াল</span>
                  <span class="alloc-val">{{ registeredFormStore.allocation.serial }}</span>
                </div>
                <div class="alloc-item">
                  <span class="alloc-lbl">রুম</span>
                  <span class="alloc-val">{{ registeredFormStore.allocation.room_number }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BOTTOM SECTION (FULL WIDTH) -->
          <div class="instructions-wrap">
            <div class="sec sec-note">
              <div class="sec-title">নির্দেশনা</div>
              <ul class="note-list">
                <li>ভাইভার সময় এই কার্ড অবশ্যই সাথে আনতে হবে।</li>
                <li>কার্ড ছাড়া প্রতিযোগিতায় অংশগ্রহণ করা যাবে না।</li>
                <li>নির্ধারিত সময়ের ১৫ মিনিট পূর্বে উপস্থিত থাকুন।</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="ftr">
          <span>📞 +880 1805 777 332 &nbsp;|&nbsp; 🌐 eshoquranshikhi.org</span>
          <span>মুদ্রণ: {{ formatPrintTime }}</span>
        </div>

        <!-- Bottom accent -->
        <div class="accent-bot"></div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="!registeredFormStore.isLoading" class="empty">
      <p>কোনো রেজিস্ট্রেশন তথ্য পাওয়া যায়নি।</p>
      <NuxtLink to="/registration" class="empty-link">রেজিস্ট্রেশন করুন →</NuxtLink>
    </div>
    <div v-else class="empty">
      <div class="spinner"></div>
      <p>তথ্য লোড হচ্ছে...</p>
    </div>
  </div>
</template>

<script setup>
import QRCode from "qrcode";

definePageMeta({
  layout: "split",
});

const registeredFormStore = useRegisteredFormStore();
const qrCanvas = ref(null);
const downloading = ref(false);

const examTime = computed(() => {
  return (
    registeredFormStore.allocation?.exam_time ||
    registeredFormStore.registeredForm?.exam_time ||
    null
  );
});

const generateQRCode = async (content) => {
  if (qrCanvas.value) {
    try {
      await QRCode.toCanvas(qrCanvas.value, content, {
        width: 80,
        margin: 1,
        color: { dark: "#1a1a1a", light: "#FFFFFF" },
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }
};

const formatPrintTime = computed(() => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "short" });
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
});

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const printCard = () => {
  window.print();
};

const downloadCard = async (auto = false) => {
  if (!auto) downloading.value = true;
  try {
    const { default: html2canvas } = await import("html2canvas");
    const card = document.getElementById("registration-card");
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
    const regNo = registeredFormStore.registeredForm?.reg_no || "registration";
    link.download = `registration-card-${regNo}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Notify the backend that the registration token has been downloaded
    // so the "Registration Token Downloaded" progress stage is marked
    // completed for this user. Fire-and-forget; never block the download.
    try {
      useAuthenticatedAxios(
        "/registration/mark-token-downloaded",
        null,
        null,
        "POST"
      );
    } catch (e) {
      console.error("Failed to record token download:", e);
    }
  } catch (err) {
    console.error("Download error:", err);
    window.print();
  } finally {
    if (!auto) downloading.value = false;
  }
};

onMounted(async () => {
  await registeredFormStore.fetchRegisteredForm();
  if (registeredFormStore.registeredForm?.reg_no) {
    await nextTick();
    await generateQRCode(registeredFormStore.registeredForm.reg_no);
    // Auto-save image after fonts/logo load
    setTimeout(() => downloadCard(true), 1500);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

/* ---- PAGE ---- */
.token-page {
  font-family: 'Noto Sans Bengali', 'Inter', sans-serif;
  padding: 2rem 1.5rem;
  min-height: 100vh;
  background-color: #f8fafc;
}

/* ---- ACTION BAR ---- */
.action-bar {
  max-width: 820px;
  margin: 0 auto 1.5rem auto;
  background: #0b3c2d;
  border-radius: 12px;
  padding: 0.85rem 1.5rem;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.action-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.action-msg {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 500;
}
.action-check {
  background: #10b981;
  color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  flex-shrink: 0;
}
.action-btns {
  display: flex;
  gap: 0.75rem;
}
.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all 0.2s ease;
}
.btn:disabled { opacity: 0.5; cursor: wait; }
.btn-dl { 
  background: #a88754; 
  color: white; 
}
.btn-dl:hover:not(:disabled) { 
  background: #917244; 
  transform: translateY(-1px);
}
.btn-pr { 
  background: rgba(255,255,255,0.1); 
  color: white; 
  border: 1px solid rgba(255,255,255,0.2); 
}
.btn-pr:hover { 
  background: rgba(255,255,255,0.2);
  transform: translateY(-1px);
}

/* ---- CARD OUTER ---- */
.card-outer {
  max-width: 820px;
  margin: 0 auto;
}

/* ---- CARD ---- */
.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
}

/* ---- HEADER ---- */
.hdr {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid #e2e8f0;
}
.hdr-logo {
  width: 65px;
  height: 65px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
}
.hdr-center {
  flex: 1;
  text-align: center;
}
.hdr-bism {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  direction: rtl;
  font-family: 'Inter', sans-serif;
}
.hdr-org {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0b3c2d;
  margin: 0.15rem 0;
}
.hdr-comp {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  margin: 0;
}
.hdr-qr {
  flex-shrink: 0;
}
.qr {
  display: block;
  width: 65px !important;
  height: 65px !important;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 2px;
  background: #ffffff;
}

/* ---- TITLE STRIP ---- */
.title-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.75rem;
  background: #0b3c2d;
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.title-strip strong {
  color: #e9c48a;
  margin-left: 0.25rem;
  font-size: 0.95rem;
}

/* ---- BODY ---- */
.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
.col {
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.col:first-child {
  border-right: 1px solid #e2e8f0;
}

/* ---- SECTIONS ---- */
.sec {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
}
.sec-title {
  padding: 0.4rem 0.85rem;
  background: #f8fafc;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0b3c2d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e8f0;
}

/* ---- INFO TABLE ---- */
.info-table {
  width: 100%;
  border-collapse: collapse;
}
.info-table td {
  padding: 0.35rem 0.85rem;
  font-size: 0.78rem;
  vertical-align: middle;
  border-bottom: 1px solid #f1f5f9;
}
.info-table tr:last-child td {
  border-bottom: none;
}
.lbl {
  color: #64748b;
  font-weight: 600;
  width: 100px;
  white-space: nowrap;
}
.val {
  color: #0f172a;
  font-weight: 500;
}
.val-name {
  font-weight: 700;
  color: #0b3c2d;
  font-size: 0.85rem;
}
.val-bold {
  font-weight: 700;
}

/* ---- REG BOX ---- */
.reg-box {
  margin: 0.6rem 0.85rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.6rem 0.85rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.reg-lbl {
  font-size: 0.6rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}
.reg-val {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0b3c2d;
  font-family: 'Inter', monospace;
  letter-spacing: 2px;
}

/* ---- EXAM SECTION ---- */
.sec-exam {
  border-color: #e2e8f0;
}
.sec-title-exam {
  background: #f8fafc;
  color: #0b3c2d;
  border-bottom-color: #e2e8f0;
}
.sec-exam .lbl { color: #64748b; }
.sec-exam .val { color: #0f172a; }

.alloc {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 0.5rem 0.85rem 0.6rem;
}
.alloc-item {
  text-align: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.35rem 0.25rem;
}
.alloc-lbl {
  display: block;
  font-size: 0.55rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
}
.alloc-val {
  display: block;
  font-size: 1.15rem;
  font-weight: 800;
  color: #0b3c2d;
}

/* ---- INSTRUCTIONS WRAP (Full Width) ---- */
.instructions-wrap {
  grid-column: 1 / -1;
  padding: 0 1.25rem 1rem 1.25rem;
}

/* ---- NOTE ---- */
.sec-note { 
  border-color: #e2e8f0; 
}
.note-list {
  margin: 0;
  padding: 0.5rem 0.85rem 0.6rem 1.5rem;
  list-style: disc;
}
.note-list li {
  font-size: 0.72rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 0.2rem;
}
.note-list li:last-child {
  margin-bottom: 0;
}

/* ---- FOOTER ---- */
.ftr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.75rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  font-size: 0.68rem;
  color: #64748b;
}
.ftr-dua {
  font-size: 0.9rem;
  color: #0b3c2d;
  direction: rtl;
  font-weight: 600;
}

/* ---- EMPTY / LOADING ---- */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 0.75rem;
  color: #64748b;
  font-size: 1rem;
}
.empty-link {
  color: #0b3c2d;
  text-decoration: underline;
  font-weight: 600;
}
.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e2e8f0;
  border-top-color: #0b3c2d;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>

<style>
/* Global print overrides */
@media print {
  /* Hide Layout parts completely */
  nav, footer, aside, .action-bar, .navbar, .sidebar, 
  header, footer.bg-white, section.bg-gray-100 > div:last-child,
  .pb-10, .sm\:pb-16, .py-7 {
    display: none !important;
  }

  /* Reset outer layout background, shadow and padding */
  section.bg-gray-100 {
    background: #ffffff !important;
    min-height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .base-width {
    max-width: 100% !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .sm\:flex {
    display: block !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .w-full {
    box-shadow: none !important;
    border-radius: 0 !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* Reset document and viewport margins */
  body, html {
    background: #ffffff !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Force print background colors */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Make token page and card visible */
  .token-page,
  .card-outer,
  #registration-card,
  #registration-card * {
    visibility: visible !important;
  }

  /* Center the card on the printable A4 sheet */
  .token-page {
    padding: 0 !important;
    margin: 0 !important;
    min-height: auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background-color: #ffffff !important;
  }

  .card-outer {
    width: 100% !important;
    max-width: 650px !important; /* Perfect width for A4 portrait */
    margin: 0 auto !important;
    padding: 0 !important;
    float: none !important;
  }

  #registration-card {
    border: 1px solid #cbd5e1 !important;
    border-radius: 12px !important;
    box-shadow: none !important;
    width: 100% !important;
    page-break-inside: avoid !important;
  }

  @page {
    size: A4 portrait;
    margin: 15mm 12mm;
  }
}
</style>
