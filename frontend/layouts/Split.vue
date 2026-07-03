<template>
  <section class="bg-gray-100 min-h-screen">
    <div class="base-width">
      <div class="pb-10 sm:pb-16">
        <Navbar />
      </div>
      <div class="sm:flex gap-5 justify-center py-7">
        <aside class="mb-5 sm:mb-0">
          <SideBar />
        </aside>
        <div class="w-full scroll-bar-hidden sm:shadow-sm h-fit rounded-2xl">
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
