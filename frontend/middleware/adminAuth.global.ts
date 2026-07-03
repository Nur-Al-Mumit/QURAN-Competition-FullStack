import { adminAuthRoutes } from "~/utils/adminAuthRoutes";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAdminLoggedIn } = useAdminAuthInfoStore();
  const { protectedPaths, authPaths } = adminAuthRoutes;

  if (!process.client) return;
  await nextTick();

  let path = to.path;

  if (isAdminLoggedIn && authPaths.includes(path)) {
    return navigateTo("/admin/dashboard");
  }

  if (!isAdminLoggedIn && protectedPaths.includes(path)) {
    return navigateTo("/admin/sign-in");
  }
});
