// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Interviewer fallback call ekata witarak danata use karanawa

// Icons & Components
import Logo from "../../component/Logo";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import CandidateProfileComplete from "../../component/auth/CandidateProfileComplete";
import InterviewerProfileComplete from "../../component/auth/InterviewerProfileComplete";

// Services
import { AuthService } from "../../services/AuthService";
import { CandidateService } from "../../services/CandidateService";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // API Calls yaddi UI eka loading pennanna state ekak
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isInterviewerModalOpen, setIsInterviewerModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInitialRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (role === "candidate") {
      setIsCandidateModalOpen(true);
    } else {
      setIsInterviewerModalOpen(true);
    }
  };

  // ================= CANDIDATE REGISTRATION FLOW =================
  // Modal eken ena imageFile ekath dan argument ekak widihata gannawa
  const handleCandidateComplete = async (candidateExtraData, imageFile) => {
    setIsSubmitting(true);
    try {
      // Step 1: Register User
      await AuthService.register({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: "CANDIDATE",
      });

      // Step 2: Auto Login to get Token
      const loginRes = await AuthService.login({
        username: formData.username,
        password: formData.password,
      });

      // Token eka local storage ekata save unada kiyala sure karanna podi delay ekak
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log(
        "Token for Profile Update:",
        localStorage.getItem("authToken"),
      );

      // Step 3: Complete Profile payload
      const profilePayload = {
        bio: candidateExtraData.bio,
        githubUrl: candidateExtraData.github,
        linkedinUrl: candidateExtraData.linkedin,
        // Image eka dila nattam use karanna default avatar eka
        profilePicture: `https://ui-avatars.com/api/?name=${formData.username}&background=random`,
        status: "ACTIVE",
      };

      // Api hadapu aluth CandidateService ekata payload ekai imageFile ekai dekama yawanawa
      await CandidateService.completeProfile(profilePayload, imageFile);

      setIsCandidateModalOpen(false);
      navigate("/dashboard/candidate");
    } catch (error) {
      console.error("Candidate Registration Error:", error);
      alert(
        error.message ||
          "Failed to complete registration. Check backend console.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= INTERVIEWER REGISTRATION FLOW =================
  const handleInterviewerComplete = async (interviewerExtraData, imageFile) => {
    setIsSubmitting(true);
    try {
      // Step 1: Register User
      await AuthService.register({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        role: "INTERVIEWER",
      });

      // Step 2: Auto Login to get Token
      await AuthService.login({
        username: formData.username,
        password: formData.password,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Step 3: Complete Profile payload
      const profilePayload = {
        bio: interviewerExtraData.bio,
        company: interviewerExtraData.company,
        designation: interviewerExtraData.designation,
        experienceYears: parseInt(interviewerExtraData.experience),
        specialization: interviewerExtraData.specializations.join(", "),
        githubUrl: interviewerExtraData.github,
        linkedinUrl: interviewerExtraData.linkedin,
        profilePicture: `https://ui-avatars.com/api/?name=${formData.username}&background=random`,
        status: "PENDING",
      };

      // Interviewer ekath multipart widihata yawanna form data eka hadanawa
      const formDataObj = new FormData();
      formDataObj.append(
        "data",
        new Blob([JSON.stringify(profilePayload)], {
          type: "application/json",
        }),
      );

      if (imageFile) {
        formDataObj.append("image", imageFile);
      }

      // InterviewerService eka thama hadala nathi nisa direct axios eken token eka ekka yawanawa.
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:8080/api/v1/interviewer/complete-profile",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setIsInterviewerModalOpen(false);
      navigate("/dashboard/interviewer");
    } catch (error) {
      console.error("Interviewer Registration Error:", error);
      alert(
        error.message ||
          "Failed to complete registration. Check backend console.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#0a0a0a]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 bg-[#0a0a0a]">
        <div className="max-w-md">
          <div className="mb-12">
            <Logo />
          </div>
          <h1 className="text-6xl font-black mb-4 leading-tight text-gray-100">
            Join <br />
            <span className="text-orange-600">ColloQ.</span>
          </h1>
          <p className="text-lg font-medium leading-relaxed text-gray-500">
            The journey to your dream career starts here. Practice with industry
            experts.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-[#111111] border-l border-[#2a2a2a]">
        <div className="w-full max-w-[440px]">
          <h2 className="text-3xl font-bold mb-2 text-gray-100">
            Create Account
          </h2>
          <p className="mb-8 font-medium text-gray-500 text-sm">
            Choose your role and enter your details.
          </p>

          <form onSubmit={handleInitialRegister} className="space-y-5">
            {/* Role Selection */}
            <div className="flex gap-4 mb-6">
              <div
                onClick={() => setRole("candidate")}
                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-sm cursor-pointer transition-all duration-200 border ${
                  role === "candidate"
                    ? "border-orange-600 bg-[#1a1a1a]"
                    : "border-[#333] bg-[#0a0a0a] hover:border-[#444]"
                }`}
              >
                <SchoolIcon
                  sx={{
                    color: role === "candidate" ? "#ea580c" : "#666",
                    fontSize: 28,
                    mb: 1,
                  }}
                />
                <span
                  className={`font-bold text-[13px] uppercase tracking-wider ${role === "candidate" ? "text-gray-100" : "text-gray-500"}`}
                >
                  Candidate
                </span>
              </div>

              <div
                onClick={() => setRole("interviewer")}
                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-sm cursor-pointer transition-all duration-200 border ${
                  role === "interviewer"
                    ? "border-orange-600 bg-[#1a1a1a]"
                    : "border-[#333] bg-[#0a0a0a] hover:border-[#444]"
                }`}
              >
                <WorkOutlineIcon
                  sx={{
                    color: role === "interviewer" ? "#ea580c" : "#666",
                    fontSize: 28,
                    mb: 1,
                  }}
                />
                <span
                  className={`font-bold text-[13px] uppercase tracking-wider ${role === "interviewer" ? "text-gray-100" : "text-gray-500"}`}
                >
                  Interviewer
                </span>
              </div>
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Username
              </label>
              <div className="relative flex items-center">
                <PersonOutlineIcon
                  className="absolute left-4 text-gray-500"
                  sx={{ fontSize: 20 }}
                />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. thilina_dev"
                  className="w-full pl-12 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <MailOutlineIcon
                  className="absolute left-4 text-gray-500"
                  sx={{ fontSize: 20 }}
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. thilina@gmail.com"
                  className="w-full pl-12 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <LockOutlinedIcon
                    className="absolute left-3 text-gray-500"
                    sx={{ fontSize: 18 }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  />
                  <div
                    className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <VisibilityIcon sx={{ fontSize: 18 }} />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Confirm
                </label>
                <div className="relative flex items-center">
                  <LockOutlinedIcon
                    className="absolute left-3 text-gray-500"
                    sx={{ fontSize: 18 }}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                  />
                  <div
                    className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <VisibilityIcon sx={{ fontSize: 18 }} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-4 rounded-sm font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2 uppercase tracking-wider text-sm"
            >
              CONTINUE AS {role}
              {role === "candidate" ? (
                <SchoolIcon sx={{ fontSize: 18 }} />
              ) : (
                <WorkOutlineIcon sx={{ fontSize: 18 }} />
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[13px] font-medium text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-orange-500 hover:text-orange-400 hover:underline uppercase tracking-wide"
            >
              LOG IN
            </a>
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <CandidateProfileComplete
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        onComplete={handleCandidateComplete}
        isSubmitting={isSubmitting}
      />

      <InterviewerProfileComplete
        isOpen={isInterviewerModalOpen}
        onClose={() => setIsInterviewerModalOpen(false)}
        onComplete={handleInterviewerComplete}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Register;
