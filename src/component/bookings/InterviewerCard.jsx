import React from "react";
import { colors } from "../../theme/colors";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const InterviewerCard = ({ interviewer, onSelect }) => {
  if (!interviewer) return null;

  return (
    <div
      className="group bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl hover:border-orange-500/50 transition-all cursor-pointer shadow-xl flex flex-col justify-between min-h-[300px] relative overflow-hidden"
      onClick={() => onSelect?.(interviewer)}
    >
      {/* --- TOP SECTION: Profile & Name --- */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-500 font-black text-sm overflow-hidden shrink-0">
            {/* 💡 Field Name: profilePicture */}
            {interviewer?.profilePicture ? (
              <img
                src={interviewer.profilePicture}
                alt={interviewer?.username}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <span className="text-xl">
                {/* 💡 Field Name: username */}
                {interviewer?.username?.charAt(0) || "E"}
              </span>
            )}
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-[11px] tracking-widest leading-tight">
              {/* 💡 Field Name: username */}
              {interviewer?.username || "Industry Expert"}
            </h4>
            <p className="text-[9px] text-orange-500 font-bold uppercase tracking-tighter mt-1 flex items-center gap-1">
              <WorkspacePremiumIcon sx={{ fontSize: 10 }} />{" "}
              {interviewer?.designation || "Software Engineer"}
            </p>
          </div>
        </div>

        {/* Experience Level Badge */}
        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-gray-400 uppercase tracking-tighter">
          {/* 💡 Field Name: levelName (Console එකේ තිබුණේ මේ නමයි) */}
          {interviewer?.levelName || "Expert"}
        </span>
      </div>

      {/* --- BIO / DESCRIPTION SECTION --- */}
      <div className="mb-6">
        <p className="text-[10px] text-gray-500 leading-relaxed font-medium italic line-clamp-3">
          "{/* 💡 Field Name: bio */}
          {interviewer?.bio ||
            "Experienced professional ready to help you ace your next technical interview through hands-on guidance."}
          "
        </p>
      </div>

      {/* --- DETAILS SECTION: Spec & Duration --- */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
            Specialization:
          </span>
          <span className="px-2 py-0.5 bg-orange-600/10 text-orange-500 border border-orange-500/20 rounded text-[9px] font-bold">
            {interviewer?.specialization || "Full Stack"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <AccessTimeIcon sx={{ fontSize: 14 }} className="text-gray-600" />
          <span className="text-[9px] font-bold uppercase tracking-widest">
            {/* 💡 Experience Years (Console එකේ තිබුණු එකත් පෙන්වන්න පුළුවන් ඕනේ නම්) */}
            {interviewer?.experienceYears}+ Years of Experience
          </span>
        </div>
      </div>

      {/* --- FOOTER SECTION: Pricing & Button --- */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-tighter">
            Starting From
          </span>
          <span className="text-[14px] font-black text-white uppercase tracking-tighter flex items-center gap-1">
            FREE <BoltIcon sx={{ fontSize: 14 }} className="text-orange-500" />
          </span>
        </div>
        <button className="text-[9px] font-black uppercase bg-white text-black px-5 py-2.5 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-all shadow-lg active:scale-95">
          Book Now
        </button>
      </div>

      {/* Subtle Background Glow on Hover */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-orange-600/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-orange-600/15 transition-all duration-500"></div>
    </div>
  );
};

export default InterviewerCard;
