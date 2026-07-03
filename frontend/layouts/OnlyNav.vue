<template>
  <div>
    <div class="pb-16">
      <Navbar />
    </div>
    <slot />
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar/Navbar.vue"
</script>
