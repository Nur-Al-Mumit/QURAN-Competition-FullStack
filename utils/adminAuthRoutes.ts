export const adminAuthRoutes = {
  commonPaths: ["/registration"],
  authPaths: [
    "/admin/sign-in",
    "/admin/sign-up",

    // Registration related paths
    "/registration/otp",
  ],
  protectedPaths: [
    "/admin/add-student",
    "/admin/settings",
    "/admin/attendance",
    "/admin/competition",
    "/admin/profile",
    "/admin/profile/update",
    "/admin/registration/token",
    "/admin/settings",
    "/admin/dashboard",
    "/admin/profile",
    "/admin/report-issues",
    "/admin/submit-viva-result",
    "/admin/verify-registration",
    "/admin/view-registrations",
    "/admin/create-admin",
  ],
};
