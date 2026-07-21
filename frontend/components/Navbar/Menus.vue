<template>
  <menu v-bind="$attrs" class="flex flex-col sm:flex-row sm:items-center sm:gap-1 lg:gap-2">
    <NuxtLink
      v-for="(menu, key) in menus"
      :key="key"
      :to="menu.url"
      :class="[
        customClass ||
          'link relative px-4 py-2 font-semibold text-gray-600 base-trans whitespace-nowrap rounded-lg hover:bg-emerald-50 hover:text-emerald-700 sm:text-[17px]',
      ]"
    >
      {{ menu.title }}
    </NuxtLink>
  </menu>
</template>

<script setup>
  const props = defineProps({
    customClass: {
      type: String,
      default: "",
    },
  });
  const menus = [
    { id: 1, title: "Home", url: "/" },
    { id: 4, title: "Registration", url: "/registration" },
    { id: 5, title: "Result", url: "/results" },
  ];
</script>

<style scoped>
  .router-link-active {
    color: #047857;
    background-color: oklch(97.9% 0.021 166.113);
  }
</style>
