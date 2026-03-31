import React, { useState, useEffect } from "react";
import BookingService from "../../../services/BookingService";
import CandidateBookingCard from "./CandidateBookingCard";
import toast from "react-hot-toast";

const CandidateBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await BookingService.getCandidateBookings();
        setBookings(res.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Could not load your interview sessions.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  const handlePayment = (id) => {
    // 💳 මෙතනට පස්සේ අපි Stripe හෝ වෙනත් Payment Gateway එකක් සම්බන්ධ කරමු
    toast.success("Redirecting to secure payment checkout...");
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-sm bg-white/[0.01]">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[9px] font-black uppercase text-gray-500 tracking-[0.3em]">
          Syncing Your Sessions...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
      {bookings.length > 0 ? (
        bookings.map((b) => (
          <CandidateBookingCard
            key={b.bookingId}
            booking={b}
            onPay={handlePayment}
          />
        ))
      ) : (
        <div className="col-span-full py-20 border border-dashed border-white/5 text-center rounded-sm bg-white/[0.01]">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-700">
            No Booking History Found
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateBookings;
