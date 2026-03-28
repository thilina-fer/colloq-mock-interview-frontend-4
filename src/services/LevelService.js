import axios from "axios";

// 💡 Backend එකේ Base URL එක
const API_BASE_URL = "http://localhost:8080/api/v1/level";

// 1. Axios Instance එකක් හදාගමු (Token එක auto attach වෙන්න)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// 2. Request Interceptor: Hama API call ekakama Token eka attach කරනවා
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Level Service Functions
export const LevelService = {
  
  // 🚀 සියලුම ලෙවල් ලබා ගැනීම (Get All)
  getAllLevels: async () => {
    try {
      const response = await apiClient.get("");
      return response; // Meken return wenne APIResponse eka
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // 🚀 ලෙවල් එකක් ID එකෙන් ලබා ගැනීම (Get By ID)
  getLevelById: async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // 🚀 අලුත් ලෙවල් එකක් ඇතුළත් කිරීම (Save)
  saveLevel: async (levelDTO) => {
    try {
      const response = await apiClient.post("", levelDTO);
      return response;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // 🚀 ලෙවල් එකක් Update කිරීම (Update)
  updateLevel: async (id, levelDTO) => {
    try {
      const response = await apiClient.put(`/${id}`, levelDTO);
      return response;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // 🚀 ලෙවල් එකක් මකා දැමීම (Delete)
  deleteLevel: async (id) => {
    try {
      const response = await apiClient.delete(`/${id}`);
      return response;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  }
};