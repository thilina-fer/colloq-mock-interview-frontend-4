import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme/color";
import Logo from "../../component/Logo";
import CandidateProfileComplete from "../../component/auth/CandidateProfileComplete";
import InterviewerProfileComplete from "../../component/auth/InterviewerProfileComplete";

// API Service Import
import { AuthService } from "../../services/AuthService";

// MUI Icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("candidate");
  const [isCandidatePopupOpen, setIsCandidatePopupOpen] = useState(false);
  const [isInterviewerPopupOpen, setIsInterviewerPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
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

  // --- Common Registration & Login Logic ---
  const registerAndGetToken = async (targetRole) => {
    console.log(`Step 1: Registering User as ${targetRole}...`);
    await AuthService.register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: targetRole,
    });

    console.log("Step 2: Logging in to get Token...");
    const loginRes = await AuthService.login({
      username: formData.username,
      password: formData.password,
    });

    const token =
      loginRes?.accessToken ||
      (typeof loginRes === "string" ? loginRes : loginRes?.data?.accessToken);

    if (!token) {
      throw new Error("Login successful but valid accessToken not received!");
    }

    return token;
  };

  // --- Candidate Flow ---
  const handleCandidateComplete = async (profileData) => {
    setLoading(true);
    try {
      const token = await registerAndGetToken("CANDIDATE");

      console.log("Step 3: Completing Candidate Profile...");
      const profileDTO = {
        bio: profileData.bio,
        githubUrl: profileData.github,
        linkedinUrl: profileData.linkedin,
        profilePicture: "https://example.com/default-candidate.jpg",
        status: "ACTIVE",
      };

      await AuthService.completeCandidateProfile(profileDTO, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Candidate Registration Successful!");
      navigate("/dashboard/candidate");
    } catch (err) {
      console.error("Candidate Reg Error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
      setIsCandidatePopupOpen(false);
    }
  };

  // --- Interviewer Flow ---
  const handleInterviewerComplete = async (profileData) => {
    setLoading(true);
    try {
      const token = await registerAndGetToken("INTERVIEWER");

      console.log("Step 3: Completing Interviewer Profile...");
      const profileDTO = {
        bio: profileData.bio,
        company: profileData.company,
        designation: profileData.designation,
        experienceYears: parseInt(profileData.experienceYears),
        specialization: profileData.specialization,
        githubUrl: profileData.github,
        linkedinUrl: profileData.linkedin,
        profilePicture: "https://example.com/default-interviewer.jpg",
      };

      await AuthService.completeInterviewerProfile(profileDTO, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Interviewer Registration Successful!");
      navigate("/dashboard/interviewer");
    } catch (err) {
      console.error("Interviewer Reg Error:", err);
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
      setIsInterviewerPopupOpen(false);
    }
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
        className={`hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative transition-all duration-700 ${isCandidatePopupOpen || isInterviewerPopupOpen ? "blur-md" : ""}`}
        style={{ backgroundColor: colors.gray.light }}
      >
        <div className="max-w-md z-10 text-center lg:text-left animate-content">
          <Logo className="mb-10 scale-125 origin-left" />
          <h1
            className="text-6xl font-extrabold tracking-tight mb-6"
            style={{ color: colors.black }}
          >
            Join <br />
            <span style={{ color: colors.primary }}>ColloQ.</span>
          </h1>
          <p
            className="text-lg opacity-80"
            style={{ color: colors.textPrimary }}
          >
            The journey to your dream career starts here. Practice with industry
            experts.
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
              Choose your role and enter your details.
            </p>
          </div>

          {/* Role Tabs */}
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
              <span className="font-bold text-sm">Candidate</span>
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
              <span className="font-bold text-sm">Interviewer</span>
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            <div>
              <label className="text-sm font-bold ml-1 mb-1 block">
                Username
              </label>
              <div className="relative">
                <PersonOutlineIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                  sx={{ fontSize: 20 }}
                />
                <input
                  required
                  type="text"
                  placeholder="e.g. thilina_dev"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold ml-1 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <MailOutlineIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                  sx={{ fontSize: 20 }}
                />
                <input
                  required
                  type="email"
                  placeholder="e.g. thilina@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold ml-1 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <LockOutlinedIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                    sx={{ fontSize: 20 }}
                  />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30"
                  >
                    {showPassword ? (
                      <VisibilityOffIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <VisibilityIcon sx={{ fontSize: 18 }} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-bold ml-1 mb-1 block">
                  Confirm
                </label>
                <div className="relative">
                  <LockOutlinedIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                    sx={{ fontSize: 20 }}
                  />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-2 rounded-xl font-bold text-white shadow-lg transition-all ${loading ? "opacity-70 cursor-not-allowed" : "hover:translate-y-[-2px]"}`}
              style={{ backgroundColor: colors.primary }}
            >
              {loading ? "Processing..." : `Register as ${role}`}
              {!loading && <HowToRegIcon fontSize="small" className="ml-1" />}
            </button>
          </form>

          <div
            className="mt-8 text-center text-sm font-medium"
            style={{ color: colors.gray.medium }}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="ml-2 font-bold"
              style={{ color: colors.primary }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
