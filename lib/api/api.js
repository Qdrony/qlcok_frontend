import axios from "axios";
import { getToken, reLogin } from "../services/secureStore";

const API_URL = "http://10.0.2.2:5009/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && (!config.url.includes("/login") || !config.url.includes("/create"))) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchWithRetry = async (method, url, data = null) => {
  try {
    const response = await api({ method, url, data });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('Token lejárt, meghívom a reLogint...');
      const success = await reLogin();

      if (success) {
        console.log('Újrapróbálom az API hívást...');
        try {
          return (await api({ method, url, data })).data;
        } catch (retryError) {
          console.log('Második próbálkozás sikertelen.');
          throw retryError;
          //TODO catch
        }
      } else {
        console.log('Kijelentkeztetés szükséges.');
        //TODO redirect to loginpage
      }
    }
    throw error;
  }
};

export default api;