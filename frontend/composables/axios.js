import axios from "axios";

export async function useAxios(endpoint, payload, config, method = 'post') {

  let data = null;

  try {
    const response = method.toLowerCase() === 'get'
      ? await axios.get(endpoint, config)
      : await axios.post(endpoint, payload, config);
    data = response.data;
  } catch (error) {
    throw error
  }

  return { data };
}
