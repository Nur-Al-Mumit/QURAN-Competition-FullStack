<template>
  <section
    class="sm:min-h-[95vh] flex items-center justify-center bg-gray-50 p-3 sm:py-8 mt-3"
  >
    <div
      class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden pb-4"
    >
      <div class="h-2 bg-emerald-500"></div>
      <div class="mt-2 sm:mt-0 px-4 sm:p-5">
        <div class="flex justify-center mb-2">
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

        <section>
          <div>
            <div class="text-center">
              <h2 class="font-bold text-[24px] leading-[28px] mb-4 sm:mb-6">
                Create a account or
                <br />
                sign in to get started
              </h2>
              <p class="text-gray-600 text-sm">
                Create an account or sign in. By continuing, you agree to our
                <a
                  href=""
                  target="_blank"
                  class="text-gray-900 hover:text-black base-tran underline"
                >
                  Terms of Use
                </a>
                and
                <a
                  href=""
                  target="_blank"
                  class="text-gray-900 hover:text-black base-tran underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div>
              <form class="" @submit.prevent="SignInWithPhonePass">
                <div class="mt-5 sm:mt-10 space-y-2">
                  <InputsBaseInput
                    label="Phone:"
                    type="number"
                    :required="true"
                    v-model="studentData.phone"
                  />
                  <InputsBaseInput
                    :is-password-show="true"
                    label="Password:"
                    :type="'password'"
                    :required="true"
                    v-model="studentData.password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    :disabled="isDisable"
                    class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm mt-3 flex justify-center text-black relative"
                  >
                    <span class="">
                      Continue with Phone
                      <span
                        v-if="isPhoneSignIn"
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

                <div class="mt-4 text-center">
                  <NuxtLink
                    class="text-sm text-emerald-600 hover:text-emerald-800 transition-colors duration-200 font-medium text-center"
                    to="/forget-password"
                  >
                    Forgot your password?
                  </NuxtLink>
                </div>
              </form>

              <div class="mt-2 sm:mt-4 relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center">
                  <span class="bg-white px-4 text-sm text-gray-500">or</span>
                </div>
              </div>

              <div class="mt-2 sm:mt-4 text-center">
                <p class="text-sm text-gray-600 mb-3">
                  Don't have an account yet?
                </p>
                <NuxtLink
                  to="/sign-up"
                  :disabled="isDisable"
                  class="inline-flex justify-center items-center px-6 py-3 border border-emerald-800 text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-primary hover:text-white transition-colors duration-200 w-full group relative"
                >
                  <span>Create an account</span>
                  <div class="absolute right-5">
                    <span v-if="!isSingUp">
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
                      v-html="getIcons('sppiner', `w-[20px]`)"
                    ></span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";

  // Stores
  const studentAuthInfoStore = useStudentAuthInfoStore();

  // States
  let isPhoneSignIn = ref(false);
  let isSingUp = ref(false);
  let isDisable = ref(false);
  let studentData = ref({
    email: "",
    phone: null,
    password: "",
  });

  async function SignInWithPhonePass() {
    try {
      isDisable.value = true;
      isPhoneSignIn.value = true;

      const endpoint = "/auth/login";
      const payload = { ...studentData.value };

      const { data } = await useAxios(endpoint, payload, null, "POST");

      if (data?.data) {
        useSetMenuLinks(5);
        isPhoneSignIn.value = false;
        studentAuthInfoStore.loggedInData = data.data;
        studentAuthInfoStore.isStudentLoggedIn = true;
        window.showSuccess("Success!", "Login successfully", 2000);
        navigateTo("/dashboard");
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Something went wrong",
        3000
      );
      isDisable.value = false;
      isPhoneSignIn.value = false;
    }
  }
</script>
