import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authIsLoading, setAuthIsLoading] = useState(false);

  const fetch = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  if (token) {
    fetch.defaults.headers.common["Authorization"] = token;
  }


  useEffect(() => {


    if (token) {
      validateToken({ token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function validateToken({ token }) {
    try {
      setAuthIsLoading(true);
      const response = await fetch.get("/auth/validate-token", { token });
      if (response.data.token) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setAuthIsLoading(false);
    }
  }

  async function login({ email, password }) {
    try {
      setAuthIsLoading(true);
      const response = await fetch.post("/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);

      setUser(response.data.user);
      setIsAuthenticated(true);

      return token;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setAuthIsLoading(false);
    }
  }

  async function register({ token, user }) {
    localStorage.setItem("token", token)
    setToken(token)
    setUser(user)
    setAuthIsLoading(true)
  }

  async function logout() {
    localStorage.removeItem("token");
    setToken(false);
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        authIsLoading,
        isAuthenticated,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
