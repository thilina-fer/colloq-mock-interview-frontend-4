// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import googleLogo from "../../assets/google.png"; // Google logo asset eka

// Icons & Components
import Logo from "../../component/Logo";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";

// AuthService
import { AuthService } from "../../services/AuthService";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= GOOGLE LOGIN LOGIC =================
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // Backend eke google login endpoint ekata token eka yawanna
        const response = await AuthService.loginWithGoogle(
          tokenResponse.access_token,
        );

        const userRole = response.role;
        toast.success("Login Successful via Google!");

        if (userRole === "INTERVIEWER") navigate("/dashboard/interviewer");
        else if (userRole === "CANDIDATE") navigate("/dashboard/candidate");
        else navigate("/dashboard/admin");
      } catch (err) {
        toast.error("Google Login failed on server.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error("Google Login Failed"),
  });

  // ================= STANDARD LOGIN LOGIC =================
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await AuthService.login({
        username: formData.username,
        password: formData.password,
      });

      // Backend response eke dan 'role' eka thiyenawa (AuthServiceImpl eken hadapu nisa)
      const userRole = response.role;

      toast.success("Welcome back to ColloQ!");

      if (userRole === "INTERVIEWER") {
        navigate("/dashboard/interviewer");
      } else if (userRole === "CANDIDATE") {
        navigate("/dashboard/candidate");
      } else if (userRole === "ADMIN") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/candidate");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
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
            Welcome <br />
            <span className="text-orange-600">Back.</span>
          </h1>
          <p className="text-lg font-medium leading-relaxed text-gray-500">
            Sign in to access your dashboard, connect with interviewers, and
            continue your journey.
          </p>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-[#111111] border-l border-[#2a2a2a]">
        <div className="w-full max-w-[440px]">
          <h2 className="text-3xl font-bold mb-1 text-gray-100">Log In</h2>
          <p className="mb-8 font-medium text-gray-500 text-xs uppercase tracking-widest">
            Enter your credentials
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Input with Label */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                Username
              </label>
              <div className="relative flex items-center">
                <PersonOutlineIcon
                  className="absolute left-4 text-gray-600"
                  sx={{ fontSize: 20 }}
                />
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="thilina_dev"
                  className="w-full pl-12 pr-4 py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password Input with Label */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative flex items-center">
                <LockOutlinedIcon
                  className="absolute left-4 text-gray-600"
                  sx={{ fontSize: 20 }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                />
                <div
                  className="absolute right-3 cursor-pointer p-1 text-gray-600 hover:text-gray-300"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 rounded-sm font-black text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Log In to Dashboard"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-[1px] bg-[#2a2a2a]"></div>
            <span className="px-4 text-[9px] text-gray-600 font-black uppercase tracking-widest">
              OR
            </span>
            <div className="flex-1 h-[1px] bg-[#2a2a2a]"></div>
          </div>

          {/* Custom Google Button */}
          <button
            onClick={() => googleLogin()}
            disabled={isLoading}
            className="w-full py-3.5 rounded-sm border border-[#333] bg-[#0a0a0a] hover:bg-[#161616] text-gray-100 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <img
              src={googleLogo}
              alt="Google"
              className="w-5 h-5 object-contain"
            />
            Continue with Google
          </button>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-orange-500 hover:text-orange-400 transition-all"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
