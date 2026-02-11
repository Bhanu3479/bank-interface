import axios from "axios";

const API = axios.create({
  baseURL: "https://bank-backend-7uqn.onrender.com",
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const managerToken = localStorage.getItem("managerToken");

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  } else if (managerToken) {
    config.headers.Authorization = `Bearer ${managerToken}`;
  }

  return config;
});

export default API;
