import React, { useState, useMemo } from "react";
import { colors } from "../../theme/color";
import CloseIcon from "@mui/icons-material/Close";
import MentorCard from "./MentorCard";
import SchedulePopup from "./SchedulePopup"; // SchedulePopup එක import කරගන්න

const BookingPopup = ({ isOpen, onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState("Intern");
  const [selectedType, setSelectedType] = useState("Frontend");

  // Schedule Popup එක පාලනය කිරීමට States
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const levels = ["Intern", "Trainee", "Associate", "Junior", "Mid", "Senior"];
  const engTypes = ["Frontend", "Backend", "Full Stack", "QA", "BA", "Mobile"];

  const allMentors = [
    {
      id: 1,
      name: "Saman Perera",
      level: "Senior",
      type: "Frontend",
      designation: "Senior SE",
      company: "Google",
      rating: "4.9",
      specializations: ["React", "Tailwind"],
    },
    {
      id: 2,
      name: "Nilanthi Silva",
      level: "Mid",
      type: "Backend",
      designation: "Tech Lead",
      company: "WSO2",
      rating: "4.8",
      specializations: ["Java", "Spring"],
    },
    {
      id: 3,
      name: "Kasun Deep",
      level: "Intern",
      type: "Frontend",
      designation: "Associate Dev",
      company: "Sysco",
      rating: "4.7",
      specializations: ["HTML", "CSS"],
    },
    {
      id: 4,
      name: "Amara Perera",
      level: "Junior",
      type: "QA",
      designation: "QA Engineer",
      company: "Axiata",
      rating: "5.0",
      specializations: ["Selenium"],
    },
    {
      id: 5,
      name: "Lahiru Danushka",
      level: "Senior",
      type: "Full Stack",
      designation: "Architect",
      company: "Meta",
      rating: "4.9",
      specializations: ["MERN", "AWS"],
    },
  ];

  const filteredMentors = useMemo(() => {
    return allMentors.filter(
      (mentor) =>
        mentor.level === selectedLevel && mentor.type === selectedType,
    );
  }, [selectedLevel, selectedType]);

  // Mentor කෙනෙක් Select කළාම ක්‍රියාත්මක වන logic එක
  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    setIsScheduleOpen(true); // Schedule popup එක පෙන්වන්න
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 1. Mentor Selection Popup (මේක පේන්නේ Schedule එක open නැතිනම් විතරයි) */}
      {!isScheduleOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
          <div className="w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-2xl relative animate-popIn min-h-[700px] flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-all p-1 rounded-full hover:bg-gray-100"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>

            <h2
              className="text-2xl font-black mb-8"
              style={{ color: colors.black }}
            >
              Book Your{" "}
              <span style={{ color: colors.primary }}>Mock Interview</span>
            </h2>

            {/* Level Select */}
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block ml-1">
                Select Level
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-4 py-1.5 rounded-lg text-[11px] font-bold border-2 transition-all ${selectedLevel === lvl ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Select */}
            <div className="mb-8">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 block ml-1">
                Engineering Type
              </label>
              <div className="flex flex-wrap gap-2">
                {engTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-1.5 rounded-lg text-[11px] font-bold border-2 transition-all ${selectedType === type ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Mentors List */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4 pr-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">
                  Available Mentors
                </label>
                {filteredMentors.length > 0 && (
                  <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                    {filteredMentors.length} found
                  </span>
                )}
              </div>

              <div className="h-[350px] overflow-y-auto pr-2 custom-scrollbar border-t border-gray-50 pt-5">
                {filteredMentors.length > 0 ? (
                  <div className="space-y-3.5">
                    {filteredMentors.map((mentor) => (
                      <MentorCard
                        key={mentor.id}
                        mentor={mentor}
                        onSelect={handleMentorSelect}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100 text-center p-6">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                      No mentors found
                    </p>
                    <p className="text-gray-400 text-[11px] max-w-xs">
                      Try changing your criteria for{" "}
                      <span className="font-semibold text-gray-600">
                        {selectedLevel} {selectedType}
                      </span>
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Schedule Popup (මේක ඕපන් වෙන්නේ Mentor කෙනෙක් Select කළාම) */}
      <SchedulePopup
        isOpen={isScheduleOpen}
        onClose={() => {
          setIsScheduleOpen(false);
          setSelectedMentor(null);
        }}
        mentorName={selectedMentor?.name}
      />

      <style>{`
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>
    </>
  );
};

export default BookingPopup;
