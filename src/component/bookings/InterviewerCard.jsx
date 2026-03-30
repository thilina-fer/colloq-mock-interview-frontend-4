import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const InterviewerCard = ({ interviewer, onSelect }) => {
  if (!interviewer) return null;

  const formattedPrice = new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
  }).format(interviewer.price || 0);

  return (
    <div
      className="group relative bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl 
      hover:border-orange-500/40 transition-all duration-300 cursor-pointer 
      shadow-xl flex flex-col justify-between min-h-[320px] overflow-hidden
      hover:-translate-y-1 hover:shadow-2xl"
      onClick={() => onSelect?.(interviewer)}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10 blur-xl"></div>
      </div>

      {/* Profile Section */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-white/10 
          flex items-center justify-center overflow-hidden shrink-0
          group-hover:ring-2 group-hover:ring-orange-500/40 transition-all"
          >
            {interviewer.profilePicture ? (
              <img
                src={interviewer.profilePicture}
                alt={interviewer.username}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <span className="text-xl font-black text-orange-500">
                {interviewer.username?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <h4 className="text-white font-black uppercase text-[11px] tracking-widest leading-tight">
              {interviewer.username}
            </h4>

            <p className="text-[9px] text-orange-500 font-bold uppercase tracking-tighter mt-1 flex items-center gap-1">
              <WorkspacePremiumIcon sx={{ fontSize: 10 }} />
              {interviewer.company || "Software Professional"}
            </p>
          </div>
        </div>

        <span
          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] 
        font-black text-gray-400 uppercase tracking-tighter group-hover:text-orange-400 transition"
        >
          {interviewer.levelName || "EXPERT"}
        </span>
      </div>

      {/* Bio Section */}
      <div className="mb-6 relative z-10">
        <p className="text-[10px] text-gray-500 leading-relaxed font-medium italic line-clamp-3 group-hover:text-gray-400 transition">
          "{interviewer.bio || "No bio available for this expert."}"
        </p>
      </div>

      {/* Stats Section */}
      <div className="space-y-3 mb-6 relative z-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
            Specialization:
          </span>

          <span
            className="px-2 py-0.5 bg-orange-600/10 text-orange-500 
          border border-orange-500/20 rounded text-[9px] font-bold 
          group-hover:bg-orange-500/20 transition"
          >
            {interviewer.specialization || "General"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 group-hover:text-gray-400 transition">
          <AccessTimeIcon
            sx={{ fontSize: 14 }}
            className="text-gray-600 group-hover:text-orange-400"
          />
          <span className="text-[9px] font-bold uppercase tracking-widest">
            {interviewer.experienceYears}+ Years Experience
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5 relative z-10">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-tighter">
            Session Fee
          </span>

          <span className="text-[15px] font-black text-white uppercase tracking-tighter flex items-center gap-1">
            {formattedPrice}
            <BoltIcon sx={{ fontSize: 14 }} className="text-orange-500" />
          </span>
        </div>

        <button
          className="text-[9px] font-black uppercase px-5 py-2.5 rounded-lg 
          bg-white text-black transition-all shadow-lg active:scale-95
          group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-orange-600
          group-hover:text-white"
        >
          Select Expert
        </button>
      </div>
    </div>
  );
};

export default InterviewerCard;
