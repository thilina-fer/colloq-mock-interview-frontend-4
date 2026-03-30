import React, { useState, useEffect } from "react";
import { colors } from "../../theme/colors";
import BoltIcon from "@mui/icons-material/Bolt";
import CloseIcon from "@mui/icons-material/Close";
import InterviewerCard from "./InterviewerCard";
import { BookingService } from "../../services/BookingService";
import toast from "react-hot-toast";
import axios from "axios";

const InterviewerSelectionModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [dbLevels, setDbLevels] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🚀 Filters
  const [activeFilters, setActiveFilters] = useState({
    levelName: "All",
    specialization: "All",
    duration: "30 Mins", // Default Duration (ලිස්ට් එකකින් පාලනය වේ)
  });

  const [bookingDetails, setBookingDetails] = useState({
    levelId: "",
    availabilityId: "",
    jobType: "Software Engineer",
    candidateNote: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      // 🚀 Levels Fetch
      const levelsRes = await axios.get(
        "http://localhost:8080/api/v1/levels/all",
        { headers },
      );
      setDbLevels([{ levelId: 0, name: "All" }, ...levelsRes.data.data]);

      // 🚀 Interviewers Fetch
      const interviewersRes = await axios.get(
        "http://localhost:8080/api/v1/interviewer/all",
        { headers },
      );
      setInterviewers(interviewersRes.data.data || []);
    } catch (error) {
      toast.error("Failed to load interviewers.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
      setStep(1);
    }
  }, [isOpen]);

  // 🎯 Filter Logic - Specialization එකෙන් විතරයි Filter වෙන්නේ
  const filteredInterviewers = interviewers.filter((interviewer) => {
    return (
      activeFilters.specialization === "All" ||
      interviewer.specialization?.toUpperCase() ===
        activeFilters.specialization.replace(/\s+/g, "").toUpperCase()
    );
  });

  const handleInterviewerSelect = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setStep(2);
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

  // 💡 පේමන්ට් එකට අනුව මේ Time ටික පාවිච්චි කරන්න පුළුවන්
  const durations = ["30 Mins", "60 Mins", "90 Mins"];

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
            {/* 🚀 LEFT SIDE: VERTICAL FILTERS */}
            <div className="w-80 border-r border-white/5 p-8 space-y-8 overflow-y-auto no-scrollbar bg-black/40">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
                  Filters
                </h2>
                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                  Setup your session requirements
                </p>
              </div>

              {/* 1. Experience Level (Booking එකට විතරයි) */}
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

              {/* 2. Time Duration (Payment එකට වැදගත් වේ) */}
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase text-orange-500 tracking-[0.2em]">
                  Session Duration
                </label>
                <div className="flex flex-col gap-2">
                  {durations.map((dur) => (
                    <button
                      key={dur}
                      onClick={() =>
                        setActiveFilters({ ...activeFilters, duration: dur })
                      }
                      className={`px-4 py-2.5 rounded-lg text-[10px] text-left font-black uppercase transition-all border ${activeFilters.duration === dur ? "bg-white text-black border-white" : "border-white/5 text-gray-400 hover:border-white/20"}`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Specialization (Real-time Filtering) */}
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
                    Showing {filteredInterviewers.length} matching experts
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500 animate-pulse font-black text-[10px] uppercase">
                      Fetching Experts...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
          /* STEP 2: BOOKING */
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
            {/* Booking form logic */}
            <button
              onClick={() => setStep(1)}
              className="text-[9px] font-black uppercase text-orange-500 hover:underline mb-6"
            >
              ← BACK
            </button>
            <h2 className="text-white font-black text-2xl uppercase">
              Complete Booking
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewerSelectionModal;
