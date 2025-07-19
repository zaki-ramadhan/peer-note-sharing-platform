// API service for handling backend communication
const API_BASE_URL = "http://localhost:3001/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      // Don't throw error for 400/401, let the calling code handle it
      if (!response.ok && response.status >= 500) {
        throw new Error(data.message || "Server error occurred");
      }

      return data;
    } catch (error) {
      // Only log and rethrow for network errors or server errors
      if (error.name === "TypeError" || error.message.includes("fetch")) {
        console.error("Network Error:", error);
        throw new Error("Network error. Please check your connection.");
      }
      console.error("API Error:", error);
      throw error;
    }
  }

  // Notes API methods
  async getNotes(params = {}) {
    const queryParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== "") {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/notes${queryString ? `?${queryString}` : ""}`;

    return this.request(endpoint);
  }

  async getNoteById(id) {
    return this.request(`/notes/${id}`);
  }

  async uploadNote(formData) {
    const url = `${this.baseURL}/notes/upload`;
    const config = {
      method: "POST",
      body: formData, // Don't set Content-Type header for FormData
    };

    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      return data;
    } catch (error) {
      console.error("Upload Error:", error);
      throw error;
    }
  }

  async downloadNote(id) {
    return this.request(`/notes/${id}/download`, {
      method: "POST",
    });
  }

  async rateNote(id, rating, review = "") {
    return this.request(`/notes/${id}/rate`, {
      method: "POST",
      body: JSON.stringify({ rating, review }),
    });
  }

  async deleteNote(id) {
    return this.request(`/notes/${id}`, {
      method: "DELETE",
    });
  }

  // Auth API methods
  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async getUserProfile() {
    return this.request("/auth/me");
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  // Users API methods
  async getUsers(params = {}) {
    const queryParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== "") {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/users${queryString ? `?${queryString}` : ""}`;

    return this.request(endpoint);
  }

  async getLeaderboard() {
    return this.request("/users/leaderboard");
  }

  // Utility methods
  setAuthToken(token) {
    localStorage.setItem("token", token);
  }

  removeAuthToken() {
    localStorage.removeItem("token");
  }

  getAuthToken() {
    return localStorage.getItem("token");
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
