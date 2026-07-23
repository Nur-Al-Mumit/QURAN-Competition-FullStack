<template>
  <section class="space-y-0.5 sm:space-y-1">
    <div v-for="(link, key) in links" :key="key" class="relative">
      <!-- Collapsible Group Header -->
      <button
        v-if="link.children && link.children.length"
        @click="toggleGroup(key)"
        :class="[
          'cursor-pointer group relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-gray-600 base-trans hover:bg-emerald-50 hover:text-emerald-700',
          isGroupActive(link) ? 'text-emerald-700 bg-emerald-50' : '',
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
          class="flex-1 text-sm font-medium whitespace-nowrap truncate text-left"
        >
          {{ link.title }}
        </span>

        <!-- Chevron -->
        <svg
          class="h-4 w-4 text-gray-400 base-trans"
          :class="isGroupOpen(key) ? 'rotate-90' : ''"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <!-- Group Children (collapsible) -->
      <Transition name="collapse">
        <div v-if="link.children && isGroupOpen(key)" class="mt-0.5">
          <div
            v-for="(child, childKey) in link.children"
            :key="childKey"
            class="relative"
          >
            <NuxtLink
              :to="child.link"
              :class="[
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-gray-600 base-trans hover:bg-emerald-50 hover:text-emerald-700 pl-11',
              ]"
            >
              <!-- Icon -->
              <div
                class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-emerald-600 base-trans"
              >
                <div v-html="getIcons(child.icon, 'h-5 w-5')"></div>
              </div>

              <!-- Title -->
              <span
                class="flex-1 text-sm font-medium whitespace-nowrap truncate"
              >
                {{ child.title }}
              </span>

              <!-- Badge -->
              <div
                v-if="child.badge"
                class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center shadow-sm"
              >
                {{ child.badge }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </Transition>

      <!-- Navigation Link (flat, no children) -->
      <NuxtLink
        v-if="!link.children && link.link"
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
        <span class="flex-1 text-sm font-medium whitespace-nowrap truncate">
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
        v-if="!link.children && !link.link"
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

  const route = useRoute();
  const { logOut } = useAuthLogout();

  const openGroups = ref(new Set());

  function isGroupOpen(key) {
    if (openGroups.value.has(key)) return true;
    // Auto-open if a child route is active
    const link = props.links[key];
    if (link?.children) {
      return link.children.some((child) => route.path === child.link);
    }
    return false;
  }

  function toggleGroup(key) {
    if (openGroups.value.has(key)) {
      openGroups.value.delete(key);
    } else {
      openGroups.value.add(key);
    }
  }

  function isGroupActive(link) {
    if (!link?.children) return false;
    return link.children.some((child) => route.path === child.link);
  }
</script>

<style scoped>
  .router-link-active {
    color: #047857;
    background-color: oklch(97.9% 0.021 166.113);
  }

  .collapse-enter-active,
  .collapse-leave-active {
    transition: all 0.2s ease;
    overflow: hidden;
  }
  .collapse-enter-from,
  .collapse-leave-to {
    opacity: 0;
    max-height: 0;
  }
  .collapse-enter-to,
  .collapse-leave-from {
    opacity: 1;
    max-height: 200px;
  }
</style>
