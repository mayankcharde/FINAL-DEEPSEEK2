import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "../utils/axios";

const AuthContext = createContext(null);

// Flag to prevent multiple auth checks during the same session
let authCheckPerformed = false;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage on initial load
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  // Use useCallback to memoize the checkAuth function
  const checkAuth = useCallback(async () => {
    // Set a flag to prevent multiple concurrent auth checks
    if (authCheckPerformed) return;
    authCheckPerformed = true;

    try {
      const response = await axios.get("/api/auth/me");
      if (response.data.user) {
        setUser(response.data.user);
        // Save user to localStorage
        localStorage.setItem("userData", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.log("Not authenticated");
      // Clear localStorage if not authenticated
      localStorage.removeItem("userData");
      setUser(null);
    } finally {
      setLoading(false);
      // Reset flag after a delay to allow future auth checks
      setTimeout(() => {
        authCheckPerformed = false;
      }, 5000); // 5 seconds cooldown
    }
  }, []);

  // Check if user is logged in on app start
  useEffect(() => {
    // Only check auth if we have a user in localStorage (potential valid session)
    const savedUser = localStorage.getItem("userData");

    // Check current path
    const currentPath = window.location.pathname;
    const authPaths = ["/login", "/register", "/signin"];
    const isAuthPage = authPaths.includes(currentPath);

    if (savedUser && !isAuthPage) {
      checkAuth();
    } else {
      // If no user in localStorage or on auth page, just set loading to false
      setLoading(false);
    }
  }, [checkAuth]);

  const login = useCallback((userData) => {
    setUser(userData);
    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    // Reset auth check flag on successful login
    authCheckPerformed = false;
  }, []);

  const logout = useCallback(async () => {
    // Reset auth check flag
    authCheckPerformed = false;

    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear user from state and localStorage
      setUser(null);
      localStorage.removeItem("userData");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
