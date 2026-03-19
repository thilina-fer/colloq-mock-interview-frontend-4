import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme/color";
import Logo from "../../component/Logo";
import CandidateProfileComplete from "../../component/auth/CandidateProfileComplete";

// MUI Icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import googleLogo from "../../assets/google.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("candidate");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (role === "candidate") {
      setIsPopupOpen(true);
    } else {
      navigate("/interviewer-dashboard");
    }
  };

  const handleFinalComplete = (profileData) => {
    console.log("Final Registration Data:", profileData);
    navigate("/candidate-dashboard");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FDFDFD] relative overflow-hidden">
      {/* 1. Global Animations Style */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-content {
          animation: fadeSlideUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Profile Completion Popup */}
      <CandidateProfileComplete
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)} // Close function එක මෙතන තියෙනවා
        onComplete={handleFinalComplete}
      />

      {/* Left Side: Branding & Description */}
      <div
        className={`hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative overflow-hidden transition-all duration-700 ${isPopupOpen ? "blur-md" : ""}`}
        style={{ backgroundColor: colors.gray.light }}
      >
        <div
          className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full opacity-10 transition-all duration-1000 hover:scale-150"
          style={{ backgroundColor: colors.primary }}
        ></div>

        <div className="max-w-md z-10 text-center lg:text-left group animate-content">
          <Logo className="mb-10 scale-125 origin-left transition-transform duration-500 group-hover:translate-x-2" />
          <div className="cursor-default">
            <h1
              className="text-6xl font-extrabold tracking-tight mb-6 transition-all duration-500 group-hover:translate-x-4"
              style={{ color: colors.black }}
            >
              Join <br />
              <span
                className="inline-block transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-2deg]"
                style={{ color: colors.primary }}
              >
                ColloQ.
              </span>
            </h1>
            <p
              className="text-lg leading-relaxed opacity-80 transition-all duration-500 group-hover:opacity-100"
              style={{ color: colors.textPrimary }}
            >
              The journey to your dream career starts here. Create an account
              and start practicing with real-world interview scenarios designed
              for elite developers.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: The Registration Form */}
      <div
        className={`flex-1 flex items-center justify-center p-8 transition-all duration-500 ${isPopupOpen ? "blur-md pointer-events-none scale-95 opacity-50" : "scale-100 opacity-100"}`}
      >
        <div className="w-full max-w-[440px] animate-content">
          <div className="mb-8 text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-6">
              <Logo />
            </div>
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: colors.black }}
            >
              Create Account
            </h2>
            <p style={{ color: colors.gray.medium }}>
              Choose your role and fill in the details.
            </p>
          </div>

          {/* Role Selection */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className="flex-1 p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group"
              style={{
                borderColor: role === "candidate" ? colors.primary : "#E5E7EB",
                backgroundColor: role === "candidate" ? `${colors.primary}08` : "transparent",
              }}
            >
              <SchoolIcon
                style={{
                  color: role === "candidate" ? colors.primary : colors.gray.medium,
                  transition: "0.3s"
                }}
              />
              <span className="font-bold text-sm" style={{ color: role === "candidate" ? colors.black : colors.gray.medium }}>
                Candidate
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole("interviewer")}
              className="flex-1 p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group"
              style={{
                borderColor: role === "interviewer" ? colors.primary : "#E5E7EB",
                backgroundColor: role === "interviewer" ? `${colors.primary}08` : "transparent",
              }}
            >
              <WorkOutlineIcon
                style={{
                  color: role === "interviewer" ? colors.primary : colors.gray.medium,
                  transition: "0.3s"
                }}
              />
              <span className="font-bold text-sm" style={{ color: role === "interviewer" ? colors.black : colors.gray.medium }}>
                Interviewer
              </span>
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            <div>
              <label className="text-sm font-bold ml-1 mb-1 block" style={{ color: colors.black }}>Username</label>
              <div className="relative group/input">
                <PersonOutlineIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within/input:opacity-100 group-focus-within/input:text-orange-500 transition-all"
                  sx={{ fontSize: 20 }}
                />
                <input
                  required
                  type="text"
                  placeholder="thilina_dev"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold ml-1 mb-1 block" style={{ color: colors.black }}>Password</label>
              <div className="relative group/input">
                <LockOutlinedIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within/input:opacity-100 group-focus-within/input:text-orange-500 transition-all"
                  sx={{ fontSize: 20 }}
                />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity"
                >
                  {showPassword ? <VisibilityOffIcon sx={{ fontSize: 20 }} /> : <VisibilityIcon sx={{ fontSize: 20 }} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold ml-1 mb-1 block" style={{ color: colors.black }}>Confirm Password</label>
              <div className="relative group/input">
                <LockOutlinedIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within/input:opacity-100 group-focus-within/input:text-orange-500 transition-all"
                  sx={{ fontSize: 20 }}
                />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] active:scale-[0.98]"
              style={{ backgroundColor: colors.primary }}
            >
              Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
              <HowToRegIcon fontSize="small" className="ml-1" />
            </button>
          </form>

          {/* Social Auth */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-full bg-gray-100"></div>
            <img
              src={googleLogo}
              alt="Google"
              className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-300"
            />
            <div className="h-[1px] w-full bg-gray-100"></div>
          </div>

          <p className="mt-8 text-center text-sm font-medium" style={{ color: colors.gray.medium }}>
            Already have an account?
            <button
              onClick={() => navigate("/login")}
              className="ml-2 font-bold hover:underline"
              style={{ color: colors.primary }}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;