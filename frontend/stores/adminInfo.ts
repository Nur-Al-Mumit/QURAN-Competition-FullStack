import { defineStore } from "pinia";

export const useAdminInfoStore = defineStore(
  "AdminInfoStores",
  () => {
    let admin = ref(null);
    let isLoading = ref(false);
    let profileLoaded = ref(false);

    async function _fetchAdminProfile() {
      isLoading.value = true;

      try {
        const endpoint = "/admin/profile/get";
        const {
          data: { data },
        } = await useAdminAuthenticatedAxios(endpoint, null, null, "GET");

        if (data?.admin) {
          admin.value = data.admin;
          profileLoaded.value = true;
        }

        return admin.value;
      } catch (err) {
        window.showError(
          "Error!",
          err?.response?.data?.message || "Error fetching admin profile:",
          3000
        );
      } finally {
        isLoading.value = false;
      }
    }

    // Fetch user profile only if not already loaded
    async function fetchAdminProfile() {
      if (profileLoaded.value) return admin.value;

      const result = await _fetchAdminProfile();
      return result;
    }

    // Update function to force fetch new user data
    async function updateAdminProfile() {
      const result = await _fetchAdminProfile();
      return result;
    }

    return {
      admin,
      isLoading,
      profileLoaded,
      fetchAdminProfile,
      updateAdminProfile,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies({
        maxAge: 60 * 60 * 24 * 180,
        secure: true,
      }),
    },
  }
);
