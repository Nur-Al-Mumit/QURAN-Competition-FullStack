<template>
  <footer class="bg-gradient-to-b from-emerald-950 to-emerald-900 text-white relative overflow-hidden">
    <!-- Decorative Islamic geometric pattern overlay -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
              circle at 25% 25%,
              rgba(255, 255, 255, 0.15) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        "
      ></div>
    </div>

    <div class="relative z-10">
      <!-- Main Footer Content -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start"
        >
          <!-- Column 1: Logo & Organization -->
          <div class="flex flex-col items-center md:items-start text-center md:text-left">
            <div class="flex items-center gap-3 mb-4">
              <img
                src="~/assets/imgs/logo.png"
                alt="এসো কুরআন শিখি লোগো"
                class="w-16 h-16 rounded-full bg-white/10 p-1 object-contain shadow-lg shadow-emerald-900/50"
              />
              <div>
                <h3 class="text-xl font-bold text-white leading-tight">
                  এসো কুরআন শিখি
                </h3>
                <p class="text-emerald-300 text-sm mt-0.5">
                  Esho Qur'an Shikhi
                </p>
              </div>
            </div>
            <!-- <p class="text-emerald-200/70 text-sm leading-relaxed max-w-xs">
              কুরআনের আলোয় আলোকিত হোন। বিশুদ্ধ কুরআন শিক্ষা ও প্রতিযোগিতায়
              অংশগ্রহণ করুন।
            </p> -->
          </div>

          <!-- Column 2: Quick Links / Contact -->
          <div class="flex flex-col items-center text-center">
            <h4
              class="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-5"
            >
              যোগাযোগ
            </h4>
            <div class="space-y-3">
              <!-- Phone -->
              <a
                href="tel:+8801805777332"
                class="justify-center flex items-center gap-3 text-emerald-100/80 hover:text-white transition-colors group"
              >
                <span
                  class="w-9 h-9 rounded-full bg-emerald-800/60 flex items-center justify-center group-hover:bg-emerald-700 transition-colors shrink-0"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>
                <span class="text-sm">+880 1805 777 332</span>
              </a>

              <!-- Website -->
              <a
                href="mailto:info@eshoquranshikhi.org"
                target="_blank"
                rel="noopener noreferrer"
                class="justify-center flex items-center gap-3 text-emerald-100/80 hover:text-white transition-colors group"
              >
                <span
                  class="w-9 h-9 rounded-full bg-emerald-800/60 flex items-center justify-center group-hover:bg-emerald-700 transition-colors shrink-0"
                >✉️
                </span>
                <span class="text-sm">info@eshoquranshikhi.org</span>
              </a>
            </div>
          </div>

          <!-- Column 3: Social Media -->
          <div class="flex flex-col items-center md:items-end text-center md:text-right">
            <h4
              class="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-5"
            >
              সামাজিক মাধ্যম
            </h4>
            <div class="flex gap-3">
              <!-- Facebook -->
              <a
                href="https://facebook.com/eshoquranshikhiorg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                class="w-11 h-11 rounded-full bg-emerald-800/50 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>

              <!-- YouTube -->
              <a
                href="https://youtube.com/@eshoquranshikhiorg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                class="w-11 h-11 rounded-full bg-emerald-800/50 flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
              </a>

              <!-- Website link as social -->
              <a
                href="https://eshoquranshikhi.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                class="w-11 h-11 rounded-full bg-emerald-800/50 flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/25"
              >
               🌐
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-emerald-700/40">
        <div
          class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p class="text-emerald-300/60 text-xs">
            © ২০২৬ এসো কুরআন শিখি। সকল অধিকার সংরক্ষিত।
          </p>
          <p class="text-emerald-300/60 text-xs">
            বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা ১৪৪৮ হিজরি
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
