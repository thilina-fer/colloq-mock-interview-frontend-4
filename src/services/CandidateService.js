import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

// Token eka auto attach wena Axios Client eka
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const CandidateService = {
  // 1. Complete Profile Call (After Registration) - MULTIPART WIDIYATA WENAS KALA
  completeProfile: async (profileDTO, imageFile) => {
    try {
      const formData = new FormData();
      // JSON data eka blob ekak widihata 'data' kiyana namata danawa
      formData.append(
        "data",
        new Blob([JSON.stringify(profileDTO)], { type: "application/json" }),
      );

      // Image file eka thiyenawanam eka 'image' kiyana namata danawa
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await apiClient.post(
        "/candidate/complete-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // 2. Update Profile Call (From Sidebar) - MULTIPART WIDIYATA WENAS KALA
  updateProfile: async (formData) => {
    try {
      const response = await apiClient.post(
        "/candidate/update-profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },
};
