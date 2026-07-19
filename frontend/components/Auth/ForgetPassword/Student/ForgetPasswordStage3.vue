<template>
  <section class="p-5">
    <div class="text-center mb-6">
      <p class="font-bold text-2xl mb-2">Create new password</p>
      <p class="text-gray-600 text-sm">
        Your new password must be different from previously used passwords.
      </p>
    </div>

    <form @submit.prevent="resetPassword">
      <div class="space-y-4">
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
          v-model="userData.password_confirmation"
          placeholder="Confirm new password"
          @input="validatePassword"
        />
      </div>

      <div class="mt-3">
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
              passwordMatchError === '' && userData.password_confirmation
                ? 'text-emerald-600'
                : 'text-red-500'
            "
          >
            Passwords match
          </li>
        </ul>
      </div>

      <div class="mt-6">
        <button
          type="submit"
          :disabled="isDisable || !isPasswordValid"
          class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm flex justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <span>
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
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";
  import { useStudentAuthStore } from "~/stores/studentAuth";

  // Stores
  const studentAuthStore = useStudentAuthStore();
  const studentAuthInfoStore = useStudentAuthInfoStore();

  // States
  let isLoading = ref(false);
  let isDisable = ref(false);
  let userData = ref({
    password: "",
    password_confirmation: "",
  });

  let passwordRequirements = ref({
    minLength: false,
    hasUppercase: false,
    hasNumberOrSpecial: false,
  });

  const passwordMatchError = computed(() => {
    if (userData.value.password && userData.value.password_confirmation) {
      return userData.value.password !==
        userData.value.password_confirmation
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
      userData.value.password_confirmation
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
    if (!isPasswordValid.value || isDisable.value) return;

    try {
      isDisable.value = true;
      isLoading.value = true;

      const endpoint = "/auth/password/reset";
      const payload = {
        phone: studentAuthStore.forgetPassword.phone,
        password: userData.value.password,
        password_confirmation: userData.value.password_confirmation,
        reset_ref: studentAuthStore.forgetPassword.reset_ref,
      };

      const { data } = await useAxios(endpoint, payload, null, "POST");

      // Backend issues a fresh token with the new password — log the user in
      // exactly like the sign-in flow does.
      if (data?.data) {
        useSetMenuLinks(5);
        studentAuthInfoStore.loggedInData = data.data;
        studentAuthInfoStore.isStudentLoggedIn = true;

        // Reset the forget-password flow state.
        studentAuthStore.forgetPasswordStage = 1;
        studentAuthStore.forgetPassword = { phone: null, otp_ref: "", reset_ref: "" };

        window.showSuccess("Success!", "Password reset successfully.", 2000);
        navigateTo("/dashboard");
      }
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
