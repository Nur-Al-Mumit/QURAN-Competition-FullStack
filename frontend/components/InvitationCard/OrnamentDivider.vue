<template>
  <!-- Centered gold rule with a diamond motif — used between sections. -->
  <div class="om-divider" aria-hidden="true">
    <span class="om-line"></span>
    <svg class="om-motif" viewBox="0 0 24 24" width="14" height="14">
      <path d="M12 1 L15 9 L23 12 L15 15 L12 23 L9 15 L1 12 L9 9 Z" fill="currentColor" />
    </svg>
    <span class="om-line"></span>
  </div>
</template>

<style scoped>
  .om-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 320px;
    max-width: 80%;
    color: #d4af37;
  }
  .om-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
  }
  .om-motif {
    flex-shrink: 0;
    opacity: 0.9;
  }
</style>
