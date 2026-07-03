<template>
  <Teleport to="body">
    <section
      v-if="isVisible"
      class="flex items-center justify-center bg-[#0000006f] min-h-screen fixed top-0 bottom-0 left-0 right-0 z-[99999] transition-opacity duration-300"
      :class="isVisible ? 'opacity-100' : 'opacity-0'"
    >
      <section class="text-center p-5 rounded-[19.2px] font-sans font-semibold">
        <!-- Custom Spinner -->
        <div class="flex justify-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"
          ></div>
        </div>

        <!-- Optional Loading Text -->
        <p v-if="message" class="text-white mt-4 text-xl font-bold">
          {{ message }}
        </p>
      </section>
    </section>
  </Teleport>
</template>

<script setup>
  // Global loading state
  const loadingState = useState("loading", () => ({
    isVisible: false,
    message: "",
  }));

  const isVisible = computed(() => loadingState.value.isVisible);
  const message = computed(() => loadingState.value.message);

  // Global loading functions
  const showLoading = (msg = "") => {
    loadingState.value = {
      isVisible: true,
      message: msg,
    };
  };

  const hideLoading = () => {
    loadingState.value = {
      isVisible: false,
      message: "",
    };
  };

  // Make functions globally available
  if (process.client) {
    window.showLoading = showLoading;
    window.hideLoading = hideLoading;
  }
</script>
