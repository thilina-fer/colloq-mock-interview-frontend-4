import React, { useState } from "react";
import { colors } from "../../theme/color";
// MUI Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CloseIcon from "@mui/icons-material/Close";

const CandidateProfileComplete = ({ isOpen, onClose, onComplete }) => {
  const [formData, setFormData] = useState({
    bio: "",
    github: "",
    linkedin: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.bio && formData.github && formData.linkedin) {
      onComplete(formData);
    } else {
      alert("Please fill all fields to continue!");
    }
  };

  // මෝඩල් එකෙන් පිටත (Overlay) ක්ලික් කළොත් වැහෙන ෆන්ක්ෂන් එක
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/40 cursor-pointer"
      onClick={handleOverlayClick}
    >
      <div 
        className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl animate-popIn relative cursor-default"
        style={{ border: `1px solid ${colors.gray.light}` }}
        onClick={(e) => e.stopPropagation()} // කාඩ් එක ඇතුළේ ක්ලික් කළාම වැහෙන එක නවත්වනවා
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 transition-all opacity-50 hover:opacity-100 active:scale-90"
          style={{ color: colors.black }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>

        {/* Header Section */}
        <div className="text-center mb-8 animate-textUp">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 transition-transform hover:rotate-0 duration-300">
            <RocketLaunchIcon style={{ color: colors.primary, fontSize: 32 }} />
          </div>
          <h2 className="text-2xl font-black" style={{ color: colors.black }}>
            One Last <span style={{ color: colors.primary }}>Step!</span>
          </h2>
          <p className="text-sm font-medium mt-1" style={{ color: colors.gray.medium }}>
            Complete your profile to unlock your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Bio Input */}
          <div className="animate-textUp delay-100">
            <label className="text-xs font-black uppercase tracking-widest ml-1 mb-2 block" style={{ color: colors.black }}>
              Your Bio
            </label>
            <div className="relative group">
              <EditNoteIcon className="absolute left-4 top-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
              <textarea 
                required
                placeholder="Ex: Full-stack developer passionate about React..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 min-h-[100px] resize-none font-medium text-sm"
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-textUp delay-200">
            {/* GitHub URL */}
            <div>
              <label className="text-xs font-black uppercase tracking-widest ml-1 mb-2 block" style={{ color: colors.black }}>
                GitHub URL
              </label>
              <div className="relative group">
                <GitHubIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100" sx={{ fontSize: 18 }} />
                <input 
                  required
                  type="url"
                  placeholder="github.com/..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-medium text-sm"
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                />
              </div>
            </div>

            {/* LinkedIn URL */}
            <div>
              <label className="text-xs font-black uppercase tracking-widest ml-1 mb-2 block" style={{ color: colors.black }}>
                LinkedIn URL
              </label>
              <div className="relative group">
                <LinkedInIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100" sx={{ fontSize: 18 }} />
                <input 
                  required
                  type="url"
                  placeholder="linkedin.com/in/..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-medium text-sm"
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-4 mt-2 rounded-xl font-black text-white shadow-lg transition-all hover:translate-y-[-2px] active:scale-[0.98] animate-textUp delay-300"
            style={{ backgroundColor: colors.primary }}
          >
            Launch Dashboard
          </button>
        </form>
      </div>

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes textUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-popIn { animation: popIn 0.4s ease-out forwards; }
        .animate-textUp { animation: textUp 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
      `}</style>
    </div>
  );
};

export default CandidateProfileComplete;