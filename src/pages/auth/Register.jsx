import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme/color";
import Logo from "../../component/Logo";
import CandidateProfileComplete from "../../component/auth/CandidateProfileComplete";
import InterviewerProfileComplete from "../../component/auth/InterviewerProfileComplete";

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
  const [isCandidatePopupOpen, setIsCandidatePopupOpen] = useState(false);
  const [isInterviewerPopupOpen, setIsInterviewerPopupOpen] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Password match වෙනවාදැයි බැලීම
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (role === "candidate") {
      setIsCandidatePopupOpen(true);
    } else {
      setIsInterviewerPopupOpen(true);
    }
  };

  const handleCandidateComplete = (profileData) => {
    const finalUserData = {
      name: formData.username,
      ...profileData,
      role: "candidate",
    };
    localStorage.setItem("currentUser", JSON.stringify(finalUserData));
    navigate("/dashboard/candidate");
  };

  const handleInterviewerComplete = (profileData) => {
    const finalUserData = {
      name: formData.username,
      ...profileData,
      role: "interviewer",
    };
    localStorage.setItem("currentUser", JSON.stringify(finalUserData));
    navigate("/interviewer-dashboard");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FDFDFD] relative overflow-hidden">
      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-content { animation: fadeSlideUp 0.8s ease-out forwards; }
      `}</style>

      {/* Popups */}
      <CandidateProfileComplete
        isOpen={isCandidatePopupOpen}
        onClose={() => setIsCandidatePopupOpen(false)}
        onComplete={handleCandidateComplete}
      />
      <InterviewerProfileComplete
        isOpen={isInterviewerPopupOpen}
        onClose={() => setIsInterviewerPopupOpen(false)}
        onComplete={handleInterviewerComplete}
      />

      {/* Left Side: Branding */}
      <div
        className={`hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative overflow-hidden transition-all duration-700 ${isCandidatePopupOpen || isInterviewerPopupOpen ? "blur-md" : ""}`}
        style={{ backgroundColor: colors.gray.light }}
      >
        <div className="max-w-md z-10 text-center lg:text-left group animate-content">
          <Logo className="mb-10 scale-125 origin-left transition-transform" />
          <h1
            className="text-6xl font-extrabold tracking-tight mb-6"
            style={{ color: colors.black }}
          >
            Join <br />
            <span style={{ color: colors.primary }}>ColloQ.</span>
          </h1>
          <p
            className="text-lg leading-relaxed opacity-80"
            style={{ color: colors.textPrimary }}
          >
            The journey to your dream career starts here. Create an account and
            start practicing.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div
        className={`flex-1 flex items-center justify-center p-8 transition-all duration-500 ${isCandidatePopupOpen || isInterviewerPopupOpen ? "blur-md pointer-events-none scale-95 opacity-50" : ""}`}
      >
        <div className="w-full max-w-[440px] animate-content">
          <div className="mb-8 text-center lg:text-left">
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
              className="flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
              style={{
                borderColor: role === "candidate" ? colors.primary : "#E5E7EB",
                backgroundColor:
                  role === "candidate" ? `${colors.primary}08` : "transparent",
              }}
            >
              <SchoolIcon
                style={{
                  color:
                    role === "candidate" ? colors.primary : colors.gray.medium,
                }}
              />
              <span
                className="font-bold text-sm"
                style={{
                  color:
                    role === "candidate" ? colors.black : colors.gray.medium,
                }}
              >
                Candidate
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole("interviewer")}
              className="flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
              style={{
                borderColor:
                  role === "interviewer" ? colors.primary : "#E5E7EB",
                backgroundColor:
                  role === "interviewer"
                    ? `${colors.primary}08`
                    : "transparent",
              }}
            >
              <WorkOutlineIcon
                style={{
                  color:
                    role === "interviewer"
                      ? colors.primary
                      : colors.gray.medium,
                }}
              />
              <span
                className="font-bold text-sm"
                style={{
                  color:
                    role === "interviewer" ? colors.black : colors.gray.medium,
                }}
              >
                Interviewer
              </span>
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            {/* Username */}
            <div>
              <label
                className="text-sm font-bold ml-1 mb-1 block"
                style={{ color: colors.black }}
              >
                Username
              </label>
              <div className="relative group/input">
                <PersonOutlineIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within/input:opacity-100 group-focus-within/input:text-orange-500 transition-all"
                  sx={{ fontSize: 20 }}
                />
                <input
                  required
                  type="text"
                  placeholder="thilina_dev"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="text-sm font-bold ml-1 mb-1 block"
                style={{ color: colors.black }}
              >
                Password
              </label>
              <div className="relative group/input">
                <LockOutlinedIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within/input:opacity-100 group-focus-within/input:text-orange-500 transition-all"
                  sx={{ fontSize: 20 }}
                />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100"
                >
                  {showPassword ? (
                    <VisibilityOffIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <VisibilityIcon sx={{ fontSize: 20 }} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="text-sm font-bold ml-1 mb-1 block"
                style={{ color: colors.black }}
              >
                Confirm Password
              </label>
              <div className="relative group/input">
                <LockOutlinedIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within/input:opacity-100 transition-all"
                  sx={{ fontSize: 20 }}
                />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 rounded-xl font-bold text-white shadow-lg transition-all hover:translate-y-[-2px] active:scale-[0.98]"
              style={{ backgroundColor: colors.primary }}
            >
              Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
              <HowToRegIcon fontSize="small" className="ml-1" />
            </button>
          </form>

          {/* Social Auth & Footer */}
          <div className="mt-6 flex items-center justify-center gap-4 text-center">
            <p
              className="text-sm font-medium"
              style={{ color: colors.gray.medium }}
            >
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="ml-1 font-bold"
                style={{ color: colors.primary }}
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
