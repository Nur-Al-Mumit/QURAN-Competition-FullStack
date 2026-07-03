import { defineStore } from "pinia";
import { ref } from "vue";
import { s as storages } from "../server.mjs";
const useMenuStore = defineStore("MenuStore", () => {
  let links = ref([]);
  return { links };
}, {
  persist: {
    storage: storages.cookies()
  }
});
export {
  useMenuStore as u
};
//# sourceMappingURL=menuStore-DjC5MiZx.js.map
