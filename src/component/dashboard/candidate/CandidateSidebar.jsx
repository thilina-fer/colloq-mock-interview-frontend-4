import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import BoltIcon from "@mui/icons-material/Bolt";
import { AuthService } from "../../../services/AuthService";
import { CandidateService } from "../../../services/CandidateService";
import EditProfileModal from "./EditProfileModal";
import toast from "react-hot-toast";

const CandidateSidebar = ({ setCurrentView }) => {
  const [userData, setUserData] = useState({
    username: "Loading...",
    profilePic: "https://ui-avatars.com/api/?name=User&background=random",
    bio: "",
    github: "",
    linkedin: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUserData({
          username: currentUser.username,
          profilePic:
            currentUser.profilePic ||
            `https://ui-avatars.com/api/?name=${currentUser.username}&background=random`,
          bio: currentUser.bio || "No bio added yet.",
          github: currentUser.githubUrl || "github.com",
          linkedin: currentUser.linkedinUrl || "linkedin.com",
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

  const handleSaveData = async (updatedData, imageFile) => {
    const loadingToast = toast.loading("Updating profile...");
    try {
      const profilePayload = {
        username: updatedData.username,
        bio: updatedData.bio,
        githubUrl: updatedData.github,
        linkedinUrl: updatedData.linkedin,
        profilePicture: updatedData.profilePic,
        status: "ACTIVE",
      };

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(profilePayload)], {
          type: "application/json",
        }),
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await CandidateService.updateProfile(formData);

      if (response && response.data) {
        const newData = response.data;
        setUserData({
          username: newData.username,
          bio: newData.bio,
          github: newData.githubUrl,
          linkedin: newData.linkedinUrl,
          profilePic: newData.profilePicture,
        });
        toast.success("Profile updated successfully!", { id: loadingToast });
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile.", {
        id: loadingToast,
      });
    }
  };

  return (
    <>
      <div
        className="w-full h-full border rounded-xl p-6 flex flex-col items-center relative overflow-hidden shadow-sm"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        {/* Background Decorations */}
        <div
          className="absolute -top-16 -left-16 opacity-[0.02] pointer-events-none transform rotate-45"
          style={{ color: colors.primary }}
        >
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
          </svg>
        </div>

        {/* Profile Image Section */}
        <div className="relative z-10 group mb-4">
          <div
            className="w-28 h-28 rounded-full p-1 border-2 flex items-center justify-center overflow-hidden shadow-sm"
            style={{
              borderColor: colors.primary,
              backgroundColor: colors.background,
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={userData.profilePic}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <h3
          className="text-xl font-black uppercase tracking-widest mb-4 text-center z-10"
          style={{ color: colors.textMain }}
        >
          {userData.username}
        </h3>

        {/* Bio */}
        <div className="w-full mb-6 relative z-10 px-3 py-4 rounded-lg bg-black/5">
          <FormatQuoteIcon
            className="absolute -top-3 -left-1 opacity-20"
            sx={{ fontSize: 30, color: colors.primary }}
          />
          <p className="text-[12px] italic font-medium leading-relaxed text-center text-gray-400">
            "{userData.bio}"
          </p>
        </div>

        {/* Social Links */}
        <div className="w-full flex justify-center gap-4 mb-8 z-10">
          <a
            href={
              userData.github.startsWith("http")
                ? userData.github
                : `https://${userData.github}`
            }
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full border border-white/5 hover:border-white/20 transition-all"
          >
            <GitHubIcon sx={{ color: colors.textMuted, fontSize: 20 }} />
          </a>
          <a
            href={
              userData.linkedin.startsWith("http")
                ? userData.linkedin
                : `https://${userData.linkedin}`
            }
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full border border-white/5 hover:border-white/20 transition-all"
          >
            <LinkedInIcon sx={{ color: colors.textMuted, fontSize: 20 }} />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-auto space-y-2.5 z-10">
          <button
            onClick={() => setCurrentView("interviewerSelection")}
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 group"
          >
            <BoltIcon
              sx={{ fontSize: 16 }}
              className="group-hover:scale-110 transition-transform"
            />
            Book Session
          </button>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full py-2.5 border border-white/5 hover:border-white/20 font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 text-gray-400"
          >
            <EditIcon sx={{ fontSize: 16 }} />
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 border border-red-500/20 text-red-500/70 font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white"
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
