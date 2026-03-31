import React, { useState, useEffect } from "react";
import BookingService from "../../../services/BookingService"; // path එක check කරගන්න
import toast from "react-hot-toast";

const ApprovedRequests = () => {
  const [approvedList, setApprovedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await BookingService.getApprovedBookings();
        setApprovedList(res.data || []);
      } catch (err) {
        toast.error("Error loading sessions.");
      } finally {
        setLoading(false);
      }
    };
    fetchApproved();
  }, []);

  if (loading)
    return (
      <div className="animate-pulse text-[10px] text-gray-500">
        Loading Sessions...
      </div>
    );

  return (
    <div className="space-y-4">
      <h3 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
        Confirmed Sessions
      </h3>

      {approvedList.length > 0 ? (
        approvedList.map((item) => (
          <div
            key={item.bookingId}
            className="bg-white/[0.02] border border-white/5 p-5 rounded-sm group hover:border-green-500/30 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.candidateProfilePic || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full border border-white/10"
                  alt="Candidate"
                />
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-tight">
                    {item.candidateName}
                  </p>
                  <p className="text-[9px] text-gray-500 font-bold uppercase">
                    {item.date} @ {item.startTime}
                  </p>
                </div>
              </div>

              {/* 🎯 Payment Status Badge */}
              <div className="flex flex-col items-end gap-1">
                {item.isPaid ? (
                  <span className="text-[8px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-sm border border-green-500/20">
                    Payment Successful
                  </span>
                ) : (
                  <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-2 py-1 rounded-sm border border-orange-500/20 animate-pulse">
                    Waiting for Payment
                  </span>
                )}
              </div>
            </div>

            {/* 🎯 Action Button: Payment එක වෙලානම් විතරක් Join පෙන්වනවා */}
            <div className="pt-4 border-t border-white/5">
              {item.isPaid ? (
                <a
                  href={item.meetingLink || "#"}
                  target="_blank"
                  className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  Join Meeting Now
                </a>
              ) : (
                <button
                  disabled
                  className="w-full py-2.5 bg-white/5 text-gray-600 text-[9px] font-black uppercase tracking-[0.2em] cursor-not-allowed border border-white/5"
                >
                  Link will generate after payment
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="py-12 border border-dashed border-white/5 text-center rounded-sm">
          <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest text-center">
            No Active Sessions
          </p>
        </div>
      )}
    </div>
  );
};
export default ApprovedRequests;
