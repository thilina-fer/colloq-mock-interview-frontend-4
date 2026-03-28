import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/admin";

export const AdminService = {
  // 1. Pending අය ලබා ගැනීම
  getPendingInterviewers: async () => {
    const token = localStorage.getItem("authToken");

    const response = await axios.get(`${API_URL}/pending-interviewers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 💡 මෙතන response.data.data දෙන්නේ Interviewers array එක විතරක් නිසා
    return response.data.data;
  },

  // 2. Approve කිරීමේ logic එක
  approveInterviewer: async (id) => {
    const token = localStorage.getItem("authToken");

    const response = await axios.put(
      `${API_URL}/approve-interviewer/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // 💡 වැදගත්: මෙතන response.data (මුළු Object එකම) return කරන්න.
    // එතකොට තමයි Frontend එකේ res.code සහ res.message කියන දෙකම පේන්නේ.
    console.log("DEBUG: AdminService Approve Response:", response.data);
    return response.data;
  },
};
