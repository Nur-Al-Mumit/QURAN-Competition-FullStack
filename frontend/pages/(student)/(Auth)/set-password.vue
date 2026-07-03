<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div
      class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="h-2 bg-emerald-500"></div>
      <div class="p-6 sm:p-8">
        <div class="flex justify-center mb-6">
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>

        <section>
          <div>
            <div class="text-center">
              <h2 class="font-bold text-2xl mb-5">Create new password</h2>
              <p class="text-gray-600 text-sm mb-6">
                Your new password must be different from previous used
                passwords.
              </p>
            </div>

            <div>
              <form class="" @submit.prevent="resetPassword">
                <div class="mt-6 space-y-4">
                  <InputsBaseInput
                    :is-password-show="true"
                    label="New Password"
                    type="password"
                    :required="true"
                    v-model="userData.password"
                    placeholder="Enter new password"
                    @input="validatePassword"
                  />
                  <InputsBaseInput
                    :is-password-show="true"
                    label="Confirm Password"
                    type="password"
                    :required="true"
                    v-model="userData.confirmPassword"
                    placeholder="Confirm new password"
                    @input="validatePassword"
                  />
                </div>
                <div class="mt-1">
                  <ul class="text-xs space-y-1 list-disc pl-5">
                    <li
                      :class="
                        passwordRequirements.minLength
                          ? 'text-emerald-600'
                          : 'text-red-500'
                      "
                    >
                      Minimum 8 characters
                    </li>
                    <li
                      :class="
                        passwordRequirements.hasUppercase
                          ? 'text-emerald-600'
                          : 'text-red-500'
                      "
                    >
                      At least one uppercase letter
                    </li>
                    <li
                      :class="
                        passwordRequirements.hasNumberOrSpecial
                          ? 'text-emerald-600'
                          : 'text-red-500'
                      "
                    >
                      At least one number or special character
                    </li>
                    <li
                      :class="
                        passwordMatchError === '' && userData.confirmPassword
                          ? 'text-emerald-600'
                          : 'text-red-500'
                      "
                    >
                      Passwords match
                    </li>
                  </ul>
                </div>
                <div>
                  <button
                    type="submit"
                    :disabled="isDisable || !isPasswordValid"
                    class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm mt-6 flex justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed relative"
                  >
                    <span class="">
                      Reset Password
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

              <section v-if="passwordResetSuccess" class="mt-6">
                <div
                  class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded text-center"
                >
                  <p>Password reset successfully!</p>
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

  // States
  const route = useRoute();
  let isLoading = ref(false);
  let isDisable = ref(false);
  let passwordResetSuccess = ref(false);
  let userData = ref({
    password: "",
    confirmPassword: "",
    token: route.query.token || "",
  });

  let passwordRequirements = ref({
    minLength: false,
    hasUppercase: false,
    hasNumberOrSpecial: false,
  });

  // Computed
  const passwordMatchError = computed(() => {
    if (userData.value.password && userData.value.confirmPassword) {
      return userData.value.password !== userData.value.confirmPassword
        ? "Passwords don't match"
        : "";
    }
    return "";
  });

  const isPasswordValid = computed(() => {
    return (
      passwordRequirements.value.minLength &&
      passwordRequirements.value.hasUppercase &&
      passwordRequirements.value.hasNumberOrSpecial &&
      passwordMatchError.value === "" &&
      userData.value.password &&
      userData.value.confirmPassword
    );
  });

  function validatePassword() {
    const password = userData.value.password;
    passwordRequirements.value = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumberOrSpecial: /[0-9!@#$%^&*]/.test(password),
    };
  }

  async function resetPassword() {
    try {
      if (!isPasswordValid.value) return;

      isDisable.value = true;
      isLoading.value = true;

      const endpoint = "/auth/reset-password";
      const payload = {
        password: userData.value.password,
        token: userData.value.token,
      };

      setTimeout(() => {
        isDisable.value = false;
        isLoading.value = false;
        passwordResetSuccess.value = true;

        setTimeout(() => {
          navigateTo("/dashboard");
        }, 1000);
      }, 1200);
    } catch (err) {
      console.log(err);
    }
  }
</script>
