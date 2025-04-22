import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshAccessToken } from "@/utils/refreshToken";
//"http://192.168.0.246:8000/",
const api = axios.create({
  baseURL: "http://10.0.2.2:8000/",
  validateStatus: () => true,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccestoken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccestoken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("refresh_token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default function useAxios() {
  return api;
}
