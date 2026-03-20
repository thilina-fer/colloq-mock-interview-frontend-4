// src/components/dashboard/NavigationBar.jsx
import React, { useState } from "react";
import { colors } from "../../theme/color";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import HistoryIcon from "@mui/icons-material/History";
import RouteIcon from "@mui/icons-material/Route";
import ChatIcon from "@mui/icons-material/Chat";

const NavigationBar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navLinks = [
    { id: "dashboard", name: "Dashboard", icon: <SpaceDashboardIcon /> },
    { id: "practice", name: "Practice", icon: <VideoCameraBackIcon /> },
    { id: "history", name: "History", icon: <HistoryIcon /> },
    { id: "roadmap", name: "Roadmap", icon: <RouteIcon /> },
    { id: "chat", name: "Community Chat", icon: <ChatIcon /> },
  ];

  return (
    <nav className="w-full bg-white border-b flex items-center md:justify-center gap-1 overflow-x-auto no-scrollbar px-2 mb-6">
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => setActiveTab(link.id)}
          className={`flex-shrink-0 px-4 md:px-6 py-4 border-b-2 md:border-b-4 flex items-center gap-2 font-bold transition-all text-xs md:text-sm ${
            activeTab === link.id
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-gray-500"
          }`}
        >
          <span className="scale-90">{link.icon}</span>
          {link.name}
        </button>
      ))}
    </nav>
  );
};

export default NavigationBar;
