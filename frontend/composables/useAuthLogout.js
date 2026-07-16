export const useAuthLogout = () => {
  const studentAuthInfoStore = useStudentAuthInfoStore();
  const studentInfoStore = useStudentInfoStore();
  const useFormStore = useCompetitionFormStore();
  const adminAuthInfoStore = useAdminAuthInfoStore();

  function clearCookies() {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  }

  async function studentLogOut() {
    try {
      const endpoint = "/auth/logout";
      const { data } = await useAuthenticatedAxios(endpoint);

      if (data?.data) {
        studentAuthInfoStore.isStudentLoggedIn = false;
        studentAuthInfoStore.loggedInData = null;
        studentInfoStore.profileLoaded = false;
        studentInfoStore.form = null;
        studentInfoStore.user = null;
        useFormStore.form = {
          education_background: 1,
          is_recitation: 1,
          rulesAgreement: 1,
        };
        clearCookies();
        window.showSuccess("Success!", "Logout successfully", 2000);
        navigateTo("/");
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Logout failed",
        3000
      );
    }
  }

  async function adminLogOut() {
    try {
      const endpoint = "/auth/admin/logout";
      const { data } = await useAdminAuthenticatedAxios(endpoint);

      if (data?.data) {
        adminAuthInfoStore.isAdminLoggedIn = false;
        adminAuthInfoStore.loggedInData = null;
        clearCookies();
        window.showSuccess("Success!", "Logout successfully", 2000);
        navigateTo("/admin/sign-in");
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Logout failed",
        3000
      );
    }
  }

  const logOut = async () => {
    try {
      if (studentAuthInfoStore.isStudentLoggedIn) {
        await studentLogOut();
      } else if (adminAuthInfoStore.isAdminLoggedIn) {
        await adminLogOut();
      } else {
        window.showError("Error!", "You are not logged in", 3000);
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Logout failed",
        3000
      );
    }
  };

  return { logOut, studentLogOut, adminLogOut };
};
