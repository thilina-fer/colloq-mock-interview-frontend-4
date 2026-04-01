import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/wallet";

export const WalletService = {
  // 🎯 Token එක ගන්න Helper function එක මෙතනට ලිව්වා
  getAuthHeaders: () => {
    const token = localStorage.getItem("authToken");
    return { Authorization: `Bearer ${token}` };
  },

  getMyWallet: async () => {
    try {
      const response = await axios.get(`${API_URL}/my-wallet`, {
        headers: WalletService.getAuthHeaders(), // WalletService එක හරහාම call කරන්න
      });
      // Backend එකෙන් APIResponse එකක් එනවා නම් response.data return කරන්න
      return response.data;
    } catch (error) {
      console.error("Error fetching wallet:", error);
      throw error;
    }
  },

  withdrawFunds: async (amount) => {
    try {
      const response = await axios.post(
        `${API_URL}/withdraw?amount=${amount}`,
        null, // 🎯 {} වෙනුවට null දාන්න
        {
          headers: WalletService.getAuthHeaders(),
        },
      );
      return response.data;
    } catch (error) {
      console.error("Withdrawal Error:", error);
      throw error;
    }
  },
  getWithdrawalHistory: async () => {
    try {
      const response = await axios.get(`${API_URL}/withdrawal-history`, {
        headers: WalletService.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error);
      throw error;
    }
  },
};
