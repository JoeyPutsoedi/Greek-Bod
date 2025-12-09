import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://backend-little-tree-1198.fly.dev/api",
});

api.interceptors.request.use((config) => {
  const useStore = localStorage.getItem("user-storage");

  if (useStore) {
    const { token } = JSON.parse(useStore).state;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
export default api;
