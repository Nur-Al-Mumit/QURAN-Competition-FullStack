import axios from "axios";
import { e as useStudentAuthInfoStore } from "../server.mjs";
import { ref } from "vue";
import { u as useAxios } from "./axios-DBcmg16B.js";
const useAuthenticatedAxios = async (endpoint, payLoad, headers, method) => {
  const {
    loggedInData: { token_type, access_token }
  } = useStudentAuthInfoStore();
  const config = ref({
    headers: {
      Authorization: `${token_type} ${access_token}`
    }
  });
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
    loggedInData: { refresh_token }
  } = authStore;
  const endPoint = `/auth/refresh`;
  let payload = {
    refresh_token
  };
  try {
    const { data } = await useAxios(endPoint, payload);
    if (data == null ? void 0 : data.data) {
      authStore.loggedInData = data.data;
      authStore.isStudentLoggedIn = true;
      return data.data;
    }
  } catch (refreshError) {
    console.error("Failed to refresh token:", refreshError);
    throw refreshError;
  }
}
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { token_type, access_token } = await refreshToken();
        originalRequest.headers["Authorization"] = `${token_type} ${access_token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export {
  useAuthenticatedAxios as u
};
//# sourceMappingURL=authenticatedAxios-DoF-q_wg.js.map
