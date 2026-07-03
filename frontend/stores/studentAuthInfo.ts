import { defineStore } from "pinia";

export const useStudentAuthInfoStore = defineStore(
  "StudentAuthInfo",
  () => {
    let loggedInData = ref(null);
    let isStudentLoggedIn = ref(false);
    return { loggedInData, isStudentLoggedIn };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.cookies(),
    },
  }
);
