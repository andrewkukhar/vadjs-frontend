import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
