import React from "react";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex p-1.5 bg-black/40 border border-white/10 rounded-xl w-fit backdrop-blur-md">
      <button
        onClick={() => setActiveTab("add")}
        className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
          activeTab === "add"
            ? "bg-white text-black shadow-lg shadow-white/5"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        Add New Slot
      </button>
      <button
        onClick={() => setActiveTab("confirm")}
        className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
          activeTab === "confirm"
            ? "bg-orange-600 text-white shadow-lg shadow-orange-900/40"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        Confirm Slots
      </button>
    </div>
  );
};

export default TabNavigation;
