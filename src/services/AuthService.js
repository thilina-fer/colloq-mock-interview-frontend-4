import api from "../api/axios";

export const AuthService = {
  // Step 1: Register (Returns String)
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Step 2: Login (Returns AuthResponseDTO)
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const data = response.data;

      // Token එක හඳුනාගැනීම (Object එකක් හෝ String එකක් ලෙස)
      let token = "";
      if (typeof data === "string") {
        token = data;
      } else if (data && data.token) {
        token = data.token;
      } else if (data && data.accessToken) {
        token = data.accessToken;
      }

      if (token) {
        localStorage.setItem("access_token", token);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Step 3: Complete Profile
  completeCandidateProfile: async (profileDTO, config = {}) => {
    try {
      const { data } = await api.post(
        "/candidate/complete-profile",
        profileDTO,
        config,
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  // AuthService.js ඇතුළත එක් කරන්න
completeInterviewerProfile: async (profileDTO, config = {}) => {
    try {
        const { data } = await api.post("/interviewer/complete-interviewer-profile", profileDTO, config);
        return data;
    } catch (error) {
        throw error;
    }
}

};
