import React, { useState } from "react";
import { colors } from "../../theme/color";
import Logo from "../Logo";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import googleLogo from "../../assets/google.png"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-[#FDFDFD]">
      
      {/* Left Side: Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative overflow-hidden" 
           style={{ backgroundColor: colors.gray.light }}>
        {/* පසුබිමේ තියෙන circle එකටත් hover effect එකක් දුන්නා */}
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full opacity-10 transition-all duration-700 hover:scale-150 hover:opacity-20" 
             style={{ backgroundColor: colors.primary }}></div>
        
        <div className="max-w-md z-10 text-center lg:text-left group">
          <Logo className="mb-10 scale-125 origin-left transition-transform duration-500 group-hover:translate-x-2" />
          
          {/* Welcome Back Text Hover Effect */}
          <div className="cursor-default">
            <h1 className="text-6xl font-extrabold tracking-tight mb-6 transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:text-shadow-lg" 
                style={{ color: colors.black }}>
              Welcome <br /> 
              <span className="inline-block transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-2deg]" 
                    style={{ color: colors.primary }}>
                Back.
              </span>
            </h1>
            <p className="text-lg leading-relaxed opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-2" 
               style={{ color: colors.textPrimary }}>
              Your next career move is just a login away. Pick up right where you left off.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: The Clean Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[420px]">
          
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-6"> <Logo /> </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: colors.black }}>Sign In</h2>
            <p style={{ color: colors.gray.medium }}>Enter your details to access your dashboard.</p>
          </div>

          {/* Social Login */}
          <button 
            className="w-full py-3.5 rounded-xl border border-gray-200 font-semibold flex items-center justify-center gap-3 transition-all hover:bg-gray-50 hover:shadow-md active:scale-[0.98]"
            style={{ backgroundColor: colors.white, color: colors.black }}
          >
            <img src={googleLogo} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="flex items-center my-8">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="px-4 text-xs font-bold tracking-widest opacity-30">OR</span>
            <div className="flex-1 h-[1px] bg-gray-200/50"></div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label className="text-sm font-bold ml-1 mb-2 block" style={{ color: colors.black }}>Username</label>
              <div className="relative group/input">
                <PersonOutlineIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within/input:opacity-100 group-focus-within/input:text-orange-500 transition-all" sx={{ fontSize: 20 }} />
                <input 
                  type="text" 
                  placeholder="thilina_dev"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold ml-1" style={{ color: colors.black }}>Password</label>
                <button type="button" className="text-xs font-bold hover:underline" style={{ color: colors.primary }}>
                  Forgot Password?
                </button>
              </div>
              <div className="relative group/input">
                <LockOutlinedIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within/input:opacity-100 group-focus-within/input:text-orange-500 transition-all" sx={{ fontSize: 20 }} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
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

            <button 
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] hover:shadow-orange-500/40 active:translate-y-0"
              style={{ backgroundColor: colors.primary }}
            >
              Sign In
              <LoginIcon fontSize="small" />
            </button>
          </form>

          <p className="mt-10 text-center text-sm font-medium" style={{ color: colors.gray.medium }}>
            Don't have an account? 
            <button className="ml-2 font-bold hover:underline transition-all" style={{ color: colors.primary }}>
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;