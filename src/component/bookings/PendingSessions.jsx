import React, { useState, useEffect } from "react";
import BookingService from "../../services/BookingService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";
import toast from "react-hot-toast";

const PendingSessions = ({ currentUserId }) => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUserId) return;
      setIsLoading(true);
      try {
        // 🚀 Backend එකෙන් සියලුම Bookings ලබා ගැනීම
        const data = await BookingService.getCandidateBookings(currentUserId);

        // 🎯 Status එක PENDING_APPROVAL ඒවා පමණක් පෙරා ගැනීම
        const pending = data.filter(
          (b) => b.status === "PENDING_APPROVAL" || b.status === "PENDING",
        );
        setPendingBookings(pending);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load your pending sessions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [currentUserId]);

  if (isLoading) {
    return (
      <div className="w-full py-20 flex items-center justify-center border border-dashed border-white/5 rounded-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 animate-pulse">
          Syncing your sessions...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {pendingBookings.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {pendingBookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="group border border-white/10 bg-white/[0.02] p-6 rounded-sm transition-all duration-500 hover:border-orange-500/40 hover:bg-white/[0.04]"
            >
              {/* Header: Title & Status Badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <h4 className="text-white font-black uppercase text-sm tracking-tighter">
                    {booking.jobType || "Technical Interview Prep"}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                      Expert:
                    </span>
                    <span className="text-[9px] text-orange-500 font-black uppercase tracking-widest underline decoration-orange-500/30 underline-offset-4">
                      {booking.interviewerName}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-[8px] font-black uppercase tracking-[0.2em] rounded-full border border-orange-500/20">
                  Pending Approval
                </span>
              </div>

              {/* Middle: Date & Time Bar */}
              <div className="flex items-center gap-8 py-4 border-y border-white/5 bg-black/20 px-4 -mx-6">
                <div className="flex items-center gap-2">
                  <CalendarMonthIcon
                    className="text-orange-500"
                    sx={{ fontSize: 16 }}
                  />
                  <span className="text-white font-black text-[11px] tracking-tight">
                    {booking.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 border-l border-white/10 pl-8">
                  <AccessTimeIcon
                    className="text-orange-500"
                    sx={{ fontSize: 16 }}
                  />
                  <span className="text-white font-black text-[11px] tracking-tight">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
              </div>

              {/* Footer: Level & Action Info */}
              <div className="mt-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">
                    Selected Level
                  </p>
                  <p className="text-white text-[10px] font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded-sm inline-block">
                    {booking.levelName}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <p className="text-[8px] text-gray-600 font-black uppercase italic tracking-tighter">
                      Status Update
                    </p>
                    <p className="text-[9px] text-white/30 font-black uppercase tracking-widest">
                      Awaiting Expert
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                    <BoltIcon className="text-gray-800 text-sm animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-sm bg-black/10">
          <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.5em] mb-2">
            No Pending Sessions Found
          </p>
          <p className="text-gray-800 text-[8px] font-bold uppercase tracking-widest">
            Try booking an expert to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingSessions;
