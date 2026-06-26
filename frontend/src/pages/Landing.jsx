import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Aurora from "../components/bg";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const handleLearnMore = () => {
    // Redirect to DeepSeek API documentation
    window.open("https://api-docs.deepseek.com/", "_blank");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#5227FF", "#7cff67", "#5227FF"]}
          amplitude={1.2}
          blend={0.6}
        />
      </div>

      {/* Enhanced Navbar */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-5 backdrop-blur-xl bg-black/30 border-b border-white/10 shadow-lg shadow-blue-900/10">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group transition-all duration-300 hover:scale-105">
            <div className="w-5 h-5 bg-white rounded-md group-hover:rotate-45 transition-all duration-500"></div>
          </div>
          <div className="text-white text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent hover:from-blue-200 hover:to-white transition-all duration-300">
            DeepSeek
          </div>
        </div>

        {/* Navigation Links
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#about"
            className="text-white/70 hover:text-white text-lg font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5"
          >
            About
          </a>
          <a
            href="#features"
            className="text-white/70 hover:text-white text-lg font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5"
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-white/70 hover:text-white text-lg font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/5"
          >
            Contact
          </a>
        </div> */}

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-5">
          {user ? (
            <button
              onClick={() => navigate("/home")}
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30 border border-blue-500/20"
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10 border-b-2 border-transparent hover:border-blue-500"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30 border border-white/20"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold mb-8 leading-[0.85] tracking-tight">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent animate-gradient-shift text-5xl sm:text-7xl md:text-9xl lg:text-[12rem]">
              DeepSeek
            </span>
          </h1>

          <br />
          <br />

          <div className="flex flex-col items-center justify-center w-full">
            <p className="text-white/80 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-16 max-w-4xl mx-auto leading-relaxed font-light text-center px-4">
              Experience the future of AI-powered authentication and user
              management.
              <br className="hidden sm:block" />
              <span className="text-white/60">
                Secure, fast, and beautifully designed.
              </span>
            </p>
          </div>

          <br />
          <br />

          <div className="flex flex-col sm:flex-row gap-12 justify-center mt-15">
            <button
              onClick={handleGetStarted}
              className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white px-50 py-35 rounded-5xl text-6xl font-semibold transition-all duration-700 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/60 overflow-hidden"
            >
              <span className="relative z-20 transition-all duration-300 group-hover:drop-shadow-lg">
                Get Started
              </span>

              {/* Glassmorphism effect on hover */}
              <div className="absolute inset-0 backdrop-blur-sm bg-white/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

              {/* Animated Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-40 group-active:opacity-60 transition-all duration-500"></div>

              {/* Outer Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl opacity-0 group-hover:opacity-80 blur-xl transition-all duration-700 animate-pulse"></div>

              {/* Pulsing Inner Light */}
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 group-active:opacity-0 transition-all duration-300 animate-pulse"></div>

              {/* Rotating Border */}
              <div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-2xl"></div>

              {/* Shimmer Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>

              {/* Particle Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="absolute top-4 right-6 w-1 h-1 bg-cyan-300 rounded-full animate-ping"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="absolute bottom-3 left-8 w-1 h-1 bg-purple-300 rounded-full animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute bottom-2 right-4 w-1 h-1 bg-blue-300 rounded-full animate-ping"
                  style={{ animationDelay: "0.7s" }}
                ></div>
              </div>
            </button>

            <button
              onClick={handleLearnMore}
              className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/15 hover:border-white/70 active:bg-white/25 px-32 py-12 rounded-3xl text-6xl font-semibold transition-all duration-700 transform hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-20 transition-all duration-300 group-hover:drop-shadow-lg group-hover:text-blue-100">
                Learn More
              </span>

              {/* Glassmorphism effect on hover */}
              <div className="absolute inset-0 backdrop-blur-md bg-white/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

              {/* Animated Border Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-white/30 via-blue-400/40 to-purple-400/40 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-700"></div>

              {/* Rotating Gradient Border */}
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-60 transition-all duration-500 animate-spin"
                style={{ animationDuration: "4s" }}
              ></div>
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl"></div>

              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 group-active:opacity-60 transition-all duration-500"></div>

              {/* Double Shimmer Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
              <div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 skew-x-12"
                style={{ transitionDelay: "0.2s" }}
              ></div>

              {/* Floating Orbs */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div
                  className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s", animationDuration: "2s" }}
                ></div>
                <div
                  className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce"
                  style={{ animationDelay: "0.6s", animationDuration: "2.5s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce"
                  style={{ animationDelay: "1s", animationDuration: "1.8s" }}
                ></div>
              </div>

              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="absolute inset-0 border-2 border-white/30 rounded-2xl animate-ping"
                  style={{ animationDuration: "2s" }}
                ></div>
                <div
                  className="absolute inset-2 border border-blue-400/40 rounded-xl animate-ping"
                  style={{ animationDuration: "2.5s", animationDelay: "0.3s" }}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
