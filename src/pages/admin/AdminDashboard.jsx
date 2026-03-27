import React, { useState } from "react";
import { colors } from "../../theme/colors";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Components
import AdminSidebar from "../../component/dashboard/admin/AdminSidebar";
import AdminOverview from "../../component/dashboard/admin/AdminOverview";
import InterviewerVerification from "../../component/dashboard/admin/InterviewerVerification";
import Logo from "../../component/Logo";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("overview");

  // දැනට තෝරාගෙන තියෙන view එක අනුව content එක පෙන්වීම
  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <AdminOverview />;
      case "verification":
        return <InterviewerVerification />;
      case "users":
        return (
          <div className="p-20 border border-dashed border-[#333] text-center uppercase text-[10px] font-black tracking-[0.3em] text-gray-600">
            User Management Table Coming Soon...
          </div>
        );
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ backgroundColor: colors.background }}
    >
      {/* Top Navigation Bar */}
      <header
        className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(10,10,10,0.8)",
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-gray-500 uppercase">
            Admin Session: Active
          </span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1600px] mx-auto p-6 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Section */}
        <div className="w-full lg:w-1/5">
          <AdminSidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-4/5">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
