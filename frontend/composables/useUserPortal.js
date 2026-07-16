export const useUserPortal = () => {
  const sideBarStore = useSideBarStore();
  const studentInfoStore = useStudentInfoStore();
  const studentAuthInfoStore = useStudentAuthInfoStore();
  const adminInfoStore = useAdminInfoStore();
  const adminAuthInfoStore = useAdminAuthInfoStore();

  const isUserOrAdminLoggedIn = computed(
    () =>
      studentAuthInfoStore.isStudentLoggedIn ||
      adminAuthInfoStore.isAdminLoggedIn
  );

  const isStudent = computed(() => studentAuthInfoStore.isStudentLoggedIn);
  const isAdmin = computed(() => adminAuthInfoStore.isAdminLoggedIn);

  const portalLabel = computed(() => {
    if (isStudent.value) return "Student Portal";
    switch (adminAuthInfoStore.adminRole) {
      case 1:
        return "Super Admin Portal";
      case 2:
        return "Admin Portal";
      case 3:
        return "Examiner Portal";
      case 4:
        return "Volunteer Portal";
      default:
        return "Admin Portal";
    }
  });

  const displayName = computed(() => {
    return sideBarStore.user?.name || "Welcome User";
  });

  const profilePicture = computed(() => {
    return (
      sideBarStore.user?.profile_picture ||
      studentInfoStore.user?.profile_picture ||
      adminInfoStore.admin?.profile_picture ||
      null
    );
  });

  async function syncUserInfo() {
    try {
      if (studentAuthInfoStore.isStudentLoggedIn) {
        await studentInfoStore.fetchUserProfile();
        sideBarStore.user = {
          name: studentInfoStore.user?.name_en || "Welcome User",
          profile_picture: studentInfoStore.user?.profile_picture || null,
          signature_scan: studentInfoStore.user?.signature_scan || null,
        };
      } else if (adminAuthInfoStore.isAdminLoggedIn) {
        await adminInfoStore.fetchAdminProfile();
        sideBarStore.user = {
          name: adminInfoStore.admin?.name || "Admin",
          profile_picture: adminInfoStore.admin?.profile_picture || null,
        };
      }
    } catch (err) {
      console.error("Error syncing user info:", err);
    }
  }

  return {
    isUserOrAdminLoggedIn,
    isStudent,
    isAdmin,
    portalLabel,
    displayName,
    profilePicture,
    syncUserInfo,
  };
};
