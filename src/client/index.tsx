import axios, { AxiosRequestConfig, AxiosError } from "axios";

export const BASE_URL = "http://localhost:3001";

const authClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

authClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl?: string } = {}) =>
  async ({
    url,
    method,
    data,
    params,
    headers,
  }: {
    url: string;
    method: AxiosRequestConfig["method"];
    data?: unknown;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
  }) => {
    try {
      const result = await authClient({
        url: baseUrl ? `${baseUrl}${url}` : url,
        method,
        data,
        params,
        headers,
      });
      return { data: result };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export { authClient, axiosBaseQuery };
