import { useState, useEffect, useRef, useCallback } from "react";

export const PHASES = {
  NAME: "NAME",
  LEVEL: "LEVEL",
  SPEC: "SPEC",
  MIC: "MIC",
  INTERVIEW: "INTERVIEW",
};

const INITIAL_MESSAGES = [
  {
    speaker: "ai",
    text: "Hi, I'm ColloQ. Let's get you ready for your next big role. What is your name?",
  },
];

export const useInterview = () => {
  const [phase, setPhase] = useState(PHASES.NAME);
  const [userName, setUserName] = useState("");
  const [level, setLevel] = useState("");
  const [role, setRole] = useState("");
  const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleUserMessage(transcript);
    };
    recognitionRef.current.onend = () => setIsRecording(false);
    recognitionRef.current.onerror = () => setIsRecording(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === PHASES.INTERVIEW && !isSpeaking && !isRecording) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [phase, isSpeaking, isRecording]);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeLeft(30);
    };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const addMessage = useCallback((speaker, text) => {
    setChatMessages((prev) => [...prev, { speaker, text }]);
  }, []);

  const handleUserMessage = async (text) => {
    addMessage("user", text);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/interview/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, level, role, userMessage: text }),
        },
      );
      const data = await response.json();
      const aiText = data.response || "I didn't get a proper response.";
      addMessage("ai", aiText);
      speak(aiText);
    } catch {
      const errorText =
        "I'm having trouble reaching my brain. Please check if the backend is running.";
      addMessage("ai", errorText);
      speak(errorText);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else if (!isSpeaking) {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (e) {
        console.error("Could not start recording", e);
      }
    }
  };

  const submitName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setUserName(trimmed);
    addMessage("user", trimmed);
    const aiMsg = `Nice to meet you, ${trimmed}! What level are you targeting?`;
    addMessage("ai", aiMsg);
    speak(aiMsg);
    setPhase(PHASES.LEVEL);
  };

  const submitLevel = (lvl) => {
    setLevel(lvl);
    addMessage("user", lvl);
    const aiMsg = "And your specialization?";
    addMessage("ai", aiMsg);
    speak(aiMsg);
    setPhase(PHASES.SPEC);
  };

  const submitRole = (r) => {
    setRole(r);
    addMessage("user", r);
    const aiMsg =
      "Ready to start. I need to hear you for the technical round. Please grant microphone access.";
    addMessage("ai", aiMsg);
    speak(aiMsg);
    setPhase(PHASES.MIC);
  };

  const startInterview = () => {
    const welcomeText = `Hello ${userName}, let's start your ${level} ${role} interview. Are you ready?`;
    addMessage("ai", welcomeText);
    speak(welcomeText);
    setPhase(PHASES.INTERVIEW);
  };

  const endSession = () => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();
    setPhase(PHASES.NAME);
    setUserName("");
    setLevel("");
    setRole("");
    setChatMessages(INITIAL_MESSAGES);
    setTimeLeft(30);
  };

  return {
    phase,
    PHASES,
    userName,
    level,
    role,
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
    handleUserMessage,
  };
};
