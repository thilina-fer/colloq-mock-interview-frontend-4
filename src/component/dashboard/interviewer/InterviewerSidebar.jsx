import React from "react";
import { colors } from "../../../theme/colors";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { AuthService } from "../../../services/AuthService";

const InterviewerSidebar = ({
  setCurrentView,
  currentView,
  userData,
  onEditClick,
}) => {
  if (!userData)
    return (
      <div className="p-8 text-gray-500 uppercase text-[10px] font-black tracking-widest">
        Loading Profile...
      </div>
    );

  const profilePic =
    userData.profilePic ||
    userData.profilePicture ||
    `https://ui-avatars.com/api/?name=${userData.username}&background=random`;

  return (
    <>
      <div
        // 💡 h-[calc(100vh-120px)] මගින් screen එකේ උසට sidebar එක හරියටම fit කරනවා.
        // screen එකේ scroll එකක් එන්නේ නැති වෙන්නයි මේක හදලා තියෙන්නේ.
        className="w-full h-[calc(100vh-100px)] border rounded-xl p-6 flex flex-col items-center relative overflow-hidden shadow-sm sticky top-12"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        {/* Background Decorative Icons */}
        <div
          className="absolute -top-16 -left-16 opacity-[0.02] pointer-events-none transform rotate-45"
          style={{ color: colors.primary }}
        >
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
          </svg>
        </div>

        {/* Profile Image Section */}
        <div className="relative z-10 mb-4 shrink-0">
          <div
            className="w-28 h-28 rounded-full p-1 border-2 flex items-center justify-center overflow-hidden shadow-md"
            style={{
              borderColor: colors.primary,
              backgroundColor: colors.background,
            }}
          >
            <img
              key={profilePic}
              src={profilePic}
              alt="Profile"
              className="w-full h-full rounded-full object-cover transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${userData.username}&background=random`;
              }}
            />
          </div>
        </div>

        {/* Name Section */}
        <h3
          className="text-xl font-black uppercase tracking-widest mb-4 text-center z-10 shrink-0"
          style={{ color: colors.textMain }}
        >
          {userData.username}
        </h3>

        {/* Bio Section - Fixed size but small to save vertical space */}
        <div className="w-full mb-4 relative z-10 px-4 py-4 rounded-lg bg-black/5 flex-grow max-h-[140px] overflow-y-auto no-scrollbar">
          <FormatQuoteIcon
            className="absolute top-1 left-1 opacity-10"
            sx={{ fontSize: 24, color: colors.primary }}
          />
          <p
            className="text-[12px] italic font-medium leading-relaxed text-center"
            style={{ color: colors.textMuted }}
          >
            "{userData.bio || "Professional Interviewer at ColloQ"}"
          </p>
        </div>

        {/* Action Buttons Area - Uses space-y-2 to stay tight */}
        <div className="w-full mt-auto space-y-2 z-10 shrink-0">
          {/* Dashboard Button Container */}
          <div className="min-h-[38px]">
            {currentView !== "dashboard" ? (
              <button
                onClick={() => setCurrentView("dashboard")}
                className="w-full py-2 border font-bold text-[9px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  backgroundColor: "rgba(255,102,0,0.05)",
                }}
              >
                <DashboardIcon sx={{ fontSize: 14 }} /> Back to Dashboard
              </button>
            ) : (
              <div className="w-full py-2 opacity-0 pointer-events-none">
                Placeholder
              </div>
            )}
          </div>

          <button
            onClick={() => setCurrentView("availability")}
            className={`w-full py-2 border font-bold text-[9px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5 ${currentView === "availability" ? "bg-orange-600 text-white" : ""}`}
            style={{
              borderColor:
                currentView === "availability" ? colors.primary : colors.border,
              color: currentView === "availability" ? "#fff" : colors.textMain,
              backgroundColor:
                currentView === "availability"
                  ? colors.primary
                  : colors.background,
            }}
          >
            <EventAvailableIcon sx={{ fontSize: 14 }} /> My Availability
          </button>

          <button
            onClick={() => setCurrentView("wallet")}
            className={`w-full py-2 border font-bold text-[9px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5 ${currentView === "wallet" ? "bg-orange-600 text-white" : ""}`}
            style={{
              borderColor:
                currentView === "wallet" ? colors.primary : colors.border,
              color: currentView === "wallet" ? "#fff" : colors.textMain,
              backgroundColor:
                currentView === "wallet" ? colors.primary : colors.background,
            }}
          >
            <AccountBalanceWalletIcon sx={{ fontSize: 14 }} /> My Wallet
          </button>

          <button
            onClick={onEditClick}
            className="w-full py-2 border font-bold text-[9px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            style={{
              borderColor: colors.border,
              color: colors.textMain,
              backgroundColor: colors.background,
            }}
          >
            <EditIcon sx={{ fontSize: 14 }} /> Edit Profile
          </button>

          <button
            onClick={() => AuthService.logout()}
            className="w-full py-2 border border-red-500/30 bg-red-50/10 text-red-600 font-bold text-[9px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white"
          >
            <LogoutIcon sx={{ fontSize: 14 }} /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default InterviewerSidebar;
