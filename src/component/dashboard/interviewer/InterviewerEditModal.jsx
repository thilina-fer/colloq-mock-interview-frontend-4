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
import CircularProgress from "@mui/material/CircularProgress";
import { colors } from "../../../theme/colors";
import toast from "react-hot-toast";

const InterviewerEditModal = ({ isOpen, onClose, userData, onSave }) => {
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

  const [editFormData, setEditFormData] = useState({
    username: "",
    bio: "",
    company: "",
    experienceYears: 0,
    githubUrl: "",
    linkedinUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && userData) {
      // 🎯 Backend DTO fields වලටම ගැලපෙන්න data set කරනවා
      setEditFormData({
        username: userData.username || "",
        bio: userData.bio || "",
        company: userData.company || "",
        experienceYears: userData.experienceYears || 0,
        githubUrl: userData.githubUrl || "",
        linkedinUrl: userData.linkedinUrl || "",
      });
      setImagePreview(userData.profilePic);
      setSelectedImageFile(null);

      if (userData.specialization) {
        setSelectedSpecializations(
          userData.specialization.split(",").map((s) => s.trim().toUpperCase()),
        );
      } else {
        setSelectedSpecializations([]);
      }
    }
  }, [isOpen, userData]);

  if (!isOpen) return null;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const toggleSpecialization = (spec) => {
    if (selectedSpecializations.includes(spec)) {
      setSelectedSpecializations(
        selectedSpecializations.filter((item) => item !== spec),
      );
    } else {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!editFormData.username?.trim() || !editFormData.bio?.trim()) {
      toast.error("Username and Bio are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      const isUsernameChanged = editFormData.username !== userData.username;

      // 🎯 Backend DTO එකට යන Final Payload එක
      const profilePayload = {
        username: editFormData.username,
        bio: editFormData.bio,
        company: editFormData.company,
        experienceYears: parseInt(editFormData.experienceYears) || 0,
        specializations: selectedSpecializations, // List<String> ලෙස යවන්න
        githubUrl: editFormData.githubUrl,
        linkedinUrl: editFormData.linkedinUrl,
        status: userData.status || "PENDING",
      };

      await onSave(profilePayload, selectedImageFile, isUsernameChanged);
      onClose();
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Error saving profile changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80">
      <div className="w-full max-w-4xl border rounded-sm p-10 shadow-2xl relative bg-[#111111] border-[#333]">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-100 tracking-widest uppercase">
            EDIT <span className="text-orange-500">INTERVIEWER</span> PROFILE
          </h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image & Specialization Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center border-r border-[#222] pr-0 md:pr-8">
              <div
                className="relative group cursor-pointer w-28 h-28 mb-8"
                onClick={() => !isSubmitting && fileInputRef.current.click()}
              >
                <div className="w-full h-full border-2 rounded-full flex items-center justify-center overflow-hidden border-orange-500 bg-[#0a0a0a]">
                  <img
                    src={
                      imagePreview ||
                      `https://ui-avatars.com/api/?name=${editFormData.username}&background=random`
                    }
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <PhotoCameraIcon sx={{ color: "#ea580c", fontSize: 24 }} />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="w-full">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  SPECIALIZATIONS
                </label>
                <div className="flex flex-wrap gap-2">
                  {specializationOptions.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => toggleSpecialization(spec)}
                      className={`px-3 py-1.5 border rounded-sm text-[9px] font-black uppercase tracking-widest transition-all ${
                        selectedSpecializations.includes(spec)
                          ? "bg-orange-600 border-orange-600 text-white"
                          : "border-[#333] text-gray-500"
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Fields Section */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
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
                      value={editFormData.username}
                      onChange={handleEditChange}
                      className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
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
                      className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Company
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
                      className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
                {/* 🎯 Note: Designation එක අයින් කළා DTO එකේ නැති නිසා. ඕනෙනම් මෙතනට Level dropdown එකක් දාන්න පුළුවන් */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <GitHubIcon sx={{ fontSize: 14 }} /> GitHub URL
                  </label>
                  <input
                    type="text"
                    name="githubUrl"
                    value={editFormData.githubUrl}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <LinkedInIcon sx={{ fontSize: 14, color: "#0077b5" }} />{" "}
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    name="linkedinUrl"
                    value={editFormData.linkedinUrl}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FormatQuoteIcon sx={{ fontSize: 14, color: "#ea580c" }} />{" "}
                  BIO
                </label>
                <textarea
                  name="bio"
                  required
                  value={editFormData.bio}
                  onChange={handleEditChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 text-xs focus:border-orange-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-sm font-black text-white bg-orange-600 hover:bg-orange-500 transition-all flex justify-center items-center gap-2 uppercase tracking-[0.2em] text-xs disabled:opacity-70"
              >
                {isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  "SAVE CHANGES"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewerEditModal;
