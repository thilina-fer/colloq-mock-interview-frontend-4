import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import toast from "react-hot-toast";
import AvailabilityService from "../../../services/AvailabilityService"; // 💡 ඔයා හදපු service එක මෙතනට import කරන්න

const ConfirmSlotsView = ({ tempSlots, onSaveSuccess }) => {
  const handleFinalSave = async () => {
    if (tempSlots.length === 0) return toast.error("No slots to save.");

    const loadingToast = toast.loading("Publishing availability to system...");

    try {
      // 💡 Backend (InterviewerAvailabilityDTO) එක බලාපොරොත්තු වෙන විදිහට Data Format එක හදමු
      const formattedData = tempSlots.map((slot) => {
        // React-Calendar එකෙන් එන Date string එක (e.g. "Sat Mar 28 2026")
        // Backend එකේ LocalDate.parse එකට ගැලපෙන "YYYY-MM-DD" format එකට හරවනවා.
        const d = new Date(slot.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        return {
          date: formattedDate, // "2026-03-28"
          startTime: slot.startTime, // "09:00 AM"
          endTime: slot.endTime, // "09:30 AM"
          isBooked: false,
          interviewerId: 1, // 💡 දැනට 1 දාන්න, පස්සේ Login user ගේ ID එක මෙතනට පාස් කරන්න
        };
      });

      // 🚀 ඇත්තටම Backend එකට Data යවන එක (Axios call)
      const response = await AvailabilityService.saveBatch(formattedData);

      toast.success("Availability slots published successfully!", {
        id: loadingToast,
      });

      // 🔄 සාර්ථකව සේව් වුණාම Queue එක clear කරලා 'Add' tab එකට user ව යවනවා
      onSaveSuccess();
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error.message ||
          "Failed to publish availability. Please check Backend.",
        {
          id: loadingToast,
        },
      );
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

      {/* Table Area */}
      <div className="flex-grow border border-white/5 rounded-sm overflow-hidden bg-black/20 shadow-inner">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[9px] font-black uppercase text-gray-600 tracking-widest">
            <tr>
              <th className="p-5">Date</th>
              <th className="p-5 text-center">Time Window</th>
              <th className="p-5 text-center">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tempSlots.map((s) => (
              <tr
                key={s.id}
                className="text-[11px] font-bold text-gray-300 hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-5 font-black uppercase text-white">
                  {s.date}
                </td>
                <td className="p-5 text-center text-orange-500 font-black italic">
                  {s.startTime} - {s.endTime}
                </td>
                <td className="p-5 text-center text-gray-500 uppercase tracking-tighter">
                  {s.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Button */}
      <button
        onClick={handleFinalSave}
        className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white text-[12px] font-black uppercase tracking-[0.4em] rounded-sm shadow-xl shadow-orange-900/20 flex items-center justify-center gap-3 transition-all active:scale-95"
      >
        <SaveIcon sx={{ fontSize: 20 }} /> Publish Availability
      </button>
    </div>
  );
};

export default ConfirmSlotsView;
