import { useNavigationLinks } from "~/composables/navigationLinks";

export function useSetMenuLinks(role = 5) {
  const menuStore = useMenuStore();
  const { getLinksForRole } = useNavigationLinks();
  menuStore.links = getLinksForRole(role);
}
