import { defineStore } from "pinia";
import { u as useCompetitionFormStore } from "./competitionForm-ClJDHIES.js";
import { ref } from "vue";
import { u as useAuthenticatedAxios } from "./authenticatedAxios-DoF-q_wg.js";
const useRegisteredFormStore = defineStore("RegisteredForm", () => {
  useCompetitionFormStore();
  let error = ref(null);
  let isLoading = ref(false);
  let registeredForm = ref(null);
  let registeredFormLoaded = ref(false);
  async function _fetchRegisteredForm() {
    isLoading.value = true;
    error.value = null;
    try {
      const endPoint = "/registration/get-form";
      const {
        data: { data }
      } = await useAuthenticatedAxios(endPoint, null, null, "GET");
      if (data == null ? void 0 : data.form) {
        registeredForm.value = data.form;
        registeredFormLoaded.value = true;
        (void 0).showSuccess(
          "Success!",
          "Successfully retrieved your form data.",
          2e3
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
  async function fetchRegisteredForm() {
    if (registeredFormLoaded.value) return registeredForm.value;
    const result = await _fetchRegisteredForm();
    return result;
  }
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
    updateRegisteredForm
  };
});
export {
  useRegisteredFormStore as u
};
//# sourceMappingURL=registeredForm-D-3AJ_rW.js.map
