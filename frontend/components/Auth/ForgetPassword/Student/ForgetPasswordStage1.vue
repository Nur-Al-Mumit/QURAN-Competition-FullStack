<template>
  <section class="">
    <div>
      <div class="p-5">
        <section>
          <div>
            <div class="text-center">
              <h2 class="font-bold text-2xl mb-5">Reset your password</h2>
              <p class="text-gray-600 text-sm mb-6">
                Enter your phone number and we'll send you a OTP to reset your
                password.
              </p>
            </div>

            <div>
              <form class="" @submit.prevent="forgetPassword">
                <div class="mt-6">
                  <InputsBaseInput
                    label="Phone Number:"
                    type="number"
                    :required="true"
                    v-model="studentData.phone"
                    placeholder="Enter your registered phone number"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    :disabled="isDisable"
                    class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm mt-6 flex justify-center text-black relative"
                  >
                    <span>
                      Continue
                      <span
                        v-if="isLoading"
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

              <section v-if="resetLinkSent" class="mt-6">
                <div
                  class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded"
                >
                  <p>
                    Password reset link has been sent to your email if an
                    account exists.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";
  import { useStudentAuthStore } from "~/stores/studentAuth";

  // Stores
  const studentAuthStore = useStudentAuthStore();

  // States
  let isLoading = ref(false);
  let isDisable = ref(false);
  let resetLinkSent = ref(false);
  let studentData = ref({
    phone: null,
  });

  async function forgetPassword() {
    try {
      isDisable.value = true;
      isLoading.value = true;

      setTimeout(() => {
        isDisable.value = false;
        isLoading.value = false;
        studentAuthStore.forgetPasswordStage = 2;
      }, 1200);
    } catch (error) {
      console.error("Error sending reset link:", error);
      isLoading.value = false;
      isDisable.value = false;
    }
  }
</script>
