import React, { useState, useEffect } from "react";
import { colors } from "../../theme/color";
import Header from "../../component/dashboard/Header";
import UserInfo from "../../component/dashboard/UserInfo";
import CandidateHome from "../../component/dashboard/candidate/CandidateHome";
import CandidateSessions from "../../component/dashboard/candidate/CandidateSessions";
import CandidateAccount from "../../component/dashboard/candidate/CandidateAccount";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user)
    return <div className="p-20 text-center font-bold">Loading Profile...</div>;

  return (
    <div className="min-h-screen w-full bg-[#FDFDFD]">
      <Header />
      <main className="w-full flex justify-center pt-20">
        <div className="w-full max-w-7xl px-4 md:px-12">
          <UserInfo
            name={user.name}
            bio={user.bio}
            github={user.github}
            linkedin={user.linkedin}
          />

          <nav className="w-full bg-white border-b flex items-center gap-1 mb-8 overflow-x-auto no-scrollbar">
            {["Dashboard", "Sessions", "Account"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 border-b-4 font-bold transition-all text-sm ${activeTab === tab ? "border-orange-500 text-orange-500" : "border-transparent text-gray-400"}`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="pb-12 animate-contentFade">
            {activeTab === "Dashboard" && <CandidateHome />}
            {activeTab === "Sessions" && <CandidateSessions />}
            {activeTab === "Account" && (
              <CandidateAccount user={user} setUser={setUser} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default CandidateDashboard;
