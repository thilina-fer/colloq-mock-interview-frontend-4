import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import Header from "../../../component/dashboard/candidate/Header";
import Footer from "../../../component/dashboard/candidate/Footer";
import CandidateSidebar from "../../../component/dashboard/candidate/CandidateSidebar";
import InterviewerSelectionModal from "../../../component/bookings/InterviewerSelectionModal";
import CandidateBookings from "../../../component/dashboard/candidate/CandidateBookings";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";

import HistoryIcon from "@mui/icons-material/History";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleInterviewerSelection = (interviewer) => {
    console.log("Selected Interviewer:", interviewer);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans text-white select-none"
      style={{ backgroundColor: colors.background }}
    >
      <Header />
      <main className="grow w-full max-w-1400px mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <CandidateSidebar
            setCurrentView={() => setIsBookingModalOpen(true)}
          />

          <div
            onClick={() => navigate("/interview")}
            className="group border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 p-6 rounded-sm space-y-4 cursor-pointer transition-all duration-300 relative overflow-hidden active:scale-[0.98]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-500"></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-orange-500 group-hover:animate-bounce" />
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                  AI Mock Interview
                </h5>
              </div>
              <span className="text-[10px] font-bold text-orange-500/50 group-hover:text-orange-500 group-hover:translate-x-1 transition-all">
                START &rarr;
              </span>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed italic relative z-10">
              "Level up your skills instantly! Jump into a realistic voice-based
              mock interview with our advanced AI expert."
            </p>
          </div>
        </div>

        <div className="w-full lg:w-3/4 flex flex-col">
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
              My Interview Sessions
              {activeTab === "pending" && (
                <div className="absolute bottom-0 left-0 w-full h-2px bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
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
              Past History
              {activeTab === "completed" && (
                <div className="absolute bottom-0 left-0 w-full h-2px bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]" />
              )}
            </button>
          </div>

          <div className="grow min-h-500px">
            {activeTab === "pending" ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <CandidateBookings />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-white/5 bg-white/0.01 rounded-sm py-20">
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
      <Footer />
      <InterviewerSelectionModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onInterviewerSelect={handleInterviewerSelection}
      />
    </div>
  );
};

export default CandidateDashboard;
