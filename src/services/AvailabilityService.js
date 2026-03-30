import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/availability";

const AvailabilityService = {
  saveBatch: async (slotsArray) => {
    const token = localStorage.getItem("authToken");

    console.log("Sending Token:", token);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/batch-save`,
        slotsArray,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

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

  // 🎯 🚀 අලුතින්ම එකතු කළ කොටස: Interviewer අනුව Slots Fetch කිරීම
  getAvailabilitiesByInterviewerId: async (interviewerId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/interviewer/${interviewerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Fetch Error by Interviewer ID:", error);
      throw error;
    }
  },

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
