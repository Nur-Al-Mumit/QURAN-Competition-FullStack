<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <!-- Page header -->
      <div class="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-lg p-6 text-white mb-6">
        <div class="flex items-center gap-3">
          <div class="bg-white/20 rounded-xl p-2.5">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-xl sm:text-2xl font-bold">লিংক পেজ পরিসংখ্যান</h1>
            <p class="text-emerald-100 text-sm mt-0.5">
              পাবলিক লিংক পেজের ভিজিট ও প্ল্যাটফর্ম ভিত্তিক ক্লিক সংখ্যা
            </p>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-emerald-200 border-t-emerald-600"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p class="text-red-700 font-medium">{{ error }}</p>
        <button
          @click="fetchStats"
          class="mt-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 transition-colors"
        >
          আবার চেষ্টা করুন
        </button>
      </div>

      <template v-else>
        <!-- Total visits hero card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-4">
              <div class="bg-emerald-100 rounded-2xl p-3.5">
                <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500 font-medium">মোট ভিজিট</p>
                <p class="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  {{ toBn(totalVisits) }}
                </p>
              </div>
            </div>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              প্রতি ব্রাউজারে একবার গণনা হয়
            </span>
          </div>
        </div>

        <!-- Section title -->
        <div class="flex items-center justify-between mb-3 px-1">
          <h2 class="text-lg font-semibold text-gray-800">প্ল্যাটফর্ম ভিত্তিক ক্লিক</h2>
          <span class="text-xs text-gray-400">মোট ক্লিক: {{ toBn(totalClicks) }}</span>
        </div>

        <!-- Platform cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="p in platformCards"
            :key="p.key"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <span
              class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-md"
              :style="{ background: p.gradient }"
            >
              <span class="w-6 h-6" v-html="p.icon"></span>
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900">{{ p.name }}</p>
              <p class="text-2xl font-bold text-gray-900 mt-0.5">{{ toBn(platforms[p.key]) }}</p>
              <div class="mt-1.5 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :style="{ width: pct(p.key), background: p.gradient }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Refresh -->
        <div class="mt-6 text-center">
          <button
            @click="fetchStats"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            রিফ্রেশ
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({ layout: "split" });

  useHead({ title: "লিংক পেজ পরিসংখ্যান — এসো কুরআন শিখি" });

  const loading = ref(true);
  const error = ref("");
  const totalVisits = ref(0);
  const platforms = ref({
    facebook: 0,
    youtube: 0,
    telegram: 0,
    whatsapp: 0,
    instagram: 0,
  });

  // Visual config per platform (matches the public links page icons).
  const platformCards = [
    {
      key: "facebook",
      name: "Facebook",
      gradient: "linear-gradient(135deg, #2a8fff 0%, #0f5fd8 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    },
    {
      key: "youtube",
      name: "YouTube",
      gradient: "linear-gradient(135deg, #ff5a5f 0%, #d10000 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    },
    {
      key: "telegram",
      name: "Telegram Channel",
      gradient: "linear-gradient(135deg, #4cc6ff 0%, #1b91d6 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    },
    {
      key: "whatsapp",
      name: "WhatsApp Channel",
      gradient: "linear-gradient(135deg, #3df57f 0%, #13a94a 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>`,
    },
    {
      key: "instagram",
      name: "Instagram",
      gradient: "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    },
  ];

  const totalClicks = computed(() =>
    Object.values(platforms.value).reduce((sum, n) => sum + Number(n || 0), 0),
  );

  const pct = (key) => {
    const t = totalClicks.value;
    if (!t) return "0%";
    return `${Math.round((Number(platforms.value[key] || 0) / t) * 100)}%`;
  };

  // Format a number into Bengali numerals.
  const toBn = (n) => Number(n || 0).toLocaleString("bn-BD");

  const fetchStats = async () => {
    loading.value = true;
    error.value = "";
    try {
      const { data } = await useAdminAuthenticatedAxios(
        "/admin/link-stats",
        null,
        null,
        "GET",
      );
      const payload = data?.data;
      if (payload) {
        totalVisits.value = payload.total_visits ?? 0;
        platforms.value = { ...platforms.value, ...(payload.platforms || {}) };
      }
    } catch (err) {
      error.value =
        err?.response?.data?.message ||
        "পরিসংখ্যান লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।";
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchStats();
  });
</script>
