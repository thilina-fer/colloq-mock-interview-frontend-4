import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Icons
import BoltIcon from "@mui/icons-material/Bolt";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Components
import InterviewerCard from "./InterviewerCard";

const InterviewerSelectionModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [interviewers, setInterviewers] = useState([]);
  const [dbLevels, setDbLevels] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);

  // Availability & Booking States
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    levelName: "All",
    specialization: "All",
  });

  const token = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${token}` };

  // 1. Initial Data Fetch
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [levelsRes, interviewersRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/levels/all", { headers }),
        axios.get("http://localhost:8080/api/v1/interviewer/all", { headers }),
      ]);
      setDbLevels([{ levelId: 0, name: "All" }, ...levelsRes.data.data]);
      setInterviewers(interviewersRes.data.data || []);
    } catch (error) {
      toast.error("Failed to sync with the server.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fetch Time Slots
  const fetchAvailability = async (interviewerId) => {
    setIsSlotsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/availability/interviewer/${interviewerId}`,
        { headers },
      );

      console.log("Full Response Object:", res); // 🔍 මුළු Object එකම බලන්න
      console.log("Response Data:", res.data); // 🔍 ඇත්තම Data ටික බලන්න

      // 🎯 මෙතන ලෙඩේ තියෙන්න පුළුවන්:
      // දත්ත කෙලින්ම Array එකක් නම්: res.data
      // දත්ත wrap වෙලා නම්: res.data.data
      const slots = Array.isArray(res.data) ? res.data : res.data.data;
      setAvailabilitySlots(slots || []);
    } catch (error) {
      console.error("Fetch availability error:", error);
      setAvailabilitySlots([]);
    } finally {
      setIsSlotsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
      setStep(1);
      setSelectedSlot(null);
      setSelectedInterviewer(null); // 🎯 Reset on open
    }
  }, [isOpen]);

  const handleInterviewerSelect = (interviewer) => {
    setSelectedInterviewer(interviewer);
    fetchAvailability(interviewer.interviewerId);
    setStep(2);
  };

  // 3. Confirm Booking
  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;

    setIsBookingLoading(true);
    try {
      const bookingData = {
        interviewerId: selectedInterviewer.interviewerId,
        availabilityId: selectedSlot.availabilityId,
        levelId: selectedInterviewer.levelId,
        status: "PENDING",
      };

      await axios.post(
        "http://localhost:8080/api/v1/booking/save",
        bookingData,
        { headers },
      );

      toast.success("Booking request sent successfully!");
      onClose(); // Modal එක වහන්න
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed.");
    } finally {
      setIsBookingLoading(false);
    }
  };

  // 4. Filtering Logic
  const filteredInterviewers = interviewers.filter((interviewer) => {
    const matchesSpec =
      activeFilters.specialization === "All" ||
      interviewer.specialization
        ?.toUpperCase()
        .includes(activeFilters.specialization.toUpperCase());
    const matchesLevel =
      activeFilters.levelName === "All" ||
      interviewer.levelName?.toLowerCase() ===
        activeFilters.levelName?.toLowerCase();
    return matchesSpec && matchesLevel;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-6xl h-[90vh] overflow-hidden rounded-xl border shadow-2xl relative flex flex-row bg-[#0a0a0a] border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white z-[110]"
        >
          <CloseIcon />
        </button>

        {step === 1 ? (
          <>
            {/* --- SIDEBAR --- */}
            <div className="w-80 border-r border-white/5 p-8 space-y-8 overflow-y-auto no-scrollbar bg-black/40">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
                  Filters
                </h2>
                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                  Setup requirements
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase text-orange-500 tracking-[0.2em]">
                  Select Your Level
                </label>
                <div className="flex flex-col gap-2">
                  {dbLevels.map((lvl) => (
                    <button
                      key={lvl.levelId}
                      onClick={() =>
                        setActiveFilters({
                          ...activeFilters,
                          levelName: lvl.name,
                        })
                      }
                      className={`px-4 py-2.5 rounded-sm text-[10px] text-left font-black uppercase transition-all border ${
                        activeFilters.levelName === lvl.name
                          ? "bg-white text-black border-white"
                          : "border-white/5 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      {lvl.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase text-orange-500 tracking-[0.2em]">
                  Specialization
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    "All",
                    "Full Stack",
                    "Frontend",
                    "Backend",
                    "Mobile",
                    "DevOps",
                    "AI/ML",
                  ].map((spec) => (
                    <button
                      key={spec}
                      onClick={() =>
                        setActiveFilters({
                          ...activeFilters,
                          specialization: spec,
                        })
                      }
                      className={`px-4 py-2.5 rounded-sm text-[10px] text-left font-black uppercase transition-all border ${
                        activeFilters.specialization === spec
                          ? "bg-orange-600 text-white border-orange-600 shadow-lg"
                          : "border-white/5 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* --- MAIN RESULTS --- */}
            <div className="flex-1 flex flex-col h-full bg-[#080808]">
              <div className="p-10 pb-4 border-b border-white/5">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                  Expert <span className="text-orange-500">Selection</span>
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <BoltIcon className="text-orange-500 text-sm" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    Showing {filteredInterviewers.length} active experts
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center text-gray-500 animate-pulse font-black text-[10px] uppercase tracking-widest">
                    Fetching...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredInterviewers.map((item) => (
                      <InterviewerCard
                        key={item.interviewerId}
                        interviewer={item}
                        onSelect={handleInterviewerSelect}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* --- STEP 2: BOOKING --- */
          <div className="flex-1 flex flex-col items-center justify-center bg-[#080808] p-12 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-2xl space-y-10">
              <button
                onClick={() => setStep(1)}
                className="text-[10px] font-black uppercase text-orange-500 hover:underline flex items-center gap-2"
              >
                ← Back
              </button>

              <div className="text-center space-y-2">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                  Session <span className="text-orange-500">Details</span>
                </h2>
                <p className="text-gray-500 text-[11px] font-medium italic">
                  Booking with{" "}
                  <span className="text-white font-bold">
                    {selectedInterviewer?.username}
                  </span>
                </p>
              </div>

              <div className="border border-white/10 rounded-2xl p-10 bg-white/5 flex flex-col items-center justify-center space-y-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                  Total Fee
                </span>
                <div className="text-5xl font-black text-white flex items-center gap-3">
                  {formatPrice(selectedInterviewer?.price)}
                  <BoltIcon className="text-orange-500 text-3xl animate-pulse" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <CalendarMonthIcon
                    className="text-orange-500"
                    sx={{ fontSize: 20 }}
                  />
                  <h3 className="text-white font-black uppercase text-[11px] tracking-widest">
                    Select Slot
                  </h3>
                </div>

                {isSlotsLoading ? (
                  <p className="text-center animate-pulse text-[10px] font-black uppercase text-gray-600">
                    Syncing...
                  </p>
                ) : availabilitySlots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availabilitySlots.map((slot) => (
                      <button
                        key={slot.availabilityId}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-5 rounded-sm text-left font-black transition-all border flex flex-col gap-1 ${
                          selectedSlot?.availabilityId === slot.availabilityId
                            ? "bg-orange-600 border-orange-600 text-white shadow-xl scale-[1.02]"
                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <span className="uppercase tracking-widest text-[8px] opacity-60">
                          Date: {slot.date}
                        </span>
                        <span className="text-base tracking-tight">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-600 italic text-center">
                    No available slots found.
                  </p>
                )}
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot || isBookingLoading}
                className={`w-full py-5 rounded-sm text-[12px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                  !selectedSlot || isBookingLoading
                    ? "bg-white/5 text-gray-700 border border-white/5"
                    : "bg-white text-black hover:bg-orange-600 hover:text-white"
                }`}
              >
                {isBookingLoading ? "Processing..." : "Confirm Booking Request"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewerSelectionModal;
