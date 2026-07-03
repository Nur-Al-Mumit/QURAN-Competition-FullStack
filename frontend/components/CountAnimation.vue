<template>
  <span>{{ animatedTotal ?? 0 }}</span>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue";

  // Props
  const props = defineProps({
    count: {
      type: [Number, null],
      required: true,
    },
    duration: {
      type: Number,
      default: 500, // Default animation duration (in milliseconds)
    },
  });

  // Reactive state for the animated number
  const animatedTotal = ref(0);

  // Counting animation function
  const animateCount = (startValue, endValue, duration) => {
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Progress is between 0 and 1
      animatedTotal.value = Math.floor(
        progress * (endValue - startValue) + startValue
      );

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  // Trigger the counting animation on mount
  onMounted(() => {
    animateCount(0, props.count, props.duration);
  });

  // Watch the `count` prop for changes and re-trigger the animation
  watch(
    () => props.count,
    (newVal) => {
      animateCount(animatedTotal.value, newVal, props.duration);
    }
  );
</script>
