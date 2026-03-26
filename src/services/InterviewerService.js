// src/services/InterviewerService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/interviewer";

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

export const InterviewerService = {
  // Profile එක සම්පූර්ණ කිරීම (Multipart/Form-Data)
  completeProfile: async (profileData, imageFile) => {
    try {
      const formData = new FormData();
      
      // JSON දත්ත ටික Blob එකක් ලෙස එකතු කිරීම
      formData.append(
        "data",
        new Blob([JSON.stringify(profileData)], { type: "application/json" })
      );

      // පින්තූරයක් තිබේ නම් එය එකතු කිරීම
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await apiClient.post("/complete-interviewer-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // Profile දත්ත ලබා ගැනීම
  getProfile: async () => {
    try {
      const response = await apiClient.get("/profile");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  }
};