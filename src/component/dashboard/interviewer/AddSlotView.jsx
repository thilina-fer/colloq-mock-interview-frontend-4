import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../theme/styles/CalendarCustom.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import toast from "react-hot-toast";
import AvailabilityService from "../../../services/AvailabilityService"; // 💡 API call එකට

const AddSlotView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState("30");
  const [time, setTime] = useState({ hour: "09", minute: "00", period: "AM" });

  // 💡 මේක තමයි තාවකාලිකව slots තියාගන්න Array එක (Preview Table)
  const [tempSlots, setTempSlots] = useState([]);

  // 🕒 End time එක calculate කරන එක
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

  // 1️⃣ පියවර: Add Slot Button එක එබුවම Table එකට දත්ත එකතු කිරීම
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
      id: Date.now(), // Frontend එකේ delete කරන්න පාවිච්චි කරන ID එක
      date: dateStr,
      startTime: startTime,
      endTime: endTime,
      duration: duration + " Min",
    };

    setTempSlots([...tempSlots, newSlot]);
    toast.success("Slot added to preview table!");
  };

  // 2️⃣ පියවර: Preview Table එකෙන් slot එකක් අයින් කිරීම
  const removeTempSlot = (id) => {
    setTempSlots(tempSlots.filter((slot) => slot.id !== id));
    toast.error("Slot removed from preview");
  };

  // 3️⃣ පියවර: Confirm Slots Button එක එබුවම Database එකට සේව් කිරීම
  const handleConfirmAndSave = async () => {
    if (tempSlots.length === 0) return toast.error("No slots to confirm!");

    const loadingToast = toast.loading("Saving slots to database...");

    try {
      // Backend එක බලාපොරොත්තු වෙන Format එකට (DTO) දත්ත සකස් කිරීම
      const formattedData = tempSlots.map((slot) => {
        const d = new Date(slot.date);
        const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

        return {
          date: formattedDate,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isBooked: false,
          interviewerId: 1, // 💡 දැනට 1, පස්සේ Login user ගෙන් ගන්න
        };
      });

      // 🚀 API Call
      await AvailabilityService.saveBatch(formattedData);

      toast.success("All slots confirmed and saved to DB!", {
        id: loadingToast,
      });
      setTempSlots([]); // සේව් වුණාට පස්සේ table එක clear කරනවා
    } catch (error) {
      toast.error("Failed to save slots. Check backend.", { id: loadingToast });
    }
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-500">
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-black/20 border border-white/5 p-6 rounded-sm">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
            locale="en-US"
          />
        </div>

        <div className="flex flex-col justify-between py-2 space-y-8">
          <div className="space-y-6">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-sm p-4 text-xs font-bold text-white outline-none"
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>

            <div className="flex items-center gap-3">
              <input
                type="text"
                maxLength="2"
                value={time.hour}
                onChange={(e) => setTime({ ...time, hour: e.target.value })}
                className="w-16 bg-black border border-white/10 rounded-sm p-4 text-center text-sm font-black text-white"
              />
              <span className="text-orange-500 font-black text-xl">:</span>
              <input
                type="text"
                maxLength="2"
                value={time.minute}
                onChange={(e) => setTime({ ...time, minute: e.target.value })}
                className="w-16 bg-black border border-white/10 rounded-sm p-4 text-center text-sm font-black text-white"
              />
              <div className="flex flex-col border border-white/10 rounded-sm overflow-hidden">
                <button
                  onClick={() => setTime({ ...time, period: "AM" })}
                  className={`px-5 py-2 text-[9px] font-black ${time.period === "AM" ? "bg-orange-600 text-white" : "bg-black text-gray-600"}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setTime({ ...time, period: "PM" })}
                  className={`px-5 py-2 text-[9px] font-black ${time.period === "PM" ? "bg-orange-600 text-white" : "bg-black text-gray-600"}`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddSlot}
            className="w-full py-5 bg-white/5 border border-dashed border-white/20 hover:border-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-sm"
          >
            + Add Slot to Table
          </button>
        </div>
      </div>

      {/* Preview Table Section */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <h4 className="text-[9px] font-black uppercase text-gray-500 tracking-widest px-1">
          Selected Slots Preview ({tempSlots.length})
        </h4>
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
                  <tr key={s.id} className="text-white hover:bg-white/[0.02]">
                    <td className="p-4 font-black uppercase text-gray-400">
                      {s.date}
                    </td>
                    <td className="p-4 text-center text-orange-500 font-black italic">
                      {s.startTime} - {s.endTime}
                    </td>
                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => removeTempSlot(s.id)}
                        className="text-red-500/40 hover:text-red-500 transition-all"
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
                    className="p-16 text-center text-[10px] uppercase text-gray-800 italic font-black tracking-widest"
                  >
                    No slots added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4️⃣ පියවර: Confirm Button (Table එකට පිටින් තියෙන්නේ) */}
        {tempSlots.length > 0 && (
          <div className="flex justify-end pt-4">
            <button
              onClick={handleConfirmAndSave}
              className="flex items-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95"
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 18 }} /> Confirm Slots &
              Save to DB
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSlotView;
