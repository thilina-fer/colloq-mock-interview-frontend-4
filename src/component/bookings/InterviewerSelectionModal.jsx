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

  const token = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (isOpen) {
      fetchInitialData();
      setStep(1);
      setSelectedSlot(null);
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
      setAvailabilitySlots(res.data.data || []);
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
      <div className="w-full max-w-6xl h-[90vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl relative flex flex-row bg-[#0a0a0a]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white z-[110]"
        >
          <CloseIcon />
        </button>

        {step === 1 ? (
          <>
            {/* Filters Sidebar */}
            <div className="w-72 border-r border-white/5 p-8 space-y-8 bg-black/40">
              <h2 className="text-xl font-black uppercase text-white tracking-widest">
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
                      className={`px-4 py-2.5 rounded-lg text-[10px] text-left font-black uppercase transition-all border ${
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
                      className={`px-4 py-2.5 rounded-lg text-[10px] text-left font-black uppercase transition-all border ${
                        activeFilters.specialization === spec
                          ? "bg-orange-600 text-white border-orange-600"
                          : "border-white/5 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col bg-[#080808]">
              <div className="p-10 pb-6 border-b border-white/5">
                <h2 className="text-3xl font-black uppercase text-white">
                  Expert <span className="text-orange-500">Selection</span>
                </h2>
                <p className="text-[10px] font-black text-gray-500 mt-2 uppercase tracking-widest">
                  Showing {filteredInterviewers.length} active experts
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center text-gray-600 font-black uppercase text-xs animate-pulse">
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
          /* Step 2: Session Booking */
          <div className="flex-1 flex flex-col items-center justify-center p-12 bg-[#080808]">
            <div className="w-full max-w-2xl space-y-8 animate-in slide-in-from-right duration-500">
              <button
                onClick={() => setStep(1)}
                className="text-[10px] font-black uppercase text-orange-500 hover:underline"
              >
                ← Change Expert
              </button>

              <div className="space-y-2">
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

              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 bg-white/5 flex flex-col items-center justify-center space-y-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Total Fee
                </span>
                <div className="text-4xl font-black text-white flex items-center gap-2">
                  LKR {selectedInterviewer?.price?.toLocaleString()}{" "}
                  <BoltIcon className="text-orange-500 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-black uppercase text-[11px] tracking-widest flex items-center gap-2">
                  <CalendarMonthIcon
                    className="text-orange-500"
                    sx={{ fontSize: 18 }}
                  />{" "}
                  Select Slot
                </h3>
                {isSlotsLoading ? (
                  <p className="text-[10px] text-gray-600 animate-pulse font-black uppercase">
                    Scanning Availability...
                  </p>
                ) : availabilitySlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {availabilitySlots.map((slot) => (
                      <button
                        key={slot.availabilityId}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 rounded-xl text-[10px] text-left font-black border transition-all ${
                          selectedSlot?.availabilityId === slot.availabilityId
                            ? "bg-orange-600 border-orange-600 text-white"
                            : "bg-white/5 border-white/10 text-gray-400"
                        }`}
                      >
                        <div className="uppercase tracking-widest text-[8px] opacity-60">
                          Date: {slot.date}
                        </div>
                        <div className="mt-1">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-600 italic">
                    No slots available for this expert right now.
                  </p>
                )}
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot || isBookingLoading}
                className={`w-full py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all ${
                  !selectedSlot || isBookingLoading
                    ? "bg-white/5 text-gray-700 cursor-not-allowed"
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
