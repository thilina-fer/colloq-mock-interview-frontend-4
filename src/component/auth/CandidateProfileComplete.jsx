// src/component/auth/CandidateProfileComplete.jsx
import React, { useState, useRef } from "react";
import SchoolIcon from "@mui/icons-material/School";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../theme/colors";

const CandidateProfileComplete = ({
  isOpen,
  onClose,
  onComplete,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    bio: "",
    github: "",
    linkedin: "",
  });

  // Image states
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Photo Select karana function eka
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // formData ekai, select karapu imageFile ekai dekama Register page ekata yawanawa
    onComplete(formData, selectedImageFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/80">
      <div
        className="w-full max-w-lg border rounded-sm p-8 shadow-2xl relative animate-fade-in-up"
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
          <div className="w-12 h-12 bg-orange-600/10 rounded-sm flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
            <SchoolIcon sx={{ color: colors.primary, fontSize: 24 }} />
          </div>
          <h2 className="text-2xl font-black text-gray-100 tracking-wide uppercase">
            ONE LAST <span className="text-orange-500">STEP</span>
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-2">
            Complete your profile to unlock your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload Section */}
          <div className="w-full flex flex-col items-center justify-center mb-6">
            <div
              className="relative group cursor-pointer w-24 h-24 active:scale-95 transition-transform"
              onClick={() => !isSubmitting && fileInputRef.current.click()}
            >
              <div
                className="w-full h-full border-2 border-dashed rounded-full flex items-center justify-center overflow-hidden transition-colors"
                style={{
                  borderColor: imagePreview ? colors.primary : colors.border,
                  backgroundColor: colors.background,
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PhotoCameraIcon
                    sx={{ color: colors.textMuted, fontSize: 28 }}
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <PhotoCameraIcon sx={{ color: colors.primary, fontSize: 20 }} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <span className="text-xs text-gray-500 mt-2 font-medium">
              Upload Profile Photo (Optional)
            </span>
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
                value={formData.bio}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="A short sentence about you..."
                rows="3"
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors text-sm resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                GitHub URL
              </label>
              <div className="relative flex items-center">
                <GitHubIcon
                  className="absolute left-3 text-gray-500"
                  sx={{ fontSize: 16 }}
                />
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="github.com/..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                LinkedIn URL
              </label>
              <div className="relative flex items-center">
                <LinkedInIcon
                  className="absolute left-3 text-gray-500"
                  sx={{ fontSize: 16 }}
                />
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="linkedin.com/in/..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-sm focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 rounded-sm font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2 uppercase tracking-wider text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "LAUNCH DASHBOARD"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateProfileComplete;
