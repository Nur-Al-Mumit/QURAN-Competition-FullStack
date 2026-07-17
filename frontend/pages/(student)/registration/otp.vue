<template>
  <section
    class="min-h-[60vh] sm:min-h-[95vh] flex items-center justify-center bg-gray-50 p-4"
  >
    <div
      class="w-full sm:max-w-lg bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="h-2 bg-emerald-500"></div>
      <div class="mt-2 sm:mt-0 px-4 sm:p-5">
        <div class="flex justify-center mb-4">
          <div
            class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        <!-- Instruction Box -->
        <div
          v-if="false"
          class="bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm p-4 rounded-md mb-6 text-center leading-relaxed"
        >
          <p class="font-semibold mb-1 underline">নির্দেশনা</p>
          <p>
            প্রিয়
            <span class="font-bold">{{ useFormStore?.form?.name_bn }},</span>
            আপনার মোবাইল নাম্বার
            <span class="font-mono font-semibold">
              {{ useFormStore?.form?.phone }}
            </span>
            -এ একটি OTP পাঠানো হয়েছে।
          </p>
          <p class="mt-2">
            ভবিষ্যতে আপনি এই মোবাইল নাম্বার এবং OTP ব্যবহার করেই লগইন করতে
            পারবেন। যদি কোডটি না পান, তাহলে নিচের
            <strong>"আবার পাঠান"</strong>
            লিংকে ক্লিক করুন।
          </p>
        </div>

        <!-- OTP Code Display (from response) -->
        <div
          v-if="displayOtp"
          class="mb-6 rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-5 shadow-sm overflow-hidden relative otp-card-glow"
        >
          <!-- Animated top shimmer -->
          <span class="otp-shimmer"></span>

          <p class="text-center text-emerald-900 text-sm leading-relaxed mb-3">
            প্রিয়
            <span class="font-bold">{{ useFormStore?.form?.name_bn }}</span>
            , আপনার লগইন সম্পন্ন করার জন্য নিচের কোডটি ব্যবহার করুন।
          </p>

          <div
            class="mt-3 pt-3 border-t border-emerald-200 flex items-start gap-2 text-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-xs text-emerald-800 leading-relaxed">
              <span class="font-bold">গুরুত্বপূর্ণ:</span>
              এই কোডটি নিরাপদে সংরক্ষণ করুন। ভবিষ্যতে আপনি আপনার মোবাইল নাম্বার
              এবং এই কোডটি ব্যবহার করেই অ্যাকাউন্টে লগইন করতে পারবেন।
            </p>
          </div>

          <!-- Animated OTP digits -->
          <div class="flex justify-center gap-2 sm:gap-3 my-4">
            <span
              v-for="(digit, i) in otpDigits"
              :key="i"
              class="otp-digit"
              :style="{ animationDelay: i * 0.12 + 's' }"
            >
              {{ digit }}
            </span>
          </div>

          <p class="text-center text-emerald-900 text-sm leading-relaxed">
            নিচের ঘরে এই ৬ সংখ্যার কোডটি লিখে
            <strong>"সাবমিট করুন"</strong>
            বাটনে ক্লিক করুন।
          </p>
        </div>

        <div class="relative">
          <div>
            <form @submit.prevent="registrationWithOtp(otp)">
              <div>
                <p
                  class="text-center font-bold text-[22px] leading-[24px] mb-4 sm:mb-5"
                >
                  আপনার কোডটি দিন
                </p>
                <InputsOTP
                  v-model="otp"
                  :isIncorrectOTP="isIncorrectOTP"
                  :digits="6"
                />
              </div>
              <div class="text-center mt-8">
                <button
                  type="submit"
                  :disabled="isOtpSend"
                  class="inline-flex justify-center items-center px-6 py-3 border border-emerald-800 text-base font-bold rounded-md text-emerald-700 bg-white hover:bg-primary hover:text-white transition-colors duration-200 group relative cursor-pointer w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>সাবমিট করুন</span>
                  <div class="absolute right-5">
                    <span v-if="!isOtpSend">
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

                    <span
                      v-else
                      class="absolute right-5"
                      v-html="
                        getIcons(
                          'sppiner',
                          `w-[20px] transition-transform duration-300`,
                        )
                      "
                    ></span>
                  </div>
                </button>
              </div>

              <div class="my-3 text-center hover:text-black base-trans">
                <a
                  @click="resend"
                  :class="{ 'pointer-events-none opacity-50': isResending }"
                  class="cursor-pointer hover:text-primary base-trans hover:underline"
                >
                  {{ isResending ? "পাঠানো হচ্ছে..." : "কোডটি পাইনি? আবার পাঠান" }}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";

  const useFormStore = useCompetitionFormStore();
  const studentAuthStore = useStudentAuthStore();
  const studentInfoStore = useStudentInfoStore();
  const registeredFormStore = useRegisteredFormStore();
  const studentAuthInfoStore = useStudentAuthInfoStore();

  const otp = ref(null);
  const isIncorrectOTP = ref(false);
  const isOtpSend = ref(false);
  const isResending = ref(false);

  // OTP returned from the send-otp response (frontend display only)
  const displayOtp = computed(() => studentAuthStore.formRegistration?.otp);

  // Keep the OTP code in English digits (persisted in UI)
  const otpDigits = computed(() => {
    const code = displayOtp.value;
    if (code === null || code === undefined) return [];
    return String(code).split("");
  });

  // ─── beforeunload guard ─────────────────────────────────────────
  function handleBeforeUnload(e) {
    if (isOtpSend.value) {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }
  }

  onMounted(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  });

  // ─── Guard: redirect to registration if no OTP ref exists ───────
  onMounted(() => {
    if (!studentAuthStore.formRegistration?.uuid) {
      navigateTo("/registration");
    }
  });

  // ─── Complete registration with OTP ─────────────────────────────
  async function registrationWithOtp(otpCode) {
    // Hard guard against double-submit.
    if (isOtpSend.value) return;

    // Validate OTP length before any network call.
    const code = String(otpCode || "").trim();
    if (code.length !== 6) {
      isIncorrectOTP.value = true;
      window.showError("Error!", "দয়া করে ৬ সংখ্যার সঠিক কোড দিন।", 2500);
      return;
    }

    // Validate that we have an OTP reference.
    if (!studentAuthStore.formRegistration?.uuid) {
      window.showError(
        "Error!",
        "OTP সেশন মেয়াদোত্তীর্ণ। আবার চেষ্টা করুন।",
        3000,
      );
      navigateTo("/registration");
      return;
    }

    isOtpSend.value = true;
    isIncorrectOTP.value = false;
    window.showLoading("OTP Matching...");

    try {
      const endpoint = "/registration/complete";
      const payload = {
        phone: (useFormStore.form.phone || "").trim(),
        otp: code,
        otp_ref: studentAuthStore.formRegistration.uuid,
        competitionForm: useFormStore.form,
      };

      const { data } = await useAxios(endpoint, payload, null, "POST");

      window.hideLoading();

      // ── Auth response ──
      if (data?.data?.authResponse) {
        studentAuthInfoStore.isStudentLoggedIn = true;
        studentAuthInfoStore.loggedInData = data.data.authResponse;
        useSetMenuLinks(5);
      } else {
        window.showError("Error!", "Failed to create user", 2500);
        isIncorrectOTP.value = true;
        return;
      }

      // ── User profile ──
      if (data?.data?.user) {
        studentInfoStore.user = data.data.user;
        studentInfoStore.profileLoaded = true;
      }

      // ── Registration form ──
      if (data?.data?.form?.reg_no) {
        useFormStore.form = data.data.form;
        registeredFormStore.registeredForm = data.data.form;
        registeredFormStore.allocation = data.data.allocation || null;
        registeredFormStore.registeredFormLoaded = true;

        window.showSuccess("Success!", "Register Form successfully", 2000);
        navigateTo("/registration/token");
      } else {
        window.showError(
          "Error!",
          data?.data?.form_error ||
            "Failed to register form. Please try again.",
          3000,
        );
        // Keep user on OTP page so they can retry without re-entering form.
        isIncorrectOTP.value = true;
      }
    } catch (error) {
      window.hideLoading();

      const message =
        error?.response?.data?.message || "Something went wrong";

      if (message === "Invalid OTP") {
        isIncorrectOTP.value = true;
        window.showError("Error!", "ভুল OTP। আবার চেষ্টা করুন।", 2500);
      } else {
        window.showError("Error!", message, 3000);
      }
    } finally {
      // Always unlock so the user can retry.
      isOtpSend.value = false;
    }
  }

  // ─── Resend OTP ─────────────────────────────────────────────────
  async function resend() {
    if (isResending.value) return;

    isResending.value = true;
    window.showLoading("Resending OTP...");

    try {
      const endpoint = "/auth/resend-otp-for-email";
      const payload = {
        otp_ref: studentAuthStore.formRegistration?.uuid,
      };

      const { data } = await useAxios(endpoint, payload, null, "POST");

      window.hideLoading();

      if (data?.data) {
        // Update the OTP reference and display code.
        studentAuthStore.formRegistration = {
          otp: data.data.otp ?? null,
          uuid: data.data.uuid,
          expires_at: data.data.expires_at,
          attempts: 0,
        };
        window.showSuccess("Success!", "OTP আবার পাঠানো হয়েছে।", 2500);
      } else {
        window.showError("Error!", "OTP পাঠাতে ব্যর্থ হয়েছে।", 2500);
      }
    } catch (error) {
      window.hideLoading();
      window.showError(
        "Error!",
        error?.response?.data?.message || "Something went wrong",
        3000,
      );
    } finally {
      isResending.value = false;
    }
  }

  // ─── Watcher: auto-submit when 6 digits entered ─────────────────
  watch(
    () => otp.value,
    (newValue) => {
      isIncorrectOTP.value = false;
      if (newValue && String(newValue).length === 6) {
        registrationWithOtp(newValue);
      }
    },
  );
</script>

<style scoped>
  /* Custom CSS for even wider browser support */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    @apply appearance-none;
    margin: 0;
  }

  input[type="number"] {
    @apply appearance-none;
    -moz-appearance: textfield; /* Firefox */
  }

  /* ---- OTP code display animations ---- */
  @keyframes otpDigitPop {
    0% {
      opacity: 0;
      transform: translateY(-14px) scale(0.6);
    }
    60% {
      opacity: 1;
      transform: translateY(4px) scale(1.08);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }

  @keyframes otpGlow {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
    50% {
      box-shadow: 0 0 22px 4px rgba(16, 185, 129, 0.35);
    }
  }

  @keyframes otpShimmer {
    0% {
      transform: translateX(-120%);
    }
    100% {
      transform: translateX(220%);
    }
  }

  .otp-card-glow {
    animation: otpGlow 2.4s ease-in-out infinite;
  }

  .otp-shimmer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(16, 185, 129, 0.12),
      transparent
    );
    animation: otpShimmer 3s ease-in-out infinite;
    pointer-events: none;
  }

  .otp-digit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 52px;
    font-size: 26px;
    font-weight: 800;
    color: #047857;
    background: #ffffff;
    border: 2px solid #10b981;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.18);
    animation: otpDigitPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @media (min-width: 640px) {
    .otp-digit {
      width: 48px;
      height: 58px;
      font-size: 30px;
    }
  }
</style>