import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import toast from "react-hot-toast";

const ConfirmSlotsView = ({ tempSlots, onSaveSuccess }) => {
  const handleFinalSave = async () => {
    if (tempSlots.length === 0) return toast.error("No slots to save.");
    const loadingToast = toast.loading("Saving slots...");
    try {
      // API call simulation
      console.log("Saving Batch:", tempSlots);
      await new Promise((r) => setTimeout(r, 1500));
      toast.success("Successfully published availability!", {
        id: loadingToast,
      });
      onSaveSuccess();
    } catch (e) {
      toast.error("Save failed", { id: loadingToast });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 flex flex-col h-full">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">
            Confirm <span className="text-orange-500">Slots</span>
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            Publish these slots to candidates
          </p>
        </div>
        <span className="text-[10px] font-black bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-orange-500">
          {tempSlots.length} Slots Selected
        </span>
      </div>

      <div className="flex-grow border border-white/5 rounded-sm overflow-hidden bg-black/20">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[9px] font-black uppercase text-gray-600">
            <tr>
              <th className="p-5">Date</th>
              <th className="p-5 text-center">Time Window</th>
              <th className="p-5 text-center">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tempSlots.map((s) => (
              <tr key={s.id} className="text-[11px] font-bold text-gray-300">
                <td className="p-5 font-black uppercase text-white">
                  {s.date}
                </td>
                <td className="p-5 text-center text-orange-500">
                  {s.startTime} - {s.endTime}
                </td>
                <td className="p-5 text-center text-gray-500">{s.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleFinalSave}
        className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-sm shadow-xl flex items-center justify-center gap-3"
      >
        <SaveIcon /> Publish Availability
      </button>
    </div>
  );
};

export default ConfirmSlotsView;
