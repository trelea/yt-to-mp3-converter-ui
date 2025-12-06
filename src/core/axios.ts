import axios from "axios";
import { getToken } from "@/lib/cache-storage";

/**
 * @description HTTP client for the application
 */
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * @description Interceptor for the HTTP client to add auth token
 */
httpClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * @description Interceptor for the HTTP client
 */
httpClient.interceptors.response.use((response) => response);
