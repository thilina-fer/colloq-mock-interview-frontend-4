// import axios from "axios";

// const API_URL = "http://localhost:8080/api/v1/admin";

// export const AdminService = {
//   // 1. Pending අය ලබා ගැනීම
//   getPendingInterviewers: async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.get(`${API_URL}/pending-interviewers`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // 💡 response.data return කරන්න (එතකොට statusCode, message ඔක්කොම එනවා)
//       return response.data;
//     } catch (error) {
//       console.error("Error in getPendingInterviewers:", error);
//       throw error;
//     }
//   },

//   // 2. Approve කිරීමේ logic එක
//   approveInterviewer: async (id) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.put(
//         `${API_URL}/approve-interviewer/${id}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error in approveInterviewer:", error);
//       throw error;
//     }
//   },

//   // 3. Reject කිරීම
//   rejectInterviewer: async (id) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.delete(
//         `${API_URL}/reject-interviewer/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error in rejectInterviewer:", error);
//       throw error;
//     }
//   },
// };


import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/admin";

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return { Authorization: `Bearer ${token}` };
};

export const AdminService = {
  getPendingInterviewers: async () => {
    try {
      const response = await axios.get(`${API_URL}/pending-interviewers`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error in getPendingInterviewers:", error);
      throw error;
    }
  },


  approveInterviewer: async (id) => {
    try {
      const response = await axios.put(
        `${API_URL}/approve-interviewer/${id}`,
        {},
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error in approveInterviewer:", error);
      throw error;
    }
  },

  rejectInterviewer: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/reject-interviewer/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error in rejectInterviewer:", error);
      throw error;
    }
  },


  getTotalPlatformProfit: async () => {
    try {
      const response = await axios.get(`${API_URL}/total-profit`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error in getTotalPlatformProfit:", error);
      throw error;
    }
  },


  getProfitHistory: async () => {
    try {
      const response = await axios.get(`${API_URL}/profit-history`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error in getProfitHistory:", error);
      throw error;
    }
  }
};