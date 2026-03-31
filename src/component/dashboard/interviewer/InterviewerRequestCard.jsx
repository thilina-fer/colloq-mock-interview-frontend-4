import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BoltIcon from "@mui/icons-material/Bolt";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const InterviewerRequestCard = ({
  booking,
  onApprove,
  onReject,
  isLoading,
}) => {
  // 🎯 Default note එකක් ආවොත් ඒක පෙන්වන්නේ නැතිව ඉන්න
  const hasValidNote =
    booking.candidateNote && !booking.candidateNote.includes("Scheduled via");

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 rounded-sm flex flex-col gap-5 group hover:border-orange-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
      {/* Header: Candidate Info & Badge */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center text-orange-500 overflow-hidden shadow-inner">
            {booking.candidateProfilePic ? (
              <img
                src={booking.candidateProfilePic}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <PersonIcon sx={{ fontSize: 28 }} />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-white font-black uppercase text-sm tracking-tighter">
              {booking.candidateName || "New Candidate"}
            </h4>

            {/* 🎯 Social Links - අලුතින් එකතු කළා */}
            <div className="flex gap-3">
              {booking.candidateGithub && (
                <a
                  href={booking.candidateGithub}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-white transition-colors"
                >
                  <GitHubIcon sx={{ fontSize: 14 }} />
                </a>
              )}
              {booking.candidateLinkedin && (
                <a
                  href={booking.candidateLinkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-[#0077b5] transition-colors"
                >
                  <LinkedInIcon sx={{ fontSize: 14 }} />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-2 py-1 rounded-sm border border-orange-500/20">
            Action Required
          </span>
        </div>
      </div>

      {/* Middle: Slot Details Bar */}
      <div className="flex items-center gap-8 py-4 border-y border-white/5 bg-black/40 px-4 -mx-6">
        <div className="flex items-center gap-2">
          <CalendarMonthIcon
            className="text-orange-500"
            sx={{ fontSize: 16 }}
          />
          <span className="text-white font-black text-[11px] tracking-tight">
            {booking.date}
          </span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-8">
          <AccessTimeIcon className="text-orange-500" sx={{ fontSize: 16 }} />
          <span className="text-white font-black text-[11px] tracking-tight">
            {booking.startTime} - {booking.endTime}
          </span>
        </div>
      </div>

      {/* 🎯 Updated Candidate Note Logic */}
      {hasValidNote && (
        <div className="bg-white/[0.03] p-4 border-l-2 border-orange-500/50 rounded-r-sm">
          <p className="text-[10px] text-gray-400 italic leading-relaxed">
            "{booking.candidateNote}"
          </p>
        </div>
      )}

      {/* Footer: Level & Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">
            Interview Level
          </span>
          <span className="text-white font-black text-[11px] uppercase flex items-center gap-1">
            {booking.levelName || "Associate"}{" "}
            <BoltIcon sx={{ fontSize: 12 }} className="text-orange-500" />
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onReject(booking.bookingId)}
            disabled={isLoading}
            className="px-4 py-2.5 border border-white/10 text-gray-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95 disabled:opacity-50"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove(booking.bookingId)}
            disabled={isLoading}
            className="px-6 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all active:scale-95 disabled:opacity-50 min-w-[100px] flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Approve"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewerRequestCard;
