import { defineStore } from 'pinia';
import { ref } from 'vue';
import { s as storages } from './server.mjs';

const useStudentAuthStore = defineStore(
  "StudentAuth",
  () => {
    let signIn = ref({
      email: "",
      phone: null,
      password: "",
      otp_ref: "",
      resend_time: ""
    });
    let signUp = ref({
      email: "",
      phone: null,
      name: "",
      password_confirmation: "",
      password: "",
      otp_ref: "",
      resend_time: ""
    });
    let formRegistration = ref({
      otp: null,
      uuid: "",
      expires_at: "",
      attempts: 0
    });
    let forgetPassword = ref({
      email: "",
      token: "",
      password: "",
      password_confirmation: ""
    });
    let signInStage = ref(1);
    let signUpStage = ref(1);
    let forgetPasswordStage = ref(1);
    return {
      signIn,
      signUp,
      signInStage,
      signUpStage,
      forgetPassword,
      formRegistration,
      forgetPasswordStage
    };
  },
  {
    persist: {
      storage: storages.cookies()
    }
  }
);

export { useStudentAuthStore as u };
//# sourceMappingURL=studentAuth-ZeK5cdiv.mjs.map
