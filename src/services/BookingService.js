import axios from "axios";

// 🎯 Base URL එක ඔයාගේ Backend Controller එකට ගැලපෙන්න හදන්න
const API_URL = "http://localhost:8080/api/v1/booking";

export const BookingService = {
  // 🚀 Booking එකක් Save කිරීම (Hire Interviewer)
  saveBooking: async (bookingData) => {
    // 🎯 [IMPORTANT] ඔයා මුලින් පාවිච්චි කළේ "authToken" නේද? ඒ නමම මෙතනත් පාවිච්චි කරන්න.
    const token = localStorage.getItem("authToken");

    const response = await axios.post(`${API_URL}/save`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // 📋 Candidate ගේ Booking History එක ලබා ගැනීම
  getCandidateBookings: async () => {
    const token = localStorage.getItem("authToken");
    // සාමාන්‍යයෙන් candidateId එක Backend එකේදී Token එකෙන් ගන්න නිසා,
    // endpoint එක /my-bookings වගේ එකක් වෙන්න පුළුවන්.
    const response = await axios.get(`${API_URL}/my-bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // ✅ Interviewer විසින් Booking එක Approve/Reject කිරීම
  updateBookingStatus: async (bookingId, status) => {
    const token = localStorage.getItem("authToken");
    const response = await axios.put(
      `${API_URL}/update-status/${bookingId}?status=${status}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  },
};

export default BookingService;
