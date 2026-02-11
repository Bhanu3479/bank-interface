import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT automatically (User OR Manager)
API.interceptors.request.use(
  (config) => {

    // Try user token first
    const userData = JSON.parse(localStorage.getItem("user"));
    const userToken = userData?.token;

    // Then try manager token
    const managerToken = localStorage.getItem("managerToken");

    const token = userToken || managerToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
