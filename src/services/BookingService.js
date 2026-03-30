import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/bookings";

export const BookingService = {
  // 🚀 Interviewer කෙනෙක්ව Hire කිරීම
  hireInterviewer: async (bookingData) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${API_URL}/hire`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // 📋 Candidate ගේ Booking History එක ලබා ගැනීම
  getCandidateBookings: async (candidateId) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_URL}/candidate/${candidateId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // ✅/❌ Interviewer ට අදාළ Approve/Reject (අවශ්‍ය නම් පසුවට)
};