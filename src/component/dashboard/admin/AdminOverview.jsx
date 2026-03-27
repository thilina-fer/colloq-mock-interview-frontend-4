import React from "react";
import { colors } from "../../../theme/colors";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PaymentsIcon from "@mui/icons-material/Payments";

const StatCard = ({ title, value, subValue, icon, color }) => (
  <div
    className="p-8 border rounded-sm flex flex-col space-y-4 relative overflow-hidden group transition-all hover:-translate-y-1"
    style={{ backgroundColor: colors.surface, borderColor: colors.border }}
  >
    <div
      className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform"
      style={{ color }}
    >
      {icon}
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
      {title}
    </p>
    <h2 className="text-4xl font-black text-white">{value}</h2>
    <p className="text-[9px] font-bold text-green-500 uppercase flex items-center gap-1">
      <TrendingUpIcon sx={{ fontSize: 12 }} /> {subValue}
    </p>
  </div>
);

const AdminOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Candidates"
          value="842"
          subValue="+18% New Users"
          icon={<PeopleIcon sx={{ fontSize: 80 }} />}
          color={colors.primary}
        />
        <StatCard
          title="Total Interviewers"
          value="124"
          subValue="+5% New Approvals"
          icon={<PeopleIcon sx={{ fontSize: 80 }} />}
          color="#3b82f6"
        />
        <StatCard
          title="Total Sessions"
          value="2,140"
          subValue="45 Scheduled Today"
          icon={<VideoCallIcon sx={{ fontSize: 80 }} />}
          color="#10b981"
        />
        <StatCard
          title="Total Revenue"
          value="LKR 125K"
          subValue="+12% Payouts"
          icon={<PaymentsIcon sx={{ fontSize: 80 }} />}
          color="#f59e0b"
        />
      </div>

      {/* Recent Activity Table Placeholder */}
      <div
        className="p-8 border rounded-sm"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white mb-6">
          Real-time Platform Activity
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-500 font-bold text-[10px]">
                  USR
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-200">
                    New Candidate Registered
                  </p>
                  <p className="text-[9px] text-gray-500 uppercase">
                    2 minutes ago
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest cursor-pointer hover:underline">
                View Log
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
