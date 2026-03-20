import React, { useState } from "react";
import { colors } from "../../../theme/color";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookingPopup from "../../bookings/BookingPopup";

const CandidateHome = () => {
  // Popup එක open/close පාලනය කරන state එක
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Main Container */}
      <div className="w-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/30 transition-all hover:bg-gray-50/60">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
          <AddCircleOutlineIcon
            style={{ color: colors.primary, fontSize: 40 }}
          />
        </div>

        <h2
          className="text-3xl font-black mb-2 text-center"
          style={{ color: colors.black }}
        >
          Ready to level up?
        </h2>
        <p className="text-gray-400 mb-10 font-medium text-center max-w-sm">
          Select your engineering level and type to find the perfect mentor for
          your next mock interview.
        </p>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="group flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-white shadow-xl shadow-orange-500/20 transition-all hover:translate-y-[-4px] hover:shadow-orange-500/40 active:scale-95"
          style={{ backgroundColor: colors.primary }}
        >
          <AddCircleOutlineIcon className="group-hover:rotate-90 transition-transform duration-300" />
          Book New Session
        </button>
      </div>

      {/* Booking Popup Component */}
      <BookingPopup
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Custom slow bounce animation for the icon */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CandidateHome;
