// src/pages/dashboard/interviewer/InterviewerDashboard.jsx
import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import Header from "../../../component/dashboard/candidate/Header";
import Footer from "../../../component/dashboard/candidate/Footer";
import InterviewerSidebar from "../../../component/dashboard/interviewer/InterviewerSidebar";
import InterviewerWallet from "../../../component/dashboard/interviewer/InterviewerWallet"; // Wallet eka import kala
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EastIcon from "@mui/icons-material/East";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EngineeringIcon from "@mui/icons-material/Engineering";

const InterviewerDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [mode, setMode] = useState("interviewer");
  const [currentView, setCurrentView] = useState("dashboard"); // View eka manage karanna state ekak

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: colors.background }}
    >
      <Header />

      <main className="flex-grow w-full max-w-[1400px] mx-auto p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - currentView props pass kala */}
        <div className="w-full lg:w-1/4">
          <InterviewerSidebar
            setCurrentView={setCurrentView}
            currentView={currentView}
          />
        </div>

        {/* Right Content Area */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          {/* View Switch Logic */}
          {currentView === "wallet" ? (
            <InterviewerWallet />
          ) : (
            <>
              {/* Practice Mode Container - DARK THEME */}
              <div
                className="w-full p-8 border rounded-sm shadow-xl space-y-8"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                {/* Top Header & Switcher */}
                <div className="flex justify-between items-center">
                  <h2
                    className="text-sm font-black uppercase tracking-[0.3em]"
                    style={{ color: colors.textMain }}
                  >
                    Practice Mode
                  </h2>

                  <div
                    className="flex p-1 rounded-sm border"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                    }}
                  >
                    <button
                      onClick={() => setMode("interviewer")}
                      className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                        mode === "interviewer"
                          ? "bg-white text-black"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <EngineeringIcon sx={{ fontSize: 16, mr: 1 }} />{" "}
                      Interviewer
                    </button>
                    <button
                      onClick={() => setMode("candidate")}
                      className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                        mode === "candidate"
                          ? "bg-orange-600 text-white"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <PersonSearchIcon sx={{ fontSize: 16, mr: 1 }} />{" "}
                      Candidate
                    </button>
                  </div>
                </div>

                {/* Content Switcher Logic */}
                {mode === "interviewer" ? (
                  <div
                    className="p-6 rounded-sm border border-dashed"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <p
                      className="text-xs font-medium leading-relaxed uppercase tracking-widest"
                      style={{ color: colors.textMuted }}
                    >
                      You are currently in{" "}
                      <span style={{ color: colors.primary }}>
                        Interviewer Mode
                      </span>
                      . Manage your upcoming interview schedules and provide
                      feedback. Switch to Candidate mode to book your own mock
                      sessions.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    {/* Yellow Highlight Box */}
                    <div
                      className="flex items-start gap-5 p-6 rounded-sm border"
                      style={{
                        borderColor: "rgba(250, 204, 21, 0.2)",
                        backgroundColor: "rgba(250, 204, 21, 0.05)",
                      }}
                    >
                      <div
                        className="p-3 rounded-sm text-black"
                        style={{ backgroundColor: "#facc15" }}
                      >
                        <CalendarMonthIcon />
                      </div>
                      <div>
                        <h3
                          className="font-bold uppercase tracking-wider text-sm"
                          style={{ color: "#facc15" }}
                        >
                          Improve your skills
                        </h3>
                        <p
                          className="text-xs mt-2 leading-relaxed font-medium"
                          style={{ color: colors.textMuted }}
                        >
                          Book a personalized mock interview session with
                          industry experts to get real-time feedback and sharpen
                          your interview performance.
                        </p>
                      </div>
                    </div>

                    {/* Main Action Button */}
                    <button
                      className="w-full py-5 rounded-sm font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] border hover:bg-white hover:text-black"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.textMain,
                      }}
                    >
                      Book a mock interview session{" "}
                      <EastIcon sx={{ fontSize: 18 }} />
                    </button>
                  </div>
                )}
              </div>

              {/* Sessions Section */}
              <div className="flex-grow flex flex-col">
                <div
                  className="flex gap-8 mb-4 border-b"
                  style={{ borderColor: colors.border }}
                >
                  <button
                    onClick={() => setActiveTab("pending")}
                    className={`pb-4 px-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative ${
                      activeTab === "pending"
                        ? "text-orange-500"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {mode === "interviewer"
                      ? "Upcoming Interviews"
                      : "Pending Sessions"}
                    {activeTab === "pending" && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500"></div>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`pb-4 px-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative ${
                      activeTab === "completed"
                        ? "text-orange-500"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Completed Sessions
                    {activeTab === "completed" && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500"></div>
                    )}
                  </button>
                </div>

                {/* Empty State Area */}
                <div
                  className="flex-grow w-full border-2 border-dashed rounded-sm p-12 flex flex-col items-center justify-center min-h-[300px]"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: "rgba(255,255,255,0.01)",
                  }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.4em]"
                    style={{ color: colors.textMuted }}
                  >
                    No {activeTab} {mode} sessions found
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InterviewerDashboard;
