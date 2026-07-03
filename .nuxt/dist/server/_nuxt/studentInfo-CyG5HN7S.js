import { defineStore } from "pinia";
import { u as useCompetitionFormStore } from "./competitionForm-ClJDHIES.js";
import { ref } from "vue";
import { u as useAuthenticatedAxios } from "./authenticatedAxios-DoF-q_wg.js";
const useStudentInfoStore = defineStore(
  "studentInfoStores",
  () => {
    const useFormStore = useCompetitionFormStore();
    let user = ref(null);
    let form = ref(null);
    let isLoading = ref(false);
    let error = ref(null);
    let profileLoaded = ref(false);
    async function _fetchProfileData() {
      var _a, _b;
      isLoading.value = true;
      error.value = null;
      try {
        const endpoint = "/user/get-profile";
        const {
          data: { data }
        } = await useAuthenticatedAxios(endpoint, null, null, "GET");
        if (data == null ? void 0 : data.user) {
          user.value = data.user;
          profileLoaded.value = true;
        }
        if ((_a = data.user) == null ? void 0 : _a.form) {
          useFormStore.form = (_b = data.user) == null ? void 0 : _b.form;
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
    async function fetchUserProfile() {
      if (profileLoaded.value) return user.value;
      const result = await _fetchProfileData();
      return result;
    }
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
      updateUserProfile
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
export {
  useStudentInfoStore as u
};
//# sourceMappingURL=studentInfo-CyG5HN7S.js.map
