import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('facades_user');
    if (saved) {
      const userData = JSON.parse(saved);
      // Set initial authorization header
      if (userData.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      }
      return userData;
    }
    return null;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync token to Axios defaults whenever user changes
  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      localStorage.setItem('facades_user', JSON.stringify(user));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('facades_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('https://fcd-be.onrender.com/api/users/login', { email, password });
      setUser(res.data);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('https://fcd-be.onrender.com/api/users/register', { username, email, password });
      setUser(res.data);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
