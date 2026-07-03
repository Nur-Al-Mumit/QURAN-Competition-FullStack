import { defineStore } from "pinia";

export const useRegisteredFormStore = defineStore("RegisteredForm", () => {
  const competitionFormStore = useCompetitionFormStore();

  let error: any = ref(null);
  let isLoading = ref(false);
  let registeredForm = ref(null);
  let registeredFormLoaded = ref(false);

  async function _fetchRegisteredForm() {
    isLoading.value = true;
    error.value = null;

    try {
      const endPoint = "/registration/get-form";
      const {
        data: { data },
      } = await useAuthenticatedAxios(endPoint, null, null, "GET");
      if (data?.form) {
        registeredForm.value = data.form;
        registeredFormLoaded.value = true;
        // competitionFormStore.form = data.form;

        // Show success message
        window.showSuccess(
          "Success!",
          "Successfully retrieved your form data.",
          2000
        );
      }
      return registeredForm.value;
    } catch (err) {
      console.error("Error fetching user profile:", err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  }

  // Fetch user profile only if not already loaded
  async function fetchRegisteredForm() {
    if (registeredFormLoaded.value) return registeredForm.value;

    const result = await _fetchRegisteredForm();
    return result;
  }

  // Update function to force fetch new user data
  async function updateRegisteredForm() {
    const result = await _fetchRegisteredForm();
    return result;
  }

  return {
    error,
    isLoading,
    registeredForm,
    fetchRegisteredForm,
    registeredFormLoaded,
    updateRegisteredForm,
  };
});
