import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../theme/styles/CalendarCustom.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import toast from "react-hot-toast";
import AvailabilityService from "../../../services/AvailabilityService";

const AddSlotView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState("30");
  const [time, setTime] = useState({ hour: "09", minute: "00", period: "AM" });
  const [tempSlots, setTempSlots] = useState([]);

  const calculateEndTime = (h, m, p, d) => {
    let hours = parseInt(h);
    let mins = parseInt(m);
    if (p === "PM" && hours !== 12) hours += 12;
    if (p === "AM" && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, mins + parseInt(d));
    let eh = date.getHours();
    let em = date.getMinutes();
    let ep = eh >= 12 ? "PM" : "AM";
    eh = eh % 12 || 12;
    return `${eh.toString().padStart(2, "0")}:${em.toString().padStart(2, "0")} ${ep}`;
  };

  const handleAddSlot = () => {
    if (!time.hour || !time.minute)
      return toast.error("Please enter a valid time!");
    const startTime = `${time.hour}:${time.minute} ${time.period}`;
    const endTime = calculateEndTime(
      time.hour,
      time.minute,
      time.period,
      duration,
    );
    const dateStr = selectedDate.toDateString();
    const newSlot = {
      id: Date.now(),
      date: dateStr,
      startTime: startTime,
      endTime: endTime,
      duration: duration + " Min",
    };
    setTempSlots([...tempSlots, newSlot]);
    toast.success("Slot added to preview table!");
  };

  const removeTempSlot = (id) => {
    setTempSlots(tempSlots.filter((slot) => slot.id !== id));
    toast.error("Slot removed from preview");
  };

  const handleConfirmAndSave = async () => {
    if (tempSlots.length === 0) return toast.error("No slots to confirm!");
    const loadingToast = toast.loading("Saving slots...");
    try {
      const formattedData = tempSlots.map((slot) => {
        const d = new Date(slot.date);
        const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        return {
          date: formattedDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isBooked: false,
          interviewerId: 1,
        };
      });
      await AvailabilityService.saveBatch(formattedData);
      toast.success("Saved to DB!", { id: loadingToast });
      setTempSlots([]);
    } catch (error) {
      toast.error("Failed to save.", { id: loadingToast });
    }
  };

  return (
    // Space-y-10 -> space-y-6 (vertical space අඩු කළා)
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      {/* Input Section - Gap 10 -> Gap 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Box - Padding 6 -> Padding 4 */}
        <div className="bg-black/20 border border-white/5 p-4 rounded-sm scale-[0.98]">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
            locale="en-US"
          />
        </div>

        {/* Form Box - Padding 2 -> Padding 1 */}
        <div className="flex flex-col justify-between py-1 space-y-4">
          <div className="space-y-4">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-sm p-3 text-[11px] font-bold text-white outline-none focus:border-orange-500"
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>

            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength="2"
                value={time.hour}
                onChange={(e) => setTime({ ...time, hour: e.target.value })}
                className="w-14 bg-black border border-white/10 rounded-sm p-3 text-center text-xs font-black text-white outline-none"
              />
              <span className="text-orange-500 font-black text-lg">:</span>
              <input
                type="text"
                maxLength="2"
                value={time.minute}
                onChange={(e) => setTime({ ...time, minute: e.target.value })}
                className="w-14 bg-black border border-white/10 rounded-sm p-3 text-center text-xs font-black text-white outline-none"
              />
              <div className="flex flex-col border border-white/10 rounded-sm overflow-hidden ml-1">
                <button
                  onClick={() => setTime({ ...time, period: "AM" })}
                  className={`px-4 py-1.5 text-[8px] font-black transition-colors ${time.period === "AM" ? "bg-orange-600 text-white" : "bg-black text-gray-600"}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setTime({ ...time, period: "PM" })}
                  className={`px-4 py-1.5 text-[8px] font-black transition-colors ${time.period === "PM" ? "bg-orange-600 text-white" : "bg-black text-gray-600"}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddSlot}
            className="w-full py-4 bg-white/5 border border-dashed border-white/20 hover:border-orange-500 text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all rounded-sm active:scale-95"
          >
            + Add Slot to Table
          </button>
        </div>
      </div>

      {/* Preview Table Section - Space-y-6 -> space-y-4 */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <h4 className="text-[8px] font-black uppercase text-gray-500 tracking-widest px-1">
          Queue Preview ({tempSlots.length})
        </h4>
        <div className="border border-white/5 rounded-sm overflow-hidden bg-black/10 shadow-inner">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[8px] font-black uppercase text-gray-600 tracking-widest">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Time Range</th>
                <th className="p-3 text-right pr-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[10px] font-bold">
              {tempSlots.length > 0 ? (
                tempSlots.map((s) => (
                  <tr
                    key={s.id}
                    className="text-white hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-3 font-black uppercase text-gray-400">
                      {s.date}
                    </td>
                    <td className="p-3 text-center text-orange-500 font-black italic">
                      {s.startTime} - {s.endTime}
                    </td>
                    <td className="p-3 text-right pr-5">
                      <button
                        onClick={() => removeTempSlot(s.id)}
                        className="text-red-500/30 hover:text-red-500 transition-colors"
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="p-10 text-center text-[9px] uppercase text-gray-800 italic font-black tracking-widest opacity-50"
                  >
                    No slots added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {tempSlots.length > 0 && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleConfirmAndSave}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95"
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 16 }} /> Confirm & Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSlotView;
