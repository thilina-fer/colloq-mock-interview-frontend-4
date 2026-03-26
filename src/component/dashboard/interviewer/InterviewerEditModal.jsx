// src/component/dashboard/interviewer/InterviewerEditModal.jsx
import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BusinessIcon from "@mui/icons-material/Business";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckIcon from "@mui/icons-material/Check"; //pill selected icon eka
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../theme/colors";
import toast from "react-hot-toast";

const InterviewerEditModal = ({ isOpen, onClose, userData, onSave }) => {
  // --- SPECIALIZATION OPTIONS (Based on Register Screen) ---
  const specializationOptions = [
    "FRONTEND",
    "BACKEND",
    "FULLSTACK",
    "DEVOPS",
    "MOBILE",
    "AI/ML",
    "QA",
    "CYBER SECURITY",
  ];

  const [editFormData, setEditFormData] = useState({ ...userData });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  // Meka comma separated string ekak widihata save karana nisa, api array ekak use karala manage karanawa
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEditFormData({ ...userData });
      setImagePreview(userData.profilePic);
      setSelectedImageFile(null);

      // 'specialization' Comma separated string eka array ekakata harawala select karagannawa
      if (userData.specialization) {
        setSelectedSpecializations(
          userData.specialization.split(",").map((s) => s.trim()),
        );
      } else {
        setSelectedSpecializations([]);
      }
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // --- PILL TOGGLE LOGIC ---
  const toggleSpecialization = (spec) => {
    if (selectedSpecializations.includes(spec)) {
      // Ain karanawa
      setSelectedSpecializations(
        selectedSpecializations.filter((item) => item !== spec),
      );
    } else {
      // Add karanawa (Max limit ekak nathnam)
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
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
    if (!editFormData.username.trim() || !editFormData.bio.trim()) {
      toast.error("Username and Bio are required!");
      return;
    }

    if (selectedSpecializations.length === 0) {
      toast.error("Please select at least one Specialization!");
      return;
    }

    setIsSubmitting(true);
    const safeFormData = { ...editFormData };

    // Arrays array eka aye 'Backend' compatible string ekakata harawanna
    safeFormData.specialization = selectedSpecializations.join(", ");

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
      {/* Modal eka Wider (max-w-4xl) saha Scroll-Free (max-h-none) kala */}
      <div
        className="w-full max-w-4xl border rounded-sm p-10 shadow-2xl relative"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors disabled:opacity-50"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-100 tracking-widest uppercase">
            EDIT <span className="text-orange-500">INTERVIEWER</span> PROFILE
          </h2>
          <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">
            Professional Verification Details
          </p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-8">
          <div className="flex gap-8 items-start">
            {/* Left Column: Photo, Specializations, Socials */}
            <div
              className="w-1/3 flex flex-col items-center border-r"
              style={{ borderColor: colors.border }}
            >
              {/* Photo Section */}
              <div
                className="relative group cursor-pointer w-28 h-28 active:scale-95 transition-transform mb-8"
                onClick={() => !isSubmitting && fileInputRef.current.click()}
              >
                <div
                  className="w-full h-full border-2 rounded-full flex items-center justify-center overflow-hidden"
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
                    alt="Preview"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-opacity"
                  />
                </div>
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <PhotoCameraIcon
                    sx={{ color: colors.primary, fontSize: 24 }}
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Specializations Pill Selector (Candidate/Register Style) */}
              <div className="w-full pr-8">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <VerifiedIcon sx={{ fontSize: 14, color: colors.primary }} />{" "}
                  SPECIALIZATIONS *
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {specializationOptions.map((spec) => {
                    const isSelected = selectedSpecializations.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button" // Submit nowenna
                        onClick={() => toggleSpecialization(spec)}
                        disabled={isSubmitting}
                        className={`px-4 py-1.5 border rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed`}
                        style={{
                          borderColor: isSelected
                            ? colors.primary
                            : colors.border,
                          color: isSelected ? "#000" : colors.textMuted,
                          backgroundColor: isSelected
                            ? colors.primary
                            : colors.background,
                        }}
                      >
                        {isSelected && <CheckIcon sx={{ fontSize: 12 }} />}
                        {spec}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Socials - Widen view ekata match wenna vertical eka lassanayi */}
              <div className="w-full mt-10 space-y-4 pr-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <GitHubIcon sx={{ fontSize: 14 }} /> GitHub URL
                  </label>
                  <input
                    type="text"
                    name="github"
                    value={editFormData.github}
                    onChange={handleEditChange}
                    placeholder="github.com/..."
                    className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <LinkedInIcon sx={{ fontSize: 14, color: "#0077b5" }} />{" "}
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    value={editFormData.linkedin}
                    onChange={handleEditChange}
                    placeholder="linkedin.com/in/..."
                    className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Username, Experience, Role, Bio, Submit */}
            <div className="w-2/3 flex-1 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {/* Username */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Username *
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
                      className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Experience Years */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Experience (Years)
                  </label>
                  <div className="relative flex items-center">
                    <WorkspacePremiumIcon
                      className="absolute left-3 text-gray-500"
                      sx={{ fontSize: 18 }}
                    />
                    <input
                      type="number"
                      name="experienceYears"
                      value={editFormData.experienceYears}
                      onChange={handleEditChange}
                      className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Current Company Name
                  </label>
                  <div className="relative flex items-center">
                    <BusinessIcon
                      className="absolute left-3 text-gray-500"
                      sx={{ fontSize: 18 }}
                    />
                    <input
                      type="text"
                      name="company"
                      value={editFormData.company}
                      onChange={handleEditChange}
                      className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Designation
                  </label>
                  <div className="relative flex items-center">
                    <VerifiedIcon
                      className="absolute left-3 text-gray-500"
                      sx={{ fontSize: 18 }}
                    />
                    <input
                      type="text"
                      name="designation"
                      value={editFormData.designation}
                      onChange={handleEditChange}
                      className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FormatQuoteIcon
                    sx={{ fontSize: 14, color: colors.primary }}
                  />{" "}
                  Professional Bio *
                </label>
                <textarea
                  name="bio"
                  required
                  value={editFormData.bio}
                  onChange={handleEditChange}
                  rows="5"
                  placeholder="Describe your expertise and interview style..."
                  className="w-full px-4 py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none transition-colors resize-none"
                />
              </div>

              <div
                className="w-full pt-6 border-t"
                style={{ borderColor: colors.border }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-sm font-black text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2 uppercase tracking-[0.2em] text-xs disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    "COMPLETE & SAVE VERIFICATION PROFILE"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewerEditModal;
