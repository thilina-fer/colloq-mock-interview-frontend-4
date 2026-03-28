import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../theme/colors";
import Header from "../../../component/dashboard/candidate/Header";
import Footer from "../../../component/dashboard/candidate/Footer";
import InterviewerSidebar from "../../../component/dashboard/interviewer/InterviewerSidebar";
import InterviewerWallet from "../../../component/dashboard/interviewer/InterviewerWallet";
import InterviewerEditModal from "../../../component/dashboard/interviewer/InterviewerEditModal";

// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CircularProgress from "@mui/material/CircularProgress";
import LockClockIcon from "@mui/icons-material/LockClock";

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

  // 💡 Polling පාලනය කිරීමට useRef පාවිච්චි කිරීම
  const timeoutRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const data = await AuthService.getCurrentUser();

      // ✅ වැදගත්ම Logic එක:
      // කලින් පෙන්වමින් හිටියේ PENDING screen එක නම් සහ දැන් status එක ACTIVE වෙලා නම්...
      if (
        userData?.status?.toUpperCase() === "PENDING" &&
        data?.status?.toUpperCase() === "ACTIVE"
      ) {
        toast.success("Account Approved! Logging out for security...", {
          duration: 5000,
          icon: "🎉",
        });

        // තත්පර 3කින් Logout කරලා Login page එකට යවනවා (Token refresh වෙන්න)
        setTimeout(() => {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }, 3000);

        return;
      }

      setUserData(data);

      // තාම Pending නම් විනාඩියකින් ආයේ check කරන්න schedule කරනවා
      if (data?.status?.toUpperCase() === "PENDING") {
        timeoutRef.current = setTimeout(fetchProfile, 60000);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchProfile();

    // Cleanup function
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // =============== UPDATE LOGIC ===============
  const handleProfileSave = async (
    profilePayload,
    imageFile,
    isUsernameChanged,
  ) => {
    const loadingToast = toast.loading("Saving changes...");
    try {
      await InterviewerService.updateProfile(profilePayload, imageFile);
      toast.success("Profile updated successfully!", { id: loadingToast });

      if (isUsernameChanged) {
        toast("Username changed! Please log in again.", { icon: "⚠️" });
        setTimeout(() => {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }, 2000);
      } else {
        await fetchProfile();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Dashboard Update Error:", error);
      const errorMsg =
        error.response?.data?.message || error.message || "Update failed";
      toast.error(errorMsg, { id: loadingToast });
    }
  };

  if (!userData)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-black tracking-widest text-[10px] uppercase">
        <div className="flex flex-col items-center gap-4">
          <CircularProgress size={20} sx={{ color: colors.primary }} />
          Loading Profile...
        </div>
      </div>
    );

  // 💡 PENDING STATUS ALERT
  if (userData.status?.toUpperCase() === "PENDING") {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: colors.background }}
      >
        <Header />
        <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full"></div>

          <div
            className="max-w-lg w-full p-12 border-2 border-dashed rounded-2xl text-center space-y-8 relative z-10 animate-in zoom-in duration-500"
            style={{
              borderColor: "rgba(255,102,0,0.2)",
              backgroundColor: "rgba(10,10,10,0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="relative flex justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-orange-500/10 blur-xl"></div>
              <div className="relative w-20 h-20 bg-orange-600/10 rounded-full flex items-center justify-center border border-orange-500/20">
                <LockClockIcon sx={{ fontSize: 35, color: colors.primary }} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-white">
                Account <span className="text-orange-500">Pending</span>
              </h2>
              <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full"></div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                Your profile is currently under review. <br />
                Once approved,{" "}
                <span className="text-orange-500 font-black">
                  you will be automatically logged out
                </span>{" "}
                to refresh your secure session.
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
              <p className="text-[9px] font-medium text-gray-600 uppercase tracking-widest text-orange-400 animate-pulse">
                Checking for approval status...
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  window.location.href = "/login";
                }}
                className="w-full py-4 bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white hover:bg-red-600/10 hover:border-red-600/20 transition-all rounded-sm"
              >
                Sign Out from System
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ACTIVE DASHBOARD
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
                    Practice <span className="text-orange-500">Mode</span>
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
                    . You are in {mode.toUpperCase()} Mode.
                  </p>
                </div>
              </div>

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
                  <div className="w-12 h-12 mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                    <CalendarMonthIcon
                      sx={{ color: "rgba(255,255,255,0.1)", fontSize: 24 }}
                    />
                  </div>
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
