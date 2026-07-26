import axios from "axios";
import { useAdminAuthInfoStore } from "~/stores/adminAuthInfo";

export const useAdminAuthenticatedAxios = async (endpoint, payLoad, headers, method) => {
  const {
    loggedInData: { token_type, access_token },
  } = useAdminAuthInfoStore();

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
  const authStore = useAdminAuthInfoStore();
  const {
    loggedInData: { refresh_token },
  } = authStore;

  const endPoint = `/auth/admin/refresh`;
  let payload = {
    refresh_token,
  };

  try {
    const { data: data } = await useAxios(endPoint, payload);

    if (data?.data) {
      authStore.loggedInData = data.data;
      authStore.isAdminLoggedIn = true;
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

const clearAdminSessionIfNeeded = (requestUrl) => {
  if (!process.client) return;
  const adminAuthInfoStore = useAdminAuthInfoStore();
  const isRefreshEndpoint = String(requestUrl || "").includes(
    "/auth/admin/refresh"
  );
  // Avoid logging out when hitting the login/refresh endpoints themselves,
  // and guard against firing twice for the same request.
  if (
    isRefreshEndpoint ||
    String(requestUrl || "").includes("/auth/admin/sign-in") ||
    !adminAuthInfoStore.isAdminLoggedIn ||
    clearAdminSessionIfNeeded._cleared
  ) {
    return;
  }
  clearAdminSessionIfNeeded._cleared = true;
  const { clearAdminAuth } = useAdminAuthClear();
  window.showError?.("Session expired", "Please sign in again.", 3000);
  clearAdminAuth();
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
        clearAdminSessionIfNeeded(originalRequest.url);
        return Promise.reject(refreshError);
      }
    }

    // A 401 that we already retried (refresh succeeded but the request was
    // still rejected) means the session is no longer valid -> sign out.
    if (isUnauthorized && originalRequest._retry) {
      clearAdminSessionIfNeeded(originalRequest.url);
    }

    return Promise.reject(error);
  }
);
