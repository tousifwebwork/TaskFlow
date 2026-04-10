import axios from "axios";

const apiBaseUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Response interceptor for consistent error messages
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export const taskApi = {
  getAll:  ()         => api.get("tasks"),
  create:  (title)    => api.post("tasks", { title }),
  toggle:  (id)       => api.patch(`tasks/${id}`),
  update:  (id, data) => api.patch(`tasks/${id}`, data),
  remove:  (id)       => api.delete(`tasks/${id}`),
};

export default api;
