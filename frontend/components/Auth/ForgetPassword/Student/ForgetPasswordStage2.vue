<template>
  <section class="p-5">
    <div class="text-center mb-6">
      <p class="font-bold text-2xl mb-2">Enter Your OTP</p>
      <p class="text-gray-600 text-sm">
        We sent a 6-digit code to your phone number.
      </p>
    </div>

    <form @submit.prevent="matchOTP" class="mt-[48px]">
      <div class="flex justify-center">
        <InputsOTP
          v-model="otp"
          :isIncorrectOTP="isIncorrectOTP"
          :digits="6"
        />
      </div>

      <p
        v-if="isIncorrectOTP"
        class="mt-4 text-center text-red-500 text-sm font-medium"
      >
        {{ errorMessage || "Incorrect OTP. Please try again." }}
      </p>

      <div class="mt-6">
        <button
          type="submit"
          :disabled="isSubmitting || !otp || otp.length < 6"
          class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm flex justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <span>
            Verify
            <span
              v-if="isSubmitting"
              class="absolute right-5"
              v-html="
                getIcons(
                  'sppiner',
                  `w-[20px] transition-transform duration-300`
                )
              "
            ></span>
          </span>
        </button>
      </div>
    </form>

    <p
      class="mt-10 text-[15px] leading-[24px] text-center font-sans font-normal"
    >
      Didn't get the OTP?
    </p>
    <div class="grid place-content-center pt-2">
      <button
        type="button"
        :disabled="isResending || resendCooldown > 0"
        @click="resendOTP"
        class="text-[15px] leading-[24px] font-bold font-sans text-primary hover:text-primary-hover base-trans cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="resendCooldown > 0">Resend code ({{ resendCooldown }}s)</span>
        <span v-else>Resend code</span>
      </button>
    </div>

    <section
      v-if="isOtpSend"
      class="flex items-center justify-center bg-[#2F323133] min-h-screen fixed top-0 bottom-0 left-0 right-0 z-50"
    >
      <section
        class="text-center bg-white-3 border-2 border-white-1 p-5 rounded-[19.2px] font-sans font-semibold"
      >
        <span
          class="flex justify-center"
          v-html="getIcons('sppiner', 'w-[30px] transition-transform duration-300')"
        ></span>
      </section>
    </section>
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";
  import { useStudentAuthStore } from "~/stores/studentAuth";

  // Stores
  const studentAuthStore = useStudentAuthStore();

  // States
  let isIncorrectOTP = ref(false);
  let isOtpSend = ref(false);
  let isSubmitting = ref(false);
  let isResending = ref(false);
  let errorMessage = ref("");
  let otp = ref("");
  let resendCooldown = ref(0);
  let cooldownTimer = null;

  async function matchOTP() {
    if (isSubmitting.value) return;

    isIncorrectOTP.value = false;
    errorMessage.value = "";
    isSubmitting.value = true;
    isOtpSend.value = true;

    try {
      const endpoint = "/auth/password/reset-verify-otp";
      const payload = {
        phone: studentAuthStore.forgetPassword.phone,
        otp: otp.value,
        otp_ref: studentAuthStore.forgetPassword.otp_ref,
      };

      const { data } = await useAxios(endpoint, payload, null, "POST");

      studentAuthStore.forgetPassword.reset_ref = data?.data?.reset_ref || "";
      studentAuthStore.forgetPasswordStage = 3;
    } catch (error) {
      const remaining =
        error?.response?.data?.data?.remainingAttempts ?? null;
      const baseMsg =
        error?.response?.data?.message || "Invalid OTP. Please try again.";
      errorMessage.value =
        remaining !== null && remaining >= 0
          ? `${baseMsg} (${remaining} attempt${remaining === 1 ? "" : "s"} left)`
          : baseMsg;
      isIncorrectOTP.value = true;
      otp.value = "";
    } finally {
      isSubmitting.value = false;
      isOtpSend.value = false;
    }
  }

  async function resendOTP() {
    if (isResending.value || resendCooldown.value > 0) return;

    isResending.value = true;
    try {
      // Re-trigger send: returns a new otp_ref we must track for verify.
      const endpoint = "/auth/password/reset-send-otp";
      const payload = { phone: studentAuthStore.forgetPassword.phone };

      const { data } = await useAxios(endpoint, payload, null, "POST");

      if (data?.data?.uuid) {
        studentAuthStore.forgetPassword.otp_ref = data.data.uuid;
      }

      otp.value = "";
      isIncorrectOTP.value = false;
      errorMessage.value = "";

      window.showSuccess("Success!", "A new OTP has been sent.", 2000);
      startCooldown(60);
    } catch (error) {
      window.showError(
        "Error!",
        error?.response?.data?.message || "Could not resend OTP.",
        3000
      );
    } finally {
      isResending.value = false;
    }
  }

  function startCooldown(seconds) {
    resendCooldown.value = seconds;
    if (cooldownTimer) clearInterval(cooldownTimer);
    cooldownTimer = setInterval(() => {
      resendCooldown.value -= 1;
      if (resendCooldown.value <= 0) {
        clearInterval(cooldownTimer);
        cooldownTimer = null;
      }
    }, 1000);
  }

  onBeforeUnmount(() => {
    if (cooldownTimer) clearInterval(cooldownTimer);
  });
</script>
