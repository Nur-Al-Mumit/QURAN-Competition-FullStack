<template>
  <section class="space-y-0.5 sm:space-y-1">
    <div v-for="(link, key) in links" :key="key" class="relative">
      <!-- Navigation Link -->
      <NuxtLink
        v-if="link.link"
        :to="link.link"
        :class="[
          customClass ||
            'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-gray-600 base-trans hover:bg-emerald-50 hover:text-emerald-700',
        ]"
      >
        <!-- Icon -->
        <div
          class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-emerald-600 base-trans"
        >
          <div v-html="getIcons(link.icon, 'h-5 w-5')"></div>
        </div>

        <!-- Title -->
        <span
          class="flex-1 text-sm font-medium whitespace-nowrap truncate"
        >
          {{ link.title }}
        </span>

        <!-- Badge -->
        <div
          v-if="link.badge"
          class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center shadow-sm"
        >
          {{ link.badge }}
        </div>
      </NuxtLink>

      <!-- Logout Button -->
      <button
        v-else
        @click="logOut"
        :class="[
          'cursor-pointer',
          customClass ||
            'group relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-gray-600 base-trans hover:bg-red-50 hover:text-red-600',
        ]"
      >
        <!-- Icon -->
        <div
          class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-red-600 base-trans"
        >
          <div v-html="getIcons(link.icon, 'h-5 w-5')"></div>
        </div>

        <!-- Title -->
        <span
          class="flex-1 text-sm font-medium whitespace-nowrap truncate text-left"
        >
          {{ link.title }}
        </span>
      </button>
    </div>
  </section>
</template>

<script setup>
  import getIcons from "~/assets/icons/Sidebar/icon";

  const props = defineProps({
    links: {
      type: Array,
      required: true,
    },
    customClass: {
      type: String,
      default: "",
    },
  });

  const { logOut } = useAuthLogout();
</script>

<style scoped>
  .router-link-active {
    color: #047857;
    background-color: oklch(97.9% 0.021 166.113);
  }
</style>
