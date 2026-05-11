import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  SkipForward,
  Square,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Download,
  X, // 🎯 Exit Icon එක
} from "lucide-react";
import { useInterview } from "../../hooks/useInterview";
import Logo from "../../component/Logo";
import { useNavigate } from "react-router-dom"; // 🎯 Dashboard එකට යන්න

const LEVELS = ["Intern", "Associate", "Junior", "Mid-level", "Senior"];
const ROLES = ["Frontend", "Backend", "Fullstack", "DevOps", "Data Science"];

const Waveform = ({ active, color }) => (
  <div className="flex items-end gap-[3px] h-5">
    {Array.from({ length: 14 }).map((_, i) => (
      <motion.div
        key={i}
        animate={
          active
            ? { height: ["4px", `${8 + Math.sin(i * 0.8) * 10 + 6}px`, "4px"] }
            : { height: "4px" }
        }
        transition={{
          repeat: Infinity,
          duration: 0.55,
          delay: i * 0.04,
          ease: "easeInOut",
        }}
        style={{ background: color }}
        className="w-[3px] rounded-full"
      />
    ))}
  </div>
);

const Bubble = ({ msg, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className={`flex ${msg.speaker === "user" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[68%] px-5 py-3 text-[15px] leading-relaxed ${
        msg.speaker === "user"
          ? "bg-[#2B1800] text-gray-100 rounded-2xl rounded-tr-[4px]"
          : "bg-[#1C1C1C] text-gray-200 rounded-2xl rounded-tl-[4px] border border-white/5"
      }`}
    >
      {msg.text}
    </div>
  </motion.div>
);

const ColloQInterview = () => {
  const navigate = useNavigate(); // 🎯 Route කරන්න
  const {
    phase,
    PHASES: P,
    chatMessages,
    isRecording,
    isSpeaking,
    timeLeft,
    report,
    isEvaluating,
    toggleRecording,
    skipQuestion, // 🎯 අලුත් Skip එක
    submitLevel,
    submitRole,
    startInterview,
    endSession, // 🎯 End එක
    restartSession, // 🎯 Restart එක
  } = useInterview();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const renderControls = () => {
    switch (phase) {
      case P.LEVEL:
        return (
          <div className="flex gap-3 flex-wrap justify-center">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => submitLevel(lvl)}
                className="px-5 py-2.5 rounded-full border border-gray-700 text-gray-400 hover:border-[#FF6B00] hover:text-white transition-all text-sm font-medium"
              >
                {lvl}
              </button>
            ))}
          </div>
        );

      case P.SPEC:
        return (
          <div className="flex gap-3 flex-wrap justify-center">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => submitRole(r)}
                className="px-5 py-2.5 rounded-full border border-gray-700 text-gray-400 hover:border-[#FF6B00] hover:text-white transition-all text-sm font-medium"
              >
                {r}
              </button>
            ))}
          </div>
        );

      case P.MIC:
        return (
          <button
            onClick={startInterview}
            className="flex items-center gap-2.5 bg-[#FF6B00] hover:bg-[#e66000] active:scale-95 text-white font-semibold px-8 py-4 rounded-full transition-all text-base"
          >
            <Mic size={20} />
            Enable Microphone
          </button>
        );

      case P.INTERVIEW:
        return (
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="h-5 flex items-center">
              {isSpeaking || isRecording ? (
                <Waveform active color={isSpeaking ? "#FF6B00" : "#60a5fa"} />
              ) : (
                <div className="flex items-end gap-[3px] h-5">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      style={{ height: "4px" }}
                      className="w-[3px] rounded-full bg-gray-700"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleRecording}
                disabled={isSpeaking}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isSpeaking
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                    : isRecording
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-[#FF6B00] hover:bg-[#e66000] text-white"
                }`}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              {/* 🎯 අලුත් onClick එක */}
              <button
                onClick={skipQuestion}
                disabled={isSpeaking || isRecording}
                className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-gray-400 hover:text-gray-200 font-medium px-5 py-2.5 rounded-full border border-gray-800 hover:border-gray-600 transition-all text-sm disabled:opacity-50"
              >
                <SkipForward size={15} />
                Skip Question
              </button>

              {/* 🎯 අලුත් onClick එක */}
              <button
                onClick={endSession}
                className="flex items-center gap-2 bg-transparent hover:bg-red-950/40 text-red-500 font-medium px-5 py-2.5 rounded-full border border-red-900/60 hover:border-red-700 transition-all text-sm"
              >
                <Square size={15} />
                End & Get Report
              </button>
            </div>

            {(isSpeaking || isRecording) && (
              <p className="text-xs text-gray-500">
                {isSpeaking ? "AI is speaking…" : "Listening…"}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderReportPhase = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 overflow-y-auto w-full z-20 p-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col">
        <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-700 backdrop-blur-xl shadow-2xl">
          <h2 className="text-3xl font-black mb-2 text-white text-center">
            Interview Performance Overview
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Here is the AI expert's evaluation of your session.
          </p>

          {isEvaluating ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-xl text-white font-bold">
                Analyzing your performance...
              </h3>
              <p className="text-gray-500 text-sm mt-2">
                Deepseek AI is generating your comprehensive report.
              </p>
            </div>
          ) : report ? (
            <div className="space-y-6">
              <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm">
                    Overall Score
                  </h3>
                  <p className="text-4xl font-black text-white mt-1">
                    {report.score}
                  </p>
                </div>
                <Star className="text-[#FF6B00] w-12 h-12" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-green-400 font-bold flex items-center gap-2 mb-4">
                    <CheckCircle size={18} /> Key Strengths
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    {report.strengths?.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-green-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-red-400 font-bold flex items-center gap-2 mb-4">
                    <AlertTriangle size={18} /> Areas to Improve
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    {report.weaknesses?.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-red-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-white font-bold mb-2">Final Verdict</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {report.finalFeedback}
                </p>
              </div>

              <div className="flex justify-center pt-4 gap-4">
                {/* 🎯 Go Back To Start */}
                <button
                  onClick={restartSession}
                  className="flex items-center gap-2 bg-transparent border border-gray-600 hover:border-gray-400 text-white px-6 py-3 rounded-xl transition-colors font-semibold"
                >
                  Start New Session
                </button>
                <button
                  onClick={() => navigate("/dashboard/candidate")}
                  className="flex items-center gap-2 bg-transparent border border-gray-600 hover:border-gray-400 text-white px-6 py-3 rounded-xl transition-colors font-semibold"
                >
                  Exit to Dashboard
                </button>
                <button className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#e66000] text-white px-6 py-3 rounded-xl transition-colors font-semibold shadow-lg shadow-orange-500/20">
                  <Download size={18} /> Download PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-500 py-10">
              Failed to load report. Please check if your backend is running.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0A] text-gray-100 flex flex-col font-sans">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
      >
        <div className="w-[700px] h-[700px] bg-[#FF6B00]/5 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 flex items-center px-6 py-4 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] block" />
          <Logo />
        </div>

        <div className="ml-auto flex items-center gap-4">
          {phase === P.INTERVIEW && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono font-semibold border ${
                timeLeft < 10
                  ? "border-red-700/60 text-red-400 bg-red-950/30"
                  : "border-white/10 text-gray-400 bg-white/5"
              }`}
            >
              {timeLeft}s
            </div>
          )}

          {/* 🎯 Dashboard එකට ආපහු යන Exit බටන් එකක් දැම්මා */}
          <button
            onClick={() => navigate("/dashboard/candidate")}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
            title="Exit to Dashboard"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {phase !== P.REPORT && (
        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <AnimatePresence initial={false}>
              {chatMessages.map((msg, idx) => (
                <Bubble key={idx} msg={msg} index={idx} />
              ))}
            </AnimatePresence>

            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-[#1C1C1C] border border-white/5 px-5 py-3 rounded-2xl rounded-tl-[4px] flex items-center gap-1.5">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay }}
                      className="w-1.5 h-1.5 rounded-full bg-gray-500 block"
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {phase === P.REPORT && renderReportPhase()}

      {phase !== P.REPORT && (
        <div className="relative z-10 flex justify-center items-center px-6 py-6 border-t border-white/5 shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              {renderControls()}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ColloQInterview;
