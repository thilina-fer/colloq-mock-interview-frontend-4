// src/component/dashboard/candidate/EditProfileModal.jsx
import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"; // Username icon eka
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../theme/colors";
import toast from "react-hot-toast";

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [editFormData, setEditFormData] = useState({ ...userData });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEditFormData({ ...userData });
      setImagePreview(userData.profilePic);
      setSelectedImageFile(null);
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!editFormData.username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    if (!editFormData.bio.trim()) {
      toast.error("Please enter a bio");
      return;
    }

    setIsSubmitting(true);
    const safeFormData = { ...editFormData };
    if (
      safeFormData.profilePic &&
      safeFormData.profilePic.startsWith("data:image")
    ) {
      safeFormData.profilePic = "";
    }

    await onSave(safeFormData, selectedImageFile);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80">
      <div
        className="w-full max-w-lg border rounded-sm p-8 shadow-2xl relative"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors disabled:opacity-50"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-gray-100 tracking-wide uppercase">
            EDIT <span className="text-orange-500">PROFILE</span>
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-2">
            Update your details and public links.
          </p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="w-full flex justify-center mb-6">
            <div
              className="relative group cursor-pointer w-32 h-32 active:scale-95 transition-transform"
              onClick={() => !isSubmitting && fileInputRef.current.click()}
            >
              <div
                className="w-full h-full border-2 rounded-full flex items-center justify-center overflow-hidden relative transition-colors"
                style={{
                  borderColor: colors.primary,
                  backgroundColor: colors.background,
                }}
              >
                <img
                  src={
                    imagePreview ||
                    `https://ui-avatars.com/api/?name=${userData.username}&background=random`
                  }
                  alt="Profile Preview"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <PhotoCameraIcon sx={{ color: colors.primary, fontSize: 30 }} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Username Input Added Here */}
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Username
            </label>
            <div className="relative flex items-center">
              <PersonOutlineIcon
                className="absolute left-3 text-gray-500"
                sx={{ fontSize: 18 }}
              />
              <input
                type="text"
                name="username"
                required
                value={editFormData.username}
                onChange={handleEditChange}
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-sm focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Your Bio
            </label>
            <div className="relative">
              <FormatQuoteIcon
                className="absolute left-3 top-3 text-gray-500"
                sx={{ fontSize: 18 }}
              />
              <textarea
                name="bio"
                required
                value={editFormData.bio}
                onChange={handleEditChange}
                disabled={isSubmitting}
                rows="3"
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-sm focus:border-orange-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                GitHub
              </label>
              <div className="relative flex items-center">
                <GitHubIcon
                  className="absolute left-3 text-gray-500"
                  sx={{ fontSize: 16 }}
                />
                <input
                  type="text"
                  name="github"
                  value={editFormData.github}
                  onChange={handleEditChange}
                  disabled={isSubmitting}
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                LinkedIn
              </label>
              <div className="relative flex items-center">
                <LinkedInIcon
                  className="absolute left-3 text-gray-500"
                  sx={{ fontSize: 16 }}
                />
                <input
                  type="text"
                  name="linkedin"
                  value={editFormData.linkedin}
                  onChange={handleEditChange}
                  disabled={isSubmitting}
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 rounded-sm font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2 uppercase tracking-wider text-sm disabled:opacity-70"
          >
            {isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "SAVE CHANGES"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
