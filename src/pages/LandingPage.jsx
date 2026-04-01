import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 🎯 Routing සඳහා එකතු කළා
import { colors } from "../theme/colors";
import {
  RocketLaunchIcon,
  VideoCameraIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate(); // 🎯 Navigation function එක හදාගත්තා

  const faqs = [
    {
      q: "How do I book a mock interview?",
      a: "Browse our expert panel, choose a mentor based on your tech stack, and pick a slot. Once confirmed, you'll receive a link for the live session.",
    },
    {
      q: "Is the feedback provided immediately?",
      a: "Yes! At the end of every session, your interviewer provides a verbal breakdown followed by a detailed digital report in your dashboard.",
    },
    {
      q: "Can I earn money as an interviewer?",
      a: "If you are an industry expert, you can apply to join our panel. Once approved, you can set your availability and earn for every session conducted.",
    },
    {
      q: "What technologies power the platform?",
      a: "We use Java WebSockets for high-speed communication and Spring Boot for a secure, robust backend architecture.",
    },
  ];

  return (
    <div
      className="min-h-screen selection:bg-orange-500/30 selection:text-orange-500"
      style={{ backgroundColor: colors.background, color: colors.textMain }}
    >
      {/* 1. Navbar - Glassmorphism Effect */}
      <nav
        className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md"
        style={{ backgroundColor: colors.navBg }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-black italic text-lg shadow-[0_0_15px_rgba(255,102,0,0.4)]">
              C
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Collo<span style={{ color: colors.primary }}>Q</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a
              href="#features"
              className="hover:text-orange-500 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-orange-500 transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="hover:text-orange-500 transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="flex gap-4">
            {/* 🎯 Login Action */}
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 text-[10px] font-black uppercase tracking-widest hover:text-orange-500 transition-colors"
            >
              Login
            </button>
            {/* 🎯 Get Started Action */}
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,102,0,0.2)]"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - With Radial Glow */}
      <section className="relative pt-48 pb-20 overflow-hidden px-6">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: colors.cardGlow }}
        ></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
              Next-Gen Interview Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]"
          >
            MASTER YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-800">
              INTERVIEWS.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg md:text-xl font-medium mb-12 opacity-80"
            style={{ color: colors.textMuted }}
          >
            Practice real-world mock interviews with industry experts. Get
            instant feedback, track your progress, and land your dream job.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* 🎯 CTA to Register */}
            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto px-10 py-5 rounded-sm text-sm font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group shadow-[0_10px_30px_rgba(255,102,0,0.3)]"
              style={{ backgroundColor: colors.primary }}
            >
              Start Mock Interview
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="w-full sm:w-auto px-10 py-5 rounded-sm border text-sm font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
              style={{ borderColor: colors.border }}
            >
              Hire Interviewers
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. Features Section (Same as before) */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-10 border rounded-2xl group hover:border-orange-500/50 transition-all relative overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <VideoCameraIcon className="w-64 h-64" />
            </div>
            <VideoCameraIcon className="w-12 h-12 text-orange-500 mb-6" />
            <h3 className="text-3xl font-black uppercase mb-4 italic">
              High-Fidelity Video Sockets
            </h3>
            <p className="max-w-md text-sm font-bold uppercase tracking-widest opacity-60">
              Seamless real-time communication powered by advanced Java
              WebSockets for zero latency.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-10 border rounded-2xl group hover:border-orange-500/50 transition-all"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <ChartBarIcon className="w-12 h-12 text-orange-500 mb-6" />
            <h3 className="text-2xl font-black uppercase mb-4 italic">
              Wallet & Payouts
            </h3>
            <p className="text-sm font-bold uppercase tracking-widest opacity-60">
              Instant fund withdrawals and earnings tracking for expert
              interviewers.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-10 border rounded-2xl group hover:border-orange-500/50 transition-all"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <UserGroupIcon className="w-12 h-12 text-orange-500 mb-6" />
            <h3 className="text-2xl font-black uppercase mb-4 italic">
              Expert Panel
            </h3>
            <p className="text-sm font-bold uppercase tracking-widest opacity-60">
              Connect with senior developers from top-tier tech startups.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-10 border rounded-2xl group hover:border-orange-500/50 transition-all relative overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <RocketLaunchIcon className="w-64 h-64" />
            </div>
            <RocketLaunchIcon className="w-12 h-12 text-orange-500 mb-6" />
            <h3 className="text-3xl font-black uppercase mb-4 italic">
              ColloQ Mock Sessions
            </h3>
            <p className="max-w-md text-sm font-bold uppercase tracking-widest opacity-60">
              Customized interview rounds tailored for specific roles and
              experience levels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Q&A Section */}
      <section className="max-w-4xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">
            Common <span style={{ color: colors.primary }}>Questions</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-2">
            Everything you need to know about our process
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                borderColor:
                  activeFaq === index ? colors.primary : colors.border,
                backgroundColor:
                  activeFaq === index
                    ? "rgba(255, 102, 0, 0.03)"
                    : "transparent",
              }}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-7 flex items-center justify-between text-left outline-none"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] leading-relaxed">
                  {faq.q}
                </span>
                <div className="flex-shrink-0 ml-4">
                  {activeFaq === index ? (
                    <MinusIcon className="w-5 h-5 text-orange-500" />
                  ) : (
                    <PlusIcon className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-7 pb-7 text-sm font-medium leading-relaxed opacity-60">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Footer */}
      <footer
        className="border-t py-24 px-6 text-center"
        style={{ borderColor: colors.border }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black uppercase italic mb-8">
            Ready to ace your{" "}
            <span style={{ color: colors.primary }}>Interview?</span>
          </h2>
          {/* 🎯 Footer CTA Action */}
          <button
            onClick={() => navigate("/register")}
            className="px-14 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:shadow-[0_0_40px_-5px_rgba(255,102,0,0.5)]"
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            Get Started Now
          </button>
          <div className="mt-20 flex flex-col items-center gap-4">
            <div className="w-10 h-1 border-t border-orange-500/20"></div>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-20 italic">
              © 2026 ColloQ Platform. Engineered for Excellence.
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default LandingPage;
