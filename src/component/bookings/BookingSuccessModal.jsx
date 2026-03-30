import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BoltIcon from "@mui/icons-material/Bolt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const BookingSuccessSummary = ({ bookingData, interviewer, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
      {/* Success Icon & Header */}
      <div className="space-y-4">
        <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-500 mb-2">
          <CheckCircleOutlineIcon sx={{ fontSize: 48 }} />
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
          Booking <span className="text-orange-500">Requested</span>
        </h2>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
          Reference ID: #BK-{Math.floor(Math.random() * 10000)}
        </p>
      </div>

      {/* Summary Box */}
      <div className="w-full max-w-md border border-white/5 bg-white/[0.02] p-8 space-y-6 text-left">
        <div className="space-y-1">
          <label className="text-[8px] font-black uppercase text-orange-500 tracking-widest">
            Interviewer
          </label>
          <p className="text-white font-bold text-lg uppercase tracking-tight">
            {interviewer?.username}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[8px] font-black uppercase text-gray-500 tracking-widest">
              Date
            </label>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <CalendarMonthIcon
                sx={{ fontSize: 16 }}
                className="text-orange-500"
              />
              {bookingData.date}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-black uppercase text-gray-500 tracking-widest">
              Time Slot
            </label>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <AccessTimeIcon
                sx={{ fontSize: 16 }}
                className="text-orange-500"
              />
              {bookingData.startTime} - {bookingData.endTime}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            Status
          </span>
          <span className="text-[10px] font-black text-orange-500 uppercase bg-orange-500/10 px-3 py-1 rounded-sm">
            Pending Approval
          </span>
        </div>
      </div>

      <p className="text-gray-500 text-[11px] max-w-xs italic leading-relaxed">
        We have notified the expert. You will receive a notification once they
        review and approve your session.
      </p>

      {/* Action Button */}
      <button
        onClick={onClose}
        className="w-full max-w-md py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] hover:bg-orange-600 hover:text-white transition-all duration-300 shadow-2xl"
      >
        Go to My Dashboard
      </button>
    </div>
  );
};
