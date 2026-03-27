// src/services/BankService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/bank-account";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor: Token එක auto attach කිරීමට
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const BankService = {
  // බැංකු ගිණුම save කිරීම
  saveBankAccount: async (bankData) => {
    try {
      const response = await apiClient.post("/save-account", bankData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // තමන්ගේ බැංකු ගිණුම ලබා ගැනීම
  getMyAccount: async () => {
    try {
      const response = await apiClient.get("/my-account");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // බැංකු විස්තර update කිරීම
  updateBankAccount: async (bankData) => {
    try {
      const response = await apiClient.put("/update-account", bankData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // බැංකු ගිණුම ඉවත් කිරීම
  removeAccount: async () => {
    try {
      const response = await apiClient.delete("/remove-account");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  }
};