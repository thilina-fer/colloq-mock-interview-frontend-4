import React, { useState, useEffect } from "react";
import BookingService from "../../../services/BookingService";
import CandidateBookingCard from "./CandidateBookingCard";
import PaymentModal from "../../bookings/PaymentModal"; // 🎯 Path එක හරියටම බලන්න
import toast from "react-hot-toast";

const CandidateBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎯 Payment Modal එක පාලනය කිරීමට
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handlePayment = (booking) => {
    // 💳 Payment Modal එක Open කර අදාළ booking එක ලබා දීම
    setSelectedBooking(booking);
    setIsModalOpen(true);
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <CandidateBookingCard
              key={b.bookingId}
              booking={b}
              onPay={() => handlePayment(b)} // 🎯 ID එක වෙනුවට සම්පූර්ණ booking එකම යවනවා
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

      {/* 🎯 Payment Modal එක සම්බන්ධ කිරීම */}
      {selectedBooking && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          booking={selectedBooking}
          onSuccess={fetchMyBookings} // ගෙවීම සාර්ථක වූ විට List එක refresh කරයි
        />
      )}
    </>
  );
};

export default CandidateBookings;
