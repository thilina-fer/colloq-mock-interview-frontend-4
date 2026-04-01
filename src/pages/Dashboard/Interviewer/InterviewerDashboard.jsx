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
import ApprovedRequests from "../../../component/dashboard/interviewer/ApprovedRequests";

// Icons
import CircularProgress from "@mui/material/CircularProgress";
import LockClockIcon from "@mui/icons-material/LockClock";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

// Services
import { AuthService } from "../../../services/AuthService";
import { InterviewerService } from "../../../services/InterviewerService";
import { WalletService } from "../../../services/WalletService"; 
import toast from "react-hot-toast";

const InterviewerDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null); 
  const [currentView, setCurrentView] = useState("dashboard");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const timeoutRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const data = await AuthService.getCurrentUser();
      setUserData(data);

      if (data) {
        getWalletBalance();
      }

      if (data?.status?.toUpperCase() === "PENDING") {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(fetchProfile, 60000);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const getWalletBalance = async () => {
    try {
      const res = await WalletService.getMyWallet();
      // 🎯 API එකෙන් APIResponse එකක් එන නිසා res.data set කරන්න
      setWalletData(res.data);
    } catch (error) {
      console.error("Wallet Fetch Error:", error);
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
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <InterviewerSidebar
            setCurrentView={setCurrentView}
            currentView={currentView}
            userData={userData}
            onEditClick={() => setIsEditModalOpen(true)}
          />
        </div>

        <div className="flex-grow flex flex-col min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl backdrop-blur-md flex items-center justify-between group hover:border-orange-500/30 transition-all">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Available Balance
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl font-black text-white">
                    {/* 🎯 Safe navigation used here to prevent crash */}
                    {walletData?.balance != null
                      ? walletData.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </h3>
                  <span className="text-[9px] font-black text-orange-500 uppercase">
                    LKR
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                <AccountBalanceWalletIcon />
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl backdrop-blur-md flex items-center justify-between group hover:border-green-500/30 transition-all">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Profile Status
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">
                    {userData.status || "ACTIVE"}
                  </h3>
                </div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                <EventAvailableIcon />
              </div>
            </div>
          </div>

          <div className="flex-grow">
            {currentView === "wallet" ? (
              <InterviewerWallet />
            ) : currentView === "availability" ? (
              <InterviewerAvailability />
            ) : (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex gap-8 border-b border-white/5 mb-8">
                  <button className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 border-b-2 border-orange-500">
                    Interview Sessions
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white">
                      New <span className="text-orange-500">Requests</span>
                    </h2>
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                      Incoming sessions awaiting your response
                    </p>
                  </div>
                  <InterviewerRequests />
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col space-y-1 pt-6 border-t border-white/5">
                    <h2 className="text-xl font-black uppercase tracking-tight text-white">
                      Confirmed <span className="text-green-500">Sessions</span>
                    </h2>
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                      Approved sessions with payment tracking
                    </p>
                  </div>
                  <ApprovedRequests />
                </div>
              </div>
            )}
          </div>
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