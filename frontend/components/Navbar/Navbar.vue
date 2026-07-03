<template>
  <header
    :class="[isNavHidden ? 'translate-y-[-100px]' : 'translate-y-0']"
    class="bg-white fixed left-0 right-0 opacity-100 base-trans border-b z-50 print:hidden"
  >
    <nav
      class="flex flex-row justify-between bg-white items-center sm:justify-between base-width"
    >
      <div class="flex items-center">
        <NuxtLink
          to="/"
          class="font-bold text-xl 2xl:text-2xl flex items-center sm:h-[70px]"
        >
          <img
            class="w-12 sm:w-14 rounded-full mr-3"
            src="../../assets/imgs/logo.png"
            alt=""
          />
          <span class="hidden sm:block">এসো কুরআন শিখি</span>
        </NuxtLink>
      </div>

      <div>
        <NavbarMenus
          :class="[
            isMenuHidden
              ? 'translate-x-0 left-14 right-0'
              : 'translate-x-[100%] right-0 sm:translate-x-0',
          ]"
          class="fixed z-20 bg-white shadow-2xl top-0 left-0 base-trans pt-10 sm:relative lg:gap-3 sm:flex 2xl:gap-5 sm:pl-0 sm:pt-0 min-h-screen sm:min-h-full menu-container"
        />
        <div
          :class="[isMenuHidden ? 'translate-x-0' : 'translate-x-[100vw]']"
          class="sm:hidden absolute base-trans right-5 top-5 z-20"
          @click="closeSideMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            role="img"
            data-test="mobile-drawer-close"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M6.623 5.278a.95.95 0 1 0-1.345 1.345L10.656 12l-5.378 5.377a.95.95 0 1 0 1.345 1.345L12 13.344l5.377 5.378a.95.95 0 0 0 1.345-1.345L13.344 12l5.378-5.377a.95.95 0 0 0-1.345-1.345L12 10.656 6.623 5.278Z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      <div class="flex items-center gap-2 py-2 sm:py-0">
        <div>
          <NuxtLink
            v-if="!isUserOrAdminLoggedIn"
            to="/sign-in"
            class="flex items-center gap-1 text-white py-2 px-5 bg-primary hover:bg-primary-hover base-trans rounded-sm"
          >
            <span v-html="getIcons('signIn', 'w-[20px]')"></span>
            <span>Sign In</span>
          </NuxtLink>
          <div v-else>
            <div class="hidden sm:block">
              <Disclosure>
                <template v-slot:disclosureButton>
                  <div class="hover:bg-gray-200 rounded-full base-trans -mb-1">
                    <span
                      v-if="!profilePicture"
                      v-html="getIcons('profile', 'w-[40px]')"
                    ></span>
                    <img
                      v-else
                      :src="profilePicture"
                      alt=""
                      class="w-[40px] rounded-full h-[40px] bg-gray-100"
                    />
                  </div>
                </template>

                <template v-slot:disclosureMenu>
                  <div class="min-w-[300px] p-3">
                    <SidebarSideBarItems :links="menuStore.links" />
                  </div>
                </template>
              </Disclosure>
            </div>

            <div class="sm:hidden">
              <SideMenu>
                <template v-slot:sideMenuButton>
                  <div>
                    <span
                      v-if="!profilePicture"
                      v-html="getIcons('profile', 'w-[30px] -mb-1')"
                    ></span>
                    <img
                      v-else
                      :src="profilePicture"
                      alt=""
                      class="w-[35px] rounded-full h-[40px] bg-gray-100"
                    />
                  </div>
                </template>

                <template v-slot:sideMenu>
                  <SidebarSideBarItems
                    :links="menuStore.links"
                    class="mt-16"
                    customClass="relative px-6 py-3 flex items-center gap-2 font-semibold text-lg base-trans whitespace-nowrap border-b-2"
                  />
                </template>
              </SideMenu>
            </div>
          </div>
        </div>

        <div @click="openSideMenu" class="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="24"
            role="img"
          >
            <g fill="currentColor" fill-rule="evenodd">
              <path
                d="M21 11H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2ZM3 5h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2ZM21 19H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
  import Disclosure from "../Disclosure/Disclosure.vue";
  import SideMenu from "../Disclosure/CustomSideMenu";
  import getIcons from "~/assets/icons/Nav/icon";

  // Stores
  const menuStore = useMenuStore();
  const studentInfoStore = useStudentInfoStore();
  const studentAuthInfoStore = useStudentAuthInfoStore();
  // Admin Stores
  const adminAuthInfoStore = useAdminAuthInfoStore();

  // States
  const isMenuHidden = ref(false);
  const isNavHidden = ref(false);
  const isMenuOpen = ref(false);

  const isUserOrAdminLoggedIn = computed(() => {
    return (
      studentAuthInfoStore.isStudentLoggedIn ||
      adminAuthInfoStore.isAdminLoggedIn
    );
  });

  const profilePicture = computed(() => {
    return studentInfoStore.user?.profile_picture;
  });

  function handleClickOutside(event) {
    if (isMenuOpen.value) {
      const menu = document.querySelector(".menu-container");
      if (menu && !menu.contains(event.target)) {
        closeSideMenu();
      }
    } else {
      isMenuOpen.value = true;
    }
  }

  function openSideMenu() {
    isMenuHidden.value = true;
    document.addEventListener("click", handleClickOutside);
  }

  function closeSideMenu() {
    isMenuHidden.value = false;
    isMenuOpen.value = false;
    document.removeEventListener("click", handleClickOutside);
  }

  function navOnScroll() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos || currentScrollPos <= 50) {
        isNavHidden.value = false;
      } else {
        isNavHidden.value = true;
      }
      prevScrollpos = currentScrollPos;
    };
  }

  onMounted(async () => {
    navOnScroll();
  });
</script>
