import { useAuth } from "../contexts/AuthContext";

import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch() {
  const [axiosInstance, setAxiosInstance] = useState(axios.create());
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    });

    if (isAuthenticated) {
      instance.defaults.headers.common["Authorization"] = token;
    }

    setAxiosInstance(instance);
  }, [isAuthenticated, token]);

  return axiosInstance;
}
