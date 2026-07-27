<template>
  <!--
    Traditional "Symmetric Luxury" invitation card.
    Formal, ceremonial, mirror-symmetric — gold double-border, corner
    flourishes, centered seal, underlined section headings, deep emerald.
    Fixed 800 × 1130 canvas; id="invitation-card" is the print/export target.
  -->
  <div id="invitation-card" class="invitation-card">
    <!-- ===== Background gradient ===== -->
    <div class="bg-gradient" aria-hidden="true"></div>

    <!-- ===== Faint geometric lattice ===== -->
    <svg class="bg-pattern" viewBox="0 0 800 1130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="ic-lattice" width="110" height="110" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#2D6A4F" stroke-width="0.8">
            <path d="M55 22 L64 48 L92 48 L70 64 L78 90 L55 74 L32 90 L40 64 L18 48 L46 48 Z" opacity="0.45" />
            <circle cx="55" cy="55" r="3" opacity="0.4" />
          </g>
        </pattern>
      </defs>
      <rect width="800" height="1130" fill="url(#ic-lattice)" opacity="0.06" />
    </svg>

    <!-- ===== Decorative gold double border + corner flourishes ===== -->
    <svg class="frame" viewBox="0 0 800 1130" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ic-gold-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#AA771C" />
          <stop offset="50%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#C5A059" />
        </linearGradient>
      </defs>
      <!-- outer + inner gold rules -->
      <rect x="22" y="22" width="756" height="1086" rx="6" fill="none" stroke="url(#ic-gold-line)" stroke-width="2.5" />
      <rect x="34" y="34" width="732" height="1062" rx="3" fill="none" stroke="url(#ic-gold-line)" stroke-width="1" />

      <!-- corner flourishes (4 identical, rotated) -->
      <g fill="none" stroke="url(#ic-gold-line)" stroke-width="1.6" stroke-linecap="round">
        <!-- top-left -->
        <g transform="translate(34 34)">
          <path d="M0 46 Q 0 0 46 0" />
          <path d="M0 34 Q 0 12 12 0" opacity="0.7" />
          <path d="M6 40 Q 14 30 22 22" opacity="0.7" />
          <circle cx="22" cy="22" r="2.5" fill="url(#ic-gold-line)" />
        </g>
        <!-- top-right -->
        <g transform="translate(766 34) scale(-1 1)">
          <path d="M0 46 Q 0 0 46 0" />
          <path d="M0 34 Q 0 12 12 0" opacity="0.7" />
          <path d="M6 40 Q 14 30 22 22" opacity="0.7" />
          <circle cx="22" cy="22" r="2.5" fill="url(#ic-gold-line)" />
        </g>
        <!-- bottom-left -->
        <g transform="translate(34 1096) scale(1 -1)">
          <path d="M0 46 Q 0 0 46 0" />
          <path d="M0 34 Q 0 12 12 0" opacity="0.7" />
          <circle cx="22" cy="22" r="2.5" fill="url(#ic-gold-line)" />
        </g>
        <!-- bottom-right -->
        <g transform="translate(766 1096) scale(-1 -1)">
          <path d="M0 46 Q 0 0 46 0" />
          <path d="M0 34 Q 0 12 12 0" opacity="0.7" />
          <circle cx="22" cy="22" r="2.5" fill="url(#ic-gold-line)" />
        </g>
      </g>
    </svg>

    <!-- ===== Content (centered axis) ===== -->
    <div class="content">
      <!-- BASMALA CARTOUCHE -->
      <div class="basmala-cartouche">
        <p class="basmala" dir="rtl" lang="ar">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
      </div>

      <p class="sub-badge">۔۔ بিশেষ আমন্ত্রণপত্র ۔۔</p>

      <!-- ORGANIZER SEAL (focal anchor) -->
      <div class="seal">
        <div class="seal-logo">
          <img :src="logoSrc" alt="Organization logo" />
        </div>
        <div class="seal-text">
          <p class="seal-name">{{ organizer }}</p>
          <p class="seal-sub">Esho Qur'an Shiki</p>
        </div>
      </div>

      <InvitationCardOrnamentDivider />

      <!-- INVITATION WORDING -->
      <p class="invite-call">
        সসম্মানে আপনাকে ও আপনার পরিবারকে আমাদের আয়োজনে উপস্থিত থাকার জন্য
        আন্তরিকভাবে আমন্ত্রণ জানাচ্ছি
      </p>

      <!-- HERO TITLE -->
      <div class="title-block">
        <h1 class="title">{{ title }}</h1>
        <p class="hijri">। {{ hijriYear }} ।</p>
      </div>

      <InvitationCardOrnamentDivider />

      <!-- CHIEF GUEST -->
      <section class="section">
        <h2 class="section-heading">।। সম্মানিত প্রধান অতিথি ও প্রধান বিচারক ।।</h2>
        <p class="guest-name">{{ chiefGuestName }}</p>
        <p class="guest-bio">{{ chiefGuestBio }}</p>
      </section>

      <!-- EVENT DETAILS -->
      <section class="section details">
        <div class="detail">
          <span class="detail-ico">📅</span>
          <p class="detail-key">তারিখ ও সময়</p>
          <p class="detail-val">{{ date }}</p>
          <p class="detail-sub">সকাল ১০:০০ – বিকাল ০৫:০০</p>
        </div>
        <span class="detail-sep" aria-hidden="true">◆</span>
        <div class="detail">
          <span class="detail-ico">📍</span>
          <p class="detail-key">অনুষ্ঠানস্থল</p>
          <p class="detail-val">{{ venue }}</p>
          <p class="detail-sub">{{ venueAddress }}</p>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <InvitationCardOrnamentDivider />
        <p class="dua-note">আপনার উপস্থিতি আমাদের আয়োজনকে বরকতময় করবে ইনশাআল্লাহ</p>
        <p class="dua-ar" dir="rtl" lang="ar">جَزَاكُمُ اللَّهُ خَيْرًا</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
  /**
   * Traditional "Symmetric Luxury" invitation card.
   * All fields are props so the card can be reused with different data.
   */
  // Import the bundled logo so it works through a :src binding.
  import logoAsset from "~/assets/imgs/logo.png";

  defineProps({
    title: { type: String, default: "বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা" },
    hijriYear: { type: String, default: "১৪৪৮ হিজরী" },
    date: { type: String, default: "[Insert Date Here]" },
    chiefGuestName: { type: String, default: "উস্তাদ নাসিল শাহরুখ" },
    chiefGuestBio: {
      type: String,
      default: "মুফাসসিরে কুরআন ও স্কলার (BUET & Egypt Qira'at Ijazah Holder)",
    },
    venue: { type: String, default: "হেরিটেজ হাইটস এন্ড ব্যাংকুয়েট হল" },
    venueAddress: {
      type: String,
      default: "মেট্রোপলিটন মার্কেট (২য় তলা), সুবহানীঘাট, সিলেট।",
    },
    organizer: { type: String, default: "এসো কুরআন শিখি" },
    // Swap for your own logo file, e.g. ~/assets/imgs/your-logo.png
    logoSrc: { type: String, default: logoAsset },
  });

  // Bengali (Hind Siliguri) + Arabic (Amiri) typography.
  useHead({
    link: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Hind+Siliguri:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap",
      },
    ],
  });
</script>

<style scoped>
  /* ===== Tokens ===== */
  .invitation-card {
    --ic-green: #1b4332;
    --ic-green-2: #2d6a4f;
    --ic-green-soft: #e8f5e9;
    --ic-green-soft-2: #d8ead9;
    --ic-ink: #1c2d27;
    --ic-ink-2: #2b3a34;
    --ic-ink-mute: #5d6b65;
    --ic-gold: #c5a059;
    --ic-gold-light: #f3e5ab;
    --ic-gold-deep: #d4af37;
    --ic-gold-dark: #aa771c;
    --ic-card: #ffffff;

    position: relative;
    width: 800px;
    height: 1130px;
    overflow: hidden;
    border-radius: 6px;
    font-family: "Hind Siliguri", "kalpurush", system-ui, sans-serif;
    color: var(--ic-ink);
    isolation: isolate;
    box-shadow: 0 24px 60px -20px rgba(27, 67, 50, 0.35);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  @media (max-width: 860px) {
    .invitation-card {
      width: min(800px, 94vw);
      height: auto;
      aspect-ratio: 800 / 1130;
    }
  }

  /* ===== Layers ===== */
  .bg-gradient {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(110% 60% at 50% 0%, #ffffff 0%, transparent 50%),
      linear-gradient(175deg, #f4f9f5 0%, #e8f2ea 60%, #dde9df 100%);
    z-index: 1;
  }
  .bg-pattern { position: absolute; inset: 0; z-index: 2; }
  .frame { position: absolute; inset: 0; z-index: 3; pointer-events: none; }

  /* ===== Content ===== */
  .content {
    position: relative;
    z-index: 5;
    height: 100%;
    padding: 64px 80px 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 22px;
  }

  /* --- Basmala cartouche --- */
  .basmala-cartouche {
    padding: 10px 40px;
    border-top: 1px solid var(--ic-gold-deep);
    border-bottom: 1px solid var(--ic-gold-deep);
    position: relative;
  }
  .basmala-cartouche::before,
  .basmala-cartouche::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 70%;
    height: 1px;
    background: var(--ic-gold-light);
    transform: translateX(-50%);
  }
  .basmala-cartouche::before { top: 4px; }
  .basmala-cartouche::after { bottom: 4px; }
  .basmala {
    font-family: "Amiri", serif;
    font-size: 30px;
    font-weight: 700;
    color: var(--ic-green);
    line-height: 1.4;
    margin: 0;
  }

  /* --- Sub badge --- */
  .sub-badge {
    font-family: "Hind Siliguri", "kalpurush", serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--ic-gold-dark);
    letter-spacing: 1px;
    margin: -6px 0 4px;
  }

  /* --- Organizer seal (focal) --- */
  .seal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .seal-logo {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid var(--ic-gold-deep);
    box-shadow: 0 4px 14px rgba(170, 119, 28, 0.2);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
  }
  .seal-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }
  .seal-text { line-height: 1.2; }
  .seal-name {
    font-size: 24px;
    font-weight: 700;
    color: var(--ic-green);
    margin: 0;
  }
  .seal-sub {
    font-family: "Cormorant Garamond", serif;
    font-size: 14px;
    font-weight: 500;
    color: var(--ic-gold-dark);
    margin: 2px 0 0;
    letter-spacing: 2.5px;
    text-transform: uppercase;
  }

  /* --- Invitation wording --- */
  .invite-call {
    font-size: 17px;
    font-weight: 400;
    color: var(--ic-ink-mute);
    line-height: 1.75;
    margin: 0;
    max-width: 540px;
    font-style: italic;
  }

  /* --- Hero title --- */
  .title-block { margin: 2px 0; }
  .title {
    font-size: 44px;
    font-weight: 700;
    line-height: 1.25;
    color: var(--ic-green);
    margin: 0;
    max-width: 620px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  .hijri {
    font-size: 20px;
    font-weight: 600;
    color: var(--ic-gold-dark);
    margin: 10px 0 0;
    letter-spacing: 1px;
  }

  /* --- Sections --- */
  .section { width: 100%; max-width: 600px; }
  .section-heading {
    font-size: 16px;
    font-weight: 600;
    color: var(--ic-gold-dark);
    letter-spacing: 0.8px;
    margin: 0 0 10px;
  }
  .guest-name {
    font-size: 26px;
    font-weight: 700;
    color: var(--ic-green);
    margin: 0 0 6px;
    line-height: 1.3;
  }
  .guest-bio {
    font-size: 15px;
    font-weight: 400;
    color: var(--ic-ink-mute);
    margin: 0;
    line-height: 1.5;
  }

  /* --- Details row --- */
  .details {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 18px;
  }
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 14px 10px;
  }
  .detail-ico { font-size: 22px; line-height: 1; }
  .detail-key {
    font-size: 13px;
    font-weight: 600;
    color: var(--ic-gold-dark);
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin: 4px 0 0;
  }
  .detail-val {
    font-size: 17px;
    font-weight: 600;
    color: var(--ic-green);
    margin: 0;
    line-height: 1.3;
  }
  .detail-sub {
    font-size: 13px;
    font-weight: 400;
    color: var(--ic-ink-mute);
    margin: 0;
    line-height: 1.4;
  }
  .detail-sep {
    color: var(--ic-gold-deep);
    font-size: 12px;
    align-self: center;
    opacity: 0.7;
  }

  /* --- Footer --- */
  .footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
  }
  .dua-note {
    font-size: 15px;
    font-weight: 500;
    color: var(--ic-ink-2);
    margin: 0;
  }
  .dua-ar {
    font-family: "Amiri", serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--ic-green);
    margin: 0;
    line-height: 1.4;
  }

  /* ===== Print ===== */
  @media print {
    .invitation-card {
      width: 100%;
      height: auto;
      aspect-ratio: 800 / 1130;
      border-radius: 0;
      box-shadow: none;
    }
  }
</style>
