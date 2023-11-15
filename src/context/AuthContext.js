import React, { createContext, useState, useEffect } from "react";
import { isTokenExpired } from "../services/utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username")
  );
  const [role, setRole] = useState(() => localStorage.getItem("role"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    if (userId) localStorage.setItem("userId", userId);
    if (username) localStorage.setItem("username", username);
    if (role) localStorage.setItem("role", role);
  }, [token, userId, username, role]);

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  }, [token]);

  const handleLogin = (data) => {
    const { token, userId, username, role } = data;
    setToken(token);
    setUserId(userId);
    setUsername(username);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, username, role, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
