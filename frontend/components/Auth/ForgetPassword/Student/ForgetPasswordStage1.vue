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
  let studentData = ref({
    phone: null,
  });

  async function forgetPassword() {
    try {
      isDisable.value = true;
      isLoading.value = true;

      const endpoint = "/auth/password/reset-send-otp";
      const payload = { phone: studentData.value.phone };

      const { data } = await useAxios(endpoint, payload, null, "POST");

      // uuid is null when no account exists for the phone — the backend
      // returns a success-shaped response without revealing that, so the UI
      // still advances without leaking account existence.
      studentAuthStore.forgetPassword.phone = studentData.value.phone;
      studentAuthStore.forgetPassword.otp_ref = data?.data?.uuid || "";
      studentAuthStore.forgetPassword.reset_ref = "";

      window.showSuccess(
        "Success!",
        "If an account exists for this phone, an OTP has been sent.",
        2500
      );

      studentAuthStore.forgetPasswordStage = 2;
    } catch (error) {
      window.showError(
        "Error!",
        error?.response?.data?.message || "Something went wrong",
        3000
      );
    } finally {
      isDisable.value = false;
      isLoading.value = false;
    }
  }
</script>
