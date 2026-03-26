// src/pages/dashboard/interviewer/InterviewerDashboard.jsx

// ... imports (no changes here)

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { colors } from "../../../theme/colors";

import Header from "../../../component/dashboard/candidate/Header";

import Footer from "../../../component/dashboard/candidate/Footer";

import InterviewerSidebar from "../../../component/dashboard/interviewer/InterviewerSidebar";

import InterviewerWallet from "../../../component/dashboard/interviewer/InterviewerWallet";

import InterviewerEditModal from "../../../component/dashboard/interviewer/InterviewerEditModal";

// Icons

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import EastIcon from "@mui/icons-material/East";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import EngineeringIcon from "@mui/icons-material/Engineering";

// Services

import { AuthService } from "../../../services/AuthService";

import { InterviewerService } from "../../../services/InterviewerService";

import toast from "react-hot-toast";

const InterviewerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [mode, setMode] = useState("interviewer");
  const [currentView, setCurrentView] = useState("dashboard");

  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await AuthService.getCurrentUser();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Session expired. Please login again.");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // UPDATE LOGIC - මෙතන තමයි වෙනස කළේ
  const handleProfileSave = async (
    profilePayload,
    imageFile,
    isUsernameChanged,
  ) => {
    const loadingToast = toast.loading("Saving changes...");
    try {
      /**
       * වැදගත්: ඔයාගේ InterviewerService.updateProfile(profileData, imageFile)
       * එක ඇතුළේ FormData එක හදනවා නම්, Dashboard එකේදී ආයෙත් FormData හදන්න එපා.
       * කෙලින්ම payload එකයි file එකයි pass කරන්න.
       */
      await InterviewerService.updateProfile(profilePayload, imageFile);

      toast.success("Profile updated successfully!", { id: loadingToast });

      if (isUsernameChanged) {
        toast("Username changed! Please log in again.", { icon: "⚠️" });
        setTimeout(() => {
          localStorage.removeItem("authToken");
          // window.location.href පාවිච්චි කිරීම වඩාත් සුදුසුයි සම්පූර්ණයෙන්ම reset වීමට
          window.location.href = "/login";
        }, 2000);
      } else {
        await fetchProfile(); // දත්ත re-fetch කරනවා
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Dashboard Update Error:", error);
      // Error එකේ ඇත්තම හේතුව පෙන්වන්න
      const errorMsg =
        error.response?.data?.message || error.message || "Update failed";
      toast.error(errorMsg, { id: loadingToast });
    }
  };

  if (!userData)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-black tracking-widest text-xs uppercase">
        Loading Profile...
      </div>
    );

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: colors.background }}
    >
      <Header />
      <main className="flex-grow w-full max-w-[1400px] mx-auto p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <InterviewerSidebar
            setCurrentView={setCurrentView}
            currentView={currentView}
            userData={userData}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </div>

        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          {currentView === "wallet" ? (
            <InterviewerWallet />
          ) : (
            <>
              {/* Practice Mode Header */}
              <div
                className="w-full p-8 border rounded-sm shadow-xl space-y-8"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="text-sm font-black uppercase tracking-[0.3em]"
                    style={{ color: colors.textMain }}
                  >
                    {" "}
                    Practice Mode{" "}
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
                      className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${mode === "interviewer" ? "bg-white text-black" : "text-gray-500 hover:text-gray-300"}`}
                    >
                      <EngineeringIcon sx={{ fontSize: 16, mr: 1 }} />{" "}
                      Interviewer
                    </button>
                    <button
                      onClick={() => setMode("candidate")}
                      className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${mode === "candidate" ? "bg-orange-600 text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                      <PersonSearchIcon sx={{ fontSize: 16, mr: 1 }} />{" "}
                      Candidate
                    </button>
                  </div>
                </div>

                {mode === "interviewer" ? (
                  <div
                    className="p-6 rounded-sm border border-dashed text-center"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <p
                      className="text-xs font-medium uppercase tracking-widest"
                      style={{ color: colors.textMuted }}
                    >
                      Welcome back,{" "}
                      <span style={{ color: colors.primary }}>
                        {userData.username}
                      </span>
                      . You are in Interviewer Mode.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-500">
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
                          Book a mock interview session with industry experts.
                        </p>
                      </div>
                    </div>
                    <button
                      className="w-full py-5 rounded-sm font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all border hover:bg-white hover:text-black"
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

              {/* Sessions Table Area */}
              <div className="flex-grow flex flex-col">
                <div
                  className="flex gap-8 mb-4 border-b"
                  style={{ borderColor: colors.border }}
                >
                  <button
                    onClick={() => setActiveTab("pending")}
                    className={`pb-4 px-2 font-black text-[10px] uppercase tracking-[0.2em] relative ${activeTab === "pending" ? "text-orange-500" : "text-gray-500 hover:text-gray-300"}`}
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
                    className={`pb-4 px-2 font-black text-[10px] uppercase tracking-[0.2em] relative ${activeTab === "completed" ? "text-orange-500" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    Completed Sessions
                    {activeTab === "completed" && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500"></div>
                    )}
                  </button>
                </div>
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
                    {" "}
                    No {activeTab} {mode} sessions found{" "}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <InterviewerEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default InterviewerDashboard;
