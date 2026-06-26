import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import axios from "../../utils/axios";
import PixelSnow from "../login-registerbg";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await axios.post("/api/auth/login", credentials);
      if (response.data.user) {
        login(response.data.user, response.data.token);
        navigate("/home", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setSubmitting(false);
    }
  };

  if (!loading && user) return <Navigate to="/home" replace />;

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pixel Snow Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <PixelSnow />
      </div>
      {/* Background glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to home
        </button>
        <br />

        {/* Card */}
        <div className="bg-transparent border border-white/[0.08] rounded-3xl p-8 shadow-2xl shadow-black/60">
          {/* Logo + Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-600/30 mb-5">
              <svg
                className="w-7 h-7 text-white"
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
            <br />
            <h1 className="text-white text-2xl font-bold tracking-tight mb-1">
              Welcome back
            </h1>
            <br />
            <p className="text-white/40 text-sm">
              Sign in to your DeepSeek account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <br />
            <div>
              <label className="block text-white/60 text-sm font-medium mb-1.5">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <br />
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-white/60 text-sm font-medium">
                  Password
                </label>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 text-xs transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-12 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                  required
                />
                <br />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <br />
            <br />
            <span className="text-white/25 text-xs">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Register link */}
          <p className="text-center text-white/40 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Create one free
            </Link>
          </p>
        </div>
        <br />

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} DeepSeek AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
