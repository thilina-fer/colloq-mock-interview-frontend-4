import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme/color";
import Logo from "../component/Logo";

// MUI Icons
import LanguageIcon from "@mui/icons-material/Language";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import StarsIcon from "@mui/icons-material/Stars";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* --- 1. NAVBAR --- */}
      <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-10 text-[13px] font-black uppercase tracking-widest text-gray-400">
            <a href="#how" className="hover:text-orange-500 transition-colors">How it works</a>
            <a href="#mentors" className="hover:text-orange-500 transition-colors">Mentors</a>
            <a href="#reviews" className="hover:text-orange-500 transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/login")} className="hidden sm:block px-6 py-2.5 text-sm font-bold text-gray-700 hover:text-orange-500 transition-all">
              Log in
            </button>
            <button onClick={() => navigate("/register")} className="px-6 py-3 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-orange-500 hover:shadow-orange-500/20 transition-all active:scale-95">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <section className="pt-44 pb-24 px-6 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeSlide">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-orange-600 text-[10px] font-black uppercase tracking-widest mb-8">
              <VerifiedIcon sx={{ fontSize: 14 }} /> Trusted by 5000+ Candidates
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.95] mb-8 tracking-tighter">
              Land your <br />
              <span className="text-orange-500">Dream Job.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium mb-12 max-w-lg leading-relaxed">
              Experience realistic mock interviews with top engineers from <span className="text-gray-900 font-bold">Google, Meta, and Amazon.</span> Get actionable feedback instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button onClick={() => navigate("/register")} className="px-10 py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-orange-500/30 active:scale-95">
                Book a Free Session
              </button>
              <button className="flex items-center justify-center gap-3 px-10 py-5 border-2 border-gray-100 rounded-2xl font-black uppercase tracking-widest hover:border-orange-500 transition-all">
                <PlayCircleFilledIcon /> Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Image Component */}
          <div className="relative animate-float">
             <div className="w-full aspect-[4/3] bg-gray-100 rounded-[50px] border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
             </div>
             {/* Floating Stats Card */}
             <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 rounded-3xl shadow-2xl animate-textUp delay-500 border border-gray-50">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                      <TrendingUpIcon />
                   </div>
                   <div>
                      <p className="text-2xl font-black text-gray-900">94%</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Success Rate</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 3. STATS SECTION --- */}
      <section className="py-16 border-y border-gray-100 bg-white">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
               { label: "Active Mentors", val: "500+", icon: <GroupsIcon /> },
               { label: "Mock Interviews", val: "12k+", icon: <LanguageIcon /> },
               { label: "Avg. Rating", val: "4.9/5", icon: <StarsIcon /> },
               { label: "Success Stories", val: "2.5k+", icon: <VerifiedIcon /> }
            ].map((stat, i) => (
               <div key={i} className="text-center group">
                  <div className="text-orange-500 mb-2 flex justify-center group-hover:scale-110 transition-transform">
                     {stat.icon}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900">{stat.val}</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>

      {/* --- 4. HOW IT WORKS --- */}
      <section id="how" className="py-32 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div>
              <p className="text-orange-500 font-black text-[11px] uppercase tracking-[0.3em] mb-4">Our Process</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">How to get <span className="text-orange-500 italic">ColloQ.</span></h2>
            </div>
            <p className="text-gray-400 font-medium max-w-xs mt-6 md:mt-0">We've simplified the process to get you interview-ready in minutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <LanguageIcon sx={{fontSize: 32}}/>, title: "Find a Mentor", desc: "Filter by tech stack (React, Java, Python) and seniority level to match your goal." },
              { icon: <MenuBookIcon sx={{fontSize: 32}}/>, title: "Pick a Slot", desc: "Our real-time calendar makes it easy to find a time that fits your busy schedule." },
              { icon: <VerifiedIcon sx={{fontSize: 32}}/>, title: "Get Hired", desc: "Receive a detailed report with scores on communication, logic, and tech skills." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all relative group overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full group-hover:scale-[3] transition-transform duration-700 opacity-20"></div>
                <div className="text-orange-500 mb-8 relative">{step.icon}</div>
                <h4 className="text-xl font-black mb-4 relative">0{idx + 1}. {step.title}</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed relative">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FOOTER --- */}
      <footer className="bg-black py-20 px-6 text-white">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
               <Logo />
               <p className="text-gray-500 mt-6 max-w-sm font-medium">Empowering the next generation of engineers through real-world interview experiences.</p>
            </div>
            <div>
               <h5 className="font-black uppercase tracking-widest text-[11px] mb-6 text-orange-500">Platform</h5>
               <ul className="space-y-4 text-sm text-gray-400 font-bold">
                  <li className="hover:text-white cursor-pointer transition-colors">Find Mentors</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Practice Areas</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
               </ul>
            </div>
            <div>
               <h5 className="font-black uppercase tracking-widest text-[11px] mb-6 text-orange-500">Company</h5>
               <ul className="space-y-4 text-sm text-gray-400 font-bold">
                  <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Support</li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">© 2026 ColloQ Platform. Built for Engineers.</p>
            <div className="flex gap-6 text-gray-600">
               {/* Social Icons would go here */}
            </div>
         </div>
      </footer>

      {/* --- STYLES --- */}
      <style>{`
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes textUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeSlide { animation: fadeSlide 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-float { animation: float 6s infinite ease-in-out; }
        .animate-textUp { animation: textUp 0.8s ease-out forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default LandingPage;