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
import toast from "react-hot-toast";

const InterviewerWallet = () => {
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankAccount, setBankAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // මේවා පස්සේ Backend එකේ Wallet table එකෙන් ගන්න පුළුවන්
  const [walletData, setWalletData] = useState({
    totalBalance: 25500.0,
    totalWithdrawal: 12000.0,
    transactions: [],
  });

  // 1. බැංකු ගිණුම තියෙනවාදැයි පරීක්ෂා කිරීම (GET /api/v1/bank-account/my-account)
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

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const handleWithdrawRequest = () => {
    if (!bankAccount) {
      toast.error("Please add a bank account first!");
      return;
    }
    if (!withdrawAmount || parseFloat(withdrawAmount) < 1000) {
      toast.error("Minimum withdrawal amount is LKR 1,000.00");
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

      {/* 2. Balance & Linked Bank Area */}
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
          <h2 className="text-5xl font-black text-white">
            <span className="text-orange-500 text-lg mr-2">LKR</span>
            {walletData.totalBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
          <div className="flex gap-8 mt-4 pt-4 border-t border-white/5">
            <div>
              <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                Total Payouts
              </p>
              <p className="text-xs font-black text-gray-300">
                LKR {walletData.totalWithdrawal.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                Pending Clearances
              </p>
              <p className="text-xs font-black text-gray-300">LKR 0.00</p>
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

      {/* 3. Withdrawal Form & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            disabled={!bankAccount}
            className={`w-full py-4 font-black text-[10px] uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2
              ${bankAccount ? "bg-orange-600 text-white hover:bg-orange-500" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}
          >
            {bankAccount ? "Submit Payout Request" : "Link Bank to Withdraw"}{" "}
            <SendIcon sx={{ fontSize: 14 }} />
          </button>
        </div>

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
            className="w-full border rounded-sm flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden"
            style={{
              borderColor: colors.border,
              backgroundColor: "rgba(255,255,255,0.01)",
            }}
          >
            <AccountBalanceIcon className="absolute opacity-[0.02] scale-[5]" />
            <div className="text-center space-y-3 z-10">
              <ReceiptLongIcon sx={{ fontSize: 40, color: "#222" }} />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                No activity logged
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal එකට initialData එක pass කිරීම */}
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
