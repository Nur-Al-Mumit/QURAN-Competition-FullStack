// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা ১৪৪৮",
      meta: [
        {
          name: "description",
          content:
            "জেনারেল শিক্ষিত প্রাপ্তবয়স্কদের জন্য কুরআন দেখে বিশুদ্ধ তিলাওয়াত প্রতিযোগিতা। পুরস্কার ৭,০০০ টাকা পর্যন্ত। রেজিস্ট্রেশন সম্পন্ন।",
        },
        {
          name: "keywords",
          content:
            "কুরআন, প্রতিযোগিতা, কুরআন দেখে পড়া, তিলাওয়াত, বাংলাদেশ, ইসলাম, জেনারেল শিক্ষা",
        },
        {
          property: "og:title",
          content: "বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা ১৪৪৮",
        },
        {
          property: "og:description",
          content:
            "জেনারেল শিক্ষিত প্রাপ্তবয়স্কদের জন্য কুরআন দেখে বিশুদ্ধ তিলাওয়াত প্রতিযোগিতা। পুরস্কার ৭,০০০ টাকা পর্যন্ত। রেজিস্ট্রেশন সম্পন্ন।",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  css: ["~/assets/css/style.css"],
  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:9000/api/v1",
      posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || "phc_xVSV6z5ZLuRPjcC9sQ6xPoyxKr2q5iP8GZ4ixkQHiCNp",
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    },
  },
  compatibilityDate: "2025-05-03",
});
