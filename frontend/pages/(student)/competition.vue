<template>
  <div class="sm:max-w-3xl mx-auto px-4 py-8">
    <h1
      class="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-emerald-800 text-transparent pt-2 bg-clip-text"
    >
      বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি
    </h1>
    <h1 class="text-lg sm:text-xl font-bold text-center mb-6">
      রেজিস্ট্রেশন ফর্ম
    </h1>

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
        </div>
      </div>
      <div class="text-center py-6 mt-10">
        <button
          :disabled="isDisable || dobError"
          class="inline-flex justify-center items-center px-6 py-3 border border-emerald-800 text-base font-bold rounded-md text-emerald-700 bg-white hover:bg-primary hover:text-white transition-colors duration-200 group relative cursor-pointer w-full"
        >
          <span>সাবমিট করুন</span>
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
  </div>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";

  const { isStudentLoggedIn } = useStudentAuthInfoStore();
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

  // Modals state
  let isModalOpen = ref(false);
  let isTrainingModalOpen = ref(false);
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

  async function formSubmit() {
    window.showLoading("Sending OTP...");

    if (dobError.value) {
      return;
    }

    let endPoint = ref("");
    let payload = ref(null);

    if (!isStudentLoggedIn) {
      endPoint.value = "/auth/send-otp";
      payload.value = {
        phone: useFormStore.form.phone,
      };
    }

    try {
      const { data } = await useAxios(
        endPoint.value,
        payload.value,
        null,
        "POST"
      );

      console.log(data?.data);
      window.hideLoading();
      window.showSuccess("Success!", "OTP sent successfully");
      if (data?.data) {
        navigateTo("/registration/otp");
        console.log(data?.data);
      }
    } catch (error) {
      window.hideLoading();
      window.showError(
        "Error!",
        error?.response?.data?.message || "Something went wrong",
        3000
      );
    }

    console.log("Form Data:", useFormStore.form);
  }
</script>
