<template>
  <section
    class="sticky top-14 sm:top-5 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:h-[calc(85vh)] sm:w-[320px] print:hidden"
  >
    <aside class="flex h-full flex-col">
      <!-- Top: Brand / Portal Header -->
      <div
        class="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3.5 sm:px-5 sm:py-4"
      >
        <img
          class="h-9 w-9 rounded-full object-cover ring-2 ring-white/30 sm:h-10 sm:w-10"
          src="~/assets/imgs/logo.png"
          alt=""
        />
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-bold text-white sm:text-base">
            Dashboard
          </p>
          <p class="truncate text-xs text-emerald-100">{{ portalLabel }}</p>
        </div>
      </div>

      <!-- Middle: Navigation Menu -->
      <nav
        v-if="isLoggedInClient"
        class="flex-1 overflow-y-auto p-2 sm:p-3"
      >
        <p
          class="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 sm:mb-2 sm:text-xs"
        >
          Menu
        </p>
        <SideBarItems :links="navLinks" class="space-y-0.5 sm:space-y-1" />
      </nav>

      <!-- Unlogged-in: Sign Up / Sign In CTA -->
      <div
        v-else-if="mounted"
        class="flex flex-1 flex-col items-center justify-center gap-3 p-5 text-center"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50"
        >
          <svg
            class="h-7 w-7 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-800">Welcome Guest</p>
          <p class="mt-0.5 text-xs text-gray-500">
            Sign in to access your dashboard
          </p>
        </div>
        <NuxtLink
          to="/sign-up"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm base-trans hover:bg-primary-hover hover:shadow-md"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span>Sign Up</span>
        </NuxtLink>
        <NuxtLink
          to="/sign-in"
          class="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm base-trans hover:bg-emerald-50 hover:border-emerald-300"
        >
          <span v-html="getIcons('signIn', 'w-[20px]')"></span>
          <span>Sign In</span>
        </NuxtLink>
      </div>

      <!-- Bottom: User Profile (click to open upward dropdown) -->
      <div
        v-if="isLoggedInClient"
        class="relative border-t border-gray-100 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-2.5 sm:p-3"
        ref="profileCardRef"
      >
        <button
          @click="toggleUserMenu"
          class="flex w-full items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-gray-100 base-trans hover:shadow-md hover:ring-emerald-200 sm:p-3"
        >
          <!-- Avatar -->
          <div class="relative shrink-0">
            <div
              v-if="!profilePicture"
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm sm:h-12 sm:w-12"
            >
              <svg
                class="h-5 w-5 text-gray-400 sm:h-6 sm:w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>
            <img
              v-else
              :src="profilePicture"
              alt="user_profile_picture"
              class="h-10 w-10 rounded-xl object-cover shadow-sm ring-2 ring-white sm:h-12 sm:w-12"
            />
            <!-- Edit Picture -->
            <button
              @click.stop="profilePictureModal = !profilePictureModal"
              class="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-md base-trans hover:bg-emerald-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/25 sm:h-7 sm:w-7"
              aria-label="Change profile picture"
            >
              <svg
                class="h-3 w-3 sm:h-3.5 sm:w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>

          <!-- Info -->
          <div class="min-w-0 flex-1 text-left">
            <p class="truncate text-sm font-bold text-gray-800">
              {{ displayName }}
            </p>
            <p class="truncate text-xs font-medium text-emerald-600">
              {{ portalLabel }}
            </p>
          </div>

          <!-- Chevron -->
          <svg
            class="h-5 w-5 shrink-0 text-gray-400 base-trans"
            :class="{ 'rotate-180': isUserMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Upward Dropdown -->
        <Transition name="pop-up">
          <div
            v-if="isUserMenuOpen"
            class="absolute bottom-full left-2.5 right-2.5 mb-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl sm:left-3 sm:right-3"
          >
            <!-- Dropdown Header -->
            <div class="border-b border-gray-100 bg-gray-50 px-4 py-2.5">
              <p class="text-xs font-semibold text-gray-500">Account Actions</p>
            </div>

            <!-- Logout -->
            <button
              @click="handleLogout"
              class="group flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 base-trans hover:bg-red-50 hover:text-red-600"
            >
              <svg
                class="h-5 w-5 text-gray-400 group-hover:text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </Transition>
      </div>
    </aside>
  </section>

  <ProfilePictureUploadModal v-model:is-modal-open="profilePictureModal" />
</template>

<script setup>
  import SideBarItems from "~/components/Sidebar/SideBarItems.vue";
  import getIcons from "~/assets/icons/Nav/icon";

  const emit = defineEmits(["close"]);

  // Stores
  const menuStore = useMenuStore();

  // Shared composable
  const {
    displayName,
    profilePicture,
    portalLabel,
    syncUserInfo,
    isUserOrAdminLoggedIn,
  } = useUserPortal();
  const { logOut } = useAuthLogout();

  // States
  const profilePictureModal = ref(false);
  const isUserMenuOpen = ref(false);
  const profileCardRef = ref(null);

  // Avoid SSR/client hydration mismatch: auth and user-profile state is
  // only fully resolved on the client (cookie/localStorage + onMounted
  // fetch). Render a neutral placeholder during SSR and the very first
  // client paint, then reveal the real UI once mounted.
  const mounted = ref(false);
  const isLoggedInClient = computed(
    () => mounted.value && isUserOrAdminLoggedIn.value,
  );

  function toggleUserMenu() {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  }

  function closeUserMenu() {
    isUserMenuOpen.value = false;
  }

  async function handleLogout() {
    closeUserMenu();
    emit("close");
    await logOut();
  }

  function handleClickOutside(event) {
    if (
      isUserMenuOpen.value &&
      profileCardRef.value &&
      !profileCardRef.value.contains(event.target)
    ) {
      closeUserMenu();
    }
  }

  // Close dropdown on route change
  const route = useRoute();
  watch(
    () => route.fullPath,
    () => {
      closeUserMenu();
      emit("close");
    },
  );

  // Split links: navigation items only (logout handled by dropdown)
  const navLinks = computed(() =>
    (menuStore.links || []).filter((l) => l && l.link),
  );

  onMounted(async () => {
    document.addEventListener("click", handleClickOutside);
    mounted.value = true;
    await syncUserInfo();
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<style scoped>
  .pop-up-enter-active,
  .pop-up-leave-active {
    transition: all 0.2s ease-out;
  }
  .pop-up-enter-from,
  .pop-up-leave-to {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
</style>
