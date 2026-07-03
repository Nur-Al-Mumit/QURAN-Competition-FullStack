import { defineStore } from "pinia";

export const useAdminAuthInfoStore = defineStore(
  "AdminAuthInfo",
  () => {
    let adminRole = ref(null);
    let loggedInData = ref(null);
    let isAdminLoggedIn = ref(false);
    return { adminRole, loggedInData, isAdminLoggedIn };
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
