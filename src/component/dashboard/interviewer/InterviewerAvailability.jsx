import React from "react";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const InterviewerAvailability = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-contentFade">
      {/* Left: Settings Panel */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
            <CalendarMonthIcon />
          </div>
          <h4 className="font-black text-xl text-gray-800 mb-2">
            My Availability
          </h4>
          <p className="text-sm text-gray-400 font-medium mb-8">
            Set your open time slots so candidates can book you.
          </p>

          <button className="w-full py-4 rounded-2xl bg-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-500 transition-all shadow-xl shadow-orange-500/10 active:scale-95">
            <AddIcon /> Add Time Slot
          </button>
        </div>
      </div>

      {/* Right: Slots List Area */}
      <div className="lg:col-span-2 bg-white border border-dashed border-gray-200 rounded-[32px] p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-300 font-black text-sm uppercase tracking-widest">
            No availability slots found
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Click the button on the left to add your first slot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewerAvailability;
