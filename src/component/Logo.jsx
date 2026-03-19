// src/components/Logo.jsx
import React from "react";
import { colors } from "../theme/color";

const Logo = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center cursor-pointer select-none ${className}`}
      style={{ 
        fontFamily: "'Luckiest Guy', cursive",
        fontSize: '2.5rem', // Bold fonts walata poddak loku size ekak hodayi
        letterSpacing: '0.05em'
      }}
    >
      <div className="flex group transition-all duration-300 transform hover:scale-105">
        {/* Collo Part */}
        <span 
          style={{ 
            color: colors.black,
            textShadow: `2px 2px 0px ${colors.gray[100]}` 
          }} 
          className="group-hover:-rotate-2 transition-transform"
        >
          Collo
        </span>

        {/* Q Part */}
        <span 
          style={{ 
            color: colors.primary,
            textShadow: `2px 2px 0px ${colors.black}`
          }} 
          className="group-hover:rotate-6 transition-transform inline-block"
        >
          Q
        </span>

        {/* Animated Dot */}
        <span 
          style={{ color: colors.primary }} 
          className="animate-bounce ml-1"
        >
          .
        </span>
      </div>
    </div>
  );
};

export default Logo;