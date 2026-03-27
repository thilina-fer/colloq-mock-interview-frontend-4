// src/component/dashboard/admin/InterviewerVerification.jsx
import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import { motion, AnimatePresence } from "framer-motion"; // Animation සඳහා

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

// අපි හදපු අලුත් Component එක
import InterviewerDetailExpose from "./InterviewerDetailExpose";

const InterviewerVerification = () => {
  const [expandedId, setExpandedId] = useState(null);

  const pendingRequests = [
    {
      id: 1,
      name: "Dr. Kasun Perera",
      role: "Java Expert",
      company: "LSEG SL",
      experience: "8+ Years",
      image: `https://ui-avatars.com/api/?name=Kasun+P&background=FF6600&color=fff`,
      email: "kasun.p@lseg.com",
      education: "PhD in Software Engineering (UOM)",
      bio: "Seasoned Java Architect with a decade of experience in high-frequency trading systems.",
      skills: ["Java", "Spring Boot", "Microservices", "Kafka"],
    },
    {
      id: 2,
      name: "Sarah Jansz",
      role: "UI/UX Lead",
      company: "Sysco LABS",
      experience: "5+ Years",
      image: `https://ui-avatars.com/api/?name=Sarah+J&background=007bff&color=fff`,
      email: "sarah.j@sysco.com",
      education: "BSc in Multimedia Design (AIT)",
      bio: "Creative lead specializing in design systems and accessibility for enterprise applications.",
      skills: ["Figma", "React", "Design Systems", "Tailwind"],
    },
    // තව data අවශ්‍ය පරිදි ඇඩ් කරන්න...
  ];

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* 1. Header Section */}
      <div className="px-2">
        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">
          Verification <span className="text-orange-500">Center</span>
        </h2>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-2">
          <VerifiedUserIcon sx={{ fontSize: 14, color: colors.primary }} />
          Review professional interviewer applications
        </p>
      </div>

      {/* 2. Main Outer Container */}
      <div
        className="w-full border-2 border-dashed rounded-xl p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar"
        style={{
          borderColor: "rgba(255,255,255,0.05)",
          backgroundColor: "rgba(255,255,255,0.01)",
          maxHeight: "650px",
        }}
      >
        {pendingRequests.map((req) => (
          <div
            key={req.id}
            className="flex flex-col rounded-sm overflow-hidden border transition-all duration-300"
            style={{
              borderColor:
                expandedId === req.id ? "rgba(255,102,0,0.3)" : colors.border,
            }}
          >
            {/* 3. The Main Card (Horizontal Row) */}
            <div
              className={`w-full h-20 flex items-center px-10 transition-all duration-300 group cursor-pointer ${expandedId === req.id ? "bg-orange-600/5" : ""}`}
              style={{
                backgroundColor: colors.surface,
                background:
                  "linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(10,10,10,1) 100%)",
              }}
              onClick={() => handleToggle(req.id)}
            >
              {/* Profile Pic */}
              <div className="flex-shrink-0">
                <div
                  className="w-11 h-11 rounded-full border-2 p-0.5 overflow-hidden transition-all duration-500"
                  style={{
                    borderColor:
                      expandedId === req.id ? colors.primary : colors.border,
                  }}
                >
                  <img
                    src={req.image}
                    alt={req.name}
                    className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="ml-10 min-w-[140px]">
                <h3 className="text-xs font-black text-white uppercase tracking-wider group-hover:text-orange-500 transition-colors">
                  {req.name}
                </h3>
              </div>

              {/* Designation & Company */}
              <div className="ml-10 flex-1">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest truncate">
                  {req.role} <span className="mx-4 text-gray-800">|</span>
                  <span className="text-gray-400 font-medium italic">
                    {" "}
                    {req.company}
                  </span>
                </p>
              </div>

              {/* Experience Box */}
              <div className="ml-10 bg-black/50 border border-white/5 px-8 py-2 rounded-sm min-w-[130px] text-center group-hover:border-orange-500/20 transition-all">
                <p className="text-[11px] font-black text-gray-300 tracking-widest uppercase">
                  {req.experience}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 ml-10 pl-10 border-l border-white/5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(req.id);
                  }}
                  className={`w-9 h-9 flex items-center justify-center border rounded-sm transition-all ${expandedId === req.id ? "bg-orange-600 text-white border-orange-600" : "bg-white/5 text-gray-500 border-white/5 hover:text-white hover:border-white/20"}`}
                  title="View Details"
                >
                  <RemoveRedEyeIcon sx={{ fontSize: 18 }} />
                </button>

                <button className="w-9 h-9 flex items-center justify-center bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white border border-green-500/20 rounded-sm transition-all shadow-sm">
                  <CheckCircleIcon sx={{ fontSize: 18 }} />
                </button>

                <button className="w-9 h-9 flex items-center justify-center bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/20 rounded-sm transition-all shadow-sm">
                  <CancelIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>

            {/* 4. The Exposed Details (Navigate/Expand Section) */}
            <AnimatePresence>
              {expandedId === req.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-white/5"
                >
                  {/* අපි කලින් හදපු වෙනම component එක මෙතනට call කරනවා */}
                  <InterviewerDetailExpose data={req} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Inline Scrollbar Style */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ff6600; }
      `}</style>
    </div>
  );
};

export default InterviewerVerification;
