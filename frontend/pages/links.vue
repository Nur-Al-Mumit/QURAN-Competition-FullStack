<template>
  <div
    class="links-page-bg relative min-h-screen w-full flex items-start sm:items-center justify-center px-0 sm:px-4 py-0 sm:py-6 overflow-hidden"
  >
    <!-- Animated background blobs (desktop only) -->
    <div class="pointer-events-none absolute inset-0 hidden sm:block">
      <div class="absolute top-[-10%] left-[-5%] w-[28rem] h-[28rem] bg-emerald-400/20 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-[-10%] right-[-5%] w-[26rem] h-[26rem] bg-amber-300/20 rounded-full blur-3xl animate-float-slower"></div>
    </div>

    <main
      class="links-card relative w-full max-w-none sm:max-w-[340px] bg-white shadow-none sm:shadow-[0_25px_60px_-15px_rgba(6,95,70,0.35)] rounded-none sm:rounded-[32px] overflow-hidden flex flex-col sm:min-h-[640px]"
    >
      <!-- ===================== HEADER ===================== -->
      <header class="relative px-6 pt-10 pb-12 text-center text-white overflow-hidden bg-header">
        <!-- Islamic geometric pattern overlay -->
        <div class="absolute inset-0 opacity-[0.13]" aria-hidden="true">
          <div
            class="absolute inset-0"
            style="
              background-image: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.55) 1.5px, transparent 1.5px),
                radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.4) 1.5px, transparent 1.5px);
              background-size: 28px 28px;
            "
          ></div>
        </div>
        <!-- Soft top sheen -->
        <div class="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/15 to-transparent pointer-events-none"></div>
        <!-- Bottom curve dip into the white body -->
        <svg
          class="absolute -bottom-px left-0 w-full h-6 text-white"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,12 C25,0 75,0 100,12 L100,12 L0,12 Z" fill="currentColor" />
        </svg>

        <div class="relative flex flex-col items-center">
          <!-- Pulsing ring behind avatar -->
          <div class="relative">
            <span class="absolute inset-0 rounded-full bg-white/30 animate-ping-slow"></span>
            <div class="relative w-24 h-24 rounded-full bg-white p-1.5 shadow-2xl ring-4 ring-white/40">
              <img
                src="~/assets/imgs/logo.png"
                alt="এসো কুরআন শিখি লোগো"
                class="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>

          <h1 class="mt-4 text-[22px] font-bold tracking-tight drop-shadow-sm">এসো কুরআন শিখি</h1>
        </div>
      </header>

      <!-- ===================== LINKS ===================== -->
      <div class="relative px-4 pt-3 pb-2 space-y-2.5 flex-1 flex flex-col justify-center">
        <button
          v-for="(link, i) in links"
          :key="link.name"
          type="button"
          @click="openLink(link)"
          :style="{ animationDelay: `${i * 70}ms` }"
          class="link-item group flex w-full items-center gap-3 rounded-2xl bg-white p-2.5 text-left shadow-[0_2px_10px_-3px_rgba(0,0,0,0.12)] ring-1 ring-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(0,0,0,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <!-- Icon tile with brand gradient -->
          <span
            class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
            :style="{ background: link.gradient }"
          >
            <span class="w-6 h-6" v-html="link.icon"></span>
          </span>

          <span class="min-w-0 flex-1">
            <span class="block text-[14.5px] font-semibold text-gray-900 leading-tight">{{ link.name }}</span>
            <span class="block truncate text-[11.5px] text-gray-500">{{ link.handle }}</span>
          </span>

          <!-- Arrow chip -->
          <span
            class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-200 group-hover:bg-emerald-50 group-hover:text-emerald-600"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      <!-- ===================== SHARE ===================== -->
      <div class="relative px-4 pt-3 pb-7">
        <div class="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2">
          <span
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400"
          >
            অথবা শেয়ার করুন
          </span>
        </div>

        <button
          type="button"
          @click="sharePage"
          class="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all duration-200 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          এই পেজ শেয়ার করুন
        </button>

        <p class="mt-3 text-center text-[10.5px] leading-snug text-gray-400">
          আমাদের সাথে যুক্ত হতে যেকোনো প্ল্যাটফর্মে ক্লিক করুন
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: false,
  });

  useHead({
    title: "আমাদের সাথে যুক্ত হোন — এসো কুরআন শিখি",
    meta: [
      {
        name: "description",
        content:
          "এসো কুরআন শিখি — ফেসবুক, ইউটিউব, টেলিগ্রাম, হোয়াটসঅ্যাপ ও ইনস্টাগ্রামে আমাদের সাথে যুক্ত হোন।",
      },
    ],
  });

  // NOTE: Update the channel URLs / handles below if any of them change.
  const links = [
    {
      name: "Facebook",
      handle: "@eshoquranshikhiorg",
      url: "https://facebook.com/eshoquranshikhiorg",
      gradient: "linear-gradient(135deg, #2a8fff 0%, #0f5fd8 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    },
    {
      name: "YouTube",
      handle: "@eshoquranshikhiorg",
      url: "https://youtube.com/@eshoquranshikhiorg",
      gradient: "linear-gradient(135deg, #ff5a5f 0%, #d10000 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    },
    {
      name: "Telegram Channel",
      handle: "@eshoquranshikhiorg",
      url: "https://t.me/eshoquranshikhiorg",
      gradient: "linear-gradient(135deg, #4cc6ff 0%, #1b91d6 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    },
    {
      name: "WhatsApp Channel",
      handle: "এসো কুরআন শিখি",
      url: "https://whatsapp.com/channel/0029Vb8UbTQFcow1uv3aeQ0V",
      gradient: "linear-gradient(135deg, #3df57f 0%, #13a94a 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`,
    },
    // {
    //   name: "Instagram",
    //   handle: "@eshoquranshikhiorg",
    //   url: "https://instagram.com/eshoquranshikhiorg",
    //   gradient: "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
    //   icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    // },
  ];

  const openLink = (link) => {
    if (process.client) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  const sharePage = async () => {
    if (!process.client) return;

    const shareUrl = window.location.href;
    const shareData = {
      title: "এসো কুরআন শিখি — আমাদের সাথে যুক্ত হোন",
      text: "এসো কুরআন শিখি — আমাদের সাথে যুক্ত হতে এই লিংকে ক্লিক করুন।",
      url: shareUrl,
    };

    // 1) Phone / supporting browser -> open native share UI.
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled (AbortError) -> do nothing; otherwise fall through to copy.
        if (err && err.name === "AbortError") return;
      }
    }

    // 2) Fallback: try clipboard copy.
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        copied = true;
      } catch (e) {
        copied = false;
      }
    }

    // 3) Legacy fallback for older browsers.
    if (!copied) {
      try {
        const ta = document.createElement("textarea");
        ta.value = shareUrl;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        copied = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch (e) {
        copied = false;
      }
    }

    if (copied && typeof window.showSuccess === "function") {
      window.showSuccess("লিংক কপি হয়েছে!", "পেজ লিংকটি ক্লিপবোর্ডে কপি করা হয়েছে।");
    } else if (typeof window.showError === "function") {
      window.showError("কপি ব্যর্থ", "অনুগ্রহ করে ম্যানুয়ালি লিংকটি কপি করুন।");
    }
  };
</script>

<style scoped>
  /* Full-page backdrop: a calm Islamic-themed gradient. */
  .links-page-bg {
    background: linear-gradient(135deg, #ecfdf5 0%, #ffffff 45%, #fef3c7 100%);
  }

  /* Rich emerald header with depth. */
  .bg-header {
    background:
      radial-gradient(120% 80% at 50% 0%, rgba(255, 255, 255, 0.12), transparent 60%),
      linear-gradient(160deg, #047857 0%, #065f46 45%, #022c22 100%);
  }

  /* On phones (below the sm breakpoint = 640px) the card fills the whole
     viewport width edge-to-edge with no rounded corners, behaving like a
     native full-screen page. On larger screens it stays a centered card. */
  @media (max-width: 639px) {
    .links-card {
      min-height: 100vh;
    }
  }

  /* ---- Entrance animations ---- */
  .link-item {
    opacity: 0;
    transform: translateY(10px);
    animation: link-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes link-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .link-item {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }
</style>

<style>
  /* Global (unscoped) so the utility classes resolve at runtime. */
  @keyframes float-slow {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, 25px) scale(1.05); }
  }
  @keyframes float-slower {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-22px, -18px) scale(1.07); }
  }
  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 0.5; }
    70%, 100% { transform: scale(1.7); opacity: 0; }
  }
  .animate-float-slow { animation: float-slow 14s ease-in-out infinite; }
  .animate-float-slower { animation: float-slower 18s ease-in-out infinite; }
  .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }

  @media (prefers-reduced-motion: reduce) {
    .animate-float-slow,
    .animate-float-slower,
    .animate-ping-slow {
      animation: none !important;
    }
  }
</style>
