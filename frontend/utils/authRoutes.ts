export const authRoutes = {
  commonPaths: ["/registration"],
  authPaths: [
    "/otp",
    "/sign-in",
    "/sign-up",
    "/forget-password",
    "/set-password",
    "/admin/sign-in",
    "/admin/sign-un",

    // Registration related paths
    "/registration/otp",
  ],
  protectedPaths: [
    "/attendance",
    "/competition",
    "/dashboard",
    "/profile",
    "/profile/update",
    "/registration/token",
    "/settings",
    "/test",
  ],
};
