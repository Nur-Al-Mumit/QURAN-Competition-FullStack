<template>
  <section>
    <p class="text-center mb-8">Enter Your OTP</p>

    <form @submit.prevent="matchOTP" class="mt-[48px] px-5">
      <InputsOTP v-model="otp" :isIncorrectOTP="isIncorrectOTP" :digits="6" />
    </form>
    <!-- <p
      class="mt-10 text-[15px] leading-[24px] text-center font-sans font-normal"
    >
      Didn’t get the email?
      <br />
      Check your spam & promotions.
    </p> -->
    <p
      class="mt-10 text-[15px] leading-[24px] text-center font-sans font-normal"
    >
      Didn’t get the OTP?
      <!-- <br />
      Check your spam. -->
    </p>
    <div class="grid place-content-center pt-2">
      <button
        class="text-blue-2 text-[15px] leading-[24px] font-bold font-sans text-primary hover:text-primary-hover base-trans cursor-pointer"
      >
        Resend code
      </button>
    </div>

    <section
      v-if="isOtpSend"
      class="flex items-center justify-center bg-[#2F323133] min-h-screen fixed top-0 bottom-0 left-0 right-0 z-50"
    >
      <section
        class="text-center bg-white-3 border-2 border-white-1 p-5 rounded-[19.2px] font-sans font-semibold"
      >
        <!-- <span
          class="flex justify-center"
          v-html="getUtilsIcons('iso-loader-spinner-blue')"
        ></span> -->
      </section>
    </section>
  </section>
</template>

<script setup>
  import { useStudentAuthStore } from "~/stores/studentAuth";

  // Stores
  const studentAuthStore = useStudentAuthStore();

  // States
  let isIncorrectOTP = ref(false);
  let isOtpSend = ref(false);
  let otp = ref(null);

  const logInWithOtp = async (otp) => {
    const endpoint = "/auth/otp-login";
    // const payload = {
    //   email: logInStore.email,
    //   otp: otp,
    //   otp_ref: logInStore.uuid,
    // };
    if (otp == 1234) {
      return true;
    } else {
      return false;
    }
  };

  async function matchOTP() {
    isOtpSend.value = true;
    let isOTPMatched = await logInWithOtp(otp.value);

    if (isOTPMatched) {
      setTimeout(() => {
        isOtpSend.value = false;
        isIncorrectOTP.value = false;

        navigateTo("/set-password");
      }, 700);
    } else {
      setTimeout(() => {
        isOtpSend.value = false;
        isIncorrectOTP.value = true;
      }, 700);
    }
  }

  watch(
    () => otp.value,
    () => {
      isIncorrectOTP.value = false;
      if (otp.value.length === 4) {
        matchOTP();
      }
    },
  );
</script>
