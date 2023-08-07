import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));
  const [username, setUsername] = useState(() => localStorage.getItem('username'));
  
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  const handleLogin = (data) => {
    const { token, userId, username } = data;
    setToken(token);
    setUserId(userId);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
  };
  
  return (
    <AuthContext.Provider value={{ token, userId, username, handleLogin, handleLogout }}>
        {children}
    </AuthContext.Provider>
  );
};
