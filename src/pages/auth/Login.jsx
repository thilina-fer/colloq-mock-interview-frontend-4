// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../component/Logo";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast"; // Toast notification hadapu nisa meka use karamu

// AuthService එක import කරගන්න
import { AuthService } from "../../services/AuthService";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. AuthService එකේ login method එකට data යවනවා
      const response = await AuthService.login({
        username: formData.username,
        password: formData.password,
      });

      // 2. Login success නම් response එකේ token එක එනවා (Service එකෙන්ම eka localStorage save කරනවා)
      toast.success("Welcome back to ColloQ!");

      // 3. User ගේ Role එක අනුව අදාළ Dashboard එකට යවමු
      // Backend eken role eka ewanawa nam eka check karanna (Ex: response.role)
      // Danata api Candidate dashboard ekatama yawamu
      navigate("/dashboard/candidate");
    } catch (err) {
      console.error("Login Error:", err);
      // Backend එකෙන් එවන error message එක toast එකක් විදිහට පෙන්වනවා
      toast.error(
        err.message || "Invalid username or password. Please try again.",
      );
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
          <h2 className="text-3xl font-bold mb-2 text-gray-100">Log In</h2>
          <p className="mb-8 font-medium text-gray-500 text-sm">
            Enter your credentials to access your account.
          </p>

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
                <button
                  type="button"
                  className="text-[12px] font-bold text-orange-500 hover:text-orange-400"
                >
                  Forgot Password?
                </button>
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
                  className="absolute right-3 cursor-pointer p-1 text-gray-500 hover:text-gray-300"
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
              className="w-full py-3.5 mt-4 rounded-sm font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70 uppercase tracking-wider text-sm"
            >
              {isLoading ? "Authenticating..." : "Log In to Dashboard"}
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
