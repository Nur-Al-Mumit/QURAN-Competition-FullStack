<template>
  <div
    class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50"
  >
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-20 left-10 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-20 right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl"
        ></div>
      </div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
      >
        <div class="text-center">
          <!-- Main Title -->
          <h1
            class="text-[44px] lg:text-6xl font-bold text-gray-900 mb-6 leading-[48px]"
          >
            <span
              class="bg-gradient-to-r from-emerald-600 to-emerald-800 text-transparent whitespace-nowrap pt-1 bg-clip-text"
            >
              বিশুদ্ধ কুরআন পাঠ
            </span>
            <br />
            <span class="text-black-600 text-4xl whitespace-nowrap">
              প্রতিযোগিতা - ১৪৪৭ হিজরি
            </span>
          </h1>

          <div class="max-w-4xl mx-auto sm:mt-20">
            <div
              class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200"
            >
              <p
                class="text-base lg:text-xl text-gray-700 leading-relaxed mb-4"
              >
                <span class="font-semibold text-red-600">
                  শুধুমাত্র জেনারেল শিক্ষিত প্রাপ্তবয়স্ক ভাইদের জন্য
                </span>
              </p>
              <p class="text-[15px] lg:text-lg text-gray-600 leading-relaxed">
                <span class="font-semibold text-red-500">
                  মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন কেউ এই প্রতিযোগিতায় অংশগ্রহণ
                  করতে পারবেন না।
                </span>
                আমাদের লক্ষ্য হচ্ছে যারা কখনো মাদ্রাসায় পড়েননি, তাদের কুরআনের
                সাথে সম্পর্ক তৈরি করে শুদ্ধভাবে কুরআন পড়ার আগ্রহ সৃষ্টি করা।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Registration Section -->
    <section
      v-if="!false"
      class="py-16 bg-gradient-to-r from-emerald-500 to-emerald-600"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 text-center">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6"
          >
            <svg
              class="w-10 h-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <!-- রেজিস্ট্রেশন চলছে -->
            রেজিস্ট্রেশন শেষ হয়েছে
          </h2>

          <div v-if="false" class="grid md:grid-cols-2 gap-8 mb-8">
            <div
              class="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-400"
            >
              <h3 class="text-xl font-semibold text-emerald-800 mb-2">
                রেজিস্ট্রেশনের শেষ তারিখ
              </h3>
              <p class="text-2xl font-bold text-emerald-900">৩০ জুলাই</p>
            </div>

            <div
              class="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-400"
            >
              <h3 class="text-xl font-semibold text-emerald-800 mb-2">
                নোটিফিকেশন
              </h3>
              <p class="text-sm text-emerald-700">
                ৩১ জুলাই সকাল ১০টার মধ্যে SMS এবং ওয়েবসাইট জানানো হবে
              </p>
            </div>
          </div>

          <div v-if="false" class="border-emerald-ripple inline-block">
            <button
              @click="() => navigateTo('/registration')"
              class="group relative inline-flex items-center justify-center px-8 py-4 sm:text-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shine-sweep-effect"
            >
              <span class="relative flex items-center">
                <svg
                  class="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                এখনই রেজিস্ট্রেশন করুন
              </span>
            </button>
          </div>

          <div class="border-emerald-ripple inline-block mt-8">
            <button
              @click="() => navigateTo('/view-seat-plan-and-timing')"
              class="group relative inline-flex items-center justify-center px-8 py-4 sm:text-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shine-sweep-effect"
            >
              <span class="relative flex items-center text-3xl">
                <svg
                  class="w-8 h-8 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                আপনার সিট প্ল্যান দেখুন
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            প্রতিযোগিতা সময়সূচি ও ধাপসমূহ
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"
          ></div>
        </div>

        <div class="relative">
          <div
            class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-300 to-emerald-500 rounded-full lg:block"
          ></div>

          <div class="space-y-12">
            <!-- Timeline Item 1 -->
            <div class="relative flex items-center lg:justify-center">
              <div class="w-full lg:w-1/2 lg:pr-12">
                <div
                  class="bg-emerald-50 rounded-2xl p-6 shadow-lg border border-emerald-200 text-center sm:text-left"
                >
                  <div
                    class="flex items-center justify-center sm:justify-start mb-4"
                  >
                    <div
                      class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white font-bold">১</span>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-800 ml-4">
                      ৩০ জুলাই
                    </h3>
                  </div>
                  <p class="text-emerald-700">
                    ৩০ জুলাই রেজিস্ট্রেশনের শেষ দিন, ৩০ জুলাই রাত ১২টার মধ্যে
                    রেজিস্ট্রেশন সম্পন্ন করতে হবে
                  </p>
                </div>
              </div>
            </div>

            <!-- Timeline Item 2 -->
            <div class="relative flex items-center lg:justify-center">
              <div class="lg:w-1/2 lg:pl-12 lg:ml-auto">
                <div
                  class="bg-emerald-50 rounded-2xl p-6 shadow-lg border border-emerald-200 text-center sm:text-left"
                >
                  <div
                    class="flex items-center justify-center sm:justify-start mb-4"
                  >
                    <div
                      class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white font-bold">২</span>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-800 ml-4">
                      ৩১ জুলাই
                    </h3>
                  </div>
                  <p class="text-emerald-700">
                    অংশগ্রহণকারীদেরকে ৩১ জুলাই সকাল ১২টার মধ্যে মেসেজের মাধ্যমে
                    তার জন্য নির্ধারিত বাছাই পর্বের তারিখ ও সময় জানানো হবে
                  </p>
                </div>
              </div>
            </div>

            <!-- Timeline Item 3 -->
            <div class="relative flex items-center lg:justify-center">
              <div class="w-full lg:w-1/2 lg:pr-12">
                <div
                  class="bg-emerald-50 rounded-2xl p-4 sm:p-6 shadow-lg border border-emerald-200 text-center sm:text-left"
                >
                  <div
                    class="flex items-center justify-center sm:justify-start mb-4"
                  >
                    <div
                      class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white font-bold">৩</span>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-800 ml-4">
                      ১ আগস্ট
                    </h3>
                  </div>
                  <p class="text-[15px] sm:text-base text-emerald-700 mb-4">
                    প্রাথমিক বাছাইপর্ব (প্রয়োজনে ২ আগস্টেও হতে পারে)
                  </p>
                  <div class="bg-emerald-100 rounded-lg p-4">
                    <p class="text-[15px] text-emerald-800 font-medium mb-2">
                      বাছাইপর্ব হবে ওয়ান-টু-ওয়ান ভাইভা পদ্ধতিতে এবং ভাগ করে
                      ডাকা হবে
                      <strong class="text-emerald-900">উদাহরণস্বরূপ</strong>
                      <span class="whitespace-nowrap">
                        &nbsp;(১০০ জনের জন্য):
                      </span>
                    </p>
                    <ul
                      class="text-[15px] text-emerald-700 space-y-1 text-left"
                    >
                      <li>• প্রথম ২০ জন: সকাল ৯টা – ১০টা</li>
                      <li>• পরবর্তী ২০ জন: সকাল ১০টা – ১১টা</li>
                      <li>• সময় ও তারিখ ব্যক্তিগত মেসেজে জানানো হবে</li>
                      <li>• অংশগ্রহণকারীর সংখ্যা বেশি হলে ২ আগস্টেও হবে</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline Item 4 -->
            <div class="relative flex items-center lg:justify-center">
              <div class="w-full lg:w-1/2 lg:pl-12 lg:ml-auto">
                <div
                  class="bg-emerald-50 rounded-2xl p-6 shadow-lg border border-emerald-200 text-center sm:text-left"
                >
                  <div
                    class="flex items-center justify-center sm:justify-start mb-4"
                  >
                    <div
                      class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white font-bold">৪</span>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-800 ml-4">
                      ৩ – ৭ আগস্ট
                    </h3>
                  </div>
                  <p class="text-emerald-700">
                    প্রাথমিক পর্বে উত্তীর্ণ কিন্তু ভুল থাকা ভাইদের জন্য
                    <strong>ফ্রি প্রশিক্ষণ</strong>
                  </p>
                </div>
              </div>
            </div>

            <!-- Timeline Item 5 -->
            <div class="relative flex items-center lg:justify-center">
              <div class="w-full lg:w-1/2 lg:pr-12">
                <div
                  class="bg-emerald-50 rounded-2xl p-6 shadow-lg border border-emerald-200 text-center sm:text-left"
                >
                  <div
                    class="flex items-center justify-center sm:justify-start mb-4"
                  >
                    <div
                      class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center"
                    >
                      <span class="text-white font-bold">৫</span>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-800 ml-4">
                      ৯ আগস্ট
                    </h3>
                  </div>
                  <p class="text-emerald-700 font-semibold text-lg">
                    চূড়ান্ত পর্ব
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Competition Details -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Primary Selection -->
          <div
            class="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border-t-4 border-emerald-500"
          >
            <div class="flex items-center justify-center sm:justify-start mb-6">
              <div
                class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-emerald-800 ml-4">
                প্রাথমিক বাছাইপর্ব
              </h3>
            </div>
            <div class="bg-emerald-50 rounded-xl p-6 text-center sm:text-left">
              <p class="text-emerald-800 leading-relaxed">
                প্রাথমিক বাছাইপর্বে কুরআন
                <strong>দেখে পড়তে পারলে</strong>
                উত্তীর্ণ ধরা হবে। তাজবিদ ও উচ্চারণে ভুল থাকলেও চলবে। তবে যারা
                দেখে পড়তে পারেন না, তারা এই ধাপে বাদ পড়বেন।
              </p>
            </div>
          </div>

          <!-- Final Round Surahs -->
          <div
            class="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border-t-4 border-emerald-500"
          >
            <div class="flex items-center justify-center sm:justify-start mb-6">
              <div
                class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-emerald-800 ml-4">
                চূড়ান্ত পর্বের সিলেবাস
              </h3>
            </div>
            <div
              class="bg-emerald-50 rounded-xl p-4 sm:p-6 text-center sm:text-left"
            >
              <p class="text-emerald-800 mb-4">
                নির্বাচিত অংশগ্রহণকারীদের নিম্নোক্ত সূরাগুলো থেকে দেখে তিলাওয়াত
                করতে হবে:
              </p>
              <div class="space-y-3">
                <div class="flex items-center text-emerald-700">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  <span class="whitespace-nowrap">
                    সুরা আলা থেকে সুরা নাস (৩০ পারা)
                  </span>
                </div>
                <div class="flex items-center text-emerald-700">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  <span>সুরা কিয়ামাহ</span>
                </div>
                <div class="flex items-center text-emerald-700">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  <span>সুরা মুজাম্মিল</span>
                </div>
                <div class="flex items-center text-emerald-700">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  <span>সুরা মুলক</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8"
          >
            <svg
              class="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>

          <h2
            class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6"
          >
            আমাদের লক্ষ্য
          </h2>

          <p class="sm:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
            যারা শুদ্ধভাবে পড়তে পারেন না, তাদেরকে উৎসাহ ও সহানুভূতির মাধ্যমে
            আবার কুরআনের পথে ফিরিয়ে আনা। কুরআনের মাধ্যমে জীবনে পরিবর্তন আনা এবং
            সালাত সুন্দর করার পথে সহায়তা করাই আমাদের উদ্দেশ্য।
          </p>
        </div>
      </div>
    </section>

    <!-- Rewards Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            পুরস্কার ও সম্মাননা
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full shine-sweep-effect"
          ></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- First Prize -->
          <div
            class="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center shadow-md hover:scale-102 transition duration-300"
          >
            <div
              class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-3xl">🥇</span>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">প্রথম পুরস্কার</h3>
            <p class="text-2xl font-bold text-gray-900">১৫,০০০ টাকা</p>
          </div>

          <!-- Second Prize -->
          <div
            class="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center shadow-md hover:scale-102 transition duration-300"
          >
            <div
              class="w-16 h-16 bg-emerald-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-3xl">🥈</span>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">
              দ্বিতীয় পুরস্কার
            </h3>
            <p class="text-2xl font-bold text-gray-900">১০,০০০ টাকা</p>
          </div>

          <!-- Third Prize -->
          <div
            class="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center shadow-md hover:scale-102 transition duration-300"
          >
            <div
              class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-3xl">🥉</span>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">
              তৃতীয় পুরস্কার
            </h3>
            <p class="text-2xl font-bold text-gray-900">৫,০০০ টাকা</p>
          </div>

          <!-- Participation -->
          <div
            class="bg-emerald-50 border border-emerald-300 rounded-2xl p-8 text-center shadow-md hover:scale-102 transition duration-300"
          >
            <div
              class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-3xl">🎖️</span>
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-800 whitespace-nowrap">
              অংশগ্রহণকারী সকলের জন্য
            </h3>
            <p class="text-lg font-semibold text-gray-700">বিশেষ হাদিয়া</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>
