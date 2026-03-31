import React, { useState } from "react";
import PaymentService from "../../services/PaymentService";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const PaymentModal = ({ isOpen, onClose, booking, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const paymentData = {
      amount: 2500.0, // මේක ඔයාගේ level එක අනුව dynamic කරන්නත් පුළුවන්
      paymentMethod: "CARD",
      bookingId: booking.bookingId,
    };

    try {
      const message = await PaymentService.processCheckout(paymentData);
      toast.success("Payment Successful! Your session is confirmed.");
      onSuccess(); // පස්සේ dashboard එක refresh කරන්න
      onClose();
    } catch (err) {
      toast.error(err || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/10 blur-[100px]"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-white">
              Secure <span className="text-orange-500">Checkout</span>
            </h2>
            <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mt-1">
              Booking ID: #{booking.bookingId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Card Preview (Modern Glass Look) */}
        <div className="w-full h-44 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-8 p-6 flex flex-col justify-between border border-white/10 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <CreditCardIcon sx={{ fontSize: 80 }} />
          </div>
          <div className="w-10 h-8 bg-yellow-500/20 border border-yellow-500/30 rounded-sm"></div>
          <div className="space-y-4">
            <div className="h-2 w-full bg-white/5 rounded-full"></div>
            <div className="flex justify-between items-end">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">
                CANDIDATE NAME
              </p>
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em]">
                00 / 00
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
              Card Number
            </label>
            <input
              required
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:border-orange-500/50 focus:outline-none transition-all font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Expiry Date
              </label>
              <input
                required
                type="text"
                placeholder="MM/YY"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:border-orange-500/50 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
                CVV
              </label>
              <input
                required
                type="password"
                placeholder="***"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:border-orange-500/50 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-lg mt-6 transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(234,88,12,0.5)] disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm & Pay 2,500 LKR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
