import React, { useState, useEffect } from "react";
import BookingService from "../../../services/BookingService"; // 🎯 path එක check කරගන්න
import toast from "react-hot-toast";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PaymentIcon from "@mui/icons-material/Payment";

const ApprovedRequests = () => {
  const [approvedList, setApprovedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await BookingService.getApprovedBookings();
        setApprovedList(res.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Error loading sessions.");
      } finally {
        setLoading(false);
      }
    };
    fetchApproved();
  }, []);

  if (loading)
    return (
      <div className="py-10 flex items-center justify-center border border-dashed border-white/5 rounded-xl bg-white/[0.01]">
        <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin mr-3"></div>
        <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">
          Syncing Confirmed Sessions...
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      {approvedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approvedList.map((item) => {
            // ✅ Backend එකෙන් 'paid' හෝ 'isPaid' ලෙස එන ඕනෑම අගයක් පරීක්ෂා කිරීම
            const isSessionPaid = item.paid === true || item.isPaid === true;

            return (
              <div
                key={item.bookingId}
                className="relative overflow-hidden bg-white/[0.02] border border-white/5 p-6 rounded-2xl group hover:border-green-500/30 transition-all duration-500 backdrop-blur-md"
              >
                {/* Subtle Glow */}
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-green-500/5 blur-2xl rounded-full group-hover:bg-green-500/10 transition-all"></div>

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full border border-white/10 overflow-hidden bg-white/5 p-[1px]">
                      <img
                        src={item.candidateProfilePic || "/default-avatar.png"}
                        className="w-full h-full object-cover rounded-full"
                        alt="Candidate"
                      />
                    </div>
                    <div>
                      <p className="text-white font-black text-xs uppercase tracking-tight group-hover:text-green-400 transition-colors">
                        {item.candidateName}
                      </p>
                      <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                        {item.date} • {item.startTime} - {item.endTime}
                      </p>
                    </div>
                  </div>

                  {/* 🎯 Payment Status Badge */}
                  <div className="flex flex-col items-end">
                    {isSessionPaid ? (
                      <span className="text-[7px] font-black text-green-400 uppercase tracking-[0.2em] bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20 shadow-[0_0_15px_-5px_rgba(34,197,94,0.4)]">
                        PAID & CONFIRMED
                      </span>
                    ) : (
                      <span className="text-[7px] font-black text-orange-400 uppercase tracking-[0.2em] bg-orange-500/5 px-2 py-1 rounded-full border border-orange-500/10 animate-pulse">
                        AWAITING PAYMENT
                      </span>
                    )}
                  </div>
                </div>

                {/* 🎯 Action Button Section */}
                <div className="pt-4 border-t border-white/5">
                  {isSessionPaid ? (
                    <a
                      href={item.meetingLink || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 bg-green-600 hover:bg-green-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-900/20"
                    >
                      <VideoCallIcon sx={{ fontSize: 16 }} /> Join Interview Now
                    </a>
                  ) : (
                    <div className="w-full py-3 bg-white/[0.03] text-gray-600 text-[8px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded-xl border border-white/5">
                      <PaymentIcon sx={{ fontSize: 14, opacity: 0.5 }} /> Link
                      will be active after payment
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 border border-dashed border-white/5 text-center rounded-2xl bg-white/[0.01]">
          <p className="text-gray-700 text-[9px] font-black uppercase tracking-[0.4em] text-center">
            No Confirmed Sessions Yet
          </p>
        </div>
      )}
    </div>
  );
};

export default ApprovedRequests;
