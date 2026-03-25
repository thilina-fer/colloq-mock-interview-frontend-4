import React from "react";
import { colors } from "../../../theme/colors";

const Footer = () => {
  return (
    <footer 
      className="w-full py-6 mt-auto border-t text-center text-xs font-bold tracking-widest uppercase"
      style={{ backgroundColor: colors.background, borderColor: colors.border, color: colors.textMuted }}
    >
      © {new Date().getFullYear()} ColloQ Platform. All Rights Reserved.
    </footer>
  );
};

export default Footer;