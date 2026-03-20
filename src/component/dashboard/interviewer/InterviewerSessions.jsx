import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";

const InterviewerSessions = () => {
  const completedSessions = [
    {
      id: 101,
      candidate: "Ruvinda Hemal",
      type: "Backend",
      date: "15 March 2026",
      status: "Feedback Sent",
    },
    {
      id: 102,
      candidate: "Yasas Perera",
      type: "QA",
      date: "12 March 2026",
      status: "Feedback Sent",
    },
  ];

  return (
    <div className="space-y-6 animate-contentFade">
      <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">
        Completed Sessions
      </h3>
      <div className="grid grid-cols-1 gap-4 opacity-80 hover:opacity-100 transition-all">
        {completedSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                <CheckCircleIcon />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{session.candidate}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {session.type} Interview • {session.date}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-black uppercase border border-gray-100 hover:bg-white transition-all">
              <DescriptionIcon sx={{ fontSize: 14 }} />
              View Feedback
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewerSessions;
