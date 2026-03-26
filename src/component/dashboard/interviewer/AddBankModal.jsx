// src/component/dashboard/interviewer/AddBankModal.jsx
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../theme/colors";
import toast from "react-hot-toast";

const AddBankModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankData, setBankData] = useState({
    accountName: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Backend API එකක් එනකම් පොඩි delay එකක් දාමු
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Bank account linked successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to link bank account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md bg-black/80">
      <div className="w-full max-w-lg border rounded-sm p-10 shadow-2xl relative"
           style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
            <AccountBalanceIcon sx={{ color: colors.primary, fontSize: 30 }} />
          </div>
          <h2 className="text-xl font-black text-gray-100 tracking-widest uppercase">
            ADD <span className="text-orange-500">BANK ACCOUNT</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">
            Enter your bank details to receive payments
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Account Holder Name */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Account Holder Name</label>
            <div className="relative flex items-center">
              <PersonIcon className="absolute left-3 text-gray-500" sx={{ fontSize: 18 }} />
              <input 
                type="text" 
                name="accountName" 
                required 
                value={bankData.accountName} 
                onChange={handleChange}
                placeholder="Ex: T.D. FERNANDO"
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors" 
              />
            </div>
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bank Name</label>
            <div className="relative flex items-center">
              <AccountBalanceIcon className="absolute left-3 text-gray-500" sx={{ fontSize: 18 }} />
              <input 
                type="text" 
                name="bankName" 
                required 
                value={bankData.bankName} 
                onChange={handleChange}
                placeholder="Ex: Commercial Bank / Sampath Bank"
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Branch */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Branch</label>
              <div className="relative flex items-center">
                <LocationOnIcon className="absolute left-3 text-gray-500" sx={{ fontSize: 18 }} />
                <input 
                  type="text" 
                  name="branchName" 
                  required 
                  value={bankData.branchName} 
                  onChange={handleChange}
                  placeholder="Ex: Badulla"
                  className="w-full pl-10 pr-3 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors" 
                />
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Account Number</label>
              <div className="relative flex items-center">
                <NumbersIcon className="absolute left-3 text-gray-500" sx={{ fontSize: 18 }} />
                <input 
                  type="text" 
                  name="accountNumber" 
                  required 
                  value={bankData.accountNumber} 
                  onChange={handleChange}
                  placeholder="800XXXXXXX"
                  className="w-full pl-10 pr-3 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors" 
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 rounded-sm font-black text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2 uppercase tracking-[0.2em] text-xs"
            >
              {isSubmitting ? <CircularProgress size={18} color="inherit" /> : "Link Bank Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankModal;