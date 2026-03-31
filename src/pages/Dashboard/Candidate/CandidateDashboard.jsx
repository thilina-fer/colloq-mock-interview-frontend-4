import React, { useState, useEffect } from "react";
import { colors } from "../../../theme/colors";
import Header from "../../../component/dashboard/candidate/Header";
import Footer from "../../../component/dashboard/candidate/Footer";
import CandidateSidebar from "../../../component/dashboard/candidate/CandidateSidebar";
import InterviewerSelectionModal from "../../../component/bookings/InterviewerSelectionModal";
import PendingSessions from "../../../component/bookings/PendingSessions";

// Material Icons for UI enhancement
import HistoryIcon from "@mui/icons-material/History";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // 🎯 ලොග් වී සිටින User ගේ ID එක (මෙතනට ඔයාගේ Auth Context එකෙන් එන ID එක දෙන්න)
  // දැනට මම static ID එකක් දානවා test කරන්න.
  const currentUserId = 1;

  const handleInterviewerSelection = (interviewer) => {
    console.log("Selected Interviewer:", interviewer);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans text-white select-none"
      style={{ backgroundColor: colors.background }}
    >
      {/* --- TOP HEADER --- */}
      <Header />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN: Sidebar & Quick Stats */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <CandidateSidebar
            setCurrentView={() => setIsBookingModalOpen(true)}
          />

          {/* Quick Info Box (Optional UI addition) */}
          <div className="border border-white/5 bg-white/[0.01] p-6 rounded-sm space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
              Dashboard Tip
            </h5>
            <p className="text-[11px] text-gray-500 leading-relaxed italic">
              "Check your pending sessions regularly. Experts usually respond
              within 24 hours."
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Sessions Tabs & Lists */}
        <div className="w-full lg:w-3/4 flex flex-col">
          {/* TABS NAVIGATION */}
          <div className="flex gap-8 mb-6 border-b border-white/5">
            <button
              onClick={() => setActiveTab("pending")}
              className={`pb-4 px-2 font-black text-[11px] uppercase tracking-[0.2em] transition-all relative ${
                activeTab === "pending"
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-100"
              }`}
              style={{
                color:
                  activeTab === "pending" ? colors.primary : colors.textMain,
              }}
            >
              Pending Sessions
              {activeTab === "pending" && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className={`pb-4 px-2 font-black text-[11px] uppercase tracking-[0.2em] transition-all relative ${
                activeTab === "completed"
                  ? "opacity-100"
                  : "opacity-30 hover:opacity-100"
              }`}
              style={{
                color:
                  activeTab === "completed" ? colors.primary : colors.textMain,
              }}
            >
              Completed Sessions
              {activeTab === "completed" && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
              )}
            </button>
          </div>

          {/* DYNAMIC CONTENT DISPLAY */}
          <div className="flex-grow min-h-[500px]">
            {activeTab === "pending" ? (
              /* 🚀 පෙන්ඩින් සෙෂන් කාඩ්ස් ටික මෙතනට ලෝඩ් වෙනවා */
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <PendingSessions currentUserId={currentUserId} />
              </div>
            ) : (
              /* COMPLETED SESSIONS: Empty State Placeholder */
              <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-white/5 bg-white/[0.01] rounded-sm py-20">
                <div className="p-4 rounded-full bg-white/5 mb-4">
                  <HistoryIcon
                    className="text-gray-700"
                    sx={{ fontSize: 40 }}
                  />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
                  No History Available
                </h3>
                <p className="text-[8px] font-bold uppercase tracking-widest text-gray-800 mt-2">
                  Completed sessions will be archived here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <Footer />

      {/* --- BOOKING MODAL --- */}
      <InterviewerSelectionModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onInterviewerSelect={handleInterviewerSelection}
      />
    </div>
  );
};

export default CandidateDashboard;
