import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const defaultOptions = {
  baseURL: BASE_URL,
  method: "get",
  headers: {
    "Content-Type": "application/json",
  },
};

let instance = axios.create(defaultOptions);

const token = localStorage.getItem("token");

if (token) {
  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = token ? token : "";
    return config;
  });
}

export default instance;
