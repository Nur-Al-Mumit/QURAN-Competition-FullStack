<template>
  <div class="min-h-screen">
    <Navbar />
    <main class="pt-14 sm:pt-16 lg:pt-[70px]">
      <slot />
    </main>
  </div>
</template>

<script setup>
  import Navbar from "~/components/Navbar/Navbar.vue";
</script>
