import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CircularProgress from "@mui/material/CircularProgress";

// Services
import { AdminService } from "../../../services/AdminService";
import InterviewerDetailExpose from "./InterviewerDetailExpose";

const InterviewerVerification = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [interviewers, setInterviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  // 1. Backend එකෙන් දත්ත ලබා ගැනීම
  const fetchPendingInterviewers = async () => {
    setIsLoading(true);
    console.log("DEBUG: Calling fetchPendingInterviewers...");
    try {
      const data = await AdminService.getPendingInterviewers();
      console.log("DEBUG: Data received from Backend:", data);
      setInterviewers(data || []);
    } catch (error) {
      console.error("DEBUG: Frontend fetch error:", error);
      toast.error("Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingInterviewers();
  }, []);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // 2. Approve කිරීමේ Logic එක
  const handleApprove = async (e, id) => {
    e.stopPropagation();
    const loadingToast = toast.loading("Approving interviewer...");
    setActionId(id);
    try {
      await AdminService.approveInterviewer(id);
      toast.success("Interviewer Approved!", { id: loadingToast });

      // List එකෙන් අයින් කරනවා (UI එකෙන් අයින් වෙන්න)
      setInterviewers((prev) =>
        prev.filter((item) => item.interviewerId !== id),
      );
    } catch (error) {
      console.error("DEBUG: Approval error:", error);
      toast.error("Approval failed", { id: loadingToast });
    } finally {
      setActionId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <CircularProgress sx={{ color: colors.primary }} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            Loading Applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="px-2 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">
            Verification <span className="text-orange-500">Center</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-2">
            <VerifiedUserIcon sx={{ fontSize: 14, color: colors.primary }} />
            Review {interviewers.length} pending interviewer applications
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div
        className="w-full border-2 border-dashed rounded-xl p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar"
        style={{
          borderColor: "rgba(255,255,255,0.05)",
          backgroundColor: "rgba(255,255,255,0.01)",
          maxHeight: "650px",
          minHeight: "400px",
        }}
      >
        {interviewers.length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
              <CheckCircleIcon
                sx={{ color: "rgba(255,255,255,0.1)", fontSize: 32 }}
              />
            </div>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">
              No pending applications found
            </p>
          </div>
        ) : (
          interviewers.map((req) => (
            <div
              key={req.interviewerId}
              className="flex flex-col rounded-sm overflow-hidden border transition-all duration-300"
              style={{
                borderColor:
                  expandedId === req.interviewerId
                    ? "rgba(255,102,0,0.3)"
                    : colors.border,
              }}
            >
              {/* Table Row Header */}
              <div
                className={`w-full h-24 flex items-center px-10 transition-all duration-300 group cursor-pointer ${
                  expandedId === req.interviewerId ? "bg-orange-600/5" : ""
                }`}
                style={{
                  backgroundColor: colors.surface,
                  background:
                    "linear-gradient(90deg, rgba(18,18,18,1) 0%, rgba(10,10,10,1) 100%)",
                }}
                onClick={() => handleToggle(req.interviewerId)}
              >
                {/* Profile Pic */}
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full border-2 p-0.5 overflow-hidden"
                    style={{
                      borderColor:
                        expandedId === req.interviewerId
                          ? colors.primary
                          : colors.border,
                    }}
                  >
                    <img
                      src={
                        req.profilePicture ||
                        `https://ui-avatars.com/api/?name=${req.username}&background=random&color=fff`
                      }
                      alt={req.username}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${req.username}&background=333&color=fff`;
                      }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="ml-10 min-w-[180px]">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider group-hover:text-orange-500 transition-colors">
                    {req.username}
                  </h3>
                  <p className="text-[9px] text-gray-500 mt-1 font-medium">
                    {req.email}
                  </p>
                </div>

                <div className="ml-10 flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
                    {req.designation || "Expert"}{" "}
                    <span className="mx-4 text-gray-800">|</span>
                    <span className="text-gray-500 font-medium italic">
                      {req.company || "Independent"}
                    </span>
                  </p>
                </div>

                <div className="ml-10 bg-black/50 border border-white/5 px-8 py-2 rounded-sm min-w-[140px] text-center">
                  <p className="text-[11px] font-black text-gray-300 tracking-widest uppercase">
                    {req.experienceYears || 0}+ Years
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 ml-10 pl-10 border-l border-white/5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(req.interviewerId);
                    }}
                    className={`w-10 h-10 flex items-center justify-center border rounded-sm transition-all ${
                      expandedId === req.interviewerId
                        ? "bg-orange-600 border-orange-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <RemoveRedEyeIcon sx={{ fontSize: 18 }} />
                  </button>

                  <button
                    disabled={actionId === req.interviewerId}
                    onClick={(e) => handleApprove(e, req.interviewerId)}
                    className="w-10 h-10 flex items-center justify-center bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white border border-green-500/20 rounded-sm transition-all disabled:opacity-50"
                  >
                    {actionId === req.interviewerId ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <CheckCircleIcon sx={{ fontSize: 18 }} />
                    )}
                  </button>

                  <button className="w-10 h-10 flex items-center justify-center bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/20 rounded-sm transition-all">
                    <CancelIcon sx={{ fontSize: 18 }} />
                  </button>
                </div>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedId === req.interviewerId && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <InterviewerDetailExpose data={req} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ff6600; }
      `}</style>
    </div>
  );
};

export default InterviewerVerification;
