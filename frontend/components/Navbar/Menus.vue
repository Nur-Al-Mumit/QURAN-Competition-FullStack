<template>
  <menu v-bind="$attrs">
    <NuxtLink
      v-for="(menu, key) in menus"
      :key="key"
      :to="menu.url"
      :class="[
        'relative px-6 py-3 font-semibold block text-lg base-trans whitespace-nowrap border-b-2 sm:border-b-0 sm:px-0 sm:py-0 link sm:flex sm:justify-center sm:text-[18px]',
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
      default:
        "relative py-3 block px-5 font-semibold text-lg base-trans whitespace-nowrap border-b-2",
    },
  });
  const menus = [
    { id: 1, title: "Home", url: "/" },
    { id: 4, title: "Registration", url: "/registration" },
  ];
</script>

<style scoped>
  .link::after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 5px;
    bottom: -80%;
    background: #c8c8c8;
    transition: transform 0.2s, width 0.2s;
  }
  .router-link-active::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 5px;
    bottom: -80%;
    background: #065f46;
    transition: transform 0.2s, width 0.2s;
  }

  .link:hover::after {
    width: 100%;
    transition: transform 0.2s, width 0.2s;
  }

  .router-link-active {
    color: #065f46;
  }

  @media (max-width: 640px) {
    .link::after {
      bottom: -10%;
    }
    .router-link-active::after {
      bottom: -10%;
      left: 0;
      background: #065f46;
    }
  }
</style>
