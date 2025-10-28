// src/api/axios.js
import axios from "axios";

// Creamos una instancia configurada
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor: agrega el token JWT automáticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// 🧹 Interceptor opcional: maneja errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expira o es inválido, limpia y redirige
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirigir al login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
