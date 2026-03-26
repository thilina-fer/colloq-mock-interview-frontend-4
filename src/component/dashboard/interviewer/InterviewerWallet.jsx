// src/dashboard/interviewer/InterviewerWallet.jsx
import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import AddBankModal from "../../../component/dashboard/interviewer/AddBankModal";
import toast from "react-hot-toast";

const InterviewerWallet = () => {
  const [activeTab, setActiveTab] = useState("withdraw");
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const walletData = {
    totalBalance: 25500.0,
    totalWithdrawal: 12000.0,
    transactions: [],
  };

  const handleWithdrawRequest = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (parseFloat(withdrawAmount) > walletData.totalBalance) {
      toast.error("Insufficient balance!");
      return;
    }
    toast.success(`Withdrawal request for LKR ${withdrawAmount} submitted!`);
    setWithdrawAmount("");
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

      {/* 2. Action Bar */}
      <div
        className="flex border rounded-sm p-1.5 shadow-2xl"
        style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      >
        <button
          onClick={() => setActiveTab("withdraw")}
          className={`flex-1 py-4 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-sm
          ${activeTab === "withdraw" ? "bg-white text-black shadow-xl scale-[1.02]" : "text-gray-500 hover:text-gray-300"}`}
        >
          <PaymentsIcon sx={{ fontSize: 18 }} /> Withdraw Funds
        </button>

        <button
          onClick={() => setIsBankModalOpen(true)}
          className="flex-1 py-4 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all text-gray-400 hover:text-white"
        >
          <AddCircleOutlineIcon sx={{ fontSize: 18, color: colors.primary }} />{" "}
          Add Bank Account
        </button>
      </div>

      {/* 3. Balance & Withdraw Form Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-8 border rounded-sm flex flex-col justify-center space-y-4 relative overflow-hidden group"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform">
              <PaymentsIcon sx={{ fontSize: 100 }} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              Available Balance
            </p>
            <h2 className="text-4xl font-black text-white">
              <span className="text-orange-500 text-lg mr-2">LKR</span>
              {walletData.totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>

          <div
            className="p-8 border rounded-sm flex flex-col justify-center space-y-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              borderColor: colors.border,
            }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              Life-time Earnings
            </p>
            <h2 className="text-4xl font-black text-gray-400">
              <span className="text-gray-600 text-lg mr-2">LKR</span>
              {(
                walletData.totalBalance + walletData.totalWithdrawal
              ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </div>

        {/* Quick Withdraw Form */}
        <div
          className="p-8 border rounded-sm flex flex-col space-y-5"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.primary + "40",
          }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
            Quick Withdrawal
          </p>
          <div className="space-y-2">
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter Amount (LKR)"
              className="w-full bg-black border border-[#333] px-4 py-3 rounded-sm text-white text-sm outline-none focus:border-orange-500 transition-colors"
            />
            <p className="text-[9px] text-gray-500 italic">
              * Min withdrawal: LKR 1,000.00
            </p>
          </div>
          <button
            onClick={handleWithdrawRequest}
            className="w-full py-3 bg-orange-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
          >
            Request Payout <SendIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>

      {/* 4. Transaction History */}
      <div className="space-y-6">
        <div
          className="flex items-center justify-between border-b pb-4"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center gap-3">
            <ReceiptLongIcon sx={{ color: colors.primary, fontSize: 22 }} />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">
              Transaction History
            </h3>
          </div>
          <button className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-orange-500 transition-colors">
            View All
          </button>
        </div>

        <div
          className="w-full border rounded-sm p-16 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden"
          style={{
            borderColor: colors.border,
            backgroundColor: "rgba(255,255,255,0.01)",
          }}
        >
          {/* Subtle Background Watermark */}
          <AccountBalanceIcon className="absolute opacity-[0.02] scale-[5]" />

          {walletData.transactions.length === 0 ? (
            <div className="text-center space-y-5 z-10">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto border border-[#333]">
                <ReceiptLongIcon sx={{ fontSize: 30, color: "#333" }} />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                  No activity yet
                </p>
                <p className="text-[9px] font-medium text-gray-600 uppercase tracking-widest">
                  Your future transactions will appear here
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full z-10">{/* Transaction Table Logic */}</div>
          )}
        </div>
      </div>

      <AddBankModal
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
      />
    </div>
  );
};

export default InterviewerWallet;
