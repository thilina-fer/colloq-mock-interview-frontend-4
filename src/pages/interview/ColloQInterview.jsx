import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, SkipForward, Square } from "lucide-react";
import { useInterview } from "../../hooks/useInterview";
import Logo from "../../component/Logo"

const LEVELS = ["Intern", "Associate", "Junior", "Mid-level", "Senior"];
const ROLES = ["Frontend", "Backend", "Fullstack", "DevOps", "Data Science"];

// Animated waveform shown during speaking / recording
const Waveform = ({ active, color }) => (
  <div className="flex items-end gap-3px h-5">
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
        className="w-3px rounded-full"
      />
    ))}
  </div>
);

// Single chat bubble
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
          ? "bg-[#2B1800] text-gray-100 rounded-2xl rounded-tr-4px"
          : "bg-[#1C1C1C] text-gray-200 rounded-2xl rounded-tl-4px border border-white/5"
      }`}
    >
      {msg.text}
    </div>
  </motion.div>
);

const ColloQInterview = () => {
  const {
    phase,
    PHASES: P,
    chatMessages,
    isRecording,
    isSpeaking,
    timeLeft,
    toggleRecording,
    submitName,
    submitLevel,
    submitRole,
    startInterview,
    endSession,
  } = useInterview();

  const [nameInput, setNameInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleNameSubmit = () => {
    if (!nameInput.trim()) return;
    submitName(nameInput);
    setNameInput("");
  };

  // ── Bottom controls that change per phase ──────────────────────────────────
  const renderControls = () => {
    switch (phase) {
      case P.NAME:
        return (
          <input
            autoFocus
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Type your name..."
            onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
            className="w-full max-w-2xl bg-transparent border border-[#FF6B00] rounded-full px-7 py-4 text-white placeholder-gray-600 focus:outline-none text-base caret-[#FF6B00]"
          />
        );

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
            {/* Waveform indicator */}
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

            {/* Action buttons row */}
            <div className="flex items-center gap-3">
              {/* Mic button */}
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

              {/* Skip */}
              <button className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-gray-400 hover:text-gray-200 font-medium px-5 py-2.5 rounded-full border border-gray-800 hover:border-gray-600 transition-all text-sm">
                <SkipForward size={15} />
                Skip Question
              </button>

              {/* End session */}
              <button
                onClick={endSession}
                className="flex items-center gap-2 bg-transparent hover:bg-red-950/40 text-red-500 font-medium px-5 py-2.5 rounded-full border border-red-900/60 hover:border-red-700 transition-all text-sm"
              >
                <Square size={15} />
                End Session
              </button>
            </div>

            {/* Status label */}
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

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex flex-col font-sans">
      {/* ── Ambient glow ───────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
      >
        <div className="w-700px h-700px bg-[#FF6B00]/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="relative z-10 flex items-center px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] block" />
          {/* <span className="font-bold text-white text-[17px] tracking-tight">
            ColloQ
          </span> */}
          <Logo />
        </div>

        {/* Timer — visible only in interview phase */}
        {phase === P.INTERVIEW && (
          <div
            className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono font-semibold border ${
              timeLeft < 10
                ? "border-red-700/60 text-red-400 bg-red-950/30"
                : "border-white/10 text-gray-400 bg-white/5"
            }`}
          >
            {timeLeft}s
          </div>
        )}
      </header>

      {/* ── Chat messages ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <AnimatePresence initial={false}>
            {chatMessages.map((msg, idx) => (
              <Bubble key={idx} msg={msg} index={idx} />
            ))}
          </AnimatePresence>

          {/* AI typing indicator */}
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

      {/* ── Bottom controls ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center items-center px-6 py-6 border-t border-white/5">
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
    </div>
  );
};

export default ColloQInterview;
