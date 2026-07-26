import axios from "axios";
import { useStudentAuthInfoStore } from "~/stores/studentAuthInfo";

export const useAuthenticatedAxios = async (endpoint, payLoad, headers, method) => {
  const {
    loggedInData: { token_type, access_token },
  } = useStudentAuthInfoStore();

  const config =
    headers === null || headers === undefined
      ? ref({
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      })
      : headers;

  const { data, error } = await useAxios(
    endpoint,
    payLoad,
    config.value,
    method
  );

  return { data, error };
};
async function refreshToken() {
  const authStore = useStudentAuthInfoStore();
  const {
    loggedInData: { refresh_token },
  } = authStore;

  const endPoint = `/auth/refresh`;
  let payload = {
    refresh_token,
  };

  try {
    const { data: data } = await useAxios(endPoint, payload);

    if (data?.data) {
      authStore.loggedInData = data.data;
      authStore.isStudentLoggedIn = true;
      return data.data;
    }
  } catch (refreshError) {
    console.error("Failed to refresh token:", refreshError);
    throw refreshError;
  }
}

/**
 * Handles expire token and refresh on encountering a 401 (Unauthorized)error.
 * Goto the docs for more https://axios-http.com/docs/interceptors
 */

const clearStudentSessionIfNeeded = (requestUrl) => {
  if (!process.client) return;
  const studentAuthInfoStore = useStudentAuthInfoStore();
  const isAuthEndpoint =
    String(requestUrl || "").includes("/auth/refresh") ||
    String(requestUrl || "").includes("/auth/sign-in");
  // Avoid logging out when hitting the login/refresh endpoints themselves,
  // and guard against firing twice for the same request.
  if (
    isAuthEndpoint ||
    !studentAuthInfoStore.isStudentLoggedIn ||
    clearStudentSessionIfNeeded._cleared
  ) {
    return;
  }
  clearStudentSessionIfNeeded._cleared = true;
  studentAuthInfoStore.isStudentLoggedIn = false;
  studentAuthInfoStore.loggedInData = null;
  document.cookie =
    "StudentAuthInfo=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;secure;samesite=Lax";
  document.cookie =
    "StudentAuthInfo=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  window.showError?.("Session expired", "Please sign in again.", 3000);
  navigateTo("/sign-in");
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Non-401 errors: just propagate.
    const isUnauthorized =
      error.response && error.response.status === 401;

    if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { token_type, access_token } = await refreshToken();

        // Update auth header with new token
        originalRequest.headers[
          "Authorization"
        ] = `${token_type} ${access_token}`;

        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        clearStudentSessionIfNeeded(originalRequest.url);
        return Promise.reject(refreshError);
      }
    }

    // A 401 that we already retried (refresh succeeded but the request was
    // still rejected) means the session is no longer valid -> sign out.
    if (isUnauthorized && originalRequest._retry) {
      clearStudentSessionIfNeeded(originalRequest.url);
    }

    return Promise.reject(error);
  }
);
