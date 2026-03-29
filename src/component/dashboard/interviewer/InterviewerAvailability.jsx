import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import TabNavigation from "./TabNavigation";
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
    // මුළු container එකම screen එකේ උසට (h-full) තියාගන්නවා
    <div className="w-full h-full flex flex-col gap-6 p-1 overflow-hidden">
      {/* Tab Navigation (Fixed Header) */}
      <div className="shrink-0">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Scrollable Content Area */}
      <div
        className="flex-grow border p-10 shadow-2xl rounded-sm flex flex-col overflow-y-auto no-scrollbar"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          maxHeight: "calc(100vh - 180px)", // Viewport එකෙන් Nav එකට ඉඩ තියලා ඉතිරි කොටස scroll වෙනවා
        }}
      >
        {activeTab === "add" ? (
          <AddSlotView
            onAddSlot={handleAddSlot}
            tempSlots={tempSlots}
            onRemoveSlot={handleRemoveSlot}
            // 💡 මම එකතු කරපු change එක: මේකෙන් තමයි 'Review & Confirm' බට්න් එක වැඩ කරන්නේ
            onGoToConfirm={() => setActiveTab("confirm")}
          />
        ) : (
          <ConfirmSlotsView
            tempSlots={tempSlots}
            onSaveSuccess={handleSaveSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewerAvailability;
