// src/component/dashboard/admin/InterviewerDetailExpose.jsx
import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const InterviewerDetailExpose = ({ data }) => {
  if (!data) return null;

  const handleOpenLink = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="p-8 bg-black/20 animate-in fade-in slide-in-from-top-2 duration-500 border border-white/5 rounded-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Bio Section - වම් පැත්ත */}
        <div className="md:col-span-2 space-y-4">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <DescriptionIcon sx={{ fontSize: 16 }} /> Professional Bio
          </p>
          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            {data.bio || "No biography provided for this interviewer."}
          </p>
        </div>

        {/* Links Section - දකුණු පැත්ත */}
        <div className="space-y-5 md:border-l md:border-white/10 md:pl-10">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            External Profiles
          </p>

          <div className="flex flex-col gap-3">
            {/* LinkedIn */}
            <button
              onClick={() => handleOpenLink(data.linkedinUrl)}
              className="group flex items-center justify-between p-3 bg-white/[0.03] border border-white/10 hover:border-[#0a66c2]/50 hover:bg-[#0a66c2]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <LinkedInIcon sx={{ fontSize: 18, color: "#0a66c2" }} />
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                  LinkedIn
                </span>
              </div>
              <span className="text-[10px] text-gray-600 group-hover:text-gray-400">
                View →
              </span>
            </button>

            {/* GitHub */}
            <button
              onClick={() => handleOpenLink(data.githubUrl)}
              className="group flex items-center justify-between p-3 bg-white/[0.03] border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <GitHubIcon sx={{ fontSize: 18, color: "#ffffff" }} />
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                  GitHub
                </span>
              </div>
              <span className="text-[10px] text-gray-600 group-hover:text-gray-400">
                View →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerDetailExpose;
