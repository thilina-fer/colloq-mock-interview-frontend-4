import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../theme/colors";
import { BankService } from "../../../services/BankService";
import toast from "react-hot-toast";

const AddBankModal = ({ isOpen, onClose, onAccountAdded, initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [bankData, setBankData] = useState({
    accountName: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
  });

  // Modal එක open වෙද්දී initialData තියෙනවා නම් ඒවා form එකට දානවා
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setBankData({
          accountName: initialData.accountName || "",
          bankName: initialData.bankName || "",
          branchName: initialData.branchName || "",
          accountNumber: initialData.accountNumber || "",
        });
      } else {
        setBankData({
          accountName: "",
          bankName: "",
          branchName: "",
          accountNumber: "",
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setBankData({ ...bankData, [e.target.name]: e.target.value });
  };

  // SAVE & UPDATE Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !bankData.accountName ||
      !bankData.bankName ||
      !bankData.accountNumber
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...bankData,
        accountName: bankData.accountName.toUpperCase(),
        status: "ACTIVE",
      };

      let response;
      if (initialData) {
        // UPDATE Request (/api/v1/bank-account/update-account)
        response = await BankService.updateBankAccount(payload);
        toast.success(response || "Bank details updated!");
      } else {
        // SAVE Request (/api/v1/bank-account/save-account)
        response = await BankService.saveBankAccount(payload);
        toast.success(response || "Bank account linked!");
      }

      if (onAccountAdded) onAccountAdded();
      onClose();
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : error.message || "Operation failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE Logic
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to remove this bank account?"))
      return;

    setIsDeleting(true);
    try {
      const response = await BankService.removeAccount();
      toast.success(response || "Bank account removed!");
      if (onAccountAdded) onAccountAdded();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to remove account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md bg-black/80 animate-in fade-in duration-300">
      <div
        className="w-full max-w-lg border rounded-sm p-10 shadow-2xl relative"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting || isDeleting}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors disabled:opacity-50"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>

        {/* Delete Button (පෙන්වන්නේ Update කරනවා නම් විතරයි) */}
        {initialData && (
          <button
            onClick={handleDelete}
            disabled={isSubmitting || isDeleting}
            className="absolute top-4 left-4 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50"
            title="Remove Bank Account"
          >
            {isDeleting ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <DeleteOutlineIcon sx={{ fontSize: 22 }} />
            )}
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
            <AccountBalanceIcon sx={{ color: colors.primary, fontSize: 30 }} />
          </div>
          <h2 className="text-xl font-black text-gray-100 tracking-widest uppercase">
            {initialData ? "Update" : "Link"}{" "}
            <span className="text-orange-500">Bank Account</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">
            {initialData
              ? "Edit your linked bank information"
              : "Link your account to receive payments"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Account Holder Name */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Account Holder Name *
            </label>
            <div className="relative flex items-center">
              <PersonIcon
                className="absolute left-3 text-gray-500"
                sx={{ fontSize: 18 }}
              />
              <input
                type="text"
                name="accountName"
                required
                disabled={isSubmitting || isDeleting}
                value={bankData.accountName}
                onChange={handleChange}
                placeholder="Ex: THILINA DILSHAN"
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Bank Name *
            </label>
            <div className="relative flex items-center">
              <AccountBalanceIcon
                className="absolute left-3 text-gray-500"
                sx={{ fontSize: 18 }}
              />
              <input
                type="text"
                name="bankName"
                required
                disabled={isSubmitting || isDeleting}
                value={bankData.bankName}
                onChange={handleChange}
                placeholder="Ex: Commercial Bank / Sampath Bank"
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Branch */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Branch
              </label>
              <div className="relative flex items-center">
                <LocationOnIcon
                  className="absolute left-3 text-gray-500"
                  sx={{ fontSize: 18 }}
                />
                <input
                  type="text"
                  name="branchName"
                  required
                  disabled={isSubmitting || isDeleting}
                  value={bankData.branchName}
                  onChange={handleChange}
                  placeholder="Ex: Badulla"
                  className="w-full pl-10 pr-3 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Account Number *
              </label>
              <div className="relative flex items-center">
                <NumbersIcon
                  className="absolute left-3 text-gray-500"
                  sx={{ fontSize: 18 }}
                />
                <input
                  type="text"
                  name="accountNumber"
                  required
                  disabled={isSubmitting || isDeleting}
                  value={bankData.accountNumber}
                  onChange={handleChange}
                  placeholder="800XXXXXXX"
                  className="w-full pl-10 pr-3 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || isDeleting}
              className="w-full py-4 rounded-sm font-black text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2 uppercase tracking-[0.2em] text-xs disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={16} color="inherit" />
                  <span>Processing...</span>
                </>
              ) : initialData ? (
                "Update Details"
              ) : (
                "Link Bank Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankModal;
