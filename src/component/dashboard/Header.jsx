// src/components/dashboard/Header.jsx
import React from "react";
import Logo from "../../component/Logo";
import { colors } from "../../theme/color";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Header = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 md:h-20 bg-white border-b flex items-center justify-between px-4 md:px-8">
      {/* Logo */}
      <div className="flex items-center gap-2 scale-90 md:scale-100">
        <Logo />
      </div>

      <div className="hidden md:block w-1/3">
        <div className="relative group">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
            sx={{ fontSize: 20 }}
          />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-2 rounded-full border border-gray-100 outline-none focus:border-orange-500 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div
          className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-100 bg-gray-50 text-xs font-semibold"
          style={{ color: colors.gray.medium }}
        >
          <CalendarTodayIcon sx={{ fontSize: 16, color: colors.primary }} />
          {currentDate}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden sm:block">
            <p
              className="text-xs md:text-sm font-bold"
              style={{ color: colors.black }}
            >
              Thilina <span className="text-[10px] opacity-60">dev</span>
            </p>
            <p className="text-[10px] md:text-xs opacity-60 font-medium uppercase">
              Candidate
            </p>
          </div>
          <AccountCircleIcon
            className="text-orange-500"
            style={{ fontSize: 35 }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
