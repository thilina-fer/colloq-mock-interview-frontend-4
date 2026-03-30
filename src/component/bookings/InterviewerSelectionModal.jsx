import React, { useState, useEffect } from "react";
import { colors } from "../../theme/colors";
import BoltIcon from "@mui/icons-material/Bolt";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InterviewerCard from "./InterviewerCard";
import AvailabilityService from "../../services/AvailabilityService"; // 🎯 අලුත් Service එක
import toast from "react-hot-toast";
import axios from "axios";

const InterviewerSelectionModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [dbLevels, setDbLevels] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🕒 Availability States
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [activeFilters, setActiveFilters] = useState({
    levelName: "All",
    specialization: "All",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      const levelsRes = await axios.get(
        "http://localhost:8080/api/v1/levels/all",
        { headers },
      );
      setDbLevels([{ levelId: 0, name: "All" }, ...levelsRes.data.data]);

      const interviewersRes = await axios.get(
        "http://localhost:8080/api/v1/interviewer/all",
        { headers },
      );
      setInterviewers(interviewersRes.data.data || []);
    } catch (error) {
      toast.error("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🎯 Interviewer ගේ Availability Fetch කරන Function එක
  const fetchAvailability = async (interviewerId) => {
    setIsSlotsLoading(true);
    try {
      const res =
        await AvailabilityService.getAvailabilitiesByInterviewerId(
          interviewerId,
        );

      // 💡 මෙතන res.data (axios object) ඇතුළේ තියෙන data (backend wrapper) එක ගන්න
      const slots = res.data || res;
      setAvailabilitySlots(Array.isArray(slots) ? slots : []);
    } catch (error) {
      toast.error("Could not fetch availability slots.");
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
    }
  }, [isOpen]);

  const filteredInterviewers = interviewers.filter((interviewer) => {
    const matchesSpec =
      activeFilters.specialization === "All" ||
      interviewer.specialization
        ?.toUpperCase()
        .includes(
          activeFilters.specialization.replace(/\s+/g, "").toUpperCase(),
        );
    const matchesLevel =
      activeFilters.levelName === "All" ||
      interviewer.levelName === activeFilters.levelName;
    return matchesSpec && matchesLevel;
  });

  const handleInterviewerSelect = (interviewer) => {
    console.log("Selected Interviewer:", interviewer);
    setSelectedInterviewer(interviewer);
    fetchAvailability(interviewer.interviewerId); // 🚀 මෙතනදී තමයි Real Slots ලෝඩ් වෙන්නේ
    setStep(2);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;
    try {
      // 🚀 Booking logic මෙතනට එයි
      console.log("Confirming Booking for Slot:", selectedSlot);
      toast.success(`Request sent to ${selectedInterviewer.username}!`);
      onClose();
    } catch (error) {
      toast.error("Booking failed.");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const specializations = [
    "All",
    "Full Stack",
    "Frontend",
    "Backend",
    "Mobile",
    "DevOps",
    "AI/ML",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="w-full max-w-6xl h-[90vh] overflow-hidden rounded-xl border shadow-2xl relative flex flex-row bg-[#0a0a0a]"
        style={{ borderColor: colors.border }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white z-[110]"
        >
          <CloseIcon />
        </button>

        {step === 1 ? (
          <>
            {/* 🚀 LEFT SIDE: FILTERS */}
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
                      className={`px-4 py-2.5 rounded-lg text-[10px] text-left font-black uppercase transition-all border ${activeFilters.levelName === lvl.name ? "bg-white text-black border-white" : "border-white/5 text-gray-400 hover:border-white/20"}`}
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
                  {specializations.map((spec) => (
                    <button
                      key={spec}
                      onClick={() =>
                        setActiveFilters({
                          ...activeFilters,
                          specialization: spec,
                        })
                      }
                      className={`px-4 py-2.5 rounded-lg text-[10px] text-left font-black uppercase transition-all border ${activeFilters.specialization === spec ? "bg-orange-600 text-white border-orange-600 shadow-lg" : "border-white/5 text-gray-400 hover:border-white/20"}`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 🚀 RIGHT SIDE: RESULTS */}
            <div className="flex-1 flex flex-col h-full bg-[#080808]">
              <div className="p-10 pb-4 border-b border-white/5">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                  Expert <span className="text-orange-500">Selection</span>
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <BoltIcon className="text-orange-500 text-sm" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    Showing {filteredInterviewers.length} experts
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center text-gray-500 animate-pulse font-black text-[10px] uppercase tracking-widest">
                    Fetching Experts...
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
          /* 🚀 STEP 2: BOOKING UI (Real Availability) */
          <div className="flex-1 flex flex-col items-center justify-center bg-[#080808] p-12 overflow-y-auto custom-scrollbar animate-in slide-in-from-right duration-500">
            <div className="w-full max-w-2xl space-y-10">
              <button
                onClick={() => setStep(1)}
                className="text-[10px] font-black uppercase text-orange-500 hover:underline flex items-center gap-2"
              >
                ← Back to Selection
              </button>

              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
                  Session <span className="text-orange-500">Details</span>
                </h2>
                <p className="text-gray-500 text-[11px] font-medium italic italic">
                  Booking with{" "}
                  <span className="text-white font-bold">
                    {selectedInterviewer?.username}
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em]">
                  Description
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-orange-500/30 pl-4 italic">
                  "This 1-on-1 session will focus on your{" "}
                  {selectedInterviewer?.specialization} skills, including
                  technical problem solving and real-world feedback."
                </p>
              </div>

              {/* Price Box */}
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 bg-white/5 flex flex-col items-center justify-center space-y-2 hover:border-orange-500/40 transition-all duration-500 group">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Total Session Fee
                </span>
                <div className="text-5xl font-black text-white flex items-center gap-3">
                  {formatPrice(selectedInterviewer?.price)}
                  <BoltIcon className="text-orange-500 text-3xl animate-pulse" />
                </div>
                <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">
                  {selectedInterviewer?.levelName} Level Fixed Rate
                </span>
              </div>

              {/* 📅 Available Slots Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <CalendarMonthIcon
                    className="text-orange-500"
                    sx={{ fontSize: 20 }}
                  />
                  <h3 className="text-white font-black uppercase text-[11px] tracking-widest">
                    Select Available Slot
                  </h3>
                </div>

                {isSlotsLoading ? (
                  <p className="text-[10px] text-gray-600 animate-pulse uppercase font-black tracking-widest">
                    Finding available slots...
                  </p>
                ) : availabilitySlots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availabilitySlots.map((slot) => (
                      <button
                        key={slot.availabilityId}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 rounded-xl text-[10px] text-left font-black transition-all border flex flex-col gap-1 ${
                          selectedSlot?.availabilityId === slot.availabilityId
                            ? "bg-orange-600 border-orange-600 text-white shadow-xl scale-[1.02]"
                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                        }`}
                      >
                        <span className="uppercase tracking-widest text-white/60 text-[8px]">
                          Date: {slot.date}
                        </span>
                        <span className="text-[12px]">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-gray-600 italic">
                    No available slots found for this expert.
                  </p>
                )}
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={!selectedSlot}
                className={`w-full py-5 rounded-xl text-[12px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${selectedSlot ? "bg-white text-black hover:bg-orange-600 hover:text-white transform active:scale-95 shadow-xl" : "bg-white/5 text-gray-700 cursor-not-allowed border border-white/5"}`}
              >
                {selectedSlot
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
