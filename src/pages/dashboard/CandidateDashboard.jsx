import React, { useState } from "react";
import { colors } from "../../theme/color";
import Header from "../../component/dashboard/Header";
import UserInfo from "../../component/dashboard/UserInfo";
import CandidateHome from "../../component/dashboard/candidate/CandidateHome";
import CandidateSessions from "../../component/dashboard/candidate/CandidateSessions";
import CandidateAccount from "../../component/dashboard/candidate/CandidateAccount";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Navigation Links
  const navLinks = ["Dashboard", "Sessions", "Account"];

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD]">
      <Header />
      <main className="w-full flex justify-center pt-20">
        <div className="w-full max-w-7xl px-4 md:px-12">
          <UserInfo />

          {/* Navigation Bar */}
          <nav className="w-full bg-white border-b flex items-center gap-1 mb-8 overflow-x-auto no-scrollbar">
            {navLinks.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 border-b-4 font-bold transition-all text-sm ${
                  activeTab === tab
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Dynamic Content Area */}
          <div className="pb-12 animate-contentFade">
            {activeTab === "Dashboard" && <CandidateHome />}
            {activeTab === "Sessions" && <CandidateSessions />}
            {activeTab === "Account" && <CandidateAccount />}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes contentFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-contentFade { animation: contentFade 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CandidateDashboard;
