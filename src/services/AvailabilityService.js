import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/availability";

const AvailabilityService = {
  saveBatch: async (slotsArray) => {
    // 💡 මෙතන ඔයා Token එක save කරලා තියෙන Key එක හරියටම බලන්න (සාමාන්‍යයෙන් 'token' හෝ 'jwt')
    const token = localStorage.getItem("authToken");

    console.log("Sending Token:", token); // 👈 මේක Console එකේ බලන්න පුළුවන් නේද කියලා

    try {
      const response = await axios.post(
        `${API_BASE_URL}/batch-save`,
        slotsArray,
        {
          headers: {
            // 💡 Bearer එකට පස්සේ Space එකක් තියෙන්නම ඕනේ
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
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Fetch Error:", error);
            throw error;
        }
    },
};

export default AvailabilityService;
