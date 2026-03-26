// src/component/dashboard/interviewer/InterviewerSidebar.jsx
import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { AuthService } from "../../../services/AuthService";
import InterviewerEditModal from "./InterviewerEditModal"; // Modal eka import kala
import toast from "react-hot-toast";

const InterviewerSidebar = () => {
  const [userData, setUserData] = useState({
    username: "Loading...",
    profilePic: "https://ui-avatars.com/api/?name=User&background=random",
    bio: "",
    company: "",
    designation: "",
    experienceYears: "",
    specialization: "",
    github: "",
    linkedin: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Initial Data Fetch
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUserData({
          username: currentUser.username,
          profilePic: currentUser.profilePic || `https://ui-avatars.com/api/?name=${currentUser.username}&background=random`,
          bio: currentUser.bio || "Industry Expert Interviewer",
          company: currentUser.company || "Not Specified",
          designation: currentUser.designation || "Professional",
          experienceYears: currentUser.experienceYears || "0",
          specialization: currentUser.specialization || "Generalist",
          github: currentUser.githubUrl || "github.com",
          linkedin: currentUser.linkedinUrl || "linkedin.com",
        });
      } catch (error) {
        console.error("Error fetching interviewer data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Update Profile Logic
  const handleSaveData = async (updatedData, imageFile) => {
    const loadingToast = toast.loading("Updating profile...");
    try {
      // Multipart form data payload එක (Backend එකට ගැලපෙන විදියට)
      const profilePayload = {
        username: updatedData.username,
        bio: updatedData.bio,
        company: updatedData.company,
        designation: updatedData.designation,
        experienceYears: updatedData.experienceYears,
        specialization: updatedData.specialization,
        githubUrl: updatedData.github,
        linkedinUrl: updatedData.linkedin,
        profilePicture: updatedData.profilePic,
      };

      const formData = new FormData();
      formData.append("data", new Blob([JSON.stringify(profilePayload)], { type: "application/json" }));
      if (imageFile) formData.append("image", imageFile);

      // --- METHANATA BACKEND API CALL EKA DANNA ---
      // const response = await InterviewerService.updateProfile(formData);
      // const newData = response.data;
      
      // Danata api front-end eke details update karamu backend response eka enakan
      setUserData({
        ...userData,
        username: updatedData.username,
        bio: updatedData.bio,
        company: updatedData.company,
        designation: updatedData.designation,
        experienceYears: updatedData.experienceYears,
        specialization: updatedData.specialization,
        github: updatedData.github,
        linkedin: updatedData.linkedin,
        // Aluth photo preview eka mehema thiyagamu (Naththam backend url eka danna newData walin)
        profilePic: imageFile ? URL.createObjectURL(imageFile) : updatedData.profilePic
      });

      toast.success("Profile updated successfully!", { id: loadingToast });

      // Username wenas unoth logout karana eka hondayi security ekata
      if (updatedData.username !== userData.username) {
        toast("Username changed! Logging out...", { icon: "🔐" });
        setTimeout(() => AuthService.logout(), 2000);
      }
    } catch (error) {
      toast.error("Failed to update profile", { id: loadingToast });
    }
  };

  return (
    <>
      <div className="w-full h-full border rounded-xl p-8 flex flex-col items-center relative overflow-hidden shadow-sm"
           style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        
        {/* --- BACKGROUND DECORATIONS --- */}
        <div className="absolute -top-20 -left-20 opacity-[0.02] pointer-events-none transform rotate-45"
             style={{ color: colors.primary || "#000" }}>
          <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
          </svg>
        </div>

        <div className="absolute -bottom-10 -right-12 opacity-[0.03] pointer-events-none transform -rotate-12"
             style={{ color: colors.textMain || "#000" }}>
          <svg width="380" height="380" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>

        {/* Profile Pic Section */}
        <div className="relative z-10 group mb-6">
          <div className="w-32 h-32 rounded-full p-1 border-2 flex items-center justify-center overflow-hidden transition-all duration-300 shadow-md"
               style={{ borderColor: colors.primary, backgroundColor: colors.background }}>
            <img src={userData.profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        <h3 className="text-2xl font-black uppercase tracking-widest mb-6 text-center z-10" style={{ color: colors.textMain }}>
          {userData.username}
        </h3>

        {/* Bio Box */}
        <div className="w-full mb-8 relative z-10 px-4 py-6 rounded-lg bg-black/5" style={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
          <FormatQuoteIcon className="absolute -top-4 -left-1 opacity-20 transform -rotate-6" sx={{ fontSize: 40, color: colors.primary }} />
          <p className="text-sm italic font-medium leading-relaxed text-center" style={{ color: colors.textMuted }}>
            "{userData.bio}"
          </p>
        </div>

        {/* Detailed Info Stack */}
        <div className="w-full space-y-4 mb-8 z-10">
          <div className="flex items-center gap-4 px-2">
              <BusinessIcon sx={{ color: colors.primary, fontSize: 20 }} />
              <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Company & Role</p>
                  <p className="text-xs font-bold text-gray-200">{userData.designation} @ {userData.company}</p>
              </div>
          </div>

          <div className="flex items-center gap-4 px-2">
              <WorkspacePremiumIcon sx={{ color: colors.primary, fontSize: 20 }} />
              <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Experience</p>
                  <p className="text-xs font-bold text-gray-200">{userData.experienceYears}+ Years</p>
              </div>
          </div>

          <div className="flex items-center gap-4 px-2">
              <VerifiedIcon sx={{ color: colors.primary, fontSize: 20 }} />
              <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Specialization</p>
                  <p className="text-xs font-bold text-gray-200 truncate w-[180px]">{userData.specialization}</p>
              </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="w-full flex justify-center gap-5 mb-10 z-10">
          <a href={userData.github.startsWith("http") ? userData.github : `https://${userData.github}`}
             target="_blank" rel="noreferrer" className="group">
            <div className="p-3 rounded-full border shadow-sm transition-all duration-300 hover:-translate-y-1"
                 style={{ borderColor: colors.border, backgroundColor: colors.background }}>
              <GitHubIcon sx={{ color: colors.textMuted, fontSize: 24 }} className="group-hover:text-white transition-colors" />
            </div>
          </a>
          <a href={userData.linkedin.startsWith("http") ? userData.linkedin : `https://${userData.linkedin}`}
             target="_blank" rel="noreferrer" className="group">
            <div className="p-3 rounded-full border shadow-sm transition-all duration-300 hover:-translate-y-1"
                 style={{ borderColor: colors.border, backgroundColor: colors.background }}>
              <LinkedInIcon sx={{ color: colors.textMuted, fontSize: 24 }} className="group-hover:text-blue-600 transition-colors" />
            </div>
          </a>
        </div>

        {/* Sidebar Action Buttons */}
        <div className="w-full mt-auto space-y-4 z-10">
          <button className="w-full py-3.5 border font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5"
                  style={{ borderColor: colors.border, color: colors.textMain, backgroundColor: colors.background }}>
            <AccountBalanceWalletIcon sx={{ fontSize: 18, opacity: 0.7 }} /> My Wallet
          </button>

          <button 
            onClick={() => setIsEditModalOpen(true)} // Edit modal open කරනවා
            className="w-full py-3.5 border font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            style={{ borderColor: colors.border, color: colors.textMain, backgroundColor: colors.background }}>
            <EditIcon sx={{ fontSize: 18, opacity: 0.7 }} /> Edit Profile
          </button>

          <button onClick={() => AuthService.logout()} className="w-full py-3.5 border border-red-500/30 bg-red-50 text-red-600 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-[0.98]">
            <LogoutIcon sx={{ fontSize: 18 }} /> Sign Out
          </button>
        </div>
      </div>

      {/* Edit Modal Component */}
      <InterviewerEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveData}
      />
    </>
  );
};

export default InterviewerSidebar;