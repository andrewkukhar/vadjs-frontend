import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
  const [username, setUsername] = useState(() => localStorage.getItem('username'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  const handleLogin = (data) => {
    const { token, userId, username, role } = data;
    setToken(token);
    setUserId(userId);
    setUsername(username);
    setRole(role);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
  };
  
  return (
    <AuthContext.Provider value={{ token, userId, username, role, handleLogin, handleLogout }}>
        {children}
    </AuthContext.Provider>
  );
};
