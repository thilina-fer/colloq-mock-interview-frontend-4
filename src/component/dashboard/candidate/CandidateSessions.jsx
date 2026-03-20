import React from "react";
import { colors } from "../../../theme/color";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CandidateSessions = () => {
  // පසුව API එකකින් එන දත්ත ලෙස මේවා පාවිච්චි කළ හැක
  const isPaid = false;

  return (
    <div className="space-y-10">
      {/* --- Pending Sessions Section --- */}
      <div>
        <h3 className="text-xl font-bold mb-5" style={{ color: colors.black }}>
          Pending Sessions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Modified Session Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            {/* Interviewer Info */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=random"
                  alt="interviewer"
                />
              </div>
              <div>
                <h4
                  className="text-base font-bold"
                  style={{ color: colors.black }}
                >
                  John Doe
                </h4>
                <p className="text-xs font-semibold opacity-50">
                  Senior Software Engineer
                </p>
              </div>
            </div>

            {/* Interview Details */}
            <p className="text-xs font-bold mb-2 opacity-70 uppercase tracking-wide">
              Technical Interview - React & Node.js
            </p>
            <div className="w-full py-2.5 px-4 rounded-lg border border-gray-300 bg-white text-sm font-bold text-center mb-5">
              Mar 25, 2026 | 10:30 AM
            </div>

            {/* Status Section */}
            <div className="space-y-3 pt-2 border-t border-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-600">
                  Interviewer Approved
                </span>
                <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center border border-blue-100">
                  <CheckCircleIcon
                    className="text-blue-500"
                    sx={{ fontSize: 16 }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-600">
                  {isPaid ? "Payment Successfull" : "Payment Pending"}
                </span>
                {isPaid ? (
                  <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center border border-blue-100">
                    <CheckCircleIcon
                      className="text-blue-500"
                      sx={{ fontSize: 16 }}
                    />
                  </div>
                ) : (
                  <button
                    className="px-4 py-1.5 rounded-md text-[10px] font-bold text-white hover:opacity-90 active:scale-95 transition-all"
                    style={{ backgroundColor: colors.black }}
                  >
                    Pay Here
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Completed Sessions Table --- */}
      <div>
        <h3 className="text-xl font-bold mb-5" style={{ color: colors.black }}>
          Completed Sessions
        </h3>
        <div className="w-full overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Interviewer
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Review
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">
                    Amara Perera
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    Mar 10, 2026 | 02:00 PM
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded border border-green-100 text-[10px] font-bold uppercase">
                      Excellent
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 italic">
                    "Great logic, need more work on system design."
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSessions;
