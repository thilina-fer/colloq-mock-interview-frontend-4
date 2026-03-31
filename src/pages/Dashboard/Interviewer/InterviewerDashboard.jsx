import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../theme/colors";
import Header from "../../../component/dashboard/candidate/Header";
import Footer from "../../../component/dashboard/candidate/Footer";
import InterviewerSidebar from "../../../component/dashboard/interviewer/InterviewerSidebar";
import InterviewerWallet from "../../../component/dashboard/interviewer/InterviewerWallet";
import InterviewerAvailability from "../../../component/dashboard/interviewer/InterviewerAvailability";
import InterviewerEditModal from "../../../component/dashboard/interviewer/InterviewerEditModal";
import InterviewerRequests from "../../../component/dashboard/interviewer/InterviewerRequests";
import ApprovedRequests from "../../../component/dashboard/interviewer/ApprovedRequests"; // 🎯 අලුතින් add කළා

// Icons
import CircularProgress from "@mui/material/CircularProgress";
import LockClockIcon from "@mui/icons-material/LockClock";

// Services
import { AuthService } from "../../../services/AuthService";
import { InterviewerService } from "../../../services/InterviewerService";
import toast from "react-hot-toast";

const InterviewerDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const timeoutRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const data = await AuthService.getCurrentUser();
      setUserData(data);
      if (data?.status?.toUpperCase() === "PENDING") {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(fetchProfile, 60000);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      if (error.response?.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
        AuthService.logout();
      } else {
        await fetchProfile();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      toast.error("Update failed", { id: loadingToast });
    }
  };

  if (!userData)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-black tracking-widest text-[10px] uppercase">
        <CircularProgress size={20} sx={{ color: colors.primary, mr: 2 }} />
        Loading Profile...
      </div>
    );

  if (userData.status?.toUpperCase() === "PENDING") {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: colors.background }}
      >
        <Header />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-lg w-full p-12 border-2 border-dashed border-orange-500/20 bg-black/80 backdrop-blur-md rounded-2xl text-center space-y-8 animate-in zoom-in">
            <LockClockIcon sx={{ fontSize: 40, color: colors.primary }} />
            <h2 className="text-2xl font-black uppercase text-white">
              Account <span className="text-orange-500">Pending</span>
            </h2>
            <p className="text-[11px] text-gray-400 uppercase tracking-widest">
              Your profile is currently under review.
            </p>
            <button
              onClick={() => AuthService.logout()}
              className="w-full py-4 bg-white/5 border border-white/5 text-[10px] text-white uppercase tracking-widest hover:bg-red-600/10 transition-all"
            >
              Sign Out
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col font-sans select-none"
      style={{ backgroundColor: colors.background }}
    >
      <Header />

      <main className="flex-grow w-full max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        {/* LEFT: SIDEBAR */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <InterviewerSidebar
            setCurrentView={setCurrentView}
            currentView={currentView}
            userData={userData}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </div>

        {/* RIGHT: CONTENT AREA */}
        <div className="flex-grow flex flex-col min-w-0">
          {currentView === "wallet" ? (
            <InterviewerWallet />
          ) : currentView === "availability" ? (
            <InterviewerAvailability />
          ) : (
            <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* 🎯 SECTION 1: PENDING REQUESTS */}
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-6">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                      New <span className="text-orange-500">Requests</span>
                    </h2>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                      Incoming interview sessions awaiting your approval
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">
                      Live Updates
                    </span>
                  </div>
                </div>
                <InterviewerRequests />
              </div>

              {/* 🎯 SECTION 2: APPROVED & CONFIRMED (Payment & Meeting Link) */}
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-6">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                      Confirmed <span className="text-green-500">Sessions</span>
                    </h2>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                      Monitor payments and access meeting links
                    </p>
                  </div>
                </div>
                <ApprovedRequests />
              </div>
            </div>
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
