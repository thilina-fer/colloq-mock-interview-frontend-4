import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import AddSlotView from "./AddSlotView";
import ConfirmSlotsView from "./ConformedSlot";

const InterviewerAvailability = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [tempSlots, setTempSlots] = useState([]);

  // 1. Queue එකට අලුත් Slot එකක් ඇඩ් කිරීම
  const handleAddSlot = (newSlot) => {
    setTempSlots([...tempSlots, newSlot]);
  };

  // 2. Queue එකෙන් Slot එකක් අයින් කිරීම
  const handleRemoveSlot = (id) => {
    setTempSlots(tempSlots.filter((s) => s.id !== id));
  };

  // 3. Backend එකට සාර්ථකව සේව් වුණාම ක්‍රියාත්මක වන function එක
  const handleSaveSuccess = () => {
    setTempSlots([]); // Queue එක clear කරනවා
    setActiveTab("add"); // ආපහු මුල් tab එකට යවනවා
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-1 overflow-hidden">
      {/* --- INLINE TAB NAVIGATION (දැන් මේක මේ file එක ඇතුළෙමයි තියෙන්නේ) --- */}
      <div className="shrink-0 flex justify-center lg:justify-start">
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
      </div>

      {/* --- CONTENT AREA --- */}
      <div
        className="flex-grow border p-8 shadow-2xl rounded-sm flex flex-col overflow-y-auto no-scrollbar"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          maxHeight: "calc(100vh - 180px)",
        }}
      >
        {activeTab === "add" ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AddSlotView
              onAddSlot={handleAddSlot}
              tempSlots={tempSlots}
              onRemoveSlot={handleRemoveSlot}
              onGoToConfirm={() => setActiveTab("confirm")}
            />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ConfirmSlotsView
              tempSlots={tempSlots}
              onSaveSuccess={handleSaveSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewerAvailability;
