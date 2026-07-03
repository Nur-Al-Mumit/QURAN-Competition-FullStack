<template>
  <section class="bg-white">
    <div class="relative">
      <div class="text-center">
        <h2 class="font-bold text-[22px] leading-[24px] mb-4 sm:mb-6">
          Create a account
        </h2>
      </div>

      <div class="mt-6 sm:mt-10">
        <form class="" @submit.prevent="getOtp">
          <div class="space-y-[10px]">
            <InputsBaseInput
              :required="true"
              type="name"
              label="Name:"
              v-model="studentAuthStore.signUp.name"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm!"
            />
            <InputsBaseInput
              :required="true"
              type="number"
              label="Phone:"
              v-model="studentAuthStore.signUp.phone"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm!"
            />
            <InputsBaseInput
              type="email"
              label="Email:"
              v-model="studentAuthStore.signUp.email"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm!"
            />
            <InputsBaseInput
              :required="true"
              :is-password-show="true"
              type="password"
              label="Password:"
              v-model="studentAuthStore.signUp.password"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm!"
            />
            <InputsBaseInput
              :required="true"
              :is-password-show="true"
              type="password"
              label="Confirm Password:"
              v-model="studentAuthStore.signUp.password_confirmation"
              input-class="font-bold border-gray-400 py-3 px-5 rounded-sm! "
            />
          </div>
          <div>
            <div class="mt-3">
              <p class="leading-[19px]">
                By continuing, you agree to our
                <a href="" target="_blank" class="text-black underline">
                  Terms of Use
                </a>
                and
                <a href="" target="_blank" class="text-black underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <!-- @click="nextStage" -->
            <button
              type="submit"
              :disabled="isDisable"
              class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-black hover:text-white base-trans rounded-sm mt-5 flex justify-center"
            >
              <div class="relative">
                Continue
                <span
                  class="absolute ml-2"
                  v-if="isDisable"
                  v-html="
                    getIcons(
                      'sppiner',
                      `w-[20px] transition-transform duration-300`
                    )
                  "
                ></span>
              </div>
            </button>
            <!-- </NuxtLink> -->
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useStudentAuthStore } from "~/stores/studentAuth";
  import getIcons from "~/assets/icons/Utils/icon";

  const studentAuthStore = useStudentAuthStore();
  let isDisable = ref(false);

  async function getOtp() {
    studentAuthStore.signUpStage = 2;
    console.log(studentAuthStore.signUpStage);
    return;
    try {
      isDisable.value = true;
      const endpoint = "auth/send-otp-for-email";
      const payload = {
        ...useStore.loginInfo,
      };

      const { data } = await callAxios(endpoint, payload);

      if (data.data) {
        useStore.otp_ref = data.data.uuid;
        useStore.resend_time = data.data.resend_time;
        useStore.stage = 3;
      }
      isDisable.value = false;
    } catch (error) {
      isDisable.value = false;
    }
  }
</script>
