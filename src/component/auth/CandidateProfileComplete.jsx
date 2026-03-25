import React, { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CloseIcon from "@mui/icons-material/Close";

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.bio && formData.github && formData.linkedin) {
      onComplete(formData);
    } else {
      alert("Please fill all fields to continue!");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80 cursor-pointer"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-lg bg-[#111111] border border-[#333] rounded-sm p-8 shadow-2xl relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-orange-600"></div>

        {!isSubmitting && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-white transition-colors"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1a1a1a] border border-[#333] rounded-sm flex items-center justify-center mx-auto mb-4">
            <RocketLaunchIcon
              className="text-orange-500"
              sx={{ fontSize: 28 }}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 uppercase tracking-wide">
            One Last <span className="text-orange-500">Step</span>
          </h2>
          <p className="text-[13px] font-medium mt-1 text-gray-500">
            Complete your profile to unlock your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
              Your Bio
            </label>
            <div className="relative group">
              <EditNoteIcon className="absolute left-3 top-3.5 text-gray-600 group-focus-within:text-orange-500 transition-colors" />
              <textarea
                required
                disabled={isSubmitting}
                placeholder="Ex: Full-stack developer passionate about React..."
                className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 min-h-[100px] resize-none text-sm disabled:opacity-50"
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                GitHub URL
              </label>
              <div className="relative group">
                <GitHubIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500"
                  sx={{ fontSize: 18 }}
                />
                <input
                  required
                  type="url"
                  disabled={isSubmitting}
                  placeholder="github.com/..."
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 text-sm disabled:opacity-50"
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                LinkedIn URL
              </label>
              <div className="relative group">
                <LinkedInIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500"
                  sx={{ fontSize: 18 }}
                />
                <input
                  required
                  type="url"
                  disabled={isSubmitting}
                  placeholder="linkedin.com/in/..."
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 text-sm disabled:opacity-50"
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 rounded-sm font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] uppercase tracking-wider text-sm flex justify-center items-center disabled:opacity-70"
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
                PROCESSING...
              </span>
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
