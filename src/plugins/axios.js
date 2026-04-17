import axios from "axios";

// Base URL API (ganti sesuai backend kamu)
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor (optional: untuk token login nanti)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor (handle global error)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // contoh: unauthorized
      if (error.response.status === 401) {
        console.log("Unauthorized - redirect login nanti");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
