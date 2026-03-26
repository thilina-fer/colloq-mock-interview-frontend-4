// src/component/dashboard/candidate/CandidateSidebar.jsx
import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { AuthService } from "../../../services/AuthService";
import { CandidateService } from "../../../services/CandidateService";
import EditProfileModal from "./EditProfileModal";
import toast from "react-hot-toast";

const CandidateSidebar = () => {
  const [userData, setUserData] = useState({
    username: "Loading...",
    profilePic: "https://ui-avatars.com/api/?name=User&background=random",
    bio: "",
    github: "",
    linkedin: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dashboard load weddi current user details fetch kirima
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

  // =============== UPDATE PROFILE LOGIC (Multipart Form Data) ===============
  const handleSaveData = async (updatedData, imageFile) => {
    const loadingToast = toast.loading("Updating profile...");

    try {
      // 1. Backend eke CandidateResponseDTO ekata match wenna payload eka hadanawa
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

      // 2. Backend API call eka
      const response = await CandidateService.updateProfile(formData);

      // 3. Backend eken 'data' kiyana field eka athule aluth details ewanawa nam witarak UI update karamu
      if (response && response.data) {
        const newData = response.data; // Me enne CandidateResponseDTO eka

        setUserData({
          username: newData.username,
          bio: newData.bio,
          github: newData.githubUrl,
          linkedin: newData.linkedinUrl,
          profilePic: newData.profilePicture,
        });

        toast.success("Profile updated successfully!", { id: loadingToast });

        // 4. Username eka wenas unoth JWT token invalid nisa logout karanna oni
        if (updatedData.username !== userData.username) {
          toast("Username changed! Logging out for security...", {
            icon: "🔐",
            duration: 4000,
          });
          setTimeout(() => {
            AuthService.logout();
          }, 3000);
        }
      } else {
        throw new Error("Server did not return updated data.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update profile.", {
        id: loadingToast,
      });
    }
  };

  return (
    <>
      <div
        className="w-full h-full border rounded-xl p-8 flex flex-col items-center relative overflow-hidden shadow-sm"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        {/* Subtle Background Decorations */}
        <div
          className="absolute -top-20 -left-20 opacity-[0.02] pointer-events-none transform rotate-45"
          style={{ color: colors.primary || "#000" }}
        >
          <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
          </svg>
        </div>

        <div
          className="absolute -bottom-10 -right-12 opacity-[0.03] pointer-events-none transform -rotate-12"
          style={{ color: colors.textMain || "#000" }}
        >
          <svg width="380" height="380" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>

        {/* Profile Image Section */}
        <div className="relative z-10 group mb-6">
          <div
            className="w-36 h-36 rounded-full p-1 border-2 flex items-center justify-center overflow-hidden transition-all duration-300 shadow-md group-hover:shadow-lg"
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

        {/* Username Display */}
        <h3
          className="text-2xl font-black uppercase tracking-widest mb-6 text-center break-all z-10"
          style={{ color: colors.textMain }}
        >
          {userData.username}
        </h3>

        {/* Bio Section */}
        <div
          className="w-full mb-10 relative z-10 px-4 py-6 rounded-lg"
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
            "{userData.bio}"
          </p>
        </div>

        {/* Social Links */}
        <div className="w-full flex justify-center gap-5 mb-10 z-10">
          <a
            href={
              userData.github.startsWith("http")
                ? userData.github
                : `https://${userData.github}`
            }
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <div
              className="p-3 rounded-full border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <GitHubIcon
                sx={{ color: colors.textMuted, fontSize: 24 }}
                className="group-hover:text-gray-800 dark:group-hover:text-white transition-colors"
              />
            </div>
          </a>
          <a
            href={
              userData.linkedin.startsWith("http")
                ? userData.linkedin
                : `https://${userData.linkedin}`
            }
            target="_blank"
            rel="noreferrer"
            className="group"
          >
            <div
              className="p-3 rounded-full border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.background,
              }}
            >
              <LinkedInIcon
                sx={{ color: colors.textMuted, fontSize: 24 }}
                className="group-hover:text-blue-600 transition-colors"
              />
            </div>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-auto space-y-4 z-10">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full py-3.5 border font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg shadow-sm flex items-center justify-center gap-2 group hover:shadow-md hover:-translate-y-0.5"
            style={{
              borderColor: colors.border,
              color: colors.textMain,
              backgroundColor: colors.background,
            }}
          >
            <EditIcon
              sx={{ fontSize: 18 }}
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3.5 border border-red-500/30 bg-red-50 text-red-600 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-md active:scale-[0.98]"
          >
            <LogoutIcon sx={{ fontSize: 18 }} />
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
