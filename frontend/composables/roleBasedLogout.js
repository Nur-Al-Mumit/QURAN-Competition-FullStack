export const useRoleBasedLogout = () => {
  const studentStore = useStudentAuthInfoStore();
  const adminStore = useAdminAuthInfoStore();

  const logOut = async (role) => {
    try {
      const endpoint =
        role === 5 ? "/auth/logout" : "/admin/logout";

      const { data } = await useAuthenticatedAxios(endpoint);

      if (data?.data) {
        if (role.value === 5) {
          adminStore.isAdminLoggedIn = false;
          adminStore.loggedInData = null;
        } else {
          studentStore.isStudentLoggedIn = false;
          studentStore.loggedInData = null;
        }

        // Clear cookies
        document.cookie.split(";").forEach((cookie) => {
          const [name] = cookie.split("=");
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        window.showSuccess("Success!", "Logout successfully", 2000);
        navigateTo("/");
      }
    } catch (err) {
      window.showError(
        "Error",
        err?.response?.data?.message || "Logout failed"
      );
    }
  };

  return { logOut };
};
