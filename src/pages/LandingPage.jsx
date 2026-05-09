import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme/colors";
import {
  RocketLaunchIcon,
  VideoCameraIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  SparklesIcon,
  ArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Logo from "../component/Logo";

/* ─── helpers ─── */
const Tag = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-orange-500/30 text-orange-400 bg-orange-500/5">
    {children}
  </span>
);

const StatPill = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white">
      {value}
    </span>
    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest opacity-40">
      {label}
    </span>
  </div>
);

const Orb = ({ className, style }) => (
  <div
    className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
    style={style}
  />
);

/* ─── mobile nav drawer ─── */
const MobileMenu = ({ open, onClose, navigate }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col border-l border-white/10"
          style={{ backgroundColor: "rgba(10,10,14,0.97)" }}
        >
          {/* drawer header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/0.06">
            <Logo />
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* nav links */}
          <nav className="flex flex-col gap-1 p-4 flex-1">
            {["Features", "How it works", "Pricing"].map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                onClick={onClose}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="px-4 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.18em]
                           text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {l}
              </motion.a>
            ))}
          </nav>

          {/* auth buttons */}
          <div className="p-4 border-t border-white/0.06 flex flex-col gap-3">
            <button
              onClick={() => {
                navigate("/login");
                onClose();
              }}
              className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest
                         border border-white/10 text-gray-300 hover:bg-white/5 transition-all"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
                onClose();
              }}
              className="w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest
                         flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,102,0,0.3)]
                         hover:brightness-110 active:scale-95 transition-all"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              Get Started <ArrowUpRightIcon className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─── main component ─── */
const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const features = [
    {
      icon: <VideoCameraIcon className="w-6 h-6" />,
      tag: "Real-time",
      title: "High-Fidelity\nVideo Sockets",
      desc: "Seamless live communication powered by Java WebSockets with sub-10ms latency.",
      span: "md:col-span-2",
      accent: true,
    },
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      tag: "Finance",
      title: "Wallet &\nPayouts",
      desc: "Instant withdrawals and earnings tracking for expert interviewers.",
      span: "",
      accent: false,
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      tag: "Community",
      title: "Expert\nPanel",
      desc: "Connect with senior engineers from top-tier tech companies worldwide.",
      span: "",
      accent: false,
    },
    {
      icon: <RocketLaunchIcon className="w-6 h-6" />,
      tag: "Core",
      title: "ColloQ Mock\nSessions",
      desc: "Customized interview rounds tailored for specific roles and experience levels.",
      span: "md:col-span-2",
      accent: true,
    },
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-500"
      style={{ backgroundColor: colors.background, color: colors.textMain }}
    >
      {/* ── MOBILE DRAWER ── */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navigate={navigate}
      />

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50
                   w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl
                   rounded-xl sm:rounded-2xl border border-white/0.06 backdrop-blur-xl
                   px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between
                   shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{ backgroundColor: "rgba(10,10,14,0.85)" }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <Logo />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
          {["Features", "How it works", "Pricing"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="hover:text-orange-400 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400
                       hover:text-white transition-colors rounded-xl hover:bg-white/5"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest
                       hover:brightness-110 active:scale-95 transition-all
                       shadow-[0_4px_20px_rgba(255,102,0,0.25)] flex items-center gap-1.5"
            style={{ backgroundColor: colors.primary, color: "white" }}
          >
            Get Started <ArrowUpRightIcon className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile: login + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest
                       text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            Login
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <Orb
          className="w-400px sm:w-700px h-400px sm:h-700px -top-150px sm:-top-200px left-1/2 -translate-x-1/2 opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, #ff6600 0%, transparent 70%)",
          }}
        />
        <Orb
          className="w-250px sm:w-400px h-250px sm:h-400px bottom-0 left-[-5%] opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #ff8833 0%, transparent 70%)",
          }}
        />
        <Orb
          className="hidden sm:block w-300px h-300px top-[30%] right-[5%] opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #ff4400 0%, transparent 70%)",
          }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px sm:60px sm:60px",
          }}
        />

        <div className="max-w-5xl w-full mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-orange-500/20
                       bg-orange-500/5 mb-7 sm:mb-10 backdrop-blur-sm"
          >
            <SparklesIcon className="w-3 h-3 text-orange-400" />
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-orange-300/70">
              Next-Gen Interview Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.8rem,12vw,8rem)] font-black tracking-tighter leading-[0.88] mb-5 sm:mb-6"
          >
            MASTER YOUR
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #ff6600 0%, #ff9933 40%, #cc4400 100%)",
              }}
            >
              INTERVIEWS.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-sm sm:max-w-xl mx-auto text-sm sm:text-base md:text-lg font-medium mb-8 sm:mb-12 leading-relaxed px-2"
            style={{ color: colors.textMuted, opacity: 0.7 }}
          >
            Practice real-world mock interviews with industry experts. Get
            instant feedback, track your growth, and land your dream job.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-14 sm:mb-20 w-full max-w-sm sm:max-w-none mx-auto"
          >
            <button
              onClick={() => navigate("/register")}
              className="px-8 sm:px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em]
                         flex items-center justify-center gap-2 group
                         shadow-[0_10px_40px_rgba(255,102,0,0.35)] hover:shadow-[0_12px_50px_rgba(255,102,0,0.5)]
                         hover:brightness-110 active:scale-95 transition-all"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              Start Mock Interview
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="px-8 sm:px-10 py-4 rounded-2xl border text-[11px] font-black uppercase
                         tracking-[0.2em] hover:bg-white/5 hover:border-white/20 transition-all active:scale-95"
              style={{ borderColor: colors.border, color: colors.textMuted }}
            >
              Hire Interviewers
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 sm:gap-12 justify-center"
          >
            <StatPill value="12K+" label="Interviews done" />
            <div className="w-px h-8 bg-white/10" />
            <StatPill value="98%" label="Satisfaction rate" />
            <div className="w-px h-8 bg-white/10" />
            <StatPill value="340+" label="Expert mentors" />
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.background})`,
          }}
        />
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24"
      >
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500 mb-3">
              Platform Features
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-tight">
              Everything You
              <br />
              <span style={{ color: colors.primary }}>Need to Win.</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs font-bold uppercase tracking-widest opacity-40 leading-relaxed">
            A full-stack interview preparation ecosystem, built for engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`${f.span} relative group p-6 sm:p-8 rounded-2xl border overflow-hidden cursor-default transition-colors duration-300`}
              style={{
                backgroundColor: f.accent
                  ? "rgba(255,102,0,0.04)"
                  : colors.surface,
                borderColor: colors.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,102,0,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
              }}
            >
              <div className="absolute right-4 bottom-4 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
                {React.cloneElement(f.icon, {
                  className: "w-32 sm:w-40 h-32 sm:h-40",
                })}
              </div>

              <Tag>{f.tag}</Tag>

              <div
                className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20
                              flex items-center justify-center text-orange-400 mt-5 sm:mt-6 mb-4 sm:mb-5
                              group-hover:bg-orange-500/15 transition-colors"
              >
                {f.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight leading-tight mb-2 sm:mb-3 whitespace-pre-line">
                {f.title}
              </h3>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-50 leading-relaxed max-w-xs">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24"
      >
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500 mb-3">
            Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter">
            Three Steps to{" "}
            <span style={{ color: colors.primary }}>Success.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
          {/* connector — only visible at sm+ */}
          <div className="hidden sm:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />

          {[
            {
              step: "01",
              title: "Pick an Expert",
              desc: "Browse profiles, filter by tech stack, seniority, or company.",
            },
            {
              step: "02",
              title: "Book a Session",
              desc: "Select a time slot. Receive a secure video room link instantly.",
            },
            {
              step: "03",
              title: "Get Hired",
              desc: "Review structured feedback on your dashboard and iterate fast.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-orange-500/30
                              flex items-center justify-center text-orange-400 text-[10px] font-black
                              tracking-widest mb-5 sm:mb-6 bg-orange-500/5"
              >
                {s.step}
              </div>
              <h3 className="text-base sm:text-lg font-black uppercase italic tracking-tight mb-2 sm:mb-3">
                {s.title}
              </h3>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-50 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-500 mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter">
            Common <span style={{ color: colors.primary }}>Questions.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border overflow-hidden transition-all duration-200"
              style={{
                borderColor:
                  activeFaq === i ? "rgba(255,102,0,0.4)" : colors.border,
                backgroundColor:
                  activeFaq === i ? "rgba(255,102,0,0.03)" : colors.surface,
              }}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-between text-left gap-3 sm:gap-4 outline-none"
              >
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] leading-relaxed">
                  {faq.q}
                </span>
                <div
                  className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center transition-colors"
                  style={{
                    borderColor:
                      activeFaq === i ? "rgba(255,102,0,0.5)" : colors.border,
                  }}
                >
                  {activeFaq === i ? (
                    <MinusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                  ) : (
                    <PlusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-7 pb-5 sm:pb-6 text-xs sm:text-sm font-medium leading-relaxed opacity-55 border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl px-6 sm:px-12 py-14 sm:py-16 text-center border border-orange-500/20"
          style={{ backgroundColor: "rgba(255,102,0,0.06)" }}
        >
          <Orb
            className="w-300px sm:w-500px h-200px sm:h-300px top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse, #ff6600 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-400 mb-4 sm:mb-5">
              Start Today
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter mb-5 sm:mb-8">
              Ready to Ace Your{" "}
              <span style={{ color: colors.primary }}>Interview?</span>
            </h2>
            <p className="max-w-sm sm:max-w-md mx-auto text-xs sm:text-sm opacity-50 font-medium mb-8 sm:mb-10 px-2">
              Join thousands of engineers who've levelled up their interview
              performance with ColloQ.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em]
                         shadow-[0_10px_50px_rgba(255,102,0,0.4)] hover:shadow-[0_12px_60px_rgba(255,102,0,0.55)]
                         hover:brightness-110 active:scale-95 transition-all inline-flex items-center justify-center gap-2 group"
              style={{ backgroundColor: colors.primary, color: "white" }}
            >
              Get Started — It's Free
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="border-t py-8 sm:py-10 px-4 sm:px-6"
        style={{ borderColor: colors.border }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-2 opacity-60">
            <Logo />
          </div>

          <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.4em] opacity-20 italic text-center">
            © 2026 ColloQ Platform. Engineered for Excellence.
          </p>

          <div className="flex gap-5 sm:gap-6 text-[9px] font-black uppercase tracking-widest opacity-30">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:opacity-60 transition-opacity"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
