<template>
  <div class="pdf-viewer-container mt-56">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading PDF...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <p class="error-text">{{ error }}</p>
      <button @click="loadPdf" class="retry-button">Try Again</button>
    </div>

    <!-- PDF Viewer -->
    <div v-else class="pdf-container">
      <iframe
        src="/assets/pdfs/seat-plan-and-timing-u.pdf"
        class="pdf-iframe"
        title="Seat Plan and Timing PDF"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
  const loading = ref(true);
  const error = ref(null);
  // Load PDF on mount
  onMounted(() => {
    // loadPdf();
    loading.value = false; // Simulate loading complete
  });
</script>

<style scoped>
  .pdf-viewer-container {
    margin: 50px;
    padding: 50px;
    background-color: #f5f5f5;
  }

  /* Loading State */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: white;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #059669;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  .loading-text {
    color: #6b7280;
    font-size: 16px;
    font-weight: 500;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Error State */
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: white;
    padding: 32px;
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .error-text {
    color: #dc2626;
    font-size: 18px;
    margin-bottom: 24px;
    text-align: center;
  }

  .retry-button {
    background-color: #059669;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .retry-button:hover {
    background-color: #047857;
  }

  /* PDF Container */
  .pdf-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .pdf-iframe {
    width: 100%;
    height: 100%;
    border: none;
    background-color: white;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .pdf-viewer-container {
      height: 100vh;
      width: 95vw;
      margin: 0px;
      padding: 10px;
    }

    .loading-text {
      font-size: 14px;
    }

    .error-text {
      font-size: 16px;
    }
  }

  /* Remove any default margins/padding */
  * {
    box-sizing: border-box;
  }
</style>
