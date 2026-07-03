<template>
  <section class="min-h-[60vh] sm:min-h-[95vh] flex items-center justify-center bg-gray-50 p-4">
    <div
      class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="h-2 bg-emerald-500"></div>
      <div class="mt-2 sm:mt-0 px-4 sm:p-5">
        <div class="relative">
          <button
            @click="handleNavigation"
            class="flex items-center gap-2 absolute -top-1 left-0 cursor-pointer hover:-translate-x-1 base-trans hover:text-primary"
          >
            <span
              v-html="
                getIcons(
                  'right-arrow',
                  `transition-transform duration-300 w-[40px]`
                )
              "
            ></span>
          </button>
        </div>
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
        <component
          :is="SignUpStages['SignUpStage' + studentAuthStore.signUpStage]"
        />
        <div class="mb-4 sm:mb-0 mt-4 flex justify-center space-x-2">
          <div
            v-for="n in 2"
            :key="n"
            class="h-1.5 w-1.5 rounded-full"
            :class="{
              'bg-emerald-500': studentAuthStore.signUpStage === n,
              'bg-gray-200': studentAuthStore.signUpStage !== n,
            }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";
  import { useStudentAuthStore } from "~/stores/studentAuth";
  import SignUpStage1 from "~/components/Auth/SignUp/Student/SignUpStage1.vue";
  import SignUpStage2 from "~/components/Auth/SignUp/Student/SignUpStage2.vue";

  const studentAuthStore = useStudentAuthStore();
  const SignUpStages = {
    SignUpStage1,
    SignUpStage2,
  };

  function handleNavigation() {
    if (studentAuthStore.signUpStage > 1) {
      studentAuthStore.signUpStage--;
    } else {
      navigateTo("/sign-in");
    }
  }
</script>
