/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import apiService from "@services/api";
import {
  showLoginStartToast,
  showLoginSuccessToast,
  showLoginErrorToast,
  showRegisterStartToast,
  showRegisterSuccessToast,
  showRegisterErrorToast,
  showLogoutStartToast,
  showLogoutSuccessToast,
  showLogoutErrorToast,
  showSessionExpiredToast,
  showInvalidCredentialsToast,
} from "@utils/toastUtils";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to refresh user data from server
  const refreshUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await apiService.getUserProfile();
      if (response.success) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("User data refreshed:", updatedUser);
        return updatedUser;
      }
    } catch (error) {
      console.warn("Failed to refresh user data:", error);
    }
  };

  // Check authentication status on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);

        // Refresh user data from server to get latest points/stats
        refreshUserData();
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      console.log("AuthContext: Starting login with credentials:", credentials);
      showLoginStartToast();

      const response = await apiService.login(credentials);
      console.log("AuthContext: Login API response:", response);

      if (response.success) {
        const { user: userData, token } = response.data;

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        // Update state
        setUser(userData);
        setIsAuthenticated(true);

        showLoginSuccessToast(userData.name);
        return { success: true, user: userData };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("AuthContext: Login error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";

      if (
        errorMessage.includes("Invalid credentials") ||
        errorMessage.includes("Invalid email or password")
      ) {
        showInvalidCredentialsToast();
      } else {
        showLoginErrorToast(errorMessage);
      }

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      console.log("AuthContext: Starting registration with data:", userData);
      showRegisterStartToast();

      const response = await apiService.register(userData);
      console.log("AuthContext: Registration API response:", response);

      if (response.success) {
        const { user: newUser, token } = response.data;

        // Store in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(newUser));

        // Update state
        setUser(newUser);
        setIsAuthenticated(true);

        showRegisterSuccessToast(newUser.name);
        return { success: true, user: newUser };
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("AuthContext: Registration error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      showRegisterErrorToast(errorMessage);

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      showLogoutStartToast();

      // Call logout API if needed
      try {
        await apiService.logout();
      } catch (error) {
        console.warn("Logout API call failed:", error);
      }

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Update state
      setUser(null);
      setIsAuthenticated(false);

      showLogoutSuccessToast();
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      showLogoutErrorToast(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await apiService.getUserProfile();
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, user: response.data.user };
      } else {
        throw new Error(response.message || "Authentication check failed");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      // Clear invalid auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuthStatus,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
