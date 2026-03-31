import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/payments";

const PaymentService = {
  // 💳 Payment එක process කරන ප්‍රධාන method එක
  processCheckout: async (paymentData) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(`${API_URL}/checkout`, paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : "Payment failed";
    }
  },
};

export default PaymentService;