import axios, { AxiosError, AxiosResponse } from "axios";

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);
