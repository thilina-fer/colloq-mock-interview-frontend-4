import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BoltIcon from "@mui/icons-material/Bolt";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InterviewerCard from "./InterviewerCard";
import { colors } from "../../theme/colors";

const InterviewerSelectionModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [interviewers, setInterviewers] = useState([]);
  const [dbLevels, setDbLevels] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);

  // Availability & Booking
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    levelName: "All",
    specialization: "All",
  });

  // 🎯 LocalStorage එකේ නම authToken බව තහවුරු කරගන්න
  const token = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (isOpen) {
      fetchInitialData();
      setStep(1);
      setSelectedSlot(null);
      setSelectedInterviewer(null);
    }
  }, [isOpen]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [levelsRes, interviewersRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/levels/all", { headers }),
        axios.get("http://localhost:8080/api/v1/interviewer/all", { headers }),
      ]);
      setDbLevels([{ levelId: 0, name: "All" }, ...levelsRes.data.data]);
      setInterviewers(interviewersRes.data.data || []);
    } catch (err) {
      toast.error("Failed to sync with server.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailability = async (interviewerId) => {
    setIsSlotsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/availability/interviewer/${interviewerId}`,
        { headers },
      );
      // 🎯 Backend එකෙන් Array එකක් එන නිසා res.data පාවිච්චි කරන්න
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setAvailabilitySlots(data || []);
    } catch (err) {
      toast.error("Could not load time slots.");
    } finally {
      setIsSlotsLoading(false);
    }
  };

  const handleInterviewerSelect = (interviewer) => {
    setSelectedInterviewer(interviewer);
    fetchAvailability(interviewer.interviewerId);
    setStep(2);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;
    setIsBookingLoading(true);
    try {
      const bookingRequest = {
        interviewerId: selectedInterviewer.interviewerId,
        availabilityId: selectedSlot.availabilityId,
        levelId: selectedInterviewer.levelId, // 👈 Level ID එකත් යවමු
        status: "PENDING",
      };
      await axios.post(
        "http://localhost:8080/api/v1/booking/save",
        bookingRequest,
        { headers },
      );
      toast.success("Booking request sent! Expert will notify you.");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed.");
    } finally {
      setIsBookingLoading(false);
    }
  };

  const filteredInterviewers = interviewers.filter((inv) => {
    const matchesSpec =
      activeFilters.specialization === "All" ||
      inv.specialization
        ?.toUpperCase()
        .includes(activeFilters.specialization.toUpperCase());
    const matchesLevel =
      activeFilters.levelName === "All" ||
      inv.levelName === activeFilters.levelName;
    return matchesSpec && matchesLevel;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="w-full max-w-6xl h-[90vh] overflow-hidden rounded-sm border border-white/10 shadow-2xl relative flex flex-row bg-[#0a0a0a]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white z-[110]"
        >
          <CloseIcon />
        </button>

        {step === 1 ? (
          <>
            {/* Filters Sidebar - Modern Boxy Style */}
            <div className="w-72 border-r border-white/5 p-8 space-y-8 bg-black/40 overflow-y-auto no-scrollbar">
              <h2 className="text-xl font-black uppercase text-white tracking-[0.2em]">
                Filters
              </h2>

              <div className="space-y-4">
                <label className="text-[9px] font-black uppercase text-orange-500 tracking-[0.2em]">
                  Select Level
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
                      className={`px-4 py-3 rounded-sm text-[10px] text-left font-black uppercase transition-all border ${
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

              <div className="space-y-4">
                <label className="text-[9px] font-black uppercase text-orange-500 tracking-[0.2em]">
                  Specialization
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    "All",
                    "Frontend",
                    "Backend",
                    "Full Stack",
                    "Mobile",
                    "DevOps",
                  ].map((spec) => (
                    <button
                      key={spec}
                      onClick={() =>
                        setActiveFilters({
                          ...activeFilters,
                          specialization: spec,
                        })
                      }
                      className={`px-4 py-3 rounded-sm text-[10px] text-left font-black uppercase transition-all border ${
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

            {/* Results Area */}
            <div className="flex-1 flex flex-col bg-[#080808]">
              <div className="p-10 pb-6 border-b border-white/5 bg-white/[0.02]">
                <h2 className="text-3xl font-black uppercase text-white tracking-tighter">
                  Expert <span className="text-orange-500">Selection</span>
                </h2>
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <BoltIcon sx={{ fontSize: 14 }} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Showing {filteredInterviewers.length} active experts
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center text-gray-700 font-black uppercase text-xs animate-pulse tracking-[0.3em]">
                    Scanning Network...
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
          /* Step 2: Session Booking - Optimized Boxes */
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-[#080808] overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-2xl space-y-10 animate-in slide-in-from-right duration-500">
              <button
                onClick={() => setStep(1)}
                className="text-[10px] font-black uppercase text-orange-500 hover:text-orange-400 flex items-center gap-2"
              >
                ← Back to Selection
              </button>

              <div className="text-center space-y-2">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                  Session <span className="text-orange-500">Summary</span>
                </h2>
                <p className="text-gray-500 text-xs italic font-medium tracking-wide">
                  Expert:{" "}
                  <span className="text-white font-bold">
                    {selectedInterviewer?.username}
                  </span>
                </p>
              </div>

              {/* Fee Box */}
              <div className="border border-white/10 rounded-sm p-10 bg-white/5 flex flex-col items-center justify-center space-y-3 group hover:border-orange-500/40 transition-all duration-500 shadow-inner">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Total Session Fee
                </span>
                <div className="text-5xl font-black text-white flex items-center gap-3 tracking-tighter">
                  LKR {selectedInterviewer?.price?.toLocaleString()}{" "}
                  <BoltIcon className="text-orange-500 text-3xl animate-pulse" />
                </div>
              </div>

              {/* Slots Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-white font-black uppercase text-[12px] tracking-widest flex items-center gap-2">
                    <CalendarMonthIcon
                      className="text-orange-500"
                      sx={{ fontSize: 20 }}
                    />{" "}
                    Select Available Slot
                  </h3>
                </div>

                {isSlotsLoading ? (
                  <p className="text-[10px] text-gray-600 animate-pulse font-black uppercase text-center tracking-widest py-10">
                    Syncing Calendar...
                  </p>
                ) : availabilitySlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {availabilitySlots.map((slot) => (
                      <button
                        key={slot.availabilityId}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-5 rounded-sm text-left font-black transition-all border flex flex-col gap-2 ${
                          selectedSlot?.availabilityId === slot.availabilityId
                            ? "bg-orange-600 border-orange-600 text-white shadow-[0_10px_30px_rgba(234,88,12,0.2)] scale-[1.02]"
                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.07]"
                        }`}
                      >
                        <span className="uppercase tracking-[0.2em] text-[8px] opacity-70">
                          Date: {slot.date}
                        </span>
                        <span className="text-sm tracking-tight">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center border border-dashed border-white/10 rounded-sm">
                    <p className="text-xs text-gray-600 italic">
                      No available slots found for this expert.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot || isBookingLoading}
                className={`w-full py-5 rounded-sm text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-300 shadow-2xl ${
                  !selectedSlot || isBookingLoading
                    ? "bg-white/5 text-gray-700 cursor-not-allowed border border-white/5"
                    : "bg-white text-black hover:bg-orange-600 hover:text-white active:scale-[0.98]"
                }`}
              >
                {isBookingLoading
                  ? "Processing Request..."
                  : selectedSlot
                    ? "Confirm Booking Request"
                    : "Please Select a Slot"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewerSelectionModal;
