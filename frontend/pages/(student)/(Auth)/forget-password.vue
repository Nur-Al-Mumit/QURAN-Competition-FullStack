<template>
  <section class="min-h-[70vh] sm:min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div
      class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="h-2 bg-emerald-500"></div>
      <div class="p-5 pb-0">
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
        <div class="flex justify-center">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
      </div>

      <component
        :is="
          ForgetPasswordStages[
            'ForgetPasswordStage' + studentAuthStore.forgetPasswordStage
          ]
        "
      />

      <div class="my-6 flex justify-center space-x-2">
        <div
          v-for="n in 3"
          :key="n"
          class="h-1.5 w-1.5 rounded-full"
          :class="{
            'bg-emerald-500': studentAuthStore.forgetPasswordStage === n,
            'bg-gray-200': studentAuthStore.forgetPasswordStage !== n,
          }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Utils/icon";
  import { useStudentAuthStore } from "~/stores/studentAuth";
  import ForgetPasswordStage1 from "~/components/Auth/ForgetPassword/Student/ForgetPasswordStage1.vue";
  import ForgetPasswordStage2 from "~/components/Auth/ForgetPassword/Student/ForgetPasswordStage2.vue";
  import ForgetPasswordStage3 from "~/components/Auth/ForgetPassword/Student/ForgetPasswordStage3.vue";

  const studentAuthStore = useStudentAuthStore();
  const ForgetPasswordStages = {
    ForgetPasswordStage1,
    ForgetPasswordStage2,
    ForgetPasswordStage3,
  };

  function handleNavigation() {
    if (studentAuthStore.forgetPasswordStage > 1) {
      studentAuthStore.forgetPasswordStage--;
    } else {
      navigateTo("/sign-in");
    }
  }
</script>
