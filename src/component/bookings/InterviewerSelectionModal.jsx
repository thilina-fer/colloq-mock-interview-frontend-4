import React, { useState, useEffect } from "react";
import { colors } from "../../theme/colors";
import BoltIcon from "@mui/icons-material/Bolt";
import CloseIcon from "@mui/icons-material/Close";
import InterviewerCard from "./InterviewerCard";
import { BookingService } from "../../services/BookingService";
import toast from "react-hot-toast";
import axios from "axios";

const InterviewerSelectionModal = ({ isOpen, onClose }) => {
  // --- 1. Hooks ---
  const [step, setStep] = useState(1);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [dbLevels, setDbLevels] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeFilters, setActiveFilters] = useState({
    name: "All", // Experience Level
    specialization: "All",
  });

  const [bookingDetails, setBookingDetails] = useState({
    levelId: "",
    availabilityId: "",
    jobType: "Software Engineer",
    candidateNote: "",
  });

  // --- 2. Data Fetching Logic ---
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Session expired. Please login again.");
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };

      // 🚀 Levels Fetch
      const levelsRes = await axios.get(
        "http://localhost:8080/api/v1/levels/all",
        { headers },
      );
      setDbLevels([{ levelId: 0, name: "All" }, ...levelsRes.data.data]);

      // 🚀 Interviewers Fetch (URL: /interviewer/all)
      const interviewersRes = await axios.get(
        "http://localhost:8080/api/v1/interviewer/all",
        { headers },
      );

      console.log("Backend Data Success ✅:", interviewersRes.data.data);
      setInterviewers(interviewersRes.data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error.message);
      toast.error("Failed to load interviewers.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. Effects ---
  useEffect(() => {
    if (isOpen) {
      fetchData();
      setStep(1);
    }
  }, [isOpen]);

  // --- 4. Filtering Logic (Fixed redundancy & naming) ---
  const filteredInterviewers = interviewers.filter((interviewer) => {
    // Backend specialization (FULLSTACK) UI specialization (Full Stack) එකට Match කිරීම
    const matchSpec =
      activeFilters.specialization === "All" ||
      interviewer.specialization?.toUpperCase() ===
        activeFilters.specialization.replace(/\s+/g, "").toUpperCase();

    const matchLevel =
      activeFilters.name === "All" ||
      interviewer.levelName === activeFilters.name;

    return matchSpec && matchLevel;
  });

  // --- 5. Event Handlers ---
  const handleInterviewerSelect = (interviewer) => {
    setSelectedInterviewer(interviewer);
    const matchedLevel = dbLevels.find((l) => l.name === interviewer.levelName);
    setBookingDetails({
      ...bookingDetails,
      levelId: matchedLevel?.levelId || "",
    });
    setStep(2);
  };

  const handleBookingConfirm = async () => {
    if (!bookingDetails.availabilityId) {
      toast.error("Please select a time slot!");
      return;
    }
    const loadingToast = toast.loading("Sending hiring request...");
    try {
      const payload = {
        ...bookingDetails,
        interviewerId: selectedInterviewer.interviewerId, // Changed from .id to .interviewerId
      };
      await BookingService.hireInterviewer(payload);
      toast.success("Hiring request sent successfully!", { id: loadingToast });
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed!", {
        id: loadingToast,
      });
    }
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
        className="w-full max-w-5xl max-h-[95vh] overflow-hidden rounded-3xl border shadow-2xl relative flex flex-col"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white z-50"
        >
          <CloseIcon />
        </button>

        <div className="overflow-y-auto no-scrollbar p-8 md:p-12 space-y-8">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                  Find Your{" "}
                  <span className="text-orange-500">Expert Match</span>
                </h2>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  Admin-defined levels and industry specializations
                </p>
              </div>

              {/* FILTERS SECTION */}
              <div className="grid gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em]">
                    Experience Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {dbLevels.map((lvl) => (
                      <button
                        key={lvl.levelId}
                        onClick={() =>
                          setActiveFilters({ ...activeFilters, name: lvl.name })
                        }
                        className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all border ${activeFilters.name === lvl.name ? "bg-white text-black border-white shadow-lg" : "border-white/10 text-gray-400 hover:border-white/30"}`}
                      >
                        {lvl.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase text-gray-500 tracking-[0.2em]">
                    Specialization
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec) => (
                      <button
                        key={spec}
                        onClick={() =>
                          setActiveFilters({
                            ...activeFilters,
                            specialization: spec,
                          })
                        }
                        className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all border ${activeFilters.specialization === spec ? "bg-orange-600 text-white border-orange-600 shadow-lg" : "border-white/10 text-gray-400 hover:border-white/30"}`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RESULTS SECTION */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-white tracking-[0.3em] flex items-center gap-2">
                  <BoltIcon className="text-orange-500" /> Results (
                  {filteredInterviewers.length})
                </h3>

                {isLoading ? (
                  <div className="py-20 text-center">
                    <p className="text-gray-500 animate-pulse uppercase font-black text-[10px]">
                      Loading Experts...
                    </p>
                  </div>
                ) : filteredInterviewers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInterviewers.map((item) => (
                      <InterviewerCard
                        key={item.interviewerId}
                        interviewer={item}
                        onSelect={handleInterviewerSelect}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-2xl">
                    <p className="text-gray-600 text-[10px] font-black uppercase">
                      No experts match your filters
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* STEP 2: BOOKING FORM */
            <div className="space-y-6 max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-500">
              <button
                onClick={() => setStep(1)}
                className="text-[9px] font-black uppercase text-orange-500 hover:underline"
              >
                ← Change Interviewer
              </button>

              <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 shadow-inner">
                <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center font-black text-white uppercase">
                  {selectedInterviewer?.username?.[0] || "I"}
                </div>
                <div>
                  <h3 className="text-white font-black uppercase text-sm tracking-widest">
                    {selectedInterviewer?.username}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                    {selectedInterviewer?.designation}
                  </p>
                </div>
              </div>

              <div className="grid gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                    Select Available Slot
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <p className="text-[9px] text-gray-600 italic">
                      Select a valid slot from the interviewer's calendar...
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      Target Job Role
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-orange-500"
                      placeholder="e.g. Associate Software Engineer"
                      value={bookingDetails.jobType}
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          jobType: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      Note to Interviewer
                    </label>
                    <textarea
                      className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-xs text-white outline-none focus:border-orange-500 h-28"
                      placeholder="What do you want to achieve in this session?"
                      value={bookingDetails.candidateNote}
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          candidateNote: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleBookingConfirm}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.3em] rounded-xl transition-all shadow-2xl active:scale-95"
                >
                  Confirm Hire Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewerSelectionModal;
