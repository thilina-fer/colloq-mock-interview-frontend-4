import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentsIcon from "@mui/icons-material/Payments";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const CandidateBookingCard = ({ booking, onPay }) => {
  // Status අනුව පාට සහ Styles තීරණය කිරීම
  const getStatusStyles = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      case "PENDING_APPROVAL":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "REJECTED":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-400 bg-white/5 border-white/10";
    }
  };

  // ✅ Backend එකෙන් 'paid' හෝ 'isPaid' ලෙස එන ඕනෑම අගයක් පරීක්ෂා කිරීම
  const isSessionPaid = booking.paid === true || booking.isPaid === true;

  return (
    <div className="relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 rounded-xl flex flex-col gap-4 group hover:bg-white/[0.05] hover:border-orange-500/40 transition-all duration-500 shadow-2xl">
      {/* Background Subtle Glow Effect */}
      <div className="absolute -right-10 -top-10 w-20 h-20 bg-orange-500/5 blur-3xl group-hover:bg-orange-500/10 transition-all"></div>

      {/* Header Section: Interviewer Info & Status Badge */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-gradient-to-br from-white/10 to-transparent p-[1px]">
            <img
              src={booking.interviewerProfilePic || "/default-avatar.png"}
              className="w-full h-full object-cover rounded-full"
              alt="Interviewer"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-tight group-hover:text-orange-500 transition-colors">
              {booking.interviewerName || "Expert Interviewer"}
            </h4>
            <p className="text-[8px] text-gray-500 font-medium uppercase tracking-widest">
              {booking.jobType || "Technical Mock"}
            </p>
          </div>
        </div>
        <span
          className={`text-[7px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border backdrop-blur-sm ${getStatusStyles(booking.status)}`}
        >
          {booking.status?.replace("_", " ")}
        </span>
      </div>

      {/* Appointment Slot Details (Compact Bar) */}
      <div className="flex items-center justify-between py-3 border-y border-white/5 bg-white/[0.01] px-2 rounded-lg">
        <div className="flex items-center gap-2">
          <CalendarMonthIcon
            className="text-orange-500/80"
            sx={{ fontSize: 13 }}
          />
          <span className="text-gray-300 font-semibold text-[9px] uppercase tracking-tighter">
            {booking.date}
          </span>
        </div>
        <div className="w-[1px] h-3 bg-white/10"></div>
        <div className="flex items-center gap-2">
          <AccessTimeIcon
            className="text-orange-500/80"
            sx={{ fontSize: 13 }}
          />
          <span className="text-gray-300 font-semibold text-[9px] uppercase tracking-tighter">
            {booking.startTime} - {booking.endTime}
          </span>
        </div>
      </div>

      {/* 🎯 Payment & Action Button Logic */}
      <div className="flex flex-col pt-1">
        {booking.status === "APPROVED" ? (
          /* Interviewer Approve කර ඇත්නම් */
          isSessionPaid ? (
            /* ✅ සල්ලි ගෙවා ඇත්නම් (Join Meeting පෙන්වයි) */
            <a
              href={booking.meetingLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/30 text-[9px] font-bold uppercase tracking-[0.1em] rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-500/10"
            >
              <VideoCallIcon sx={{ fontSize: 16 }} /> Join Interview Session
            </a>
          ) : (
            /* 💳 සල්ලි ගෙවා නැත්නම් (Pay Now පෙන්වයි) */
            <button
              onClick={() => onPay(booking)}
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-[9px] font-bold uppercase tracking-[0.1em] rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_8px_20px_-8px_rgba(234,88,12,0.4)]"
            >
              <PaymentsIcon sx={{ fontSize: 16 }} /> Pay Now to Confirm
            </button>
          )
        ) : booking.status === "PENDING_APPROVAL" ? (
          /* ⏳ තවමත් Expert Approve කර නැත්නම් */
          <div className="w-full py-2.5 bg-white/5 border border-white/5 text-gray-500 text-[8px] font-bold uppercase tracking-[0.15em] text-center rounded-lg backdrop-blur-sm italic">
            Waiting for Expert Approval
          </div>
        ) : (
          /* ❌ ඉල්ලීම ප්‍රතික්ෂේප කර ඇත්නම් */
          <div className="w-full py-2.5 bg-red-500/10 border border-red-500/20 text-red-500/70 text-[8px] font-bold uppercase tracking-[0.15em] text-center rounded-lg">
            This Request was Rejected
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateBookingCard;
