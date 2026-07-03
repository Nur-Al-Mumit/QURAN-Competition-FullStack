<template>
  <section class="space-y-2">
    <div v-for="(link, key) in links" :key="key" class="relative">
      <!-- Navigation Link -->
      <NuxtLink
        v-if="link.link"
        :to="link.link"
        :class="[
          customClass ||
            'group relative flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 ease-out hover:shadow-sm hover:scale-[1.02] transform',
          'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-0 before:bg-emerald-600 before:rounded-r-full before:transition-all before:duration-300',
          'hover:before:h-8',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:bg-emerald-50',
        ]"
      >
        <!-- Icon -->
        <div
          class="flex-shrink-0 w-6 h-6 text-gray-500 group-hover:text-emerald-600 transition-colors duration-200"
        >
          <div v-html="getIcons(link.icon, 'w-6 h-6')"></div>
        </div>

        <!-- Title -->
        <span
          class="flex-1 font-semibold text-sm sm:text-base whitespace-nowrap truncate"
        >
          {{ link.title }}
        </span>

        <!-- Badge/Notification (if exists) -->
        <div
          v-if="link.badge"
          class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center shadow-sm"
        >
          {{ link.badge }}
        </div>

        <!-- Arrow for active state -->
        <div
          class="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg
            class="w-4 h-4 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </NuxtLink>

      <!-- Logout Button -->
      <button
        v-else
        @click="logOut"
        :class="[
          'cursor-pointer',
          customClass ||
            'group relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 transition-all duration-200 ease-out hover:shadow-sm hover:scale-[1.02] transform',
          'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-0 before:bg-red-600 before:rounded-r-full before:transition-all before:duration-300',
          'hover:before:h-8',
          'focus:outline-none focus:ring-2 focus:ring-red-500/25 focus:bg-red-50',
        ]"
      >
        <!-- Icon -->
        <div
          class="flex-shrink-0 w-6 h-6 text-gray-500 group-hover:text-red-600 transition-colors duration-200"
        >
          <div v-html="getIcons(link.icon, 'w-6 h-6')"></div>
        </div>

        <!-- Title -->
        <span
          class="flex-1 font-semibold text-sm sm:text-base whitespace-nowrap truncate"
        >
          {{ link.title }}
        </span>

        <!-- Arrow for hover state -->
        <div
          class="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg
            class="w-4 h-4 text-red-600"
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
        </div>
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
      // default: "",
    },
  });

  // Stores
  const studentAuthInfoStore = useStudentAuthInfoStore();
  const studentInfoStore = useStudentInfoStore();
  const useFormStore = useCompetitionFormStore();
  // Admin Stores
  const adminAuthInfoStore = useAdminAuthInfoStore();

  async function studentLogOut() {
    try {
      const endpoint = "/auth/logout";
      const { data } = await useAuthenticatedAxios(endpoint);

      if (data?.data) {
        studentAuthInfoStore.isStudentLoggedIn = false;
        studentAuthInfoStore.loggedInData = null;
        studentInfoStore.profileLoaded = false;
        studentInfoStore.form = null;
        studentInfoStore.user = null;
        useFormStore.form = {
          education_background: 1,
          is_recitation: 1,
          rulesAgreement: 1,
        };
        document.cookie.split(";").forEach((cookie) => {
          const [name] = cookie.split("=");
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        window.showSuccess("Success!", "Logout successfully", 2000);
        navigateTo("/");
        // window.location.reload();
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Logout failed",
        3000
      );
    }
  }

  async function adminLogOut() {
    try {
      const endpoint = "/auth/admin/logout";
      const { data } = await useAdminAuthenticatedAxios(endpoint);

      if (data?.data) {
        adminAuthInfoStore.isAdminLoggedIn = false;
        adminAuthInfoStore.loggedInData = null;

        document.cookie.split(";").forEach((cookie) => {
          const [name] = cookie.split("=");
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        window.showSuccess("Success!", "Logout successfully", 2000);
        navigateTo("/admin/sign-in");
        // window.location.reload();
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Logout failed",
        3000
      );
    }
  }

  const logOut = async () => {
    try {
      if (studentAuthInfoStore.isStudentLoggedIn) {
        await studentLogOut();
      } else if (adminAuthInfoStore.isAdminLoggedIn) {
        await adminLogOut();
      } else {
        window.showError("Error!", "You are not logged in", 3000);
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Logout failed",
        3000
      );
    }
  };
</script>

<style scoped>
  /* Base link styles */
  .link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    font-weight: 500;
    color: #374151;
    transition: all 0.2s ease-out;
    transform: scale(1);
  }

  /* Hover states */
  .link:hover {
    color: #047857;
    background-color: oklch(97.9% 0.021 166.113);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    transform: scale(1.02);
  }

  .link:hover::before {
    height: 2rem;
  }

  .link:hover::after {
    height: 100%;
    transition: transform 0.2s, height 0.2s;
  }

  /* Active/current page states */
  .router-link-active {
    color: oklch(59.6% 0.145 163.225);
    background-color: oklch(97.9% 0.021 166.113);
  }

  .router-link-active::before {
    height: 2rem;
    background-color: oklch(59.6% 0.145 163.225);
  }

  /* Mobile responsive adjustments */
  @media (max-width: 640px) {
    .link::after {
      width: 100%;
      height: 4px;
      bottom: -10%;
      left: 0;
      top: auto;
      transform: none;
    }

    .link:hover::after {
      height: 4px;
      width: 100%;
      transition: transform 0.2s, width 0.2s;
    }

    .router-link-active::after {
      bottom: -10%;
      background: #065f46;
      height: 4px;
      width: 100%;
      left: 0;
      top: auto;
      transform: none;
      transition: transform 0.2s, width 0.2s;
    }

    .link::before {
      display: none;
    }
  }
</style>
