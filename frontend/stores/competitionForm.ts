import { defineStore } from "pinia";

export const useCompetitionFormStore = defineStore(
  "CompetitionForm",
  () => {
    const form = reactive({
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
    });

    return { form };
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
