import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import Header from "../../../component/dashboard/candidate/Header";
import Footer from "../../../component/dashboard/candidate/Footer";
import CandidateSidebar from "../../../component/dashboard/candidate/CandidateSidebar";
import InterviewerSelectionModal from "../../../component/bookings/InterviewerSelectionModal"; // 💡 Modal එක

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");

  // 💡 Modal එක පාලනය කරන State එක
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // 💡 Interviewer කෙනෙක්ව Select කළාම මොකද වෙන්නේ කියලා මෙතන ලියන්න පුළුවන්
  const handleInterviewerSelection = (interviewer) => {
    console.log("Selected Interviewer:", interviewer);
    // මෙතනදී ඕනේ නම් අමතර logic එකක් දාන්න පුළුවන්,
    // හැබැයි දැනට Modal එක ඇතුළෙම Confirmation Step එක තියෙන නිසා මේක props විදිහට පාස් කරමු.
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: colors.background }}
    >
      {/* Top Header */}
      <Header />

      {/* Main Layout Area */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column - Sidebar */}
        <div className="w-full lg:w-1/4">
          {/* 💡 Sidebar එකට Modal එක open කරන function එක පාස් කරනවා */}
          <CandidateSidebar
            setCurrentView={() => setIsBookingModalOpen(true)}
          />
        </div>

        {/* Right Column - Main Content */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          <div className="flex-grow flex flex-col">
            {/* Tabs Section */}
            <div
              className="flex gap-4 mb-4 border-b"
              style={{ borderColor: colors.border }}
            >
              <button
                onClick={() => setActiveTab("pending")}
                className={`pb-3 px-4 font-bold text-sm uppercase tracking-widest transition-colors ${
                  activeTab === "pending"
                    ? "border-b-2"
                    : "opacity-50 hover:opacity-100"
                }`}
                style={{
                  color:
                    activeTab === "pending" ? colors.primary : colors.textMain,
                  borderColor:
                    activeTab === "pending" ? colors.primary : "transparent",
                }}
              >
                Pending Sessions
              </button>

              <button
                onClick={() => setActiveTab("completed")}
                className={`pb-3 px-4 font-bold text-sm uppercase tracking-widest transition-colors ${
                  activeTab === "completed"
                    ? "border-b-2"
                    : "opacity-50 hover:opacity-100"
                }`}
                style={{
                  color:
                    activeTab === "completed"
                      ? colors.primary
                      : colors.textMain,
                  borderColor:
                    activeTab === "completed" ? colors.primary : "transparent",
                }}
              >
                Completed Sessions
              </button>
            </div>

            {/* Dashed Content Box (Sessions List) */}
            <div
              className="flex-grow w-full border-2 border-dashed rounded-sm p-8 flex items-center justify-center min-h-[400px]"
              style={{
                borderColor: colors.border,
                backgroundColor: `${colors.surface}80`,
              }}
            >
              {activeTab === "pending" ? (
                <p
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: colors.textMuted }}
                >
                  No pending sessions found
                </p>
              ) : (
                <p
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: colors.textMuted }}
                >
                  No completed sessions found
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* 💡 --- BOOKING POP-UP MODAL CALL --- */}
      <InterviewerSelectionModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onInterviewerSelect={handleInterviewerSelection}
      />
    </div>
  );
};

export default CandidateDashboard;
