import axios from "axios";

// Oya Spring Boot run wena port eka (samanyayen 8080)
const API_BASE_URL = "http://localhost:8080/api/v1";

// 1. Axios Instance eka hadaganna
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// 2. Request Interceptor: Hama API call ekakama Token eka auto attach karanna meken puluwan
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
  },
);

// 3. Auth Service Functions
export const AuthService = {
  // Login API Call
  login: async (authDTO) => {
    try {
      const response = await apiClient.post("/auth/login", authDTO);
      if (response.data && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // Initial Register API Call
  register: async (registerDTO) => {
    try {
      const response = await apiClient.post("/auth/register", registerDTO);
      return response.data; // Meken return wenne oya backend eken ewana String eka
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // Google Login API Call
  googleLogin: async (googleAuthDTO) => {
    try {
      const response = await apiClient.post("/auth/google", googleAuthDTO);
      if (response.data && response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // Get Current User API Call (Using Token)
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data; // AuthMeDTO eka return wenawa
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // Complete Candidate Profile (Token is auto-attached)
  completeCandidateProfile: async (candidateProfileDTO) => {
    try {
      // TODO: Oya backend eke me endpoint eka `/candidate/profile` kiyala hadala nam methana danna
      const response = await apiClient.post(
        "/candidate/profile",
        candidateProfileDTO,
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // Complete Interviewer Profile (Token is auto-attached)
  completeInterviewerProfile: async (interviewerProfileDTO) => {
    try {
      // TODO: Oya backend eke me endpoint eka `/interviewer/profile` kiyala hadala nam methana danna
      const response = await apiClient.post(
        "/interviewer/profile",
        interviewerProfileDTO,
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
    }
  },

  // Logout Function
  logout: () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Logout unama login ekata yanawa
  },

  // Token eka thiyenawada kiyala check karanna chuti helper ekak
  isAuthenticated: () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  },
};
