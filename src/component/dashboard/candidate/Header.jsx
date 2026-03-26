import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import Logo from "../../Logo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthService } from "../../../services/AuthService";

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [username, setUsername] = useState("Loading...");
  // 1. Profile picture eka thiyaganna aluth state ekak
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Live Time Update
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

    // Fetch User Details
    const fetchUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUsername(currentUser.username);
        // 2. Backend eken ena photo eka hari, nattam namata galapena default photo eka hari set karanawa
        setProfilePic(
          currentUser.profilePic ||
            `https://ui-avatars.com/api/?name=${currentUser.username}&background=random`,
        );
      } catch (error) {
        console.error("Failed to fetch user for header", error);
        setUsername("User");
      }
    };
    fetchUser();

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="relative w-full h-20 px-8 flex justify-between items-center border-b shadow-sm overflow-hidden"
      style={{ backgroundColor: colors.background, borderColor: colors.border }}
    >
      {/* Background Watermark Effect */}
      <div
        className="absolute -top-12 -right-12 opacity-[0.03] pointer-events-none transform rotate-12"
        style={{ color: colors.textMain || "#000" }}
      >
        <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
        </svg>
      </div>

      {/* Left: Logo */}
      <div className="w-1/3 z-10">
        <Logo />
      </div>

      {/* Center: Live Time Pill */}
      <div className="w-1/3 flex justify-center z-10">
        <div
          className="px-6 py-2 border rounded-full text-xs font-semibold tracking-widest uppercase shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md flex items-center gap-3 cursor-default"
          style={{
            borderColor: colors.border,
            color: colors.textMuted,
            backgroundColor: colors.surface,
          }}
        >
          {/* Pulsing Live Dot */}
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: colors.primary }}
          ></span>
          {currentDateTime || "Syncing..."}
        </div>
      </div>

      {/* Right: User Profile */}
      <div className="w-1/3 flex justify-end items-center gap-4 z-10">
        <span
          className="text-sm font-medium tracking-wide truncate max-w-[150px] transition-colors duration-200 uppercase"
          style={{ color: colors.textMain }}
        >
          {username}
        </span>

        {/* 3. Photo eka pennana kotasa */}
        <div
          className="w-10 h-10 border flex items-center justify-center rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.surface,
          }}
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="Header Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <AccountCircleIcon sx={{ color: colors.primary, fontSize: 26 }} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
