import React, { useState, useEffect, useRef } from "react";
import { colors } from "../../../theme/colors"; // Path eka poddak check karaganna
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [editFormData, setEditFormData] = useState({ ...userData });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image preview state ekak
  const [imagePreview, setImagePreview] = useState(userData.profilePic);

  // File input trigger karanna ref ekak
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEditFormData({ ...userData });
      setImagePreview(userData.profilePic);
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Photo eka change karana handler function
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditFormData({ ...editFormData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call delay
    setTimeout(() => {
      onSave(editFormData);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80">
      <div
        className="w-full max-w-lg border rounded-sm p-8 shadow-2xl relative"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{ backgroundColor: colors.primary }}
        ></div>

        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 hover:opacity-100 opacity-60 transition-opacity disabled:opacity-30"
          style={{ color: colors.textMuted }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>

        <div className="mb-8">
          <h2
            className="text-2xl font-bold uppercase tracking-wide"
            style={{ color: colors.textMain }}
          >
            Edit <span style={{ color: colors.primary }}>Profile</span>
          </h2>
          <p
            className="text-[13px] font-medium mt-1"
            style={{ color: colors.textMuted }}
          >
            Update your personal information below.
          </p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* New Modern Photo Update Section (Centered Hover Overlay) */}
          <div className="w-full flex justify-center mb-10">
            <div
              className="relative group cursor-pointer w-32 h-32 active:scale-95 transition-transform"
              onClick={() => !isSubmitting && fileInputRef.current.click()} // Trigger input on click
              title="Click to change photo"
            >
              {/* Main Photo Container with Primary Border */}
              <div
                className="w-full h-full border-2 rounded-sm flex items-center justify-center overflow-hidden relative transition-colors"
                style={{
                  borderColor: colors.primary,
                  backgroundColor: colors.background,
                }}
              >
                <img
                  src={imagePreview || userData.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Hover Overlay - Appears only on hover */}
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm">
                <PhotoCameraIcon sx={{ color: colors.primary, fontSize: 30 }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-center px-2"
                  style={{ color: colors.textMain }}
                >
                  Change Photo
                </span>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Username Input */}
          <div>
            <label
              className="block text-[11px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: colors.textMuted }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              disabled={isSubmitting}
              value={editFormData.username}
              onChange={handleEditChange}
              className="w-full px-4 py-2.5 rounded-sm border focus:outline-none text-sm disabled:opacity-50 transition-colors"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.border,
                color: colors.textMain,
              }}
              onFocus={(e) => (e.target.style.borderColor = colors.borderFocus)}
              onBlur={(e) => (e.target.style.borderColor = colors.border)}
            />
          </div>

          {/* Bio Input */}
          <div>
            <label
              className="block text-[11px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: colors.textMuted }}
            >
              Bio
            </label>
            <textarea
              name="bio"
              required
              disabled={isSubmitting}
              value={editFormData.bio}
              onChange={handleEditChange}
              className="w-full px-4 py-3 rounded-sm border focus:outline-none min-h-[100px] resize-none text-sm disabled:opacity-50 transition-colors leading-relaxed"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.border,
                color: colors.textMain,
              }}
              onFocus={(e) => (e.target.style.borderColor = colors.borderFocus)}
              onBlur={(e) => (e.target.style.borderColor = colors.border)}
            />
          </div>

          {/* Social URLs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className="block text-[11px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: colors.textMuted }}
              >
                GitHub URL
              </label>
              <input
                type="text"
                name="github"
                required
                disabled={isSubmitting}
                value={editFormData.github}
                onChange={handleEditChange}
                className="w-full px-4 py-2.5 rounded-sm border focus:outline-none text-sm disabled:opacity-50 transition-colors"
                style={{
                  backgroundColor: colors.inputBg,
                  borderColor: colors.border,
                  color: colors.textMain,
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = colors.borderFocus)
                }
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>
            <div>
              <label
                className="block text-[11px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: colors.textMuted }}
              >
                LinkedIn URL
              </label>
              <input
                type="text"
                name="linkedin"
                required
                disabled={isSubmitting}
                value={editFormData.linkedin}
                onChange={handleEditChange}
                className="w-full px-4 py-2.5 rounded-sm border focus:outline-none text-sm disabled:opacity-50 transition-colors"
                style={{
                  backgroundColor: colors.inputBg,
                  borderColor: colors.border,
                  color: colors.textMain,
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = colors.borderFocus)
                }
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="flex gap-4 pt-5 border-t"
            style={{ borderColor: colors.border }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3.5 rounded-sm border font-bold uppercase tracking-widest text-[11px] disabled:opacity-50 transition-colors hover:opacity-80"
              style={{
                backgroundColor: colors.inputBg,
                borderColor: colors.border,
                color: colors.textMuted,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] py-3.5 rounded-sm font-bold text-white transition-all active:scale-[0.98] uppercase tracking-widest text-[11px] flex justify-center items-center gap-2 disabled:opacity-70"
              style={{ backgroundColor: colors.primary }}
              onMouseOver={(e) =>
                !isSubmitting &&
                (e.currentTarget.style.backgroundColor = colors.primaryHover)
              }
              onMouseOut={(e) =>
                !isSubmitting &&
                (e.currentTarget.style.backgroundColor = colors.primary)
              }
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  SAVING...
                </span>
              ) : (
                <>
                  <SaveIcon sx={{ fontSize: 16 }} /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
