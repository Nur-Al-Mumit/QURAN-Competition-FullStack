import { defineStore } from "pinia";
import { reactive } from "vue";
import { s as storages } from "../server.mjs";
const useCompetitionFormStore = defineStore(
  "CompetitionForm",
  () => {
    const form = reactive({
      name_bn: "",
      name_en: "",
      dob: "",
      phone: "",
      email: "",
      address: null,
      education_background: 1,
      school_name: null,
      college_name: null,
      university_name: null,
      madrasah_name: null,
      madrasah_study_details: null,
      occupation: null,
      is_recitation: 1,
      need_training: null,
      gender: 1,
      rulesAgreement: 1
    });
    return { form };
  },
  {
    persist: {
      storage: storages.cookies({
        maxAge: 60 * 60 * 24 * 180,
        secure: true
      })
    }
  }
);
export {
  useCompetitionFormStore as u
};
//# sourceMappingURL=competitionForm-ClJDHIES.js.map
