<template>
  <div class="relative">
    <button @click="toggleSelect()">
      <slot name="sideMenuButton"></slot>
    </button>
  </div>
  <ul
    ref="disMenu"
    id="disMenu"
    :class="[
      'absolute top-0 right-0 left-10 bottom-0 z-20 min-h-screen bg-white base-trans',
      isOpen ? 'translate-x-0' : 'translate-x-[120%]',
    ]"
  >
    <div @click="toggleSelect()" class="sm:hidden fixed top-5 right-5 w-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <slot name="sideMenu" @click="isOpen = !isOpen"></slot>
  </ul>
</template>

<script setup>
  const isOpen = ref(false);
  const isOpenStore = ref(false);
  const disMenu = ref(null);

  const handleClickOutside = (event) => {
    if (disMenu.value && !disMenu.value.contains(event.target)) {
      if (!isOpenStore.value) {
        isOpen.value = true;
        isOpenStore.value = true;
      } else {
        document.removeEventListener("click", handleClickOutside);
        isOpenStore.value = false;
        isOpen.value = false;
      }
    } else {
      if (event.target.id !== "disMenu") {
        document.removeEventListener("click", handleClickOutside);
        isOpenStore.value = false;
        isOpen.value = false;
      }
    }
  };

  const toggleSelect = () => {
    isOpen.value = !isOpen.value;
    document.addEventListener("click", handleClickOutside);
  };
</script>
