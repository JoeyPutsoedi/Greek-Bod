import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://backend-little-tree-1198.fly.dev/",
});

export default api;
