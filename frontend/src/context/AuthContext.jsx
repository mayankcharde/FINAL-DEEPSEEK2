import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "../utils/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("userData");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/auth/me")
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          localStorage.setItem("userData", JSON.stringify(res.data.user));
        }
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("userData");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  }, []);

  const logout = useCallback(async () => {
    try { await axios.post("/api/auth/logout"); } catch {}
    setUser(null);
    localStorage.removeItem("userData");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
