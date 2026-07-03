<template>
  <div class="min-h-screen">
    <div class="p-5">
      <button
        @click="loadUsers"
        class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm mt-3 flex justify-center text-black relative"
      >
        <span class="">
          Load users
          <!-- <span
            v-if="isEmailSignIn"
            class="absolute right-5"
            v-html="
              getIcons('sppiner', `w-[20px] transition-transform duration-300`)
            "
          ></span> -->
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "split",
  });
</script>
