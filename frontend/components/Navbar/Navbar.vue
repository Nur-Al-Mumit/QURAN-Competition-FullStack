<template>
  <header
    :class="[
      isNavHidden ? '-translate-y-full' : 'translate-y-0',
      isScrolled ? 'shadow-md' : 'shadow-sm',
    ]"
    class="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md base-trans print:hidden"
  >
    <nav
      class="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6 lg:h-[70px] lg:px-8"
    >
      <!-- Logo / Brand -->
      <NuxtLink to="/" class="group flex items-center gap-2 sm:gap-2.5">
        <img
          class="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-100 transition group-hover:ring-emerald-200 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
          src="~/assets/imgs/logo.png"
          alt="এসো কুরআন শিখি"
        />
        <span
          class="hidden text-base font-bold text-gray-800 sm:block sm:text-lg 2xl:text-xl"
        >
          এসো কুরআন শিখি
        </span>
      </NuxtLink>

      <!-- Website Menus (Desktop) -->
      <NavbarMenus class="hidden items-center gap-1 sm:flex lg:gap-2" />

      <!-- Right Side Actions -->
      <div class="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
        <!-- Registration CTA (only when not logged in) -->
        <NuxtLink
          v-if="!isUserOrAdminLoggedIn"
          to="/registration"
          class="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm base-trans hover:bg-primary-hover hover:shadow-md sm:px-4 lg:px-5 lg:py-2.5 lg:text-base"
        >
          <svg
            class="h-4 w-4 sm:h-4 sm:w-4 lg:h-5 lg:w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <span class="whitespace-nowrap">Registration</span>
        </NuxtLink>
        <NuxtLink
          v-if="!isUserOrAdminLoggedIn"
          to="/sign-in"
          class="items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm base-trans hover:bg-primary-hover hover:shadow-md sm:px-4 lg:px-5 lg:py-2.5 lg:text-base hidden sm:flex"
        >
          <span v-html="getIcons('signIn', 'w-[20px]')"></span>
          <span class="whitespace-nowrap">Sign In</span>
        </NuxtLink>

        <!-- Logged In: Profile Dropdown (desktop only) -->
        <div
          v-if="isUserOrAdminLoggedIn"
          class="relative hidden sm:block"
          ref="profileDropdownRef"
        >
          <button
            @click="toggleProfileMenu"
            class="flex items-center gap-2 rounded-full p-1 base-trans hover:bg-gray-100 sm:pr-2 lg:pr-3"
          >
            <div class="relative">
              <span
                v-if="!profilePicture"
                v-html="
                  getIcons('profile', 'h-8 w-8 text-gray-500 lg:h-9 lg:w-9')
                "
              ></span>
              <img
                v-else
                :src="profilePicture"
                alt=""
                class="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-100 lg:h-9 lg:w-9"
              />
              <span
                class="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
              ></span>
            </div>
            <span
              class="hidden max-w-[110px] truncate text-sm font-medium text-gray-700 lg:block"
            >
              {{ displayName }}
            </span>
            <svg
              class="hidden h-4 w-4 text-gray-400 base-trans lg:block"
              :class="{ 'rotate-180': isProfileMenuOpen }"
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

          <!-- Profile Dropdown (desktop only) -->
          <Transition name="dropdown">
            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 hidden w-[calc(100vw-2rem)] max-w-[300px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl sm:block lg:w-72"
            >
              <!-- User Info Header -->
              <div
                class="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-green-50 px-4 py-4"
              >
                <div class="relative">
                  <span
                    v-if="!profilePicture"
                    v-html="getIcons('profile', 'h-10 w-10 text-gray-400')"
                  ></span>
                  <img
                    v-else
                    :src="profilePicture"
                    alt=""
                    class="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate font-semibold text-gray-800">
                    {{ displayName }}
                  </p>
                  <p class="text-xs font-medium text-emerald-600">
                    {{ portalLabel }}
                  </p>
                </div>
              </div>

              <!-- Menu Items (User after-login menu incl. logout) -->
              <div class="max-h-[60vh] overflow-y-auto p-2">
                <SidebarSideBarItems :links="menuStore.links" />
              </div>
            </div>
          </Transition>
        </div>

        <!-- Logged In: Profile Icon (mobile) — opens unified drawer -->
        <button
          v-if="isUserOrAdminLoggedIn"
          @click="openMobileMenu"
          class="relative rounded-full p-1 base-trans hover:bg-gray-100 sm:hidden"
          aria-label="Open account menu"
        >
          <span
            v-if="!profilePicture"
            v-html="getIcons('profile', 'h-8 w-8 text-gray-500')"
          ></span>
          <img
            v-else
            :src="profilePicture"
            alt=""
            class="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-100"
          />
          <span
            class="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
          ></span>
        </button>

        <!-- Guest: Hamburger (mobile only) — opens unified drawer -->
        <button
          v-if="!isUserOrAdminLoggedIn"
          @click="openMobileMenu"
          class="rounded-lg p-2 base-trans hover:bg-gray-100 sm:hidden"
          aria-label="Open menu"
        >
          <svg
            class="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Unified Mobile Drawer (profile for logged-in, menu for guests) -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[60] sm:hidden">
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/40 backdrop-blur-sm"
            @click="closeMobileMenu"
          ></div>

          <!-- Drawer Panel -->
          <Transition name="slide-in-right">
            <div
              v-if="isMobileMenuOpen"
              ref="mobileDrawerRef"
              class="absolute bottom-0 right-0 top-0 flex w-[320px] max-w-[85vw] flex-col bg-white shadow-2xl"
            >
              <!-- Drawer Header: portal label for logged-in, "Menu" for guest -->
              <div
                class="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-4"
              >
                <div class="flex items-center gap-2">
                  <img
                    class="h-9 w-9 rounded-full object-cover ring-2 ring-white/30"
                    src="~/assets/imgs/logo.png"
                    alt=""
                  />
                  <span class="font-semibold text-white">
                    {{ isUserOrAdminLoggedIn ? portalLabel : "Menu" }}
                  </span>
                </div>
                <button
                  @click="closeMobileMenu"
                  class="rounded-lg p-1.5 text-white/90 base-trans hover:bg-white/15"
                  aria-label="Close menu"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Drawer Body -->
              <div class="flex flex-1 flex-col overflow-y-auto">
                <!-- Website Menu Section -->
                <div class="border-b border-gray-100 p-3">
                  <p
                    class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400"
                  >
                    Website
                  </p>
                  <NavbarMenus
                    customClass="block rounded-lg px-3 py-2.5 font-medium text-gray-700 base-trans hover:bg-emerald-50 hover:text-emerald-700"
                  />
                </div>

                <!-- Account Section (logged-in): nav links only -->
                <div v-if="isUserOrAdminLoggedIn" class="flex-1 p-3">
                  <p
                    class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400"
                  >
                    Account
                  </p>
                  <SidebarSideBarItems :links="navLinks" class="space-y-1" />
                </div>

                <!-- Guest: Sign In / Sign Up CTA -->
                <div v-else class="flex flex-col gap-2 p-3">
                  <p
                    class="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400"
                  >
                    Account
                  </p>
                  <NuxtLink
                    to="/sign-in"
                    @click="closeMobileMenu"
                    class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm base-trans hover:bg-primary-hover hover:shadow-md"
                  >
                    <span v-html="getIcons('signIn', 'w-[20px]')"></span>
                    <span>Sign In</span>
                  </NuxtLink>
                  <NuxtLink
                    to="/sign-up"
                    @click="closeMobileMenu"
                    class="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm base-trans hover:bg-emerald-50 hover:border-emerald-300"
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
                </div>
              </div>

              <!-- Bottom: User Profile with dropup logout (logged-in only) -->
              <div
                v-if="isUserOrAdminLoggedIn"
                ref="userMenuCardRef"
                class="relative border-t border-gray-100 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-2.5"
              >
                <button
                  @click="toggleUserMenu"
                  class="flex w-full items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-gray-100 base-trans hover:shadow-md hover:ring-emerald-200"
                >
                  <!-- Avatar -->
                  <div class="relative shrink-0">
                    <span
                      v-if="!profilePicture"
                      v-html="getIcons('profile', 'h-10 w-10 text-gray-400')"
                    ></span>
                    <img
                      v-else
                      :src="profilePicture"
                      alt="user_profile_picture"
                      class="h-10 w-10 rounded-xl object-cover shadow-sm ring-2 ring-white"
                    />
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
                    class="absolute bottom-full left-2.5 right-2.5 mb-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
                  >
                    <!-- Dropdown Header -->
                    <div
                      class="border-b border-gray-100 bg-gray-50 px-4 py-2.5"
                    >
                      <p class="text-xs font-semibold text-gray-500">
                        Account Actions
                      </p>
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
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
  import getIcons from "~/assets/icons/Nav/icon";

  // Stores
  const menuStore = useMenuStore();

  // Shared user portal composable
  const {
    isUserOrAdminLoggedIn,
    displayName,
    profilePicture,
    portalLabel,
    syncUserInfo,
  } = useUserPortal();

  const { logOut } = useAuthLogout();

  // States
  const isProfileMenuOpen = ref(false);
  const isMobileMenuOpen = ref(false);
  const isNavHidden = ref(false);
  const isScrolled = ref(false);
  const profileDropdownRef = ref(null);
  const mobileDrawerRef = ref(null);
  const isUserMenuOpen = ref(false);
  const userMenuCardRef = ref(null);

  // Navigation links only (logout handled by bottom dropup card)
  const navLinks = computed(() =>
    (menuStore.links || []).filter((l) => l && l.link),
  );

  function toggleProfileMenu() {
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
  }

  function closeProfileMenu() {
    isProfileMenuOpen.value = false;
  }

  function openMobileMenu() {
    isMobileMenuOpen.value = true;
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false;
    document.body.style.overflow = "";
  }

  function toggleUserMenu() {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  }

  function closeUserMenu() {
    isUserMenuOpen.value = false;
  }

  async function handleLogout() {
    closeUserMenu();
    closeMobileMenu();
    await logOut();
  }

  function handleClickOutside(event) {
    if (
      isProfileMenuOpen.value &&
      profileDropdownRef.value &&
      !profileDropdownRef.value.contains(event.target) &&
      !(mobileDrawerRef.value && mobileDrawerRef.value.contains(event.target))
    ) {
      closeProfileMenu();
    }
  }

  // Close menus on route change
  const route = useRoute();
  watch(
    () => route.fullPath,
    () => {
      closeProfileMenu();
      closeMobileMenu();
      closeUserMenu();
    },
  );

  function navOnScroll() {
    const onScroll = () => {
      const currentScrollPos = window.pageYOffset;
      isScrolled.value = currentScrollPos > 10;
      if (currentScrollPos <= 50) {
        isNavHidden.value = false;
        return;
      }
      const prev = window.__navPrevScroll || 0;
      if (prev > currentScrollPos) {
        isNavHidden.value = false;
      } else {
        isNavHidden.value = true;
        closeProfileMenu();
      }
      window.__navPrevScroll = currentScrollPos;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  onMounted(async () => {
    navOnScroll();
    document.addEventListener("click", handleClickOutside);
    if (isUserOrAdminLoggedIn.value) {
      await syncUserInfo();
    }
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
    document.body.style.overflow = "";
  });
</script>

<style scoped>
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.2s ease-out;
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-in-right-enter-active,
  .slide-in-right-leave-active {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .slide-in-right-enter-from,
  .slide-in-right-leave-to {
    transform: translateX(100%);
  }

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
