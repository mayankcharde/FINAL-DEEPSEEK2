import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Aurora from "../components/bg";

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Responses in milliseconds powered by state-of-the-art AI infrastructure.",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    desc: "End-to-end encrypted conversations. Your data stays yours, always.",
  },
  {
    icon: "🧠",
    title: "Deep Reasoning",
    desc: "Advanced chain-of-thought reasoning for complex problems and analysis.",
  },
  {
    icon: "🎨",
    title: "Image Generation",
    desc: "Create stunning visuals from text prompts with AI-powered generation.",
  },
  {
    icon: "🗣️",
    title: "Voice Interaction",
    desc: "Talk naturally with AI using built-in text-to-speech capabilities.",
  },
  {
    icon: "📚",
    title: "Chat History",
    desc: "Access all your conversations anytime with smart search and favorites.",
  },
];

const stats = [
  { value: "10M+", label: "AI Responses" },
  { value: "500K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Countries" },
];

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const featuresRef = useRef(null);

  const handleGetStarted = () => navigate(user ? "/home" : "/login");
  const scrollToFeatures = () =>
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen w-screen bg-[#050508] relative overflow-x-hidden">
      {/* ── Aurora Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#3b0fff", "#7c3aed", "#0ea5e9"]}
          amplitude={1.0}
          blend={0.5}
        />
      </div>
      {/* subtle dark overlay so text stays readable */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050508]/60" />

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/30 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16">
          <div className="grid grid-cols-3 items-center h-full">
            {/* Logo */}
            <div className="flex items-center gap-2.5 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md shadow-blue-500/30">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                DeepSeek
              </span>
            </div>

            {/* Center nav links */}
            <div className="hidden md:flex items-center justify-center gap-8">
              <button
                onClick={scrollToFeatures}
                className="text-white/55 hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={scrollToFeatures}
                className="text-white/55 hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
              >
                About
              </button>
              <a
                href="https://api-docs.deepseek.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white/55 hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200"
              >
                Docs
              </a>
            </div>

            {/* Auth buttons */}
            <div className="flex items-center justify-end gap-3">
              {user ? (
                <button
                  onClick={() => navigate("/home")}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] cursor-pointer"
                >
                  Dashboard →
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-white/65 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
                  >
                    Sign in
                  </button>
                  <span className="w-px h-4 bg-white/[0.12]" />
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-sm cursor-pointer"
                  >
                    Get started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO - MODERN LARGE HEADING
      ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full min-h-[85vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-white/65 text-sm font-medium"></span>
          </div>

          {/* Main Heading - Large & Modern */}
          <div className="max-w-5xl w-full">
            <h1 className="font-extrabold tracking-tight leading-[1.05] mb-6">
              <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                The AI that
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                thinks deeper
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-white/50 text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed mb-10">
            Experience next-generation AI with deep reasoning, image generation,
            voice interaction, and secure conversations — all in one platform.
          </p>

          <br />
          <br />
          <br />
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <button
              onClick={handleGetStarted}
              className="group relative bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-base px-10 py-4 rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.03] overflow-hidden cursor-pointer w-full sm:w-auto min-w-[200px]"
            >
              <span className="relative z-10">Start for free →</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </button>
            <button
              onClick={scrollToFeatures}
              className="text-white/65 hover:text-white font-medium text-base px-10 py-4 rounded-2xl border border-white/[0.12] hover:border-white/25 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer w-full sm:w-auto min-w-[200px]"
            >
              See features ↓
            </button>
          </div>

          <br />
          <br />
          <br />

          {/* Chat Preview */}
          <div className="mt-16 w-full max-w-3xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-white/[0.09] bg-white/[0.03] backdrop-blur-sm shadow-2xl shadow-black/70">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 mx-3 h-5 bg-white/[0.05] rounded-md flex items-center justify-center">
                  <span className="text-white/25 text-xs">
                    deepseek.ai/chat
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5">
                    You
                  </div>
                  <div className="bg-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-2.5 text-white/80 text-sm leading-relaxed max-w-xs">
                    Explain quantum entanglement in simple terms
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5">
                    AI
                  </div>
                  <div className="bg-blue-600/[0.15] border border-blue-500/20 rounded-2xl rounded-tl-sm px-4 py-2.5 text-white/80 text-sm leading-relaxed max-w-sm">
                    Imagine two coins flipped simultaneously — no matter how far
                    apart, when one lands heads, the other{" "}
                    <span className="text-blue-400 font-medium">instantly</span>{" "}
                    lands tails. That's quantum entanglement. ✨
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-10">
                  <div className="h-1.5 bg-white/[0.08] rounded-full w-40 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full w-3/4 animate-pulse" />
                  </div>
                  <span className="text-white/25 text-xs">Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}

      {/* ══════════════════════════════════════════
          FEATURES - PROPERLY ALIGNED
      ══════════════════════════════════════════ */}

      <br />
      <br />
      <br />
      <section ref={featuresRef} className="relative z-10 w-full py-20">
        <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-7xl">
            {/* Section header - centered */}
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Features
              </span>
              <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
                Everything you need
              </h2>
              <br />
              <p className="text-white/45 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto">
                Powerful tools built for modern AI workflows — from chat to
                creativity.
              </p>
            </div>

            <br />

            {/* Feature cards - centered grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="group flex flex-col p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.055] hover:border-white/[0.13] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/[0.08] flex items-center justify-center text-2xl mb-5 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />
      {/* ══════════════════════════════════════════
          CTA BANNER
          ══════════════════════════════════════════ */}
      <section className="relative z-10 w-full py-20">
        <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-5xl flex flex-col items-center text-center p-16 sm:p-20 rounded-3xl border border-white/[0.09] overflow-hidden">
            {/* background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-600/8 to-cyan-600/10 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />

            <div className="relative z-10 flex flex-col items-center w-full">
              <h2 className="text-white text-4xl sm:text-5xl font-bold tracking-tight mb-5">
                Ready to get started?
              </h2>
              <br />
              <p className="text-white/50 text-base sm:text-lg mb-10 max-w-xl leading-relaxed mx-auto">
                Join hundreds of thousands of users already exploring the future
                of AI.
              </p>
              <br />
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-base px-12 py-4 rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.03] cursor-pointer"
              >
                Create free account →
              </button>
            </div>
          </div>
        </div>
      </section>

      <br />
      <br />
      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="relative z-10 w-full border-t border-white/[0.06] py-8">
        <div className="w-full flex justify-center px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-white/50 text-sm font-medium">
                DeepSeek AI
              </span>
            </div>
            <p className="text-white/25 text-sm">
              © {new Date().getFullYear()} DeepSeek AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
