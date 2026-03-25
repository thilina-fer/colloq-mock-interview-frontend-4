// src/component/dashboard/candidate/CandidateSidebar.jsx
import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { AuthService } from "../../../services/AuthService";
import { CandidateService } from "../../../services/CandidateService"; // Aluth service eka
import EditProfileModal from "./EditProfileModal"; 

const CandidateSidebar = () => {
  // DB eken fetch karana data thiyaganna state eka
  const [userData, setUserData] = useState({
    username: "Loading...",
    profilePic: "https://ui-avatars.com/api/?name=User&background=random",
    bio: "",
    github: "",
    linkedin: ""
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dashboard eka load weddi Database eken User Data fetch kirima
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser(); // Me endpoint eken ena data eka gannawa
        
        setUserData({
          username: currentUser.username,
          profilePic: currentUser.profilePicture || `https://ui-avatars.com/api/?name=${currentUser.username}&background=random`,
          bio: currentUser.bio || "No bio added yet.",
          github: currentUser.githubUrl || "github.com",
          linkedin: currentUser.linkedinUrl || "linkedin.com"
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    AuthService.logout();
  };

  // Modal eken ena data eka Database ekata UPDATE kirima
  const handleSaveData = async (updatedData) => {
    try {
      // DTO format ekata data hadanawa
      const updatePayload = {
        bio: updatedData.bio,
        githubUrl: updatedData.github,
        linkedinUrl: updatedData.linkedin,
        profilePicture: updatedData.profilePic,
        status: "ACTIVE" 
      };

      // Backend API call eka (PUT Request)
      const response = await CandidateService.updateProfile(updatePayload);
      
      if (response.status === 200) {
        // DB eke update wunata passe UI eka update karanawa
        setUserData(updatedData);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Network error occurred while updating.");
    }
  };

  return (
    <>
      <div 
        className="w-full h-full border rounded-sm p-6 flex flex-col items-center relative"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        {/* ... (Sidebar eke kalin UI eka ehemama thiyenawa) ... */}
        
        {/* Profile Picture Box */}
        <div 
          className="w-32 h-32 border-2 rounded-sm mb-5 flex items-center justify-center overflow-hidden"
          style={{ borderColor: colors.primary, backgroundColor: colors.background }}
        >
          <img 
            src={userData.profilePic} 
            alt="Profile" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>

        {/* Username */}
        <h3 className="text-xl font-bold uppercase tracking-wide mb-6 text-center break-all" style={{ color: colors.textMain }}>
          {userData.username}
        </h3>

        {/* Bio Section */}
        <div className="w-full mb-8 relative">
          <FormatQuoteIcon 
            className="absolute -top-3 -left-2 opacity-20" 
            sx={{ fontSize: 32, color: colors.primary }} 
          />
          <p className="text-sm italic font-medium leading-relaxed pl-4 border-l-2" 
             style={{ color: colors.textMuted, borderColor: colors.borderFocus }}>
            {userData.bio}
          </p>
        </div>

        {/* Social Links */}
        <div className="w-full flex justify-center gap-4 mb-8">
          <a href={userData.github.startsWith("http") ? userData.github : `https://${userData.github}`} target="_blank" rel="noreferrer" className="group">
            <div className="p-2.5 rounded-sm border transition-colors group-hover:border-orange-500" style={{ borderColor: colors.border, backgroundColor: colors.background }}>
              <GitHubIcon sx={{ color: colors.textMuted, fontSize: 22 }} className="group-hover:text-orange-500 transition-colors" />
            </div>
          </a>
          <a href={userData.linkedin.startsWith("http") ? userData.linkedin : `https://${userData.linkedin}`} target="_blank" rel="noreferrer" className="group">
            <div className="p-2.5 rounded-sm border transition-colors group-hover:border-blue-500" style={{ borderColor: colors.border, backgroundColor: colors.background }}>
              <LinkedInIcon sx={{ color: colors.textMuted, fontSize: 22 }} className="group-hover:text-blue-500 transition-colors" />
            </div>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-auto space-y-3">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="w-full py-3 border font-bold text-xs uppercase tracking-widest transition-colors rounded-sm flex items-center justify-center gap-2 group hover:bg-white/5"
            style={{ borderColor: colors.border, color: colors.textMain, backgroundColor: colors.background }}
          >
            <EditIcon sx={{ fontSize: 16 }} className="text-gray-500 group-hover:text-white transition-colors" />
            Edit Profile
          </button>

          <button 
            onClick={handleLogout}
            className="w-full py-3 border border-red-600/50 bg-red-950/20 text-red-500 font-bold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-[0.98]"
          >
            <LogoutIcon sx={{ fontSize: 16 }} />
            Sign Out
          </button>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        userData={userData} 
        onSave={handleSaveData} 
      />
    </>
  );
};

export default CandidateSidebar;