<template>
  <section
    class="fixed inset-0 bg-black transition-opacity duration-300"
    :class="[isAnimating ? 'opacity-50' : 'opacity-0']"
  ></section>
</template>

<script setup>
  defineProps({
    isAnimating: Boolean,
  });
</script>
