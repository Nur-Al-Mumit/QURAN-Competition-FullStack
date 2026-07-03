<template>
  <section>
    <div class="relative">
      <div>
        <form class="" @submit.prevent="matchOTP">
          <div>
            <p class="text-center font-bold text-[22px] leading-[24px] mb-8">
              Enter Your OTP
            </p>
            <InputsOTP v-model="otp" :isIncorrectOTP="isIncorrectOTP" />
          </div>
          <div class="text-center mt-8">
            <button
              type="submit"
              :disabled="isDisable"
              class="gap-10 font-bold border border-primary py-3 px-5 w-full hover:bg-primary hover:text-white base-trans rounded-sm flex justify-center relative cursor-pointer"
            >
              <span>Sign Up</span>
              <span
                v-if="isDisable"
                class="absolute right-5"
                v-html="
                  getIcons(
                    'sppiner',
                    `w-[20px] transition-transform duration-300`
                  )
                "
              ></span>
            </button>
          </div>

          <div class="my-3 text-center hover:text-black base-trans">
            <a
              @click="resend"
              class="cursor-pointer hover:text-primary base-trans hover:underline"
            >
              I didn't receive a code
            </a>
          </div>
        </form>
      </div>
    </div>

    <section
      v-if="isOtpSend"
      class="flex items-center justify-center bg-[#2F323133] min-h-screen fixed top-0 bottom-0 left-0 right-0 z-50"
    >
      <section
        class="text-center p-5 rounded-[19.2px] font-sans font-semibold"
      >
        <span
          class="flex justify-center"
          v-html="getIcons('iso-loader-spinner-white')"
        ></span>
      </section>
    </section>
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";
  import { useStudentAuthStore } from "~/stores/studentAuth";

  const useStore = useStudentAuthStore();

  let otp = ref(null);
  let isIncorrectOTP = ref(false);
  let isDisable = ref(false);
  let isOtpSend = ref(false);

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

    console.log(isOTPMatched, "isOTPMatched");
    if (isOTPMatched) {
      setTimeout(() => {
        isOtpSend.value = false;
        isIncorrectOTP.value = false;
        navigateTo("/");
      }, 700);
    } else {
      setTimeout(() => {
        isOtpSend.value = false;
        isIncorrectOTP.value = true;
      }, 700);
    }
  }

  async function resend() {
    // isDisable.value = true;
    const endpoint = "/auth/resend-otp-for-email";
    const payload = {
      otp_ref: useStore.otp_ref,
    };

    const { data } = await callAxios(endpoint, payload);

    if (data?.data) {
      useStore.otp_ref = data.data.uuid;
      useStore.resend_time = data.data.resend_time;
      // useStore.stage = 3;
      alert("OTP Resend success");
    }
    isDisable.value = false;
  }

  watch(
    () => otp.value,
    () => {
      isIncorrectOTP.value = false;
      if (otp.value.length === 4) {
        matchOTP();
      }
    }
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
</style>
