import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // 💡 SweetAlert import කරගන්න
import AvailabilityService from "../../../services/AvailabilityService";

const ConformedSlot = () => {
  const [publishedSlots, setPublishedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const data = await AvailabilityService.getAllAvailabilities();
      setPublishedSlots(data || []);
    } catch (error) {
      toast.error("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // 🗑️ Delete Confirmation Logic
  const handleDelete = async (id) => {
    if (!id) return;

    // 💡 SweetAlert2 Confirmation Dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this availability slot?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c", // 💡 Orange color (ඔයාගේ theme එකට ගැලපෙන්න)
      cancelButtonColor: "#333",
      confirmButtonText: "Yes, Delete it!",
      background: "#121212", // 💡 Dark theme background
      color: "#fff",
      customClass: {
        popup: "border border-white/10 rounded-xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const loadingToast = toast.loading("Deleting slot...");
        try {
          await AvailabilityService.deleteAvailability(id);
          toast.success("Slot deleted successfully", { id: loadingToast });
          fetchSlots(); // Table එක refresh කරනවා
        } catch (error) {
          // Backend එකෙන් එන 400 error message එක මෙතනදී පෙන්වනවා
          toast.error(error.message || "Delete failed", { id: loadingToast });
        }
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 h-full overflow-y-auto no-scrollbar">
      {/* Header Section */}
      <div className="flex justify-between items-center px-1 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-[10px] font-black uppercase text-white tracking-[0.3em]">
            Confirmed <span className="text-orange-500">Availability</span>
          </h3>
        </div>
        <button
          onClick={fetchSlots}
          className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-sm"
        >
          <RefreshIcon sx={{ fontSize: 18 }} />
        </button>
      </div>

      {/* Table Section */}
      <div className="border border-white/5 rounded-sm overflow-hidden bg-black/20">
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
                  className="p-20 text-center text-gray-700 animate-pulse"
                >
                  Syncing...
                </td>
              </tr>
            ) : publishedSlots.length > 0 ? (
              publishedSlots.map((s) => (
                <tr
                  key={s.availabilityId}
                  className="text-white hover:bg-white/[0.02]"
                >
                  <td className="p-5 font-black uppercase text-gray-400">
                    {s.date}
                  </td>
                  <td className="p-5 text-center text-orange-500 font-black">
                    {s.startTime} - {s.endTime}
                  </td>
                  <td className="p-5 text-center">
                    <span
                      className={`px-3 py-1 rounded text-[8px] font-black uppercase ${s.booked ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}
                    >
                      {s.booked ? "Booked" : "Available"}
                    </span>
                  </td>
                  <td className="p-5 text-right pr-8">
                    <button
                      onClick={() => handleDelete(s.availabilityId)}
                      className="p-2 text-gray-600 hover:text-red-500 transition-all"
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
                  className="p-20 text-center text-[10px] uppercase text-gray-800 italic font-black"
                >
                  No confirmed slots found.
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
