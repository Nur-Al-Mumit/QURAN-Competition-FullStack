<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
    >
      <div
        class="bg-white rounded-2xl shadow-lg border transition-all duration-300 overflow-hidden relative ring-1 ring-opacity-5"
        :class="
          type === 'success'
            ? 'border-green-200 ring-green-100'
            : 'border-red-200 ring-red-100'
        "
      >
        <!-- Toast Content -->
        <div class="p-2 px-4 flex items-start gap-4">
          <!-- Animated Icon with Circle -->
          <div class="w-10 h-10 relative flex items-center justify-center">
            <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none">
              <!-- Circle First -->
              <circle
                cx="12"
                cy="12"
                r="9"
                :stroke="type === 'success' ? '#16a34a' : '#dc2626'"
                stroke-width="1.5"
                class="animated-circle"
              />

              <g transform="scale(0.75) translate(4 4)">
                <!-- Tick -->
                <path
                  v-if="type === 'success'"
                  d="M6 13L10 17L18 7"
                  stroke="#16a34a"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="animated-path"
                />

                <template v-else>
                  <path
                    d="M6 6L18 18"
                    stroke="#dc2626"
                    stroke-width="2"
                    stroke-linecap="round"
                    class="animated-path"
                  />
                  <path
                    d="M6 18L18 6"
                    stroke="#dc2626"
                    stroke-width="2"
                    stroke-linecap="round"
                    class="animated-path delay"
                  />
                </template>
              </g>
            </svg>
          </div>
          <!-- Message -->
          <div class="flex-1">
            <p
              class="text-sm font-semibold leading-5"
              :class="type === 'success' ? 'text-green-800' : 'text-red-800'"
            >
              {{ title }}
            </p>
            <p
              v-if="message"
              class="mt-1 text-sm leading-5"
              :class="type === 'success' ? 'text-green-700' : 'text-red-700'"
            >
              {{ message }}
            </p>
          </div>

          <!-- Close Button -->
          <button
            @click="close"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Progress Bar -->
        <div
          class="h-1 transition-all duration-200 ease-linear"
          :class="type === 'success' ? 'bg-green-700' : 'bg-red-600'"
          :style="{ width: progress + '%' }"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  // Global state
  const toastState = useState("toast", () => ({
    isVisible: false,
    type: "success",
    title: "",
    message: "",
    duration: 5000,
  }));

  const isVisible = computed(() => toastState.value.isVisible);
  const type = computed(() => toastState.value.type);
  const title = computed(() => toastState.value.title);
  const message = computed(() => toastState.value.message);
  const duration = computed(() => toastState.value.duration);

  const progress = ref(100);
  let progressInterval = null;

  const close = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
    }
    toastState.value.isVisible = false;
    progress.value = 100;
  };

  const startProgress = () => {
    progress.value = 100;
    const interval = 100;
    const decrement = 100 / (duration.value / interval);

    progressInterval = setInterval(() => {
      progress.value -= decrement;
      if (progress.value <= 0) {
        close();
      }
    }, interval);
  };

  // Watch for visibility changes
  watch(isVisible, (newVal) => {
    if (newVal) {
      nextTick(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        startProgress();
      });
    }
  });

  // Global toast functions
  const showToast = (type, title, message = "", duration = 5000) => {
    toastState.value = {
      isVisible: true,
      type,
      title,
      message,
      duration,
    };
  };

  // Make functions globally available
  if (process.client) {
    window.showSuccess = (title, message, duration) =>
      showToast("success", title, message, duration);
    window.showError = (title, message, duration) =>
      showToast("error", title, message, duration);
  }

  onUnmounted(() => {
    if (progressInterval) {
      clearInterval(progressInterval);
    }
  });
</script>

<style scoped>
  /* Icon stroke animation */
  .animated-path {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: draw-path 2s ease-out forwards;
  }

  .animated-path.delay {
    animation-delay: 0.2s;
  }

  /* Circle animation (after icon) */
  .animated-circle {
    stroke-dasharray: 63; /* approx 2πr for r=10 */
    stroke-dashoffset: 63;
    animation: draw-circle 1s ease-out forwards;
    animation-delay: 0.5s; /* after tick or cross finishes */
  }

  /* Keyframes */
  @keyframes draw-path {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes draw-circle {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
