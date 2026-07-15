<template>
  <div class="sm:max-w-3xl mx-auto px-4 py-8">
    <h1
      class="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-emerald-800 text-transparent pt-2 bg-clip-text"
    >
      বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
    </h1>
    <h1 class="text-lg sm:text-xl font-bold text-center mb-2">
      রেজিস্ট্রেশন ফর্ম
    </h1>
    <h4 class="text-xs font-bold text-center mb-6 text-red-500">
      <strong>দুঃখিত!</strong>
      এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য।
      <br class="hidden sm:block" />
      ইনশাআল্লাহ পরবর্তী কোনো প্রতিযোগিতায় নারীদেরও ব্যবস্থা রাখা হবে
    </h4>

    <form @submit.prevent="formSubmit">
      <div class="space-y-4">
        <h2 class="font-semibold text-center underline mb-5 text-lg sm:text-xl">
          ব্যক্তিগত তথ্য
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full">
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
        <div class="flex justify-center items-center flex-col">
          <h2
            class="font-semibold text-center underline mb-5 text-lg sm:text-xl"
          >
            শিক্ষাগত তথ্য
          </h2>
          <inputs-base-radio
            :options="educationOptions"
            v-model="useFormStore.form.education_background"
            :colors="{
              2: 'bg-red-500 text-white border-red-500',
              3: 'bg-red-500 text-white border-red-500',
            }"
          />
        </div>
        <div
          v-if="
            useFormStore.form.education_background === 2 ||
            useFormStore.form.education_background === 3
          "
          class="space-y-2 sm:space-y-4"
        >
          <h2 class="font-semibold text-center text-red-500">
            আপনি যদি মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন হন, তাহলে সাধারণভাবে এই
            প্রতিযোগিতায় অংশগ্রহণ করতে পারবেন না। তবে যদি আপনি কুরআন পড়া
            মাদ্রাসায় শিখে না থাকেন, বা অন্য কারণে মাদ্রাসার সাথে যুক্ত ছিলেন,
            তাহলে বিষয়টি যাচাই করে দেখা হবে। কর্তৃপক্ষের বিবেচনায় আপনি উপযুক্ত
            হলে এসএমএস বা ওয়েবসাইটের মাধ্যমে জানানো হবে।
          </h2>
          <h2 class="font-semibold">আপনার মাদ্রাসার তথ্য:</h2>
          <inputs-base-input
            v-model="useFormStore.form.madrasah_name"
            type="text"
            label="মাদ্রাসার নাম:"
            placeholder="মাদ্রাসার নাম"
            :required="true"
            class="w-full"
          />
          <h3 class="pl-1 mb-1 font-semibold text-left">
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

        <div
          v-if="
            useFormStore.form.education_background === 1 ||
            useFormStore.form.education_background === 3
          "
          class="space-y-2"
        >
          <h2 class="font-semibold">আপনার শিক্ষা প্রতিষ্ঠানসমূহের নাম:</h2>
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
            class="w-full"
          />
          <inputs-base-input
            v-model="useFormStore.form.university_name"
            type="text"
            label="ভার্সিটির নাম:"
            placeholder="ভার্সিটির নাম"
            class="w-full"
          />
        </div>

        <div class="grid place-items-center gap-4 pt-4">
          <div class="sm:col-span-2">
            <h2 class="font-semibold mb-2">
              প্রতিযোগী পুরুষ নাকি নারী তা নির্বাচন করুন
            </h2>
            <div class="flex items-center justify-center">
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
          <div>
            <h2 class="font-semibold mb-2">
              আপনি কি দেখে কুরআন তেলাওয়াত করতে পারেন?
            </h2>
            <div class="flex items-center justify-center">
              <inputs-base-radio
                :options="yesNoOptions"
                v-model="useFormStore.form.is_recitation"
                :colors="{
                  null: 'bg-red-500 text-white border-red-500',
                }"
              />
            </div>
          </div>
          <div>
            <h2 class="font-semibold mb-2">
              আপনি কি কুরআন পাঠের প্রশিক্ষণে অংশগ্রহণ করতে চান?
            </h2>
            <div class="flex items-center justify-center">
              <inputs-base-radio
                :options="yesNoOptions"
                v-model="useFormStore.form.need_training"
              />
            </div>
          </div>

          <div class="sm:col-span-2 mt-10">
            <p class="text-red-600 mb-3 text-center text-[13px] sm:text-sm">
              প্রতিযোগিতায় অংশগ্রহণের জন্য নিয়মাবলী ও শর্তাবলী পড়ে সম্মতি
              প্রদান করা বাধ্যতামূলক। দয়া করে
              <NuxtLink
                to="/competition-rules"
                class="text-emerald-600 hover:text-emerald-800 underline hover:scale-105 transition-transform duration-200"
              >
                নিয়মাবলী
              </NuxtLink>
              ভালোভাবে পড়ুন এবং নিশ্চিত করুন যে আপনি সম্মত হচ্ছেন এবং
              প্রতিযোগিতার সকল শর্ত মেনে চলতে প্রস্তুত।
            </p>
            <div class="flex items-center justify-center">
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
        </div>
      </div>
      <div class="text-center py-6">
        <button
          :disabled="isFormDisabled"
          class="inline-flex justify-center items-center px-6 py-3 border rounded-md text-base font-bold w-full transition-colors duration-200 group relative cursor-pointer border-emerald-800 text-emerald-700 bg-white hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-400 disabled:text-gray-600 disabled:hover:bg-gray-200 disabled:hover:text-gray-600"
        >
          <span v-if="useFormStore.form?.reg_no">আপডেট করুন</span>
          <span v-else>সাবমিট করুন</span>
          <div class="absolute right-5">
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
            প্রাথমিক পর্বে উত্তীর্ণ হয়েছেন কিন্তু কুরআন তিলাওয়াত এখনও পুরোপুরি
            শুদ্ধ নয়, তাদের জন্য দক্ষ হাফিযদের মাধ্যমে ৩ আগস্ট থেকে ৭ আগস্ট
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
            <div class="space-y-1049238W text-[16px] text-red-700">
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
                <span>উচ্চ দক্ষতাসম্পন্ন কুরআন পাঠকারী(জেনারেল)</span>
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
        <div class="p-5">
          <h1 class="text-xl text-red-600 font-semibold leading-relaxed text-center">
            দুঃখিত এই সেশনের জন্য আমাদের রেজিস্ট্রেশন বন্ধ হয়ে গেছে অনুগ্রহ করে
            পরবর্তী সেশনের জন্য অপেক্ষা করুন জাযাকাল্লাহু খইরন
          </h1>

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
    { id: null, name: "না" },
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

  const isFormDisabled = computed(() => {
    return (
      dobError.value ||
      useFormStore.form.gender === 2 ||
      useFormStore.form.rulesAgreement !== 1
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
      if (newValue === null) {
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
    isRegCloseModalOpen.value = true;
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
            otp: null,
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

        if (data?.data?.reg_no) {
          window.hideLoading();
          window.showSuccess("Success!", "Form Updated successfully", 3000);

          studentInfoStore.form = data.data;
          studentInfoStore.user.name_bn = data.data.name_bn;
          studentInfoStore.user.name_en = data.data.name_en;

          registeredFormStore.registeredForm = data.data;
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

        if (data?.data?.reg_no) {
          window.hideLoading();
          window.showSuccess("Success!", "Form Updated successfully", 3000);

          studentInfoStore.form = data.data;
          studentInfoStore.user.name_bn = data.data.name_bn;
          studentInfoStore.user.name_en = data.data.name_en;

          registeredFormStore.registeredForm = data.data;
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
  });
</script>
