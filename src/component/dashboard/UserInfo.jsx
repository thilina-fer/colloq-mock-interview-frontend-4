import React from "react";
import { colors } from "../../theme/color";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserInfo = ({ name, bio, github, linkedin }) => {
  return (
    <div className="w-full h-auto bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6 mt-4 md:mt-6 animate-fadeSlideUp">
      <div className="relative">
        <AccountCircleIcon className="text-orange-500" style={{ fontSize: 90 }} />
        <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-sm"></span>
      </div>

      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">CANDIDATE</p>
          <h1 className="text-2xl md:text-4xl font-black text-gray-900">{name || "ColloQ User"}</h1>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-relaxed">{bio || "No bio added yet."}</p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-5 w-full">
          <a href={`https://${github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-all font-bold text-xs">
            <GitHubIcon sx={{ fontSize: 16 }} />
            <span>{github || "github.com"}</span>
          </a>
          <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-all font-bold text-xs text-blue-600">
            <LinkedInIcon sx={{ fontSize: 16 }} />
            <span>{linkedin || "linkedin.com"}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;