import { useState, useEffect, useRef, useCallback } from "react";
import { AuthService } from "../services/AuthService";

export const PHASES = {
  LEVEL: "LEVEL",
  SPEC: "SPEC",
  MIC: "MIC",
  INTERVIEW: "INTERVIEW",
  REPORT: "REPORT",
};

export const useInterview = () => {
  const [phase, setPhase] = useState(PHASES.LEVEL);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [level, setLevel] = useState("");
  const [role, setRole] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const [report, setReport] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        if (user) {
          setUserName(user.username);
          setUserEmail(user.email);
          const welcomeMsg = `Welcome back, ${user.username}! I am ColloQ. Let's get you ready for your next big role. What level are you targeting?`;
          setChatMessages([{ speaker: "ai", text: welcomeMsg }]);
          speak(welcomeMsg);
        }
      } catch (error) {
        console.error("Could not fetch user data", error);
        const fallbackMsg = "Hi, I am ColloQ. What level are you targeting?";
        setChatMessages([{ speaker: "ai", text: fallbackMsg }]);
        speak(fallbackMsg);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:8080/api/v1/interview/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

  // 🎯 අලුත් Skip Question ෆන්ක්ෂන් එක
  const skipQuestion = () => {
    window.speechSynthesis?.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    handleUserMessage(
      "I don't know the answer to this question. Please skip it and ask me the next technical question.",
    );
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
    const welcomeText = `Alright ${userName}, let's start your ${level} ${role} interview. Are you ready?`;
    addMessage("ai", welcomeText);
    speak(welcomeText);
    setPhase(PHASES.INTERVIEW);
  };

  const endSession = async () => {
    window.speechSynthesis?.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    clearInterval(timerRef.current);

    setPhase(PHASES.REPORT);
    setIsEvaluating(true);

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        "http://localhost:8080/api/v1/interview/evaluate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName,
            email: userEmail,
            level,
            role,
            chatHistory: chatMessages,
          }),
        },
      );

      let data = await response.json();

      if (typeof data === "string") {
        try {
          const cleanedString = data
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          data = JSON.parse(cleanedString);
        } catch (parseError) {
          console.error("JSON parsing error:", parseError);
          data = {
            score: "N/A",
            strengths: ["Completed the interview"],
            weaknesses: ["Could not parse AI response"],
            finalFeedback: "Report generated but format was invalid.",
          };
        }
      }

      setReport(data);
    } catch (error) {
      console.error("Failed to generate report:", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const restartSession = () => {
    window.speechSynthesis?.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    clearInterval(timerRef.current);

    setPhase(PHASES.LEVEL);
    setLevel("");
    setRole("");
    setTimeLeft(30);
    setReport(null);
    setChatMessages([]);

    const welcomeMsg = `Welcome back, ${userName}! Let's try again. What level are you targeting?`;
    setChatMessages([{ speaker: "ai", text: welcomeMsg }]);
    speak(welcomeMsg);
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
    report,
    isEvaluating,
    toggleRecording,
    skipQuestion, // 🎯 Export කළා
    submitLevel,
    submitRole,
    startInterview,
    endSession, // 🎯 Export කළා (මේකෙන් Report එක ගන්නවා)
    restartSession, // 🎯 Export කළා
    handleUserMessage,
  };
};
