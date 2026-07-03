import { authRoutes } from "~/utils/authRoutes";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isStudentLoggedIn } = useStudentAuthInfoStore();
  const { protectedPaths, authPaths } = authRoutes;

  if (!process.client) return;
  await nextTick();

  let path = to.path;

  if (isStudentLoggedIn && authPaths.includes(path)) {
    return navigateTo("/dashboard");
  }

  if (!isStudentLoggedIn && protectedPaths.includes(path)) {
    return navigateTo("/sign-in");
  }
});
