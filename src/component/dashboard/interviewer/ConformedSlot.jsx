import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import toast from "react-hot-toast";
import AvailabilityService from "../../../services/AvailabilityService";

const ConformedSlot = () => {
  const [publishedSlots, setPublishedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const data = await AvailabilityService.getAllAvailabilities();
      console.log("Full Data from DB:", data); // 💡 Console එකේ බලන්න Data එන හැටි
      setPublishedSlots(data || []);
    } catch (error) {
      toast.error("Failed to fetch slots from database");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return toast.error("Invalid ID");
    const loadingToast = toast.loading("Deleting slot...");
    try {
      await AvailabilityService.deleteAvailability(id);
      toast.success("Slot deleted from system", { id: loadingToast });
      fetchSlots();
    } catch (error) {
      toast.error("Delete failed", { id: loadingToast });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 h-full overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center px-1 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-[10px] font-black uppercase text-white tracking-[0.3em]">
            Confirmed <span className="text-orange-500">Availability</span>
          </h3>
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-1">
            Live slots visible to candidates
          </p>
        </div>
        <button
          onClick={fetchSlots}
          className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-sm transition-all"
        >
          <RefreshIcon sx={{ fontSize: 18 }} />
        </button>
      </div>

      <div className="border border-white/5 rounded-sm overflow-hidden bg-black/20 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[9px] font-black uppercase text-gray-600 tracking-widest border-b border-white/5">
            <tr>
              <th className="p-5">Date</th>
              <th className="p-5 text-center">Time Range</th>
              <th className="p-5 text-center">Status</th>
              <th className="p-5 text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[11px] font-bold">
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-20 text-center text-gray-700 uppercase font-black tracking-[0.4em] animate-pulse"
                >
                  Syncing with Database...
                </td>
              </tr>
            ) : publishedSlots.length > 0 ? (
              publishedSlots.map((s, index) => (
                <tr
                  key={s.availabilityId || index}
                  className="text-white hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="p-5 font-black uppercase text-gray-400 group-hover:text-gray-200">
                    {/* 💡 මෙතන s.date ලෙසම තිබිය යුතුයි */}
                    {s.date || "No Date"}
                  </td>
                  <td className="p-5 text-center text-orange-500 font-black italic tracking-tighter">
                    {/* 💡 මෙතන s.startTime සහ s.endTime පරීක්ෂා කරන්න */}
                    {s.startTime || "-"} - {s.endTime || "-"}
                  </td>
                  <td className="p-5 text-center">
                    <span
                      className={`px-3 py-1 rounded text-[8px] font-black uppercase tracking-tighter ${s.booked || s.isBooked ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-green-500/10 text-green-500 border border-green-500/20"}`}
                    >
                      {s.booked || s.isBooked ? "Booked" : "Available"}
                    </span>
                  </td>
                  <td className="p-5 text-right pr-8">
                    <button
                      onClick={() => handleDelete(s.availabilityId)}
                      className="p-2 text-gray-600 hover:text-red-500 transition-all active:scale-90"
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 20 }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-20 text-center text-[10px] font-black uppercase text-gray-800 tracking-[0.4em] italic opacity-40"
                >
                  No confirmed slots found in database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConformedSlot;
