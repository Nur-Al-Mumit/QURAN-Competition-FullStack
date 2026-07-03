import { useNavigationLinks } from "~/composables/navigationLinks";

export function useSetMenuLinks(role = 5) {
  const menuStore = useMenuStore();
  const {
    Roles,
    adminLinks,
    studentLinks,
    volunteerLinks,
    examinersLinks,
    superAdminLinks,
    commonLinksLast,
    adminCommonLinks,
    adminCommonLinksLast,
  } = useNavigationLinks();

  try {
    menuStore.links = [];
    if (role !== Roles.STUDENT) {
      menuStore.links.push(...adminCommonLinks);
    }
    if (role === Roles.SUPER_ADMIN) {
      menuStore.links.push(...adminLinks);
      menuStore.links.push(...volunteerLinks);
      menuStore.links.push(...examinersLinks);
      menuStore.links.push(...superAdminLinks);
      menuStore.links.push(...adminCommonLinksLast);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.ADMIN) {
      menuStore.links.push(...adminLinks);
      menuStore.links.push(...volunteerLinks);
      menuStore.links.push(...examinersLinks);
      menuStore.links.push(...adminCommonLinksLast);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.EXAMINER) {
      menuStore.links.push(...examinersLinks);
      menuStore.links.push(...adminCommonLinksLast);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.VOLUNTEER) {
      menuStore.links.push(...volunteerLinks);
      menuStore.links.push(...adminCommonLinksLast);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.STUDENT) {
      menuStore.links.push(...studentLinks);
      menuStore.links.push(...commonLinksLast);
    }
  } catch (error) {
    console.error("Error setting menu links:", error);
  }
}
