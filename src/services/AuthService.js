import api from "../api/axios";

export const AuthService = {
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const data = response.data;

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

completeInterviewerProfile: async (profileDTO, config = {}) => {
    try {
        const { data } = await api.post("/interviewer/complete-interviewer-profile", profileDTO, config);
        return data;
    } catch (error) {
        throw error;
    }
}

};
