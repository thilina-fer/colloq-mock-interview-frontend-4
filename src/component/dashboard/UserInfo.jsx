// src/components/dashboard/UserInfo.jsx
import React from "react";
import { colors } from "../../theme/color";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserInfo = () => {
  return (
    <div className="w-full h-auto bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6 mt-4 md:mt-6 animate-fadeSlideUp">
      <div className="relative">
        <AccountCircleIcon
          className="text-orange-500"
          style={{ fontSize: 80 }}
        />
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
      </div>

      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">
            CANDIDATE
          </p>
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-black"
            style={{ color: colors.black }}
          >
            Thilina Hemantha
          </h1>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-4 w-full">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-white hover:bg-gray-50 transition-all font-semibold text-xs">
            <GitHubIcon sx={{ fontSize: 16 }} />
            <span className="hidden sm:inline">github.com/thilina-dev</span>
            <span className="sm:hidden">GitHub</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-white hover:bg-gray-50 transition-all font-semibold text-xs">
            <LinkedInIcon sx={{ fontSize: 16, color: "#0077b5" }} />
            <span className="hidden sm:inline">
              linkedin.com/in/thilina-dev
            </span>
            <span className="sm:hidden">LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
