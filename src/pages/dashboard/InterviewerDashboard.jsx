import React, { useState, useEffect } from "react";
import Header from "../../component/dashboard/Header";
import UserInfo from "../../component/dashboard/UserInfo";
import InterviewerHome from "../../component/dashboard/interviewer/InterviewerHome";
import InterviewerSessions from "../../component/dashboard/interviewer/InterviewerSessions";
import InterviewerAvailability from "../../component/dashboard/interviewer/InterviewerAvailability";
import CandidateAccount from "../../component/dashboard/candidate/CandidateAccount"; // Profile/Account එක Candidate ගේ එකම පාවිච්චි කළ හැකියි

const InterviewerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [user, setUser] = useState(null);

  // Navbar Links - ඔයා දුන්න Instructions වලට අනුව
  const navLinks = ["Dashboard", "Sessions", "Availability", "Account"];

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user)
    return (
      <div className="p-20 text-center font-black">
        Loading Interviewer Profile...
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD]">
      <Header userName={user.name} />

      <main className="w-full flex justify-center pt-20">
        <div className="w-full max-w-7xl px-4 md:px-12">
          {/* UserInfo එකට Interviewer දත්ත යවනවා */}
          <UserInfo
            name={user.name}
            bio={user.bio}
            github={user.github}
            linkedin={user.linkedin}
            role="INTERVIEWER"
          />

          {/* Navigation Bar - Candidate Dashboard එකේ විදිහටම */}
          <nav className="w-full bg-white border-b flex items-center gap-1 mb-8 overflow-x-auto no-scrollbar">
            {navLinks.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 border-b-4 font-bold transition-all text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Dynamic Content Area - තෝරාගත් Tab එක අනුව content එක පෙන්වයි */}
          <div className="pb-12 animate-contentFade">
            {activeTab === "Dashboard" && <InterviewerHome />}
            {activeTab === "Sessions" && <InterviewerSessions />}
            {activeTab === "Availability" && <InterviewerAvailability />}
            {activeTab === "Account" && (
              <CandidateAccount user={user} setUser={setUser} />
            )}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes contentFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-contentFade { animation: contentFade 0.5s ease-out forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default InterviewerDashboard;
