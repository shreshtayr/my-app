import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUserRaw = localStorage.getItem('registeredUser');
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (storedUserRaw) {
      try {
        const parsed = JSON.parse(storedUserRaw);
        const { username, password } = parsed;
        setUser({ username, password });
      } catch {}
    }
    
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
    
    setLoading(false);
  }, []);

  const register = (userData) => {
    // only keep relevant fields (username, password)
    const stored = { username: userData.username, password: userData.password };
    setUser(stored);
    setIsLoggedIn(true);
    // Store user data in localStorage
    localStorage.setItem('registeredUser', JSON.stringify(stored));
    localStorage.setItem('isLoggedIn', 'true');
    // also store username and password explicitly
    localStorage.setItem('username', stored.username);
    localStorage.setItem('password', stored.password);
  };

  const login = (username, password) => {
    // determine stored credentials: prefer context user but fall back to localStorage
    let stored = user;
    if (!stored) {
      const raw = localStorage.getItem('registeredUser');
      if (raw) {
        try {
          stored = JSON.parse(raw);
        } catch {}
      }
    }

    if (stored && stored.username === username && stored.password === password) {
      setUser(stored);
      setIsLoggedIn(true);
      // Store login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // Clear login status from localStorage
    localStorage.setItem('isLoggedIn', 'false');
    // optionally clear stored credentials
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  };

  const resetPassword = (username, newPassword) => {
    // Find and update the user's password
    let stored = user;
    if (!stored) {
      const raw = localStorage.getItem('registeredUser');
      if (raw) {
        try {
          stored = JSON.parse(raw);
        } catch {}
      }
    }

    if (stored && stored.username === username) {
      // Update password in memory and storage
      const updated = { username: stored.username, password: newPassword };
      setUser(updated);
      localStorage.setItem('registeredUser', JSON.stringify(updated));
      localStorage.setItem('password', newPassword);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
