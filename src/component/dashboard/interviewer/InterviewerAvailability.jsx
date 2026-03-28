import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import TabNavigation from "./TabNavigation";
import AddSlotView from "./AddSlotView";
import ConfirmSlotsView from "./ConfirmSlotsView";

const InterviewerAvailability = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [tempSlots, setTempSlots] = useState([]);

  const handleAddSlot = (newSlot) => {
    setTempSlots([...tempSlots, newSlot]);
  };

  const handleRemoveSlot = (id) => {
    setTempSlots(tempSlots.filter((s) => s.id !== id));
  };

  const handleSaveSuccess = () => {
    setTempSlots([]);
    setActiveTab("add");
  };

  return (
    // 💡 මුළු container එකම screen එකේ උසට (h-full) තියාගන්නවා
    <div className="w-full h-full flex flex-col gap-6 p-1 overflow-hidden">
      {/* Tab Navigation එක හැමවෙලේම උඩ පේන්න තියෙනවා (Fixed) */}
      <div className="shrink-0">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 💡 මෙන්න මේ Box එකට විතරයි scroll එක එකතු කළේ */}
      <div
        className="flex-grow border p-10 shadow-2xl rounded-sm flex flex-col overflow-y-auto no-scrollbar"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          maxHeight: "calc(100vh - 180px)", // viewport උසින් navigation වලට ඉඩ තියලා ඉතිරි හරිය scroll වෙනවා
        }}
      >
        {activeTab === "add" ? (
          <AddSlotView
            onAddSlot={handleAddSlot}
            tempSlots={tempSlots}
            onRemoveSlot={handleRemoveSlot}
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
