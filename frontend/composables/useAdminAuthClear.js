export const useAdminAuthClear = () => {
  const clearAdminAuth = (redirect = true) => {
    if (!process.client) return;

    const adminAuthInfoStore = useAdminAuthInfoStore();

    adminAuthInfoStore.isAdminLoggedIn = false;
    adminAuthInfoStore.loggedInData = null;
    adminAuthInfoStore.adminRole = null;

    document.cookie =
      "AdminAuthInfo=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;secure;samesite=Lax";
    document.cookie =
      "AdminAuthInfo=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";

    if (redirect) {
      navigateTo("/admin/sign-in");
    }
  };

  return { clearAdminAuth };
};
