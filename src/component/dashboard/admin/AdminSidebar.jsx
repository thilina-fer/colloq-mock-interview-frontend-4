import React from "react";
import { colors } from "../../../theme/colors";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import LayersIcon from "@mui/icons-material/Layers"; // 💡 ලෙවල් සඳහා අලුත් Icon එකක්
import { AuthService } from "../../../services/AuthService";

const AdminSidebar = ({ currentView, setCurrentView }) => {
  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <DashboardIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: "users",
      label: "User Management",
      icon: <PeopleIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: "verification",
      label: "Interviewer Verify",
      icon: <VerifiedUserIcon sx={{ fontSize: 20 }} />,
    },
    // 💡 අලුතින් එකතු කළ Session Levels බට්න් එක
    {
      id: "levels",
      label: "Session Levels",
      icon: <LayersIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: "payouts",
      label: "Payout Requests",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: "reports",
      label: "Platform Reports",
      icon: <AssessmentIcon sx={{ fontSize: 20 }} />,
    },
  ];

  return (
    <div
      className="w-full h-full border rounded-xl p-6 flex flex-col shadow-sm sticky top-6"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <div className="mb-10 px-2">
        <h2 className="text-xl font-black tracking-tighter text-white">
          ColloQ <span className="text-orange-500">ADMIN</span>
        </h2>
        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">
          Control Center
        </p>
      </div>

      <nav className="flex-grow space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300
              ${
                currentView === item.id
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-900/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => AuthService.logout()}
        className="mt-10 w-full flex items-center gap-4 px-4 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all border border-red-500/20"
      >
        <LogoutIcon sx={{ fontSize: 20 }} /> Sign Out
      </button>
    </div>
  );
};

export default AdminSidebar;
