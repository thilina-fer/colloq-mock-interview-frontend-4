// src/dashboard/interviewer/InterviewerHeader.jsx
import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import Logo from "../../../component/Logo";

const InterviewerHeader = ({ username, profilePic }) => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentDateTime(now.toLocaleDateString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="w-full h-20 px-8 flex justify-between items-center border-b"
      style={{ backgroundColor: colors.background, borderColor: colors.border }}
    >
      <div className="w-1/3">
        <Logo />
      </div>

      <div className="w-1/3 flex justify-center">
        <div
          className="px-6 py-2 border rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-3"
          style={{
            borderColor: colors.border,
            color: colors.textMuted,
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: colors.primary }}
          ></span>
          {currentDateTime}
        </div>
      </div>

      <div className="w-1/3 flex justify-end items-center gap-4">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: colors.textMain }}
        >
          {username}
        </span>
        <div
          className="w-10 h-10 border rounded-full overflow-hidden"
          style={{ borderColor: colors.border }}
        >
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default InterviewerHeader;
