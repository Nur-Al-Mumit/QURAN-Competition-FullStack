<template>
  <div class="relative" @mouseenter="openOnHover" @mouseleave="closeOnHover">
    <button @click="toggleSelect" ref="disMenu">
      <slot name="disclosureButton"></slot>
    </button>
    <ul
      class="absolute w-fit shadow-2xl right-0 top-full bg-white dark:bg-dark-2 mt-1 base-trans rounded-md dark:text-dark-text-1 font-semibold z-50"
      :class="{ 'invisible opacity-0': !isOpen }"
    >
      <slot name="disclosureMenu" @click="isOpen = !isOpen"></slot>
    </ul>
  </div>
</template>

<script setup>
  const isOpen = ref(false);
  const disMenu = ref(null);

  const handleClickOutside = (event) => {
    if (disMenu.value && !disMenu.value.contains(event.target)) {
      isOpen.value = false;
      document.removeEventListener("click", handleClickOutside);
    }
  };

  const toggleSelect = () => {
    if (isOpen.value) {
      isOpen.value = false;
      document.removeEventListener("click", handleClickOutside);
    } else {
      isOpen.value = true;
      document.addEventListener("click", handleClickOutside);
    }
  };

  // Open the menu on hover
  const openOnHover = () => {
    isOpen.value = true;
    document.addEventListener("click", handleClickOutside);
  };

  // Close the menu on mouse leave
  const closeOnHover = () => {
    isOpen.value = false;
    document.removeEventListener("click", handleClickOutside);
  };
</script>
