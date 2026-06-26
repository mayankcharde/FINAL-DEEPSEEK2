import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag to track if we're already handling a 401 error
let isHandling401 = false;

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && !isHandling401) {
      // Set flag to prevent multiple redirects/handling
      isHandling401 = true;

      // Token expired or invalid
      localStorage.removeItem("user");

      // Check if we're already on login or register page to avoid redirect loops
      const currentPath = window.location.pathname;
      const authPaths = ["/login", "/register", "/signin"];

      // Only redirect if not already on an auth page
      if (!authPaths.includes(currentPath)) {
        window.location.href = "/login";
      }

      // Reset flag after a delay
      setTimeout(() => {
        isHandling401 = false;
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default api;
