import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { Clerk } from "@clerk/clerk-js";


export const BASE_URL = import.meta.env.VITE_BASE_URL;
const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)


const authClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

authClient.interceptors.request.use(
    async (config) => {
        await clerk.load()
        const token = await clerk.session?.getToken(); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
    
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
