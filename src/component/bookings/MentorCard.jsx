import React from "react";
import { colors } from "../../theme/color";
import StarsIcon from "@mui/icons-material/Stars";

const MentorCard = ({ mentor, onSelect }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 md:gap-5 shadow-sm hover:shadow-md transition-all group">
      {/* 1. Profile Picture */}
      <div className="w-20 h-20 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={`https://ui-avatars.com/api/?name=${mentor.name}&background=random&size=100`}
          alt={mentor.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* 2. Content Section */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="text-center md:text-left">
          <h4 className="text-base font-black text-gray-900 leading-tight">
            {mentor.name}
          </h4>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 mt-1">
            <p className="text-[12px] font-bold text-gray-500">
              {mentor.designation || "Senior Software Engineer"}
            </p>
            <p className="text-[11px] font-semibold text-gray-400 italic">
              {mentor.company || "Google / Meta"}
            </p>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mt-2">
            {(mentor.specializations || ["Frontend", "Backend"]).map(
              (spec, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[9px] font-bold text-gray-400 uppercase tracking-tighter"
                >
                  {spec}
                </span>
              ),
            )}
          </div>
        </div>

        {/* 3. Rating & Action - Mobile වලදී මේ දෙක දෙපැත්තට (justify-between) පේන්න හැදුවා */}
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-none border-gray-50">
          {/* Rating Box */}
          <div className="px-3 py-1.5 bg-[#E1F1FF] border border-[#BEE0FF] rounded-lg flex items-center gap-1.5 shrink-0">
            <StarsIcon sx={{ fontSize: 14, color: "#3B82F6" }} />
            <span className="text-[11px] font-black text-[#1E40AF]">
              {mentor.rating}
            </span>
          </div>

          <button
            onClick={() => onSelect(mentor)}
            className="flex-1 md:flex-none px-8 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-widest text-white shadow-md transition-all hover:bg-orange-500 active:scale-95 shrink-0"
            style={{ backgroundColor: colors.black }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
