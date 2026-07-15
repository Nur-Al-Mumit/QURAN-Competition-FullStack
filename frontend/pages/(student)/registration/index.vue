<template>
  <div class="min-h-[80vh] bg-emerald-50/40 py-8 px-4">
    <div class="sm:max-w-3xl mx-auto">
      <!-- Header -->
      <div
        class="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white px-6 py-8 sm:px-10 sm:py-10 text-center mb-6"
      >
        <!-- decorative pattern -->
        <div
          class="pointer-events-none absolute inset-0 opacity-10"
          style="
            background-image: radial-gradient(
              circle at 1px 1px,
              white 1px,
              transparent 0
            );
            background-size: 22px 22px;
          "
        ></div>
        <div class="relative">
          <div
            class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/15 mb-3"
          >
            <svg
              class="w-6 h-6 text-amber-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-4-4 1.41-1.41L11 14.67l5.59-5.59L18 10.5l-7 7z"
              />
            </svg>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight">
            বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
          </h1>
          <p class="mt-1 text-emerald-100 font-medium">রেজিস্ট্রেশন ফর্ম</p>
          <div
            class="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-400/15 border border-amber-300/30 px-3 py-1 text-xs font-medium text-amber-100"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য
          </div>
        </div>
      </div>

      <!-- Live seat availability -->
      <div
        v-if="capacityLoaded"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6"
      >
        <div class="flex items-center justify-between mb-2 text-sm">
          <span class="font-semibold text-gray-700">আসন সংরক্ষিত</span>
          <span
            class="font-bold"
            :class="isRegistrationFull ? 'text-red-600' : 'text-emerald-600'"
          >
            {{ registrationInfo.count }} / {{ registrationInfo.max }}
          </span>
        </div>
        <div class="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="isRegistrationFull ? 'bg-red-500' : 'bg-emerald-500'"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <p
          v-if="!isRegistrationFull"
          class="mt-2 text-xs text-gray-500 text-center"
        >
          আসন বাকি {{ registrationInfo.remaining }}
        </p>
        <p v-else class="mt-2 text-xs text-red-500 text-center font-semibold">
          আসন পূর্ণ
        </p>
      </div>

      <form
        @submit.prevent="formSubmit"
        class="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <!-- Section: Personal Information -->
        <div class="p-6 sm:p-8 border-b border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 shrink-0"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <div>
              <h2 class="text-lg font-bold text-gray-800">ব্যক্তিগত তথ্য</h2>
              <p class="text-xs text-gray-400">পরিচয় ও যোগাযোগের তথ্য</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
            <inputs-base-input
              label="নাম (বাংলায়):"
              placeholder="আপনার নাম"
              v-model="useFormStore.form.name_bn"
              :required="true"
            />
            <inputs-base-input
              label="নাম (ইংরেজিতে):"
              placeholder="Your Name"
              v-model="useFormStore.form.name_en"
              :required="true"
            />
            <div class="relative">
              <inputs-base-input
                v-model="useFormStore.form.dob"
                :required="true"
                label="জন্ম তারিখ:"
                placeholder="আপনার জন্ম তারিখ"
                type="date"
                :max="maxDob"
              />
              <p v-if="dobError" class="text-red-500 text-sm mt-1">
                আপনার বয়স ১ জুলাই ২০২৫ এর হিসেবে কমপক্ষে ১৬ বছর হতে হবে।
              </p>
            </div>
            <inputs-base-input
              :required="true"
              type="number"
              label="মোবাইল নম্বর:"
              v-model="useFormStore.form.phone"
              placeholder="মোবাইল নাম্বার"
              :disable="studentInfoStore.user?.phone ? true : false"
            />
            <inputs-base-input
              type="email"
              label="ইমেইল:"
              v-model="useFormStore.form.email"
              placeholder="example@domain.com"
            />
            <inputs-base-input
              v-model="useFormStore.form.occupation"
              :required="true"
              placeholder="আপনার পেশা"
              label="পেশা:"
            />
            <inputs-base-input
              label="ঠিকানা:"
              placeholder="আপনার ঠিকানা"
              v-model="useFormStore.form.address"
              class="w-full sm:col-span-2"
              :required="true"
            />
          </div>
        </div>

        <!-- Section: Education -->
        <div class="p-6 sm:p-8 border-b border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 shrink-0"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M3.337 4.5l6.663 3.429 6.663-3.429L10 1.071 3.337 4.5zM2 6.256V15.5l7 3.6V9.857L2 6.256zM11 19.1l7-3.6V6.256l-7 3.601v9.243z"
                />
              </svg>
            </span>
            <div>
              <h2 class="text-lg font-bold text-gray-800">শিক্ষাগত তথ্য</h2>
              <p class="text-xs text-gray-400">আপনার শিক্ষার পটভূমি</p>
            </div>
          </div>

          <h3
            class="text-sm font-semibold text-gray-600 mb-3 text-center sm:text-left"
          >
            আপনার শিক্ষার ধরন নির্বাচন করুন
          </h3>
          <div class="flex items-center justify-center sm:justify-start">
            <inputs-base-radio
              :options="educationOptions"
              v-model="useFormStore.form.education_background"
              :colors="{
                2: 'bg-red-500 text-white border-red-500',
                3: 'bg-red-500 text-white border-red-500',
              }"
            />
          </div>

          <!-- Madrasah background -->
          <div
            v-if="
              useFormStore.form.education_background === 2 ||
              useFormStore.form.education_background === 3
            "
            class="mt-5 space-y-4 rounded-xl border border-amber-200 bg-amber-50 p-4"
          >
            <div class="flex gap-2.5">
              <svg
                class="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-sm text-amber-800 leading-relaxed">
                আপনি যদি মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন হন, তাহলে সাধারণভাবে এই
                প্রতিযোগিতায় অংশগ্রহণ করতে পারবেন না। তবে যদি আপনি কুরআন পড়া
                মাদ্রাসায় শিখে না থাকেন, বা অন্য কারণে মাদ্রাসার সাথে যুক্ত
                ছিলেন, তাহলে বিষয়টি যাচাই করে দেখা হবে। কর্তৃপক্ষের বিবেচনায় আপনি
                উপযুক্ত হলে এসএমএস বা ওয়েবসাইটের মাধ্যমে জানানো হবে।
              </p>
            </div>
            <inputs-base-input
              v-model="useFormStore.form.madrasah_name"
              type="text"
              label="মাদ্রাসার নাম:"
              placeholder="মাদ্রাসার নাম"
              :required="true"
              class="w-full"
            />
            <div>
              <h3 class="pl-1 mb-1 font-semibold text-left text-sm">
                বিস্তারিত:
                <span class="text-red-600">*</span>
              </h3>
              <textarea
                required
                v-model="useFormStore.form.madrasah_study_details"
                placeholder="মাদ্রাসায় আপনি কী পড়েছেন বিস্তারিত লিখুন..."
                class="w-full px-5 border rounded-lg outline-hidden focus:border-primary base-tran py-2 focus:outline-none"
              ></textarea>
            </div>
          </div>

          <!-- General institutions -->
          <div
            v-if="
              useFormStore.form.education_background === 1 ||
              useFormStore.form.education_background === 3
            "
            class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <inputs-base-input
              v-model="useFormStore.form.school_name"
              type="text"
              label="স্কুলের নাম:"
              placeholder="স্কুলের নাম"
              :required="true"
            />
            <inputs-base-input
              v-model="useFormStore.form.college_name"
              type="text"
              label="কলেজের নাম:"
              placeholder="কলেজের নাম"
            />
            <inputs-base-input
              v-model="useFormStore.form.university_name"
              type="text"
              label="ভার্সিটির নাম:"
              placeholder="ভার্সিটির নাম"
            />
          </div>
        </div>

        <!-- Section: Participation -->
        <div class="p-6 sm:p-8 border-b border-gray-100">
          <div class="flex items-center gap-3 mb-6">
            <span
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 shrink-0"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <div>
              <h2 class="text-lg font-bold text-gray-800">অংশগ্রহণের তথ্য</h2>
              <p class="text-xs text-gray-400">প্রতিযোগিতা সম্পর্কিত প্রশ্ন</p>
            </div>
          </div>

          <div class="space-y-5">
            <div
              class="rounded-xl border-2 bg-gray-50/50 p-4 text-center sm:text-left base-tran"
              :class="invalidFields.includes('gender') ? 'border-red-500 bg-red-50/50' : 'border-gray-200'"
            >
              <h3 class="font-semibold mb-3 text-gray-700">
                প্রতিযোগী পুরুষ নাকি নারী তা নির্বাচন করুন
              </h3>
              <div class="flex items-center justify-center sm:justify-start">
                <inputs-base-radio
                  :options="genderOptions"
                  v-model="useFormStore.form.gender"
                  :required="true"
                  :colors="{
                    2: 'bg-red-500 text-white border-red-500',
                  }"
                />
              </div>
            </div>

            <div
              class="rounded-xl border-2 bg-gray-50/50 p-4 text-center sm:text-left base-tran"
              :class="invalidFields.includes('is_recitation') ? 'border-red-500 bg-red-50/50' : 'border-gray-200'"
            >
              <h3 class="font-semibold mb-3 text-gray-700">
                আপনি কি দেখে কুরআন তেলাওয়াত করতে পারেন?
              </h3>
              <div class="flex items-center justify-center sm:justify-start">
                <inputs-base-radio
                  :options="yesNoOptions"
                  v-model="useFormStore.form.is_recitation"
                  :colors="{
                    0: 'bg-red-500 text-white border-red-500',
                  }"
                />
              </div>
            </div>

            <div
              class="rounded-xl border-2 bg-gray-50/50 p-4 text-center sm:text-left base-tran"
              :class="invalidFields.includes('need_training') ? 'border-red-500 bg-red-50/50' : 'border-gray-200'"
            >
              <h3 class="font-semibold mb-3 text-gray-700">
                আপনি কি কুরআন পাঠের প্রশিক্ষণে অংশগ্রহণ করতে চান?
              </h3>
              <div class="flex items-center justify-center sm:justify-start">
                <inputs-base-radio
                  :options="yesNoOptions"
                  v-model="useFormStore.form.need_training"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Rules -->
        <div class="p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <span
              class="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 shrink-0"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <div>
              <h2 class="text-lg font-bold text-gray-800">নিয়মাবলী ও সম্মতি</h2>
              <p class="text-xs text-gray-400">শর্তাবলী পড়ে সম্মতি দিন</p>
            </div>
          </div>

          <div
            class="rounded-xl border border-red-100 bg-red-50/60 p-4 mb-5 text-center sm:text-left"
          >
            <p class="text-red-600 text-[13px] sm:text-sm leading-relaxed">
              প্রতিযোগিতায় অংশগ্রহণের জন্য নিয়মাবলী ও শর্তাবলী পড়ে সম্মতি
              প্রদান করা বাধ্যতামূলক। দয়া করে
              <NuxtLink
                to="/competition-rules"
                class="text-emerald-600 hover:text-emerald-800 underline hover:scale-105 transition-transform duration-200 font-medium"
              >
                নিয়মাবলী
              </NuxtLink>
              ভালোভাবে পড়ুন এবং নিশ্চিত করুন যে আপনি সম্মত হচ্ছেন এবং
              প্রতিযোগিতার সকল শর্ত মেনে চলতে প্রস্তুত।
            </p>
          </div>
          <div
            class="flex items-center justify-center rounded-xl border-2 base-tran p-1"
            :class="invalidFields.includes('rulesAgreement') ? 'border-red-500 bg-red-50/50' : 'border-transparent'"
          >
            <inputs-base-radio
              :options="rulesAgreementOptions"
              v-model="useFormStore.form.rulesAgreement"
              :required="true"
              :colors="{
                2: 'bg-red-500 text-white border-red-500',
              }"
            />
          </div>
        </div>

        <!-- Submit -->
        <div class="px-6 sm:px-8 py-6 bg-gray-50/70 border-t border-gray-100">
          <button
            :disabled="isFormDisabled"
            class="inline-flex justify-center items-center px-6 py-3.5 rounded-xl text-base font-bold w-full transition-all duration-200 group relative cursor-pointer text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          >
            <span v-if="useFormStore.form?.reg_no">আপডেট করুন</span>
            <span v-else>সাবমিট করুন</span>
            <div class="absolute right-6">
              <span v-if="!isFormSubmit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2 group-hover:translate-x-1 base-trans"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span v-else v-html="getIcons('sppiner', `w-[20px]`)"></span>
            </div>
          </button>
        </div>
      </form>

      <!-- Modals -->

      <modal :is-open="isModalOpen">
        <template #body>
          <div class="p-5">
            <h1 class="text-red-600 font-semibold leading-relaxed text-center">
              আপনি যদি মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন হন, তাহলে সাধারণভাবে এই
              প্রতিযোগিতায় অংশগ্রহণ করতে পারবেন না। তবে যদি আপনি কুরআন পড়া
              মাদ্রাসায় শিখে না থাকেন, বা অন্য কারণে মাদ্রাসার সাথে যুক্ত ছিলেন,
              তাহলে বিষয়টি যাচাই করে দেখা হবে। কর্তৃপক্ষের বিবেচনায় আপনি উপযুক্ত
              হলে এসএমএস বা ওয়েবসাইটের মাধ্যমে জানানো হবে।
            </h1>

            <div class="flex justify-center mt-6">
              <button
                @click="() => (isModalOpen = false)"
                class="text-red-600 hover:text-red-800 transition cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 md:h-12 md:w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </template>
      </modal>

      <modal :is-open="isRecitationModalOpen">
        <template #body>
          <div class="p-5">
            <h1 class="text-red-600 font-semibold leading-relaxed text-center">
              তাজবিদ বা উচ্চারণে সীমিত ভুল গ্রহণযোগ্য হলেও, দেখে কুরআন পড়তে না
              পারলে প্রাথমিক বাছাই পর্বে নির্বাচিত করা সম্ভব হবে না।
            </h1>

            <div class="flex justify-center mt-6">
              <button
                @click="() => (isRecitationModalOpen = false)"
                class="text-red-600 hover:text-red-800 transition cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 md:h-12 md:w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </template>
      </modal>

      <modal :is-open="isTrainingModalOpen">
        <template #body>
          <div class="p-5">
            <h1 class="text-green-600 font-semibold leading-relaxed text-center">
              যাদের তিলাওয়াত পরিপূর্ণ শুদ্ধ নয়, তাদের জন্য দক্ষ হাফিযদের মাধ্যমে ২২ জুলাই থেকে ২৭ জুলাই
              পর্যন্ত ৫ দিনব্যাপী একটি বিশেষ ও সম্পূর্ণ ফ্রি প্রশিক্ষণের আয়োজন
              করা হয়েছে।
            </h1>

            <div class="flex justify-center mt-6">
              <button
                @click="() => (isTrainingModalOpen = false)"
                class="text-green-600 hover:text-green-800 transition cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 md:h-12 md:w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </template>
      </modal>

      <modal :is-open="isGenderModalOpen">
        <template #body>
          <div class="p-5">
            <h1 class="text-red-600 font-semibold leading-relaxed text-center">
              <strong>দুঃখিত!</strong>
              এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য। ইনশাআল্লাহ পরবর্তী কোনো
              প্রতিযোগিতায় নারীদেরও ব্যবস্থা রাখা হবে
            </h1>
            <div class="flex justify-center mt-6">
              <button
                @click="() => (isGenderModalOpen = false)"
                class="text-red-600 hover:text-red-800 transition cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 md:h-12 md:w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </template>
      </modal>

      <modal :is-open="isDisclaimerModalOpen">
        <template #body>
          <div class="p-3 sm:p-6 mx-auto">
            <!-- Warning Icon -->
            <div class="flex justify-center mb-4">
              <svg
                class="w-16 h-16 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <!-- Title -->
            <h2 class="text-xl font-bold text-center mb-6 text-red-700">
              প্রতিযোগিতার শর্তাবলী
            </h2>

            <!-- Exclusion Criteria -->
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-5">
              <h3 class="text-red-700 font-semibold mb-3 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                যারা অংশগ্রহণ করতে পারবেন না
              </h3>
              <div class="space-y-2 text-[16px] text-red-700">
                <div class="flex items-center">
                  <span class="text-red-500 mr-2">•</span>
                  <span>
                    <span class="font-medium">যাদের বয়স ১৬ বছরের কম</span>
                  </span>
                </div>
                <div class="flex items-center">
                  <span class="text-red-500 mr-2">•</span>
                  <span>মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন ব্যক্তি</span>
                </div>
                <div class="flex items-center">
                  <span class="text-red-500 mr-2">•</span>
                  <span>দেখে কুরআন পড়তে না পারা ব্যক্তি</span>
                </div>
                <div class="flex items-center">
                  <span class="text-red-500 mr-2">•</span>
                  <span>হাফিজে কুরআন</span>
                </div>
                <div class="flex items-center">
                  <span class="text-red-500 mr-2">•</span>
                  <span class="font-medium">নারী</span>
                </div>
              </div>
            </div>

            <div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p class="text-red-700 text-sm text-center leading-relaxed">
                <strong>দুঃখিত!</strong>
                এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য। ইনশাআল্লাহ পরবর্তী কোনো
                প্রতিযোগিতায় নারীদেরও ব্যবস্থা রাখা হবে
              </p>
            </div>
            <!-- Detailed Rules Link -->
            <div class="text-center mb-6">
              <a
                href="/competition-rules"
                class="text-emerald-600 hover:text-emerald-800 text-sm font-medium underline decoration-emerald-300 hover:decoration-emerald-600 transition-colors"
              >
                বিস্তারিত নিয়মাবলী ও শর্তাদি দেখুন
              </a>
            </div>

            <!-- Action Button -->
            <div class="flex justify-center">
              <button
                @click="() => (isDisclaimerModalOpen = false)"
                class="inline-flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-sm hover:shadow-md font-bold"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                বুঝেছি
              </button>
            </div>
          </div>
        </template>
      </modal>

      <modal :is-open="isRegCloseModalOpen">
        <template #body>
          <div class="p-5 max-w-md">
            <div class="flex justify-center mb-4">
              <div
                class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center"
              >
                <svg
                  class="w-9 h-9 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h1
              class="text-xl text-red-600 font-semibold leading-relaxed text-center"
            >
              দুঃখিত! এই সেশনের জন্য রেজিস্ট্রেশন বন্ধ হয়ে গেছে।
            </h1>

            <p class="text-center text-sm text-gray-600 mt-2">
              মোট {{ registrationInfo.max }} আসনের সবগুলো পূরণ হয়ে গেছে।
            </p>

            <!-- Wishlist form (shown until successfully submitted) -->
            <div v-if="!isWishlistSubmitted" class="mt-5 space-y-3">
              <p class="text-sm text-center text-gray-700 leading-relaxed">
                পরবর্তী সেশনের আগে আগে জানানোর জন্য আপনার মোবাইল নম্বরটি দিন
                (ওয়েটলিস্ট)। ইনশাআল্লাহ আমরা আপনাকে জানাব।
              </p>
              <inputs-base-input
                label="মোবাইল নম্বর:"
                placeholder="০১XXXXXXXXX"
                v-model="wishlistPhone"
                :required="true"
              />
              <inputs-base-input
                label="নাম (ঐচ্ছিক):"
                placeholder="আপনার নাম"
                v-model="wishlistName"
              />
              <button
                :disabled="isWishlistSubmitting"
                @click="submitWishlist"
                class="w-full inline-flex justify-center items-center px-6 py-3 border rounded-md text-base font-bold transition-colors duration-200 cursor-pointer border-emerald-800 text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span v-if="!isWishlistSubmitting">ওয়েটলিস্টে যুক্ত করুন</span>
                <span v-else>অপেক্ষা করুন...</span>
              </button>
            </div>

            <!-- Success state after wishlist submission -->
            <div v-else class="mt-5 text-center">
              <div class="flex justify-center mb-3">
                <div
                  class="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <p class="text-emerald-700 font-semibold">
                জাযাকাল্লাহু খইরন! আপনাকে ওয়েটলিস্টে যুক্ত করা হয়েছে।
              </p>
            </div>

            <div class="flex justify-center mt-6">
              <button
                @click="() => (isRegCloseModalOpen = false)"
                class="text-red-600 hover:text-red-800 transition cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 md:h-12 md:w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </template>
      </modal>
    </div>
  </div>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";

  const { isStudentLoggedIn } = useStudentAuthInfoStore();
  const registeredFormStore = useRegisteredFormStore();
  const studentInfoStore = useStudentInfoStore();
  const studentAuthStore = useStudentAuthStore();
  const useFormStore = useCompetitionFormStore();

  const educationOptions = [
    { id: 1, title: "general", name: "জেনারেল" },
    { id: 2, title: "madrasah", name: "মাদ্রাসা" },
    { id: 3, title: "both", name: "উভয়" },
  ];

  const yesNoOptions = [
    { id: 1, name: "হ্যাঁ" },
    { id: 0, name: "না" },
  ];

  const genderOptions = [
    { id: 1, name: "পুরুষ" },
    { id: 2, name: "নারী" },
  ];

  // Define rules agreement options
  const rulesAgreementOptions = [
    { id: 1, name: "হ্যাঁ, আমি নিয়মাবলীতে সম্মত" },
    { id: 2, name: "না, আমি সম্মত নই" },
  ];

  // Modals state
  let isModalOpen = ref(false);
  let isGenderModalOpen = ref(false);
  let isTrainingModalOpen = ref(false);
  let isRegCloseModalOpen = ref(false);
  let isDisclaimerModalOpen = ref(true);
  let isRecitationModalOpen = ref(false);

  let isDisable = ref(false);
  let isFormSubmit = ref(false);

  // Registration capacity (auto-assigned slots, capped at max on backend)
  let isRegistrationFull = ref(false);
  let capacityLoaded = ref(false);
  let registrationInfo = ref({ count: 0, max: 50, remaining: 50 });

  // Wishlist (waitlist) form state
  let wishlistPhone = ref("");
  let wishlistName = ref("");
  let isWishlistSubmitting = ref(false);
  let isWishlistSubmitted = ref(false);

  async function checkRegistrationCapacity() {
    try {
      const { data } = await useAxios(
        "/registration/get-count",
        null,
        null,
        "GET"
      );
      if (data?.data) {
        registrationInfo.value = {
          count: data.data.registration_count ?? 0,
          max: data.data.max_registrations ?? 50,
          remaining: data.data.remaining ?? 50,
        };
        isRegistrationFull.value = !!data.data.is_full;
        capacityLoaded.value = true;
        if (isRegistrationFull.value) {
          isRegCloseModalOpen.value = true;
        }
      }
    } catch (error) {
      // Fail open: if the count endpoint is unreachable, allow the form
      capacityLoaded.value = false;
    }
  }

  async function submitWishlist() {
    const phone = (wishlistPhone.value || "").trim();
    if (!/^01[0-9]{9}$/.test(phone)) {
      window.showError(
        "Error!",
        "দয়া করে একটি সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন",
        3000
      );
      return;
    }
    isWishlistSubmitting.value = true;
    window.showLoading("Submitting...");
    try {
      await useAxios(
        "/registration/wishlist",
        { phone, name: wishlistName.value || null },
        null,
        "POST"
      );
      window.hideLoading();
      isWishlistSubmitted.value = true;
      window.showSuccess(
        "Success!",
        "আপনাকে ওয়েটলিস্টে যুক্ত করা হয়েছে। পরবর্তী সেশনে ইনশাআল্লাহ আমরা জানাব।",
        4000
      );
    } catch (error) {
      window.hideLoading();
      window.showError(
        "Error!",
        error?.response?.data?.message || "Something went wrong",
        3000
      );
    } finally {
      isWishlistSubmitting.value = false;
    }
  }

  // Compute max date for 16 years old as of July 22, 2025
  const maxDob = computed(() => {
    const date = new Date("2025-07-21");
    date.setFullYear(date.getFullYear() - 16);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  });

  // Validate date of birth
  const dobError = computed(() => {
    if (!useFormStore.form.dob) return false;
    const selectedDate = new Date(useFormStore.form.dob);
    const cutoffDate = new Date("2025-07-21");
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 16);
    return selectedDate > cutoffDate;
  });

  const progressPercent = computed(() => {
    const max = registrationInfo.value.max || 50;
    const count = registrationInfo.value.count || 0;
    return Math.min(100, Math.round((count / max) * 100));
  });

  const missingRequiredFields = computed(() => {
    const missing = [];
    if (useFormStore.form.gender === null || useFormStore.form.gender === undefined)
      missing.push("gender");
    if (useFormStore.form.is_recitation !== 1) missing.push("is_recitation");
    if (useFormStore.form.need_training === null || useFormStore.form.need_training === undefined)
      missing.push("need_training");
    if (useFormStore.form.rulesAgreement !== 1) missing.push("rulesAgreement");
    return missing;
  });

  let showValidationErrors = ref(false);

  const invalidFields = computed(() => {
    if (!showValidationErrors.value) return [];
    return missingRequiredFields.value;
  });

  const isFormDisabled = computed(() => {
    return (
      dobError.value ||
      useFormStore.form.gender === 2 ||
      useFormStore.form.rulesAgreement !== 1 ||
      missingRequiredFields.value.length > 0
    );
  });

  watch(
    () => useFormStore.form.education_background,
    (newValue) => {
      if (newValue === 2 || newValue === 3) {
        isModalOpen.value = true;
      }
    }
  );

  watch(
    () => useFormStore.form.is_recitation,
    (newValue) => {
      if (newValue === 0) {
        isRecitationModalOpen.value = true;
      }
    }
  );

  watch(
    () => useFormStore.form.need_training,
    (newValue) => {
      if (newValue === 1) {
        isTrainingModalOpen.value = true;
      }
    }
  );

  watch(
    () => useFormStore.form.gender,
    (newValue) => {
      if (newValue === 2) {
        isGenderModalOpen.value = true;
      }
    }
  );

  watch(
    () => useFormStore.form.rulesAgreement,
    (newValue) => {
      if (newValue !== 1) {
        isDisclaimerModalOpen.value = true;
      }
    }
  );

  async function formSubmit() {
    showValidationErrors.value = true;
    if (isRegistrationFull.value) {
      isRegCloseModalOpen.value = true;
      return;
    }
    // isRegCloseModalOpen.value = true;
    // return;
    if (useFormStore.form.gender === 2) {
      isGenderModalOpen.value = true;
      return;
    }
    if (isFormDisabled.value) {
      return;
    }
    // if (dobError.value) {
    //   return;
    // }

    let endPoint = ref("");
    let payload = ref(null);

    if (!isStudentLoggedIn) {
      window.showLoading("Sending OTP...");

      endPoint.value = "/auth/send-otp";
      payload.value = {
        phone: useFormStore.form.phone,
      };

      try {
        const { data } = await useAxios(
          endPoint.value,
          payload.value,
          null,
          "POST"
        );

        window.hideLoading();
        window.showSuccess("Success!", "OTP sent successfully", 3000);

        if (data?.data) {
          studentAuthStore.formRegistration = {
            otp: data.data.otp ?? null,
            uuid: data.data.uuid,
            expires_at: data.data.expires_at,
            attempts: 0,
          };
          navigateTo("/registration/otp");
        }
      } catch (error) {
        window.hideLoading();
        window.showError(
          "Error!",
          error?.response?.data?.message || "Something went wrong",
          3000
        );
      }
    } else if (!studentInfoStore.form?.reg_no) {
      window.showLoading("Submitting Form...");

      endPoint.value = "/registration/update";
      payload.value = {
        ...useFormStore.form,
      };

      try {
        const { data } = await useAuthenticatedAxios(
          endPoint.value,
          payload.value,
          null,
          "POST"
        );

        if (data?.data?.form?.reg_no) {
          window.hideLoading();
          window.showSuccess("Success!", "Form Updated successfully", 3000);

          studentInfoStore.form = data.data.form;
          studentInfoStore.user.name_bn = data.data.form.name_bn;
          studentInfoStore.user.name_en = data.data.form.name_en;

          registeredFormStore.registeredForm = data.data.form;
          registeredFormStore.allocation = data.data.allocation || null;
          navigateTo("/registration/token");
        }

        console.log(data);
      } catch (error) {
        window.hideLoading();
        window.showError(
          "Error!",
          error?.response?.data?.message || "Something went wrong",
          3000
        );
      }
    } else {
      window.showLoading("Submitting Form...");

      endPoint.value = "/registration/update";
      payload.value = {
        ...useFormStore.form,
      };

      try {
        const { data } = await useAuthenticatedAxios(
          endPoint.value,
          payload.value,
          null,
          "POST"
        );

        if (data?.data?.form?.reg_no) {
          window.hideLoading();
          window.showSuccess("Success!", "Form Updated successfully", 3000);

          studentInfoStore.form = data.data.form;
          studentInfoStore.user.name_bn = data.data.form.name_bn;
          studentInfoStore.user.name_en = data.data.form.name_en;

          registeredFormStore.registeredForm = data.data.form;
          registeredFormStore.allocation = data.data.allocation || null;
          navigateTo("/registration/token");
        }
      } catch (error) {
        window.hideLoading();
        window.showError(
          "Error!",
          error?.response?.data?.message || "Something went wrong",
          3000
        );
      }
    }
  }

  onMounted(async () => {
    await studentInfoStore.fetchUserProfile();

    if (studentInfoStore.user) {
      useFormStore.form.phone = studentInfoStore.user?.phone;
      useFormStore.form.email = studentInfoStore.user?.email;
    }

    if (studentInfoStore.form?.reg_no) {
      useFormStore.form = studentInfoStore.form;
      useFormStore.form.gender = 1;
      useFormStore.form.rulesAgreement = 1;
      useFormStore.form.education_background = 1;
    }

    // Existing registrants already have a slot; only gate new registrations
    if (!studentInfoStore.form?.reg_no) {
      await checkRegistrationCapacity();
    }
  });
</script>
