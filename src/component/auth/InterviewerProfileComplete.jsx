import React, { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import TimelineIcon from "@mui/icons-material/Timeline";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const InterviewerProfileComplete = ({
  isOpen,
  onClose,
  onComplete,
  isSubmitting,
}) => {
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [formData, setFormData] = useState({
    bio: "",
    company: "",
    designation: "",
    experience: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const specializations = [
    "Frontend",
    "Backend",
    "Fullstack",
    "DevOps",
    "Mobile",
    "AI/ML",
    "QA",
    "Cyber Security",
  ];

  if (!isOpen) return null;

  const toggleSpecialization = (spec) => {
    if (isSubmitting) return;
    if (selectedSpecs.includes(spec))
      setSelectedSpecs(selectedSpecs.filter((s) => s !== spec));
    else setSelectedSpecs([...selectedSpecs, spec]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSpecs.length === 0) {
      alert("Please select at least one specialization!");
      return;
    }
    onComplete({ ...formData, specializations: selectedSpecs });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/80">
      <div className="w-full max-w-xl bg-[#111111] border border-[#333] rounded-sm p-8 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-orange-600"></div>

        {!isSubmitting && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#1a1a1a] border border-[#333] rounded-sm flex items-center justify-center mx-auto mb-4">
            <VerifiedUserIcon
              className="text-orange-500"
              sx={{ fontSize: 28 }}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 uppercase tracking-wide">
            Interviewer <span className="text-orange-500">Verification</span>
          </h2>
          <p className="text-[13px] font-medium text-gray-500 mt-1">
            Complete your professional profile to start.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
              Professional Bio
            </label>
            <textarea
              required
              disabled={isSubmitting}
              placeholder="Briefly describe your expertise..."
              className="w-full p-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 min-h-[70px] text-sm resize-none disabled:opacity-50"
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative group">
              <BusinessIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="text"
                disabled={isSubmitting}
                placeholder="Company Name"
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 text-sm disabled:opacity-50"
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>
            <div className="relative group">
              <BadgeIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="text"
                disabled={isSubmitting}
                placeholder="Designation"
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 text-sm disabled:opacity-50"
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative group">
              <TimelineIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="number"
                disabled={isSubmitting}
                placeholder="Experience (Years)"
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 text-sm disabled:opacity-50"
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
              <PsychologyIcon sx={{ fontSize: 14 }} /> Specializations
            </label>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => toggleSpecialization(spec)}
                  disabled={isSubmitting}
                  className={`px-3 py-1.5 rounded-sm text-[11px] uppercase tracking-wider font-bold border transition-all disabled:opacity-50 ${
                    selectedSpecs.includes(spec)
                      ? "bg-orange-600 border-orange-600 text-white"
                      : "bg-[#0a0a0a] border-[#333] text-gray-400 hover:border-gray-500"
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="relative group">
              <GitHubIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="url"
                disabled={isSubmitting}
                placeholder="GitHub URL"
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 text-sm disabled:opacity-50"
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
              />
            </div>
            <div className="relative group">
              <LinkedInIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="url"
                disabled={isSubmitting}
                placeholder="LinkedIn URL"
                className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 text-sm disabled:opacity-50"
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 rounded-sm font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] uppercase tracking-wider text-[13px] flex justify-center items-center disabled:opacity-70"
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
              "COMPLETE PROFILE"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewerProfileComplete;
