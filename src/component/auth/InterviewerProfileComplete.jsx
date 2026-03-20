import React, { useState, useEffect } from "react";
import { colors } from "../../theme/color";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import TimelineIcon from "@mui/icons-material/Timeline";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const InterviewerProfileComplete = ({ isOpen, onClose, onComplete }) => {
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
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
    if (selectedSpecs.includes(spec)) {
      setSelectedSpecs(selectedSpecs.filter((s) => s !== spec));
    } else {
      setSelectedSpecs([...selectedSpecs, spec]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSpecs.length === 0) {
      alert("Please select at least one specialization!");
      return;
    }
    // Register.jsx හි handleInterviewerComplete වෙත දත්ත යැවීම
    onComplete({ ...formData, specializations: selectedSpecs });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/40 overflow-hidden">
      <div
        className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl animate-popIn relative overflow-hidden"
        style={{ border: `1px solid ${colors.gray.light}` }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 opacity-40 hover:opacity-100 transition-all z-10"
        >
          <CloseIcon />
        </button>

        <div className="text-center mb-5 animate-textUp">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <VerifiedUserIcon style={{ color: "#3B82F6", fontSize: 28 }} />
          </div>
          <h2 className="text-2xl font-black" style={{ color: colors.black }}>
            Interviewer{" "}
            <span style={{ color: colors.primary }}>Verification</span>
          </h2>
          <p className="text-sm font-medium opacity-60 mt-1">
            Complete your professional profile to start.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-textUp delay-100">
            <label className="text-xs font-black uppercase tracking-widest ml-1 mb-1.5 block">
              Professional Bio
            </label>
            <textarea
              required
              placeholder="Briefly describe your expertise..."
              className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-orange-500 min-h-[70px] text-sm font-medium resize-none"
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-textUp delay-200">
            <div className="relative group">
              <BusinessIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="text"
                placeholder="Company Name"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 text-sm font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>
            <div className="relative group">
              <BadgeIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="text"
                placeholder="Designation (Ex: Senior SE)"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 text-sm font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-textUp delay-200">
            <div className="relative group">
              <TimelineIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="number"
                placeholder="Experience (Years)"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 text-sm font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>
          </div>

          <div className="animate-textUp delay-300">
            <label className="text-xs font-black uppercase tracking-widest ml-1 mb-2 block flex items-center gap-2">
              <PsychologyIcon sx={{ fontSize: 14 }} /> Specializations
            </label>
            <div className="flex flex-wrap gap-1.5">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  type="button"
                  onClick={() => toggleSpecialization(spec)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${selectedSpecs.includes(spec) ? "bg-orange-500 border-orange-500 text-white" : "bg-white border-gray-100 text-gray-500 hover:border-gray-300"}`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-textUp delay-300">
            <div className="relative group">
              <GitHubIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="url"
                placeholder="GitHub URL"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 text-sm font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
              />
            </div>
            <div className="relative group">
              <LinkedInIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                sx={{ fontSize: 18 }}
              />
              <input
                required
                type="url"
                placeholder="LinkedIn URL"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 text-sm font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl font-black text-white transition-all hover:translate-y-[-2px] active:scale-95 shadow-lg"
            style={{ backgroundColor: colors.primary }}
          >
            Complete Interviewer Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewerProfileComplete;
