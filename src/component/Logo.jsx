import React from "react";
// Kalin api hadapu colors file eka import karaganna (Path eka hariyata balanna)
import { colors } from "../theme/colors";

const Logo = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center cursor-pointer select-none ${className}`}
      style={{
        fontFamily: "'Luckiest Guy', cursive",
        fontSize: "2.5rem",
        letterSpacing: "0.05em",
      }}
    >
      <div className="flex group transition-all duration-300 transform hover:scale-105">
        {/* Collo Part - Dark theme nisa meka Sudu pata (textMain) wenna oni */}
        <span
          style={{ color: colors.textMain }}
          className="group-hover:-rotate-2 transition-transform"
        >
          Collo
        </span>

        {/* Q Part - Orange pata (Primary) */}
        <span
          style={{ color: colors.primary }}
          className="group-hover:rotate-6 transition-transform inline-block drop-shadow-md"
        >
          Q
        </span>

        {/* Animated Dot - Orange pata (Primary) */}
        <span style={{ color: colors.primary }} className="animate-bounce ml-1">
          .
        </span>
      </div>
    </div>
  );
};

export default Logo;
