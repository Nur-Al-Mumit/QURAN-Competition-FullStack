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
              বিশুদ্ধ কুরআনপাঠ
            </span>
            <br />
            <span class="text-black-600 text-4xl whitespace-nowrap">
              প্রতিযোগিতা ১৪৪৮ হিজরী
            </span>
          </h1>

          <div class="max-w-4xl mx-auto sm:mt-10">
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

          <!-- Date & Venue Card -->
          <div class="max-w-4xl mx-auto sm:mt-10">
            <div
              class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200"
            >
              <div class="grid sm:grid-cols-2 gap-6 text-center sm:text-left">
                <!-- Dates -->
                <div class="bg-emerald-50 rounded-xl p-5">
                  <div
                    class="flex items-center justify-center sm:justify-start mb-2"
                  >
                    <svg
                      class="w-6 h-6 text-emerald-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 class="text-lg font-semibold text-emerald-800">
                      তারিখ সমূহ
                    </h3>
                  </div>
                  <p class="text-emerald-800 mb-1">
                    <span class="font-semibold">প্রাথমিক বাছাই পর্ব:</span>
                    ২১ জুলাই
                  </p>
                  <p class="text-emerald-800">
                    <span class="font-semibold">চূড়ান্ত পর্ব:</span>
                    ৩০শে জুলাই
                  </p>
                </div>

                <!-- Venue -->
                <div class="bg-emerald-50 rounded-xl p-5">
                  <div
                    class="flex items-center justify-center sm:justify-start mb-2"
                  >
                    <svg
                      class="w-6 h-6 text-emerald-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h3 class="text-lg font-semibold text-emerald-800">
                      ভেন্যু
                    </h3>
                  </div>
                  <p class="text-emerald-800 font-semibold">
                    হেরিটেজ হাইটস এন্ড ব্যাংকুয়েট হল
                  </p>
                  <p class="text-emerald-700 text-sm mt-1">
                    মেট্রোপলিটন মার্কেট (২য় তলা), সুবহানীঘাট, সিলেট
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Registration Section -->
    <section class="py-10 bg-gradient-to-r from-emerald-500 to-emerald-600">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl shadow-2xl p-3 lg:p-12 text-center">
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
            রেজিস্ট্রেশন চলছে
          </h2>

          <p class="text-lg text-gray-600 mb-8">
            রেজিস্ট্রেশনের শেষ তারিখ:
            <span class="font-bold text-emerald-700">
              ২০শে জুলাই, রাত ১২:০০
            </span>
          </p>

          <div class="border-emerald-ripple inline-block">
            <button
              @click="() => navigateTo('/registration')"
              class="group relative inline-flex items-center justify-center px-8 py-4 sm:text-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shine-sweep-effect"
            >
              <span class="relative flex items-center whitespace-nowrap">
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

          <p class="mt-6">
            <a href="/registration" class="text-[13px] text-gray-500">
              রেজিস্ট্রেশন লিংক:
              <span class="text-emerald-600 font-medium">
                competition.eshoquranshikhi.org/registration
              </span>
            </a>
          </p>
        </div>
      </div>
    </section>

    <!-- Syllabus Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            সিলেবাস
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            <span class="font-semibold text-red-500">বি: দ্রঃ</span>
            শুধুমাত্র দেখে দেখে তিলাওয়াত করতে হবে, মুখস্থ করার প্রয়োজন নেই।
          </p>
          <div
            class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full mt-4"
          ></div>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Beginner -->
          <div
            class="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 shadow-md hover:scale-102 transition duration-300"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div class="ml-4 text-left">
                <h3 class="text-2xl font-bold text-emerald-800">প্রাথমিক</h3>
                <p class="text-emerald-600 text-lg" dir="rtl">المبتدئ</p>
              </div>
            </div>
            <div class="flex items-center text-emerald-700">
              <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              <span class="whitespace-nowrap font-semibold">
                ২৯ ও ৩০ তম পারা
              </span>
            </div>
            <p class="text-emerald-700 mt-2 text-center sm:text-left">
              (সূরাতুল মুলক – সূরাতুন নাস)
            </p>
          </div>

          <!-- Skilled -->
          <div
            class="bg-amber-50 border border-amber-200 rounded-2xl p-8 shadow-md hover:scale-102 transition duration-300"
          >
            <div class="flex items-center mb-6">
              <div
                class="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
              <div class="ml-4 text-left">
                <h3 class="text-2xl font-bold text-amber-800">দক্ষ</h3>
                <p class="text-amber-600 text-lg" dir="rtl">الماهر</p>
              </div>
            </div>
            <div class="flex items-center text-amber-700">
              <div class="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
              <span class="whitespace-nowrap font-semibold">
                ১৫ থেকে ৩০ পারা
              </span>
            </div>
            <p class="text-amber-700 mt-2 text-center sm:text-left">
              (সূরাতুল কাহফ – সূরাতুন নাস)
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Eligibility Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            অংশগ্রহণের যোগ্যতা
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"
          ></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4"
            >
              <svg
                class="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">ন্যূনতম বয়স</h3>
            <p class="text-gray-600">ন্যূনতম বয়স ১৬ হতে হবে।</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4"
            >
              <svg
                class="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6zm-12 0a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">ব্যাকগ্রাউন্ড</h3>
            <p class="text-gray-600">জেনারেল ব্যাকগ্রাউন্ডের পুরুষ হতে হবে।</p>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4"
            >
              <svg
                class="w-8 h-8 text-emerald-600"
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
            <h3 class="text-lg font-bold text-gray-800 mb-2">তিলাওয়াত</h3>
            <p class="text-gray-600">দেখে কুরআন তিলাওয়াতে সক্ষম হতে হবে।</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Steps Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            অংশগ্রহণের ধাপসমূহ
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
            <!-- Step 1 -->
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
                      রেজিস্ট্রেশন
                    </h3>
                  </div>
                  <p class="text-emerald-700">
                    ২০শে জুলাই রাত ১২:০০ টার মধ্যে ওয়েবসাইটে
                    <span class="font-semibold">
                      (competition.eshoquranshikhi.org/
                      <br class="sm:hidden" />
                      registration)
                    </span>
                    রেজিস্ট্রেশন সম্পন্ন করতে হবে।
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
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
                      টোকেন সংগ্রহ
                    </h3>
                  </div>
                  <p class="text-emerald-700">
                    ওয়েবসাইট থেকে রেজিস্ট্রেশন টোকেন অবশ্যই সংগ্রহ করতে হবে এবং
                    পরীক্ষার সময় ঐ টোকেন নিয়ে আসতে হবে।
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
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
                      <span class="text-white font-bold">৩</span>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-800 ml-4">
                      বাছাই পর্ব
                    </h3>
                  </div>
                  <p class="text-emerald-700">
                    ২১ জুলাই বাছাই পর্ব অনুষ্ঠিত হবে। সুনির্দিষ্ট নির্দেশনা
                    রেজিস্ট্রেশন টোকেন এ উল্লখে করা থাকবে।
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 4 -->
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
                      <span class="text-white font-bold">৪</span>
                    </div>
                    <h3 class="text-xl font-bold text-emerald-800 ml-4">
                      বিশেষ ফ্রি প্রশিক্ষণ
                    </h3>
                  </div>
                  <p class="text-emerald-700">
                    প্রাথমিক المبتدئ বিভাগের জন্য দক্ষ প্রশিক্ষক দ্বারা ৫ দিনের
                    একটি বিশুদ্ধ কুরআন পাঠের ফ্রি প্রশিক্ষণের ব্যবস্থা থাকবে।
                    (এই প্রশিক্ষণে অংশগ্রহণের মাধ্যমেই প্রতিযোগিতায় অংশগ্রহণ
                    নিশ্চিত করতে হবে); 'দক্ষ (الماهر) ' বিভাগের জন্য এই
                    প্রশিক্ষণ ঐচ্ছিক।
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
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
                      চূড়ান্ত পর্ব
                    </h3>
                  </div>
                  <p class="text-emerald-700">
                    ৩০ জুলাই চূড়ান্ত পর্ব অনুষ্ঠিত হবে। সুনির্দিষ্ট নির্দেশনা
                    ওয়েবসাইট/এসএমএস (SMS) এর মাধ্যমে জানিয়ে দেওয়া হবে।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rewards Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            পুরস্কার
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full shine-sweep-effect"
          ></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- First Prize -->
          <div
            class="bg-white border border-emerald-300 rounded-2xl p-8 text-center shadow-lg hover:scale-102 transition duration-300"
          >
            <div
              class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-3xl">🥇</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800">১ম পুরস্কার</h3>
            <ul class="text-left text-gray-700 space-y-2 text-sm">
              <li class="flex items-center">
                <span class="text-emerald-500 mr-2">•</span>
                কুরআনুল কারীমের তাফসীর
              </li>
              <li class="flex items-center">
                <span class="text-emerald-500 mr-2">•</span>
                ইসলামি ফিকহ
              </li>
              <li class="flex items-center">
                <span class="text-emerald-500 mr-2">•</span>
                <span class="font-bold text-gray-900">নগদ ৭,০০০/-</span>
              </li>
            </ul>
            <p class="text-xs text-gray-500 mt-4">
              (সাথে ইসলামিক বই এবং বিশেষ ব্যাজিয়া, ইত্যাদি)
            </p>
          </div>

          <!-- Second Prize -->
          <div
            class="bg-white border border-emerald-300 rounded-2xl p-8 text-center shadow-lg hover:scale-102 transition duration-300"
          >
            <div
              class="w-16 h-16 bg-emerald-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-3xl">🥈</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800">২য় পুরস্কার</h3>
            <ul class="text-left text-gray-700 space-y-2 text-sm">
              <li class="flex items-center">
                <span class="text-emerald-500 mr-2">•</span>
                কুরআনুল কারীমের তাফসীর
              </li>
              <li class="flex items-center">
                <span class="text-emerald-500 mr-2">•</span>
                <span class="font-bold text-gray-900">নগদ ৫,০০০/-</span>
              </li>
            </ul>
            <p class="text-xs text-gray-500 mt-4">
              (সাথে ইসলামিক বই এবং বিশেষ ব্যাজিয়া, ইত্যাদি)
            </p>
          </div>

          <!-- Third Prize -->
          <div
            class="bg-white border border-emerald-300 rounded-2xl p-8 text-center shadow-lg hover:scale-102 transition duration-300"
          >
            <div
              class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-3xl">🥉</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800">৩য় পুরস্কার</h3>
            <ul class="text-left text-gray-700 space-y-2 text-sm">
              <li class="flex items-center">
                <span class="text-emerald-500 mr-2">•</span>
                কুরআনুল কারীমের তাফসীর
              </li>
              <li class="flex items-center">
                <span class="text-emerald-500 mr-2">•</span>
                <span class="font-bold text-gray-900">নগদ ৩,০০০/-</span>
              </li>
            </ul>
            <p class="text-xs text-gray-500 mt-4">
              (সাথে ইসলামিক বই এবং বিশেষ ব্যাজিয়া, ইত্যাদি)
            </p>
          </div>
        </div>

        <!-- Participation -->
        <div class="mt-8">
          <div
            class="bg-gradient-to-r from-emerald-100 to-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center shadow-md"
          >
            <div
              class="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mb-3"
            >
              <span class="text-2xl">🎖️</span>
            </div>
            <p class="text-lg font-semibold text-emerald-800">
              অংশগ্রহণকারী সকলের জন্য থাকবে বিশেষ সান্ত্বনা পুরস্কার
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Relevant Info Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            প্রাসঙ্গিক তথ্যাবলি
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"
          ></div>
        </div>

        <div class="space-y-6 max-w-4xl mx-auto">
          <!-- Division -->
          <div class="bg-emerald-50 rounded-2xl p-6 shadow-md">
            <div class="flex items-start">
              <span class="text-2xl mr-3">👉</span>
              <p class="text-gray-700">
                বাছাই পর্বে প্রতিযোগীদের ভাইভার পর তাদের দুটি বিভাগে ভাগ করা
                হবে—
              </p>
            </div>
            <div class="mt-4 grid sm:grid-cols-2 gap-4">
              <div class="bg-white rounded-xl p-4 border border-emerald-200">
                <h4 class="font-bold text-emerald-800">
                  'দক্ষ'
                  <span class="text-emerald-600" dir="rtl">(الماهر)</span>
                </h4>
                <p class="text-sm text-gray-600 mt-1">
                  যারা কুরআন তিলাওয়াতে পারদর্শী (যেকোনো সূরা)
                </p>
              </div>
              <div class="bg-white rounded-xl p-4 border border-emerald-200">
                <h4 class="font-bold text-emerald-800">
                  'প্রাথমিক'
                  <span class="text-emerald-600" dir="rtl">(المبتدئ)</span>
                </h4>
                <p class="text-sm text-gray-600 mt-1">
                  যারা দেখে তিলাওয়াত করতে পারেন কিন্তু তাজবীদের উন্নয়নের সুযোগ
                  রয়েছে।
                </p>
              </div>
            </div>
          </div>

          <!-- Training -->
          <div class="bg-emerald-50 rounded-2xl p-6 shadow-md">
            <div class="flex items-start">
              <span class="text-2xl mr-3">👉</span>
              <p class="text-gray-700">
                প্রাথমিক
                <span class="font-semibold" dir="rtl">المبتدئ</span>
                বিভাগের জন্য দক্ষ প্রশিক্ষক দ্বারা ৫ দিনের একটি বিশুদ্ধ কুরআন
                পাঠের ফ্রি প্রশিক্ষণের ব্যবস্থা থাকবে। (এই প্রশিক্ষণে অংশগ্রহণের
                মাধ্যমেই প্রতিযোগিতায় অংশগ্রহণ নিশ্চিত করতে হবে); 'দক্ষ
                <span class="font-semibold" dir="rtl">(الماهر)</span>
                ' বিভাগের জন্য এই প্রশিক্ষণ ঐচ্ছিক।
              </p>
            </div>
          </div>

          <!-- Venue -->
          <div class="bg-emerald-50 rounded-2xl p-6 shadow-md">
            <div class="flex items-start">
              <span class="text-2xl mr-3">👉</span>
              <p class="text-gray-700">
                পরীক্ষার সকল কার্যক্রম উল্লেখিত ভেন্যুতে অনুষ্ঠিত হবে।
              </p>
            </div>
          </div>

          <!-- Authority Decision -->
          <div class="bg-emerald-50 rounded-2xl p-6 shadow-md">
            <div class="flex items-start">
              <span class="text-2xl mr-3">👉</span>
              <p class="text-gray-700">
                প্রতিযোগিতার ক্ষেত্রে বিধি মাতাবেক কর্তৃপক্ষের সিদ্ধান্তই
                চূড়ান্ত বলে গণ্য হবে, ইনশা আল্লাহ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Organizer & Contact Section -->
    <section class="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 text-center"
        >
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-8">
            আয়োজনে: এশো কুরআন শিখি
          </h2>

          <div class="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <a
              href="https://facebook.com/eshoquranshikhiorg"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white/15 hover:bg-white/25 rounded-xl p-4 text-white transition-all duration-300 hover:scale-105"
            >
              <svg
                class="w-8 h-8 mx-auto mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              <p class="text-sm font-medium">Facebook</p>
              <p class="text-xs text-white/80">eshoquranshikhiorg</p>
            </a>

            <a
              href="https://youtube.com/@eshoquranshikhiorg"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white/15 hover:bg-white/25 rounded-xl p-4 text-white transition-all duration-300 hover:scale-105"
            >
              <svg
                class="w-8 h-8 mx-auto mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
              <p class="text-sm font-medium">YouTube</p>
              <p class="text-xs text-white/80">eshoquranshikhiorg</p>
            </a>

            <a
              href="https://eshoquranshikhi.org"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white/15 hover:bg-white/25 rounded-xl p-4 text-white transition-all duration-300 hover:scale-105"
            >
              <svg
                class="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <p class="text-sm font-medium">Website</p>
              <p class="text-xs text-white/80">eshoquranshikhi.org</p>
            </a>
          </div>

          <div class="border-t border-white/20 pt-8">
            <p class="text-white/90 mb-2">
              রেজিস্ট্রেশন সহ যেকোনো প্রয়োজনে নিচের নাম্বারে যোগাযোগ করুন
            </p>
            <a
              href="tel:+8801805777332"
              class="inline-flex items-center text-2xl font-bold text-white hover:scale-105 transition-transform duration-300"
            >
              <svg
                class="w-7 h-7 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +880 1805 777 332
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>
