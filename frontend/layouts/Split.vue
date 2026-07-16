<template>
  <section class="min-h-screen bg-gray-100">
    <Navbar />
    <div class="w-full px-4 pt-[4.5rem] sm:mx-auto sm:w-[80%] sm:px-6 sm:pt-20 3xl:w-[70%] 4xl:w-[50%]">
      <div class="flex flex-col gap-4 py-5 sm:flex-row sm:gap-5 sm:py-7">
        <aside class="hidden w-full sm:block sm:w-auto">
          <SideBar />
        </aside>
        <div class="scroll-bar-hidden w-full h-fit rounded-2xl bg-white shadow-sm">
          <slot />
        </div>
      </div>
    </div>
    <div class="bg-white">
      <Footer />
    </div>
  </section>
</template>

<script setup>
  import SideBar from "~/components/Sidebar/SideBar.vue";
  import Navbar from "~/components/Navbar/Navbar.vue";
</script>

<style scoped>
  .scroll-bar-hidden::-webkit-scrollbar {
    display: none;
  }
</style>
