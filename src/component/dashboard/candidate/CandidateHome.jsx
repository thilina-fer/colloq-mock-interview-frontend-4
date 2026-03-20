import React from "react";
import { colors } from "../../../theme/color";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CandidateHome = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
      <h2 className="text-2xl font-black mb-2" style={{ color: colors.black }}>Ready to level up?</h2>
      <p className="text-gray-400 mb-8 font-medium">Schedule a mock interview with an industry expert.</p>
      
      <button 
        className="flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: colors.primary }}
      >
        <AddCircleOutlineIcon />
        Book New Session
      </button>
    </div>
  );
};

export default CandidateHome;