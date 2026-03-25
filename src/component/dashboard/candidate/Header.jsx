import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import Logo from "../../Logo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    // Live date and time update wena function eka
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      setCurrentDateTime(now.toLocaleDateString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header 
      className="w-full h-20 px-8 flex justify-between items-center border-b"
      style={{ backgroundColor: colors.background, borderColor: colors.border }}
    >
      {/* Left - Logo */}
      <div className="w-1/3">
        <Logo />
      </div>

      {/* Center - Date and Time */}
      <div className="w-1/3 flex justify-center">
        <div 
          className="px-6 py-2 border rounded-sm text-sm font-bold tracking-widest uppercase"
          style={{ borderColor: colors.border, color: colors.textMuted, backgroundColor: colors.surface }}
        >
          {currentDateTime}
        </div>
      </div>

      {/* Right - User Info */}
      <div className="w-1/3 flex justify-end items-center gap-3">
        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.textMain }}>
          Thilina_Dev
        </span>
        <div 
          className="w-10 h-10 border flex items-center justify-center rounded-sm"
          style={{ borderColor: colors.border, backgroundColor: colors.surface }}
        >
          <AccountCircleIcon sx={{ color: colors.primary }} />
        </div>
      </div>
    </header>
  );
};

export default Header;