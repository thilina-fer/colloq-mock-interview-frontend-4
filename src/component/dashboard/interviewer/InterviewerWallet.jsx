// src/dashboard/interviewer/InterviewerWallet.jsx
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../theme/colors";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddBankModal from "../../../component/dashboard/interviewer/AddBankModal";
import { BankService } from "../../../services/BankService";
import { WalletService } from "../../../services/WalletService";
import toast from "react-hot-toast";

const InterviewerWallet = () => {
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankAccount, setBankAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [history, setHistory] = useState([]); // 🎯 History සඳහා අලුත් state එකක්

  const [walletData, setWalletData] = useState({
    balance: 0.0,
    status: "ACTIVE",
    lastUpdated: null,
  });

  const fetchBankDetails = async () => {
    setIsLoading(true);
    try {
      const data = await BankService.getMyAccount();
      setBankAccount(data);
    } catch (error) {
      console.log("No bank account found or error fetching.");
      setBankAccount(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWalletDetails = async () => {
    setIsWalletLoading(true);
    try {
      const res = await WalletService.getMyWallet();
      setWalletData(res.data || res || { balance: 0.0, status: "ACTIVE" });
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      toast.error("Failed to load wallet balance");
    } finally {
      setIsWalletLoading(false);
    }
  };

  // 🎯 History Fetch කරන Function එක
  const fetchHistory = async () => {
    try {
      const res = await WalletService.getWithdrawalHistory();
      setHistory(res.data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchBankDetails();
    fetchWalletDetails();
    fetchHistory(); // 🎯 Load වෙද්දීම history එක ගන්නවා
  }, []);

  const handleWithdrawRequest = async () => {
    if (!bankAccount) {
      toast.error("Please add a bank account first!");
      return;
    }
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAmount || amount < 1000) {
      toast.error("Minimum withdrawal amount is LKR 1,000.00");
      return;
    }
    if (amount > (walletData?.balance || 0)) {
      toast.error("Insufficient balance!");
      return;
    }

    const loadingToast = toast.loading("Processing your payout...");

    try {
      const response = await WalletService.withdrawFunds(amount);

      toast.success(response.message || "Withdrawal successful!", {
        id: loadingToast,
      });

      setWithdrawAmount("");
      fetchWalletDetails();
      fetchHistory(); // 🎯 Withdrawal එකෙන් පසු ලිස්ට් එක update කරනවා
    } catch (error) {
      console.error("Withdrawal Error:", error);
      const errorMsg =
        error.response?.data?.message || "Withdrawal failed. Please try again.";
      toast.error(errorMsg, { id: loadingToast });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">
            My <span className="text-orange-500">Wallet</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
            Manage your earnings and payouts
          </p>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">
            System Online
          </span>
        </div>
      </div>

      {/* 2. Balance & Bank Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="lg:col-span-2 p-8 border rounded-sm flex flex-col justify-center space-y-4 relative overflow-hidden group"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
            <AccountBalanceWalletIcon sx={{ fontSize: 120 }} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            Available Balance
          </p>

          {isWalletLoading ? (
            <CircularProgress size={30} sx={{ color: colors.primary }} />
          ) : (
            <h2 className="text-5xl font-black text-white">
              <span className="text-orange-500 text-lg mr-2">LKR</span>
              {(walletData?.balance ?? 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          )}

          <div className="flex gap-8 mt-4 pt-4 border-t border-white/5">
            <div>
              <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                Last Updated
              </p>
              <p className="text-xs font-black text-gray-300 uppercase">
                {walletData?.lastUpdated
                  ? new Date(walletData.lastUpdated).toLocaleDateString()
                  : "Never"}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                Account Status
              </p>
              <p className="text-xs font-black text-green-500 uppercase tracking-widest">
                {walletData?.status || "ACTIVE"}
              </p>
            </div>
          </div>
        </div>

        <div
          className="p-8 border rounded-sm flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            borderColor: bankAccount ? colors.border : colors.primary + "40",
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-2">
              <CircularProgress
                size={20}
                color="inherit"
                sx={{ color: colors.primary }}
              />
              <p className="text-gray-500 uppercase text-[8px] font-black tracking-widest">
                Verifying Status
              </p>
            </div>
          ) : bankAccount ? (
            <>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <AccountBalanceIcon
                    sx={{ color: colors.primary, fontSize: 24 }}
                  />
                  <span className="text-[8px] font-black px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full uppercase tracking-tighter">
                    Linked
                  </span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">
                  Primary Account
                </p>
                <h4 className="text-sm font-black text-white uppercase">
                  {bankAccount.bankName}
                </h4>
                <p className="text-[10px] font-bold text-gray-400 mt-1">
                  {bankAccount.accountNumber}
                </p>
              </div>
              <button
                onClick={() => setIsBankModalOpen(true)}
                className="mt-6 text-[9px] font-black uppercase tracking-widest text-orange-500 hover:text-white transition-colors flex items-center gap-1"
              >
                Edit Bank Details →
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/5 flex items-center justify-center border border-dashed border-orange-500/30">
                <AddCircleOutlineIcon
                  sx={{ color: colors.primary, fontSize: 20 }}
                />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                No Bank Linked
              </p>
              <button
                onClick={() => setIsBankModalOpen(true)}
                className="px-4 py-2 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-orange-500 transition-all"
              >
                Link Bank Account
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Withdrawal Form */}
        <div
          className="p-8 border rounded-sm flex flex-col space-y-5 lg:col-span-1"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <PaymentsIcon sx={{ color: colors.primary, fontSize: 20 }} />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
              Withdraw Funds
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
              Amount to Withdraw
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-xs font-black text-gray-500">
                LKR
              </span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border border-[#333] pl-12 pr-4 py-4 rounded-sm text-white font-black text-sm outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>
          <button
            onClick={handleWithdrawRequest}
            disabled={!bankAccount || isWalletLoading}
            className={`w-full py-4 font-black text-[10px] uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 ${bankAccount ? "bg-orange-600 text-white hover:bg-orange-500" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}
          >
            {bankAccount ? "Submit Payout Request" : "Link Bank to Withdraw"}{" "}
            <SendIcon sx={{ fontSize: 14 }} />
          </button>
        </div>

        {/* 4. Transactions History Table */}
        <div className="lg:col-span-2 space-y-4">
          <div
            className="flex items-center justify-between border-b pb-4"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center gap-3">
              <ReceiptLongIcon sx={{ color: colors.primary, fontSize: 20 }} />
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
                Recent Transactions
              </h3>
            </div>
          </div>
          <div
            className="w-full border rounded-sm overflow-hidden"
            style={{
              borderColor: colors.border,
              backgroundColor: "rgba(255,255,255,0.01)",
            }}
          >
            {history.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5">
                  <tr className="text-[9px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">
                    <th className="p-4">Date</th>
                    <th className="p-4">Bank Details</th>
                    <th className="p-4 text-right">Amount (LKR)</th>
                  </tr>
                </thead>
                <tbody className="text-white text-[10px] font-bold uppercase">
                  {history.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 text-gray-400">
                        {new Date(item.withdrawalDate).toLocaleDateString()}
                      </td>
                      <td className="p-4">{item.bankDetails}</td>
                      <td className="p-4 text-right text-orange-500 font-black">
                        -
                        {item.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
                <AccountBalanceIcon className="absolute opacity-[0.02] scale-[5]" />
                <div className="text-center space-y-3 z-10">
                  <ReceiptLongIcon sx={{ fontSize: 40, color: "#222" }} />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                    No activity logged
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddBankModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        onAccountAdded={fetchBankDetails}
        initialData={bankAccount}
      />
    </div>
  );
};

export default InterviewerWallet;
