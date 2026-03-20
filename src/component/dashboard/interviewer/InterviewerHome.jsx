import React from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const InterviewerHome = () => {
  // Mock Data for Pending Sessions
  const pendingSessions = [
    { id: 1, candidate: "Thilina Dilshan", type: "Frontend", level: "Intern", date: "22 March", time: "10:00 AM" },
    { id: 2, candidate: "Adithya Dev", type: "Full Stack", level: "Junior", date: "24 March", time: "02:30 PM" },
  ];

  return (
    <div className="space-y-6 animate-contentFade">
      <div className="flex items-center gap-2 mb-2">
        <EventAvailableIcon className="text-orange-500" />
        <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Upcoming Interviews (Pending)</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingSessions.map((session) => (
          <div key={session.id} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-sm hover:shadow-md transition-all border-l-4 border-l-orange-500">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 font-black">
                {session.candidate.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{session.candidate}</h4>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{session.level}</span>
                  <span className="text-[10px] font-black bg-blue-50 text-blue-500 px-2 py-0.5 rounded">{session.type}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
              <div className="text-right">
                <p className="font-black text-sm text-gray-800">{session.date}</p>
                <p className="text-xs font-bold text-orange-500">{session.time}</p>
              </div>
              <button className="flex-1 md:flex-none px-6 py-3 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95">
                Start Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewerHome;