import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/availability";

const AvailabilityService = {
  // 🚀 Batch Save slots (Interviewer Dashboard එකට)
  saveBatch: async (slotsArray) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/batch-save`,
        slotsArray,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // 📋 ඔක්කොම slots ගන්න (අවශ්‍ය නම් පමණි)
  getAllAvailabilities: async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${API_BASE_URL}/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  },

  // 🎯 🚀 Candidate Modal එකට Interviewer අනුව Slots Fetch කිරීම
  getAvailabilitiesByInterviewerId: async (interviewerId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/interviewer/${interviewerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // 🎯 Backend එකෙන් කෙලින්ම Array එකක් එන නිසා response.data එක return කරනවා.
      // හැබැයි ඔයා APIResponse class එක පාවිච්චි කරනවා නම් response.data.data වෙන්න ඕනේ.
      // දැනට Postman එකේ පෙනුණු විදිහට මේක Array එකක්:
      return response.data;
    } catch (error) {
      console.error("Fetch Error by Interviewer ID:", error);
      throw error;
    }
  },

  // 🗑️ Slot එකක් Delete කිරීම
  deleteAvailability: async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data || "Delete failed";
      throw new Error(message);
    }
  },
};

export default AvailabilityService;
