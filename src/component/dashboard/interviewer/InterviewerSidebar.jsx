import React from "react";
import { colors } from "../../../theme/colors";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BusinessIcon from "@mui/icons-material/Business";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DashboardIcon from "@mui/icons-material/Dashboard";
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

  // 💡 Backend එකෙන් එන ඕනෑම නමකින් profile pic එක අරගන්නවා (profilePic හෝ profilePicture)
  const profilePic =
    userData.profilePic ||
    userData.profilePicture ||
    `https://ui-avatars.com/api/?name=${userData.username}&background=random`;

  return (
    <>
      <div
        className="w-full h-full border rounded-xl p-8 flex flex-col items-center relative overflow-hidden shadow-sm sticky top-6"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        {/* Background Decorative Icons */}
        <div
          className="absolute -top-20 -left-20 opacity-[0.02] pointer-events-none transform rotate-45"
          style={{ color: colors.primary }}
        >
          <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
          </svg>
        </div>

        {/* Profile Image Section */}
        <div className="relative z-10 mb-6">
          <div
            className="w-32 h-32 rounded-full p-1 border-2 flex items-center justify-center overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            style={{
              borderColor: colors.primary,
              backgroundColor: colors.background,
            }}
          >
            {/* 💡 key={profilePic} එක නිසා URL එක වෙනස් වුණ ගමන් Photo එක Update වෙනවා */}
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

        <h3
          className="text-2xl font-black uppercase tracking-widest mb-6 text-center z-10"
          style={{ color: colors.textMain }}
        >
          {userData.username}
        </h3>

        {/* Bio Section */}
        <div
          className="w-full mb-8 relative z-10 px-4 py-6 rounded-lg"
          style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <FormatQuoteIcon
            className="absolute -top-4 -left-1 opacity-20 transform -rotate-6"
            sx={{ fontSize: 40, color: colors.primary }}
          />
          <p
            className="text-sm italic font-medium leading-relaxed text-center"
            style={{ color: colors.textMuted }}
          >
            "{userData.bio || "Professional Interviewer at ColloQ"}"
          </p>
        </div>

        {/* Details List */}
        <div className="w-full space-y-4 mb-8 z-10">
          <div className="flex items-center gap-4 px-2">
            <BusinessIcon sx={{ color: colors.primary, fontSize: 20 }} />
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Company & Role
              </p>
              <p className="text-xs font-bold text-gray-200">
                {userData.designation || "Expert"} @{" "}
                {userData.company || "ColloQ"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-2">
            <WorkspacePremiumIcon
              sx={{ color: colors.primary, fontSize: 20 }}
            />
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Experience
              </p>
              <p className="text-xs font-bold text-gray-200">
                {userData.experienceYears || "0"}+ Years
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-2">
            <VerifiedIcon sx={{ color: colors.primary, fontSize: 20 }} />
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Specialization
              </p>
              <p className="text-xs font-bold text-gray-200 truncate w-[160px]">
                {userData.specialization || "Full Stack"}
              </p>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="w-full flex justify-center gap-5 mb-10 z-10">
          {userData.githubUrl && (
            <a
              href={
                userData.githubUrl.startsWith("http")
                  ? userData.githubUrl
                  : `https://${userData.githubUrl}`
              }
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border hover:-translate-y-1 transition-all"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <GitHubIcon sx={{ color: colors.textMuted, fontSize: 22 }} />
            </a>
          )}
          {userData.linkedinUrl && (
            <a
              href={
                userData.linkedinUrl.startsWith("http")
                  ? userData.linkedinUrl
                  : `https://${userData.linkedinUrl}`
              }
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border hover:-translate-y-1 transition-all"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <LinkedInIcon sx={{ color: colors.textMuted, fontSize: 22 }} />
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-auto space-y-4 z-10">
          {currentView !== "dashboard" && (
            <button
              onClick={() => setCurrentView("dashboard")}
              className="w-full py-3.5 border font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              style={{
                borderColor: colors.primary,
                color: colors.primary,
                backgroundColor: "rgba(255,102,0,0.05)",
              }}
            >
              <DashboardIcon sx={{ fontSize: 18 }} /> Back to Dashboard
            </button>
          )}

          <button
            onClick={() => setCurrentView("wallet")}
            className={`w-full py-3.5 border font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5 ${currentView === "wallet" ? "bg-orange-600 text-white" : ""}`}
            style={{
              borderColor:
                currentView === "wallet" ? colors.primary : colors.border,
              color: currentView === "wallet" ? "#fff" : colors.textMain,
              backgroundColor:
                currentView === "wallet" ? colors.primary : colors.background,
            }}
          >
            <AccountBalanceWalletIcon sx={{ fontSize: 18 }} /> My Wallet
          </button>

          <button
            onClick={onEditClick}
            className="w-full py-3.5 border font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            style={{
              borderColor: colors.border,
              color: colors.textMain,
              backgroundColor: colors.background,
            }}
          >
            <EditIcon sx={{ fontSize: 18 }} /> Edit Profile
          </button>

          <button
            onClick={() => AuthService.logout()}
            className="w-full py-3.5 border border-red-500/30 bg-red-50/10 text-red-600 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white hover:border-red-600"
          >
            <LogoutIcon sx={{ fontSize: 18 }} /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default InterviewerSidebar;
