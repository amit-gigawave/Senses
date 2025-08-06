import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosError } from "axios";
// import { apiEndpoints } from "@/constants/api_constants";
import type { SnapshotType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCookieList = () => {
  return document.cookie
    .split("; ")
    .filter(Boolean)
    .map((cookieStr) => {
      const [name, ...rest] = cookieStr.split("=");
      return {
        name,
        value: rest.join("="),
      };
    });
};

export const setCookie = (
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
  } = {}
) => {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (options.maxAge) cookieStr += `; max-age=${options.maxAge}`;
  if (options.path) cookieStr += `; path=${options.path}`;
  if (options.secure) cookieStr += `; secure`;
  if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;
  document.cookie = cookieStr;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, ...rest] = cookie.split("=");
    if (cookieName === encodeURIComponent(name)) {
      return rest.join("=");
    }
    if (cookieName === name) {
      return rest.join("=");
    }
  }
  return undefined;
};

export const removeCookie = (name: string, path: string = "/") => {
  document.cookie = `${encodeURIComponent(name)}=; max-age=0; path=${path}`;
};

export const qKey = (input: string | string[]): string[] => {
  const splitStrings = (str: string): string[] =>
    str.split("/").filter(Boolean);
  if (typeof input === "string") {
    return splitStrings(input);
  } else {
    return input.reduce(
      (acc: string[], item) => acc.concat(splitStrings(item)),
      []
    );
  }
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 2000,
  timeoutErrorMessage:
    "Unable to connect to our servers. please check your internet connection",
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("hiiii>>>>>");
    const accessToken = getCookie("accessToken");
    console.log({ accessToken });
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Add retry count to request config if not exists
    if (originalRequest._retryCount === undefined) {
      originalRequest._retryCount = 0;
    }

    // Maximum number of retries
    const maxRetries = 3;

    // Check if request was canceled or has no response (network error)
    if (
      (axios.isCancel(error) || !error.response) &&
      originalRequest._retryCount < maxRetries
    ) {
      originalRequest._retryCount++;

      // Exponential backoff delay
      const delay = Math.min(1000 * 2 ** originalRequest._retryCount, 10000);

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Retry the original request
      return axiosInstance(originalRequest);
    }

    // Existing 401 handling
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        removeCookie("accessToken");
        return axiosInstance(originalRequest);
      } catch (error) {
        // If refresh token fails, logout user
        // localStorage.removeItem("accessToken");
        // window.location.href = "/signin";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const handleErr = ({ e }: { e: unknown }) => {
  if (axios.isAxiosError(e)) {
    const axiosError = e as AxiosError<SnapshotType>;
    const err = axiosError.response?.data?.message;
    console.log("error message --> ", err);
    throw typeof err == "string" ? { message: err } : err;
  }
  throw e;
};

export function toLocalISOString(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return (
    d.getFullYear().toString().padStart(4, "0") +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate().toString().padStart(2, "0") +
    "T" +
    d.getHours().toString().padStart(2, "0") +
    ":" +
    d.getMinutes().toString().padStart(2, "0") +
    ":" +
    d.getSeconds().toString().padStart(2, "0") +
    ".000Z"
  );
}
