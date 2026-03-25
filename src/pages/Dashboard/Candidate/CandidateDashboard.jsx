import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import Header from "../../../component/dashboard/candidate/Header";
import Footer from "../../../component/dashboard/candidate/Footer";
import CandidateSidebar from "../../../component/dashboard/candidate/CandidateSidebar";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: colors.background }}>
      {/* Top Header */}
      <Header />

      {/* Main Layout Area */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column - Sidebar (Takes up roughly 1/4 of space) */}
        <div className="w-full lg:w-1/4">
          <CandidateSidebar />
        </div>

        {/* Right Column - Main Content (Takes up roughly 3/4 of space) */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          
          {/* Top Banner Box */}
          <div 
            className="w-full p-6 border rounded-sm flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          >
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: colors.textMain }}>
                Ready for your next mock interview?
              </h2>
              <p className="text-sm font-medium mt-1" style={{ color: colors.textMuted }}>
                Book a session with an industry expert and level up your skills.
              </p>
            </div>
            
            {/* Book Now Button */}
            <button 
              className="px-8 py-3.5 rounded-sm font-bold uppercase tracking-widest text-white transition-transform active:scale-95 whitespace-nowrap"
              style={{ backgroundColor: colors.primary }}
              onMouseOver={(e) => e.target.style.backgroundColor = colors.primaryHover}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
            >
              Book Now
            </button>
          </div>

          {/* Sessions Area */}
          <div className="flex-grow flex flex-col">
            
            {/* Tabs */}
            <div className="flex gap-4 mb-4 border-b" style={{ borderColor: colors.border }}>
              <button 
                onClick={() => setActiveTab("pending")}
                className={`pb-3 px-4 font-bold text-sm uppercase tracking-widest transition-colors ${
                  activeTab === "pending" ? "border-b-2" : "opacity-50 hover:opacity-100"
                }`}
                style={{ 
                  color: activeTab === "pending" ? colors.primary : colors.textMain,
                  borderColor: activeTab === "pending" ? colors.primary : "transparent" 
                }}
              >
                Pending Sessions
              </button>
              
              <button 
                onClick={() => setActiveTab("completed")}
                className={`pb-3 px-4 font-bold text-sm uppercase tracking-widest transition-colors ${
                  activeTab === "completed" ? "border-b-2" : "opacity-50 hover:opacity-100"
                }`}
                style={{ 
                  color: activeTab === "completed" ? colors.primary : colors.textMain,
                  borderColor: activeTab === "completed" ? colors.primary : "transparent" 
                }}
              >
                Completed Sessions
              </button>
            </div>

            {/* Dashed Content Box (Wireframe ekema thiyena dashed border eka) */}
            <div 
              className="flex-grow w-full border-2 border-dashed rounded-sm p-8 flex items-center justify-center min-h-[400px]"
              style={{ borderColor: colors.border, backgroundColor: `${colors.surface}80` }} // slightly transparent surface
            >
              {/* Me dashed box eka athulata passe api data genath cards hari table hari danawa */}
              {activeTab === "pending" ? (
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.textMuted }}>
                  No pending sessions found
                </p>
              ) : (
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.textMuted }}>
                  No completed sessions found
                </p>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};

export default CandidateDashboard;