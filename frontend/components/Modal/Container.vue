<template>
  <section
    class="relative w-full max-w-md bg-white rounded-2xl shadow-xl transition-all duration-300"
    :class="[
      isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
    ]"
  >
    <slot></slot>
  </section>
</template>

<script setup>
  defineProps({
    isAnimating: Boolean,
  });
</script>
