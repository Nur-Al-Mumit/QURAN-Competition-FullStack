import { defineStore } from 'pinia'

export const useMenuStore = defineStore('MenuStore', () => {
  let links = ref([]);

  return { links }
}, {
  persist: {
    storage: piniaPluginPersistedstate.cookies(),
  }
})
