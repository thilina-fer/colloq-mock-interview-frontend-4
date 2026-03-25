import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../component/Logo";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080/api/v1/auth";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        // Login success unama dashboard ekata yanawa
        navigate("/dashboard/candidate");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#0a0a0a]">
      {/* Left Side - Branding (Register page eke widihatama) */}
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
          <h2 className="text-3xl font-bold mb-2 text-gray-100">Log In</h2>
          <p className="mb-8 font-medium text-gray-500 text-sm">
            Enter your credentials to access your account.
          </p>

          {/* Error Message Box - Boxy Style */}
          {error && (
            <div className="mb-6 p-4 rounded-sm flex items-center gap-3 text-sm font-bold border border-red-900/50 bg-[#1a0f0f] text-red-500">
              <span className="block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
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
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[12px] font-bold text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative flex items-center">
                <LockOutlinedIcon
                  className="absolute left-4 text-gray-500"
                  sx={{ fontSize: 20 }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-sm border border-[#333] bg-[#0a0a0a] text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                />
                <div
                  className="absolute right-3 cursor-pointer p-1 text-gray-500 hover:text-gray-300 transition-colors"
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

            {/* Submit Button - Boxy Style */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-4 rounded-sm font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70 uppercase tracking-wider text-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                "Log In to Dashboard"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-[13px] font-medium text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-bold text-orange-500 hover:text-orange-400 hover:underline transition-all uppercase tracking-wide"
            >
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
