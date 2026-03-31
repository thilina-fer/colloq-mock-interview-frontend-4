import React, { useState, useEffect, useCallback } from "react";
import BookingService from "../../../services/BookingService";
import InterviewerRequestCard from "./InterviewerRequestCard";
import toast from "react-hot-toast";

const InterviewerRequests = () => {
  // 🎯 [CHANGE] interviewerId parameter එක ඉවත් කළා (Token එකෙන් ගන්න නිසා)
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      // 🎯 [CHANGE] දැන් Parameter යවන්නේ නැතිව direct call කරනවා
      const data = await BookingService.getInterviewerBookings();
      console.log("RAW DATA FROM BACKEND:", data);

      const requestsArray = Array.isArray(data) ? data : data?.data || [];
      setRequests(requestsArray);
    } catch (err) {
      console.error("Booking Fetch Error:", err);
      toast.error("Failed to load requests.");
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // 🎯 [CHANGE] Dependency array එක හිස් කළා

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (id) => {
    setActionLoadingId(id);
    try {
      await BookingService.approveBooking(id);
      toast.success("Booking Approved!");
      setRequests((prev) => prev.filter((req) => req.bookingId !== id));
    } catch (err) {
      toast.error("Approval failed.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this request?"))
      return;

    setActionLoadingId(id);
    try {
      await BookingService.rejectBooking(id);
      toast.success("Booking Rejected.");
      setRequests((prev) => prev.filter((req) => req.bookingId !== id));
    } catch (err) {
      toast.error("Rejection failed.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-sm bg-white/[0.01]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em] animate-pulse">
          Scanning Incoming Requests...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
      {requests.length > 0 ? (
        requests.map((req) => (
          <InterviewerRequestCard
            key={req.bookingId}
            booking={req}
            onApprove={handleApprove}
            onReject={handleReject}
            isLoading={actionLoadingId === req.bookingId}
          />
        ))
      ) : (
        <div className="col-span-full py-24 border border-dashed border-white/5 text-center rounded-sm bg-white/[0.01] flex flex-col items-center justify-center gap-4">
          <div className="opacity-20">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">
            Inbox is Empty
          </p>
          <p className="text-[8px] font-bold uppercase tracking-widest text-gray-800">
            No pending interview requests at the moment
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewerRequests;
