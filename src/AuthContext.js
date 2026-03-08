import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`/api${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return { response, data };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const { response, data } = await apiRequest('/me', { method: 'GET' });
        if (response.ok && data?.user?.username) {
          setUser({ username: data.user.username });
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const register = async (userData) => {
    try {
      const { response, data } = await apiRequest('/register', {
        method: 'POST',
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      });

      if (!response.ok || !data?.user?.username) {
        return { success: false, error: data?.error || 'Registration failed' };
      }

      setUser({ username: data.user.username });
      setIsLoggedIn(true);
      return { success: true };
    } catch {
      return { success: false, error: 'Server unavailable. Try again.' };
    }
  };

  const login = async (username, password) => {
    try {
      const { response, data } = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok || !data?.user?.username) {
        return false;
      }

      setUser({ username: data.user.username });
      setIsLoggedIn(true);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiRequest('/logout', { method: 'POST' });
    } catch {}
    setUser(null);
    setIsLoggedIn(false);
  };

  const resetPassword = async (username, newPassword) => {
    try {
      const { response } = await apiRequest('/reset-password', {
        method: 'POST',
        body: JSON.stringify({ username, newPassword }),
      });
      return response.ok;
    } catch {
      return false;
    }
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
