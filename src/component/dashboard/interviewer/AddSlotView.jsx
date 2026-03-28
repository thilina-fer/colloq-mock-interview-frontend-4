import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../theme/styles/CalendarCustom.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import toast from "react-hot-toast"; // 💡 Toast සඳහා අනිවාර්යයි

const AddSlotView = ({ onAddSlot, tempSlots, onRemoveSlot, onGoToConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState("30");
  const [time, setTime] = useState({ hour: "09", minute: "00", period: "AM" });

  // 🕒 End time එක auto calculate කරන function එක
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

  const triggerAdd = () => {
    // පැය සහ මිනිත්තු හිස්දැයි බැලීම
    if (!time.hour || !time.minute) {
      return toast.error("Please enter a valid time!");
    }

    const startTime = `${time.hour}:${time.minute} ${time.period}`;
    const dateStr = selectedDate.toDateString();

    // 🚫 එකම දවසේ එකම වෙලාව දෙපාරක් add කිරීම වැළැක්වීම
    const isDuplicate = tempSlots.some(
      (s) => s.date === dateStr && s.startTime === startTime,
    );

    if (isDuplicate) {
      return toast.error("This slot is already in your preview table!", {
        style: { borderRadius: "4px", background: "#333", color: "#fff" },
      });
    }

    // Slot එක array එකට එකතු කිරීම
    onAddSlot({
      id: Date.now(),
      date: dateStr,
      startTime: startTime,
      endTime: calculateEndTime(time.hour, time.minute, time.period, duration),
      duration: duration + " Min",
    });

    // ✅ සාර්ථක Toast message එක
    toast.success(`Slot added: ${startTime}`, {
      duration: 2000,
      style: {
        borderRadius: "4px",
        background: "#1a1a1a",
        color: "#fff",
        border: "1px solid rgba(255, 102, 0, 0.3)",
        fontSize: "12px",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    });
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-500">
      {/* --- SECTION 1: INPUT CONTROLS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Calendar Box */}
        <div className="bg-black/20 border border-white/5 p-6 rounded-sm shadow-inner overflow-hidden">
          <label className="text-[10px] font-black uppercase text-gray-600 tracking-widest mb-4 block ml-1">
            Select Date
          </label>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
            locale="en-US"
          />
        </div>

        {/* Form Box */}
        <div className="flex flex-col justify-between py-2">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1 block">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-sm p-4 text-xs font-bold text-white outline-none focus:border-orange-500 transition-all cursor-pointer shadow-lg"
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
                <option value="60">60 Minutes</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1 block">
                Time Selector
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  maxLength="2"
                  value={time.hour}
                  onChange={(e) => setTime({ ...time, hour: e.target.value })}
                  className="w-16 bg-black border border-white/10 rounded-sm p-4 text-center text-sm font-black text-white outline-none focus:border-orange-500 shadow-lg"
                  placeholder="09"
                />
                <span className="text-orange-500 font-black text-xl">:</span>
                <input
                  type="text"
                  maxLength="2"
                  value={time.minute}
                  onChange={(e) => setTime({ ...time, minute: e.target.value })}
                  className="w-16 bg-black border border-white/10 rounded-sm p-4 text-center text-sm font-black text-white outline-none focus:border-orange-500 shadow-lg"
                  placeholder="00"
                />

                <div className="flex flex-col border border-white/10 rounded-sm overflow-hidden shadow-2xl">
                  <button
                    onClick={() => setTime({ ...time, period: "AM" })}
                    className={`px-5 py-2 text-[9px] font-black transition-all ${time.period === "AM" ? "bg-orange-600 text-white" : "bg-black text-gray-600 hover:text-white"}`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setTime({ ...time, period: "PM" })}
                    className={`px-5 py-2 text-[9px] font-black transition-all ${time.period === "PM" ? "bg-orange-600 text-white" : "bg-black text-gray-600 hover:text-white"}`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={triggerAdd}
            className="w-full py-5 border border-dashed border-white/20 hover:border-orange-500/50 hover:text-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all mt-8 rounded-sm active:scale-[0.98] shadow-lg"
          >
            + Add Slot to Preview Table
          </button>
        </div>
      </div>

      {/* --- SECTION 2: QUEUE PREVIEW TABLE --- */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-[9px] font-black uppercase text-gray-500 tracking-widest">
            Queue Preview ({tempSlots.length})
          </h4>
        </div>

        <div className="border border-white/5 rounded-sm overflow-hidden bg-black/10 shadow-inner">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[9px] font-black uppercase text-gray-600 tracking-widest">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Time Range</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[11px] font-bold">
              {tempSlots.length > 0 ? (
                tempSlots.map((s) => (
                  <tr
                    key={s.id}
                    className="text-white hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-4 font-black uppercase tracking-tighter text-gray-400 group-hover:text-white transition-colors">
                      {s.date}
                    </td>
                    <td className="p-4 text-center text-orange-500 font-black">
                      {s.startTime} - {s.endTime}
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => onRemoveSlot(s.id)}
                        className="p-2 bg-red-500/5 hover:bg-red-500/20 text-red-500/40 hover:text-red-500 rounded-lg transition-all border border-transparent hover:border-red-500/10"
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="p-20 text-center text-[10px] font-black uppercase text-gray-800 tracking-[0.4em] italic opacity-40"
                  >
                    Queue is empty. Select slots above to populate.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- SECTION 3: PROCEED BUTTON --- */}
        {tempSlots.length > 0 && (
          <div className="flex justify-end pt-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <button
              onClick={onGoToConfirm}
              className="group flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-orange-900/20 active:scale-95"
            >
              Review & Confirm Slots
              <ArrowForwardIcon
                className="group-hover:translate-x-1 transition-transform"
                sx={{ fontSize: 18 }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSlotView;
