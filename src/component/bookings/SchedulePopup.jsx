import React, { useState } from "react";
import { colors } from "../../theme/color";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const SchedulePopup = ({ isOpen, onClose, mentorName }) => {
  const [selectedDate, setSelectedDate] = useState(20);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "04:30 PM - 05:30 PM",
    "08:00 PM - 09:00 PM",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
      <div className="w-full max-w-3xl bg-white rounded-[32px] p-8 shadow-2xl relative animate-popIn">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-400">
              <CalendarMonthIcon />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Schedule Interview</h2>
              <p className="text-sm font-medium text-gray-400">Select date and slot with <span className="text-orange-500 font-bold">{mentorName}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <CloseIcon className="text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* --- LEFT: CALENDAR SECTION --- */}
          <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-800">March 2026</h3>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeftIcon fontSize="small"/></button>
                <button className="p-1 hover:bg-gray-200 rounded"><ChevronRightIcon fontSize="small"/></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-4 text-center">
              {days.map(d => <span key={d} className="text-[10px] font-black text-gray-300 uppercase">{d}</span>)}
              {dates.map(date => (
                <button 
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`text-sm font-bold w-9 h-9 flex items-center justify-center rounded-lg transition-all mx-auto
                    ${selectedDate === date ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"}
                  `}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: TIME SLOTS SECTION --- */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Available Slots</h3>
            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full p-4 rounded-xl border-2 text-sm font-bold transition-all text-left
                    ${selectedSlot === slot ? "border-orange-500 bg-orange-50 text-orange-600" : "border-gray-100 text-gray-500 hover:border-gray-200 bg-white"}
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-10">
          <button
            disabled={!selectedSlot}
            className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all
              ${selectedSlot ? "bg-gray-900 text-white shadow-xl hover:translate-y-[-2px] active:scale-[0.98]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
            `}
          >
            <AccountBalanceWalletIcon fontSize="small" />
            Confirm Booking
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        .animate-popIn { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default SchedulePopup;