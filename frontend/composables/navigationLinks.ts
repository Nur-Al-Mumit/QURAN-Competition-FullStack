export const useNavigationLinks = () => {
  const Roles = {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    EXAMINER: 3,
    VOLUNTEER: 4,
    STUDENT: 5,
  };

  const adminCommonLinks = [
    {
      title: "Dashboard",
      icon: "Dashboard",
      link: "/admin/dashboard",
    },
    {
      title: "View Profile",
      icon: "ViewProfile",
      link: "/admin/profile",
    },
  ];

  const adminCommonLinksLast = [
    {
      title: "Report Issues",
      icon: "Circular",
      link: "/admin/report-issues",
    },
  ];

  const commonLinksLast = [
    // {
    //   title: "Settings",
    //   icon: "Settings",
    //   link: "/settings",
    // },
    {
      title: "Log Out",
      icon: "LogOut",
      link: "",
    },
  ];

  const studentLinks = [
    {
      title: "Dashboard",
      icon: "Dashboard",
      link: "/dashboard",
    },
    {
      title: "View Profile",
      icon: "ViewProfile",
      link: "/profile",
    },
    {
      title: "View Registration",
      icon: "Circular",
      link: "/registration/view",
    },
    {
      title: "Update Registration",
      icon: "UpdateProfile",
      link: "/registration",
    },
    {
      title: "Registration Token",
      icon: "Circular",
      link: "/registration/token",
    },
  ];

  const examinersLinks = [
    {
      title: "Submit Viva Result",
      icon: "Circular",
      link: "/admin/submit-viva-result",
    },
  ];

  const volunteerLinks = [
    {
      title: "Verify Registration",
      icon: "Circular",
      link: "/admin/verify-registration",
    },
    {
      title: "Training Attendance",
      icon: "Circular",
      link: "/admin/training-attendance",
    },
  ];

  const adminLinks = [
    {
      title: "View Registrations",
      icon: "Circular",
      link: "/admin/view-registrations",
    },
  ];

  const superAdminLinks = [
    {
      title: "Create Admin",
      icon: "UpdateProfile",
      link: "/admin/create-admin",
    },
  ];

  return {
    Roles,
    adminLinks,
    commonLinksLast,
    adminCommonLinksLast,
    studentLinks,
    volunteerLinks,
    examinersLinks,
    superAdminLinks,
    adminCommonLinks,
  };
};
