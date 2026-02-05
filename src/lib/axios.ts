import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const baseURL = "https://tinytales.trendline.marketing/api";

const api = axios.create({
  baseURL,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
