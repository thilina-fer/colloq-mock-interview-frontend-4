// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google"; // Custom button එකක් නිසා මේක පාවිච්චි කරමු
import { jwtDecode } from "jwt-decode";
import googleLogo from "../../assets/google.png"; // Google logo asset එක

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
import { InterviewerService } from "../../services/InterviewerService";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInitialRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (role === "candidate") setIsCandidateModalOpen(true);
    else setIsInterviewerModalOpen(true);
  };

  // ================= GOOGLE AUTH LOGIC =================
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // ඇත්තම implementation එකේදී මෙතනින් එන access token එක backend එකට යවලා
        // user details ලබා ගැනීම වඩාත් සුදුසුයි.
        toast.success(
          "Google Authentication Successful! Please complete profile.",
        );
        if (role === "candidate") setIsCandidateModalOpen(true);
        else setIsInterviewerModalOpen(true);
      } catch (error) {
        toast.error("Google Login Error");
      }
    },
    onError: () => toast.error("Google Login Failed"),
  });

  // ================= REGISTRATION FLOWS (CANDIDATE & INTERVIEWER) =================
  const handleCandidateComplete = async (candidateExtraData, imageFile) => {
    setIsSubmitting(true);
    try {
      await AuthService.register({ ...formData, role: "CANDIDATE" });
      await AuthService.login({
        username: formData.username,
        password: formData.password,
      });
      await new Promise((r) => setTimeout(r, 800));
      const payload = {
        bio: candidateExtraData.bio,
        githubUrl: candidateExtraData.github,
        linkedinUrl: candidateExtraData.linkedin,
        status: "ACTIVE",
      };
      await CandidateService.completeProfile(payload, imageFile);
      setIsCandidateModalOpen(false);
      toast.success("Candidate Registered!");
      navigate("/dashboard/candidate");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterviewerComplete = async (interviewerExtraData, imageFile) => {
    setIsSubmitting(true);
    try {
      await AuthService.register({ ...formData, role: "INTERVIEWER" });
      await AuthService.login({
        username: formData.username,
        password: formData.password,
      });
      await new Promise((r) => setTimeout(r, 1000));
      const payload = {
        bio: interviewerExtraData.bio,
        company: interviewerExtraData.company,
        designation: interviewerExtraData.designation,
        experienceYears: Number(interviewerExtraData.experience),
        specialization: interviewerExtraData.specializations.join(", "),
        githubUrl: interviewerExtraData.github,
        linkedinUrl: interviewerExtraData.linkedin,
        status: "PENDING",
      };
      await InterviewerService.completeProfile(payload, imageFile);
      setIsInterviewerModalOpen(false);
      toast.success("Profile submitted for verification!");
      navigate("/dashboard/interviewer");
    } catch (error) {
      toast.error(
        error.response?.data?.data || "Interviewer registration failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#0a0a0a]">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center px-20 w-1/2 bg-[#0a0a0a]">
        <div className="max-w-md">
          <div className="mb-12">
            <Logo />
          </div>
          <h1 className="text-6xl font-black mb-4 leading-tight text-gray-100">
            Join <br /> <span className="text-orange-600">ColloQ.</span>
          </h1>
          <p className="text-lg font-medium text-gray-500">
            Expert mock interviews to sharpen your skills.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-[#111111] border-l border-[#2a2a2a]">
        <div className="w-full max-w-[440px]">
          <h2 className="text-3xl font-bold mb-1 text-gray-100">
            Create Account
          </h2>
          <p className="mb-8 font-medium text-gray-500 text-xs uppercase tracking-widest">
            Join as {role}
          </p>

          <form onSubmit={handleInitialRegister} className="space-y-4">
            {/* Labels are now added above each input */}
            <div className="flex gap-4 mb-4">
              <div
                onClick={() => setRole("candidate")}
                className={`flex-1 flex flex-col items-center p-4 rounded-sm cursor-pointer border transition-all ${role === "candidate" ? "border-orange-600 bg-[#1a1a1a]" : "border-[#333] bg-[#0a0a0a]"}`}
              >
                <SchoolIcon
                  sx={{
                    color: role === "candidate" ? "#ea580c" : "#666",
                    mb: 1,
                  }}
                />
                <span className="font-black text-[10px] uppercase tracking-widest text-gray-100">
                  Candidate
                </span>
              </div>
              <div
                onClick={() => setRole("interviewer")}
                className={`flex-1 flex flex-col items-center p-4 rounded-sm cursor-pointer border transition-all ${role === "interviewer" ? "border-orange-600 bg-[#1a1a1a]" : "border-[#333] bg-[#0a0a0a]"}`}
              >
                <WorkOutlineIcon
                  sx={{
                    color: role === "interviewer" ? "#ea580c" : "#666",
                    mb: 1,
                  }}
                />
                <span className="font-black text-[10px] uppercase tracking-widest text-gray-100">
                  Interviewer
                </span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">
                Username
              </label>
              <div className="relative">
                <PersonOutlineIcon
                  className="absolute left-4 top-3.5 text-gray-600"
                  sx={{ fontSize: 20 }}
                />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="thilina_dev"
                  className="w-full pl-12 pr-4 py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 focus:border-orange-500 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <MailOutlineIcon
                  className="absolute left-4 top-3.5 text-gray-600"
                  sx={{ fontSize: 20 }}
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="dev@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 focus:border-orange-500 outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <LockOutlinedIcon
                    className="absolute left-3 top-3.5 text-gray-600"
                    sx={{ fontSize: 18 }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••"
                    className="w-full pl-10 pr-10 py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 focus:border-orange-500 outline-none text-sm"
                  />
                  <div
                    className="absolute right-3 top-3.5 cursor-pointer text-gray-600"
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
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">
                  Confirm
                </label>
                <div className="relative">
                  <LockOutlinedIcon
                    className="absolute left-3 top-3.5 text-gray-600"
                    sx={{ fontSize: 18 }}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••"
                    className="w-full pl-10 pr-4 py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 focus:border-orange-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-4 rounded-sm font-black text-white bg-orange-600 hover:bg-orange-500 transition-all uppercase tracking-[0.2em] text-xs"
            >
              {isSubmitting ? "PROCESSING..." : `CONTINUE AS ${role}`}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-[#2a2a2a]"></div>
            <span className="px-4 text-[9px] text-gray-600 font-black uppercase tracking-widest">
              OR
            </span>
            <div className="flex-1 h-[1px] bg-[#2a2a2a]"></div>
          </div>

          {/* Custom Google Button using your Logo */}
          <button
            onClick={() => googleLogin()}
            className="w-full py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] hover:bg-[#161616] text-gray-100 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            <img
              src={googleLogo}
              alt="Google"
              className="w-5 h-5 object-contain"
            />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-[11px] font-bold text-gray-600 uppercase tracking-widest">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              LOG IN
            </a>
          </p>
        </div>
      </div>

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
