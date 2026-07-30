import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

// export const baseUrl = "http://localhost:8484/api";
export const baseUrl = "https://planorabackend.didierdjakoua.site/api";
const api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    // Accept: "application/json",
    // "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("auth_token");
      if (token) {
        config.headers.set?.("Authorization", `Bearer ${token}`);
      }
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized request. Please log in again.");
    }

    if (status === 403) {
      console.warn("Forbidden request.");
    }

    if (status && status >= 500) {
      console.error("Server error during API request.");
    }

    return Promise.reject(error);
  },
);

export const setAuthToken = (token: string | null) => {
  if (typeof window !== "undefined") {
    if (token) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }
};

export const apiClient = {
  // GET request
  async get<T>(endpoint: string) {
    try {
      const response = await api.get<T>(endpoint);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  // POST request
  async post<T>(endpoint: string, data: unknown) {
    try {
      const response = await api.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },

  // PUT request
  async put<T>(endpoint: string, data: unknown) {
    try {
      const response = await api.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  },

  // PATCH request
  async patch<T>(endpoint: string, data: unknown) {
    try {
      const response = await api.patch<T>(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`PATCH ${endpoint} failed:`, error);
      throw error;
    }
  },

  // DELETE request
  async delete<T>(endpoint: string) {
    try {
      const response = await api.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  },
};

// Public API client - No token auth
export const publicApiClient = {
  async get<T>(endpoint: string) {
    console.log(`${baseUrl}${endpoint}`);

    try {
      const response = await axios.get<T>(`${baseUrl}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  async post<T>(endpoint: string, data: unknown) {
    try {
      const response = await axios.post<T>(`${baseUrl}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },
};

// Public API client - No token auth
export const externalApiClient = {
  async get<T>(endpoint: string) {
    console.log(`${endpoint}`);

    try {
      const response = await axios.get<T>(endpoint);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  async post<T>(endpoint: string, data: unknown) {
    try {
      const response = await axios.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },
};

export default api;
