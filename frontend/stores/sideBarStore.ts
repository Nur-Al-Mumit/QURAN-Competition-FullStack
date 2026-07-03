import { defineStore } from "pinia";

export const useSideBarStore = defineStore(
  "SideBarStore",
  () => {
    let user = ref({});

    return { user };
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
