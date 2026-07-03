<template>
  <Teleport to="body">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-[9999] flex items-center justify-center px-2 sm:px-0 pointer-events-auto"
    >
      <ModalBackdrop
        :isAnimating="isAnimating"
        @click="handleBackdropClick"
        class="z-[9999]"
      />
      <div class="z-[9999] relative">
        <ModalContainer :isAnimating="isAnimating" @click.stop>
          <slot name="header"></slot>
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </ModalContainer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
  });
  const emit = defineEmits(["update:isOpen"]);

  const isAnimating = ref(false);
  const isModalOpen = ref(false);

  function openModal() {
    isModalOpen.value = true;
    emit("update:isOpen", true);
  }

  const handleClose = () => {
    isAnimating.value = false;
    setTimeout(() => {
      isModalOpen.value = false;
      emit("update:isOpen", false);
    }, 300);
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  const handleEscKey = (event) => {
    if (event.key === "Escape" && props.isOpen) {
      handleClose();
    }
  };

  // Handle isOpen changes
  watch(
    () => props.isOpen,
    (newValue) => {
      if (newValue) {
        openModal();
        // document.body.style.overflow = "hidden";
        nextTick(() => {
          isAnimating.value = true;
        });
      } else {
        handleClose();
        isAnimating.value = false;
        setTimeout(() => {
          if (process.server) return;
          document.body.style.overflow = "";
        }, 300); // Wait for animation to complete
      }
    },
    { immediate: true }
  );

  defineExpose({
    handleClose,
  });

  onMounted(() => {
    document.addEventListener("keydown", handleEscKey);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleEscKey);
    document.body.style.overflow = "";
  });
</script>
