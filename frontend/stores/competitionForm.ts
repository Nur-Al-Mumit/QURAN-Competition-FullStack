import { defineStore } from "pinia";

// The canonical, complete default shape of the competition form.
// Every key the backend ever reads MUST be present here so that:
//   1. v-model bindings never leave a key "undefined" (which JSON.stringify
//      would silently strip, causing "Undefined array key" on the backend).
//   2. The persisted store always has a known shape after restore / reset.
function defaultForm() {
  return {
    name_bn: "",
    name_en: "",
    dob: "",
    phone: "",
    email: "",
    address: null,
    education_background: null,
    school_name: null,
    college_name: null,
    university_name: null,
    madrasah_name: null,
    madrasah_study_details: null,
    occupation: null,
    is_recitation: null,
    need_training: null,
    gender: null,
    rulesAgreement: null,
  };
}

export const useCompetitionFormStore = defineStore(
  "CompetitionForm",
  () => {
    const form = reactive(defaultForm());

    // Wipe all fields back to defaults. Used on logout, after a successful
    // submission, and whenever we detect stale data from a previous user.
    function resetForm() {
      Object.assign(form, defaultForm());
    }

    // Guarantee every expected key exists on the reactive form object.
    // This protects against partially-persisted state (e.g. an older cookie
    // that only stored a subset of keys) which would otherwise leave some
    // fields as `undefined` and silently dropped from the JSON payload.
    function ensureFormShape() {
      const defaults = defaultForm();
      for (const key of Object.keys(defaults)) {
        if (!(key in form) || form[key] === undefined) {
          form[key] = defaults[key];
        }
      }
      // Remove any extraneous keys that do not belong to the form schema
      // (e.g. a leftover `reg_no`/`id` from a previous submission that
      // could mislead the registration page into thinking the user already
      // has a form).
      for (const key of Object.keys(form)) {
        if (!(key in defaults)) {
          delete form[key];
        }
      }
    }

    return { form, resetForm, ensureFormShape };
  },
  {
    persist: {
      // sessionStorage is scoped to a single browser tab and is cleared when
      // the tab is closed. This is exactly what we want for a registration
      // form:
      //   - A page *refresh* in the same tab keeps the in-progress data.
      //   - A *new tab* (e.g. a family member registering on the same browser)
      //     starts with a clean form — no data leakage between users.
      //   - Closing the tab wipes the data so it can never leak to the next
      //     person who uses the browser.
      storage: piniaPluginPersistedstate.sessionStorage(),
    },
  }
);
