import axios from "axios";

// 🎯 Backend එකේ @RequestMapping("/api/v1/bookings") වලට ගැලපෙන්න
const API_URL = "http://localhost:8080/api/v1/bookings";

const BookingService = {
  // 🚀 Booking එකක් Save කිරීම (Hire Interviewer)
  saveBooking: async (bookingData) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(`${API_URL}/hire`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ✅ Interviewer විසින් Booking එක Approve කිරීම
  approveBooking: async (bookingId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `${API_URL}/approve/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ❌ Interviewer විසින් Booking එක Reject කිරීම
  rejectBooking: async (bookingId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `${API_URL}/reject/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // BookingService.js ඇතුළත
  getInterviewerBookings: async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${API_URL}/interviewer/my-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data || [];
    } catch (error) {
      throw error;
    }
  },

  // 📋 Candidate ගේ Booking History එක ලබා ගැනීම
  getCandidateBookings: async (candidateId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${API_URL}/candidate/${candidateId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🎯 මෙතනත් Array එක return කරනවා safety එකට
      return Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
    } catch (error) {
      console.error("Fetch Error Candidate Bookings:", error);
      throw error;
    }
  },
};

export default BookingService;
