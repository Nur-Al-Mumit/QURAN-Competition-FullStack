import { defineStore } from "pinia";

export const useStudentInfoStore = defineStore(
  "studentInfoStores",
  () => {
    const useFormStore = useCompetitionFormStore();

    let user = ref(null);
    let form = ref(null);
    let isLoading = ref(false);
    let error: any = ref(null);
    let profileLoaded = ref(false);

    async function _fetchProfileData() {
      isLoading.value = true;
      error.value = null;

      try {
        const endpoint = "/user/get-profile";
        const {
          data: { data },
        } = await useAuthenticatedAxios(endpoint, null, null, "GET");

        if (data?.user) {
          user.value = data.user;
          profileLoaded.value = true;
        }
        if (data.user?.form) {
          useFormStore.form = data.user?.form;
          form.value = data.user.form;
        }
        return user.value;
      } catch (err) {
        console.error("Error fetching user profile:", err);
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }

    // Fetch user profile only if not already loaded
    async function fetchUserProfile() {
      if (profileLoaded.value) return user.value;

      const result = await _fetchProfileData();
      return result;
    }

    // Update function to force fetch new user data
    async function updateUserProfile() {
      const result = await _fetchProfileData();
      return result;
    }

    return {
      user,
      form,
      error,
      isLoading,
      profileLoaded,
      fetchUserProfile,
      updateUserProfile,
    };
  }
  // {
  //   persist: {
  //     storage: piniaPluginPersistedstate.cookies({
  //       maxAge: 60 * 60 * 24 * 180,
  //       secure: true,
  //     }),
  //   },
  // }
);
