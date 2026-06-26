import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";
import axios from "../../utils/axios";
import PixelSnow from "../login-registerbg";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    profilePhoto: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();

  const validateForm = () => {
    if (!userData.name || !userData.email || !userData.password) {
      setError("All fields are required");
      return false;
    }
    if (userData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const max = 300;
      let { width, height } = img;
      if (width > height) {
        if (width > max) {
          height = (height * max) / width;
          width = max;
        }
      } else {
        if (height > max) {
          width = (width * max) / height;
          height = max;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      setUserData((prev) => ({
        ...prev,
        profilePhoto: canvas.toDataURL("image/jpeg", 0.7),
      }));
    };
    img.src = URL.createObjectURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await axios.post("/api/auth/signup", userData);
      if (response.data.user) {
        login(response.data.user, response.data.token);
        navigate("/home", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    } finally {
      setSubmitting(false);
    }
  };

  const getPasswordStrength = () => {
    const { password } = userData;
    if (!password.length) return null;
    if (password.length < 6)
      return {
        width: "w-1/3",
        color: "bg-red-500",
        label: "Weak",
        textColor: "text-red-400",
      };
    if (password.length < 10)
      return {
        width: "w-2/3",
        color: "bg-yellow-500",
        label: "Medium",
        textColor: "text-yellow-400",
      };
    return {
      width: "w-full",
      color: "bg-emerald-500",
      label: "Strong",
      textColor: "text-emerald-400",
    };
  };

  const strength = getPasswordStrength();

  if (!loading && user) return <Navigate to="/home" replace />;

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 py-10 relative overflow-hidden">
      {/* Pixel Snow Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <PixelSnow />
      </div>
      {/* Background glows */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none z-0" />

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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-600/30 mb-5">
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
            <h1 className="text-white text-2xl font-bold tracking-tight mb-1">
              Create your account
            </h1>
            <br />
            <p className="text-white/40 text-sm">
              Start exploring AI with DeepSeek
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <br />
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-white/60 text-sm font-medium mb-1.5">
                Full name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-10 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
                  required
                />
                {userData.name && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                )}
              </div>
            </div>

            <br />
            {/* Email */}
            <div>
              <label className="block text-white/60 text-sm font-medium mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-10 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
                  required
                />
                {userData.email.includes("@") && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                )}
              </div>
            </div>

            <br />
            {/* Password */}
            <div>
              <label className="block text-white/60 text-sm font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 6 characters"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-12 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.08] focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
                  required
                />
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
              {/* Password strength bar */}
              {strength && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${strength.width} ${strength.color}`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${strength.textColor}`}
                    >
                      {strength.label}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <br />
            {/* Profile Photo */}
            <div>
              <label className="block text-white/60 text-sm font-medium mb-1.5">
                Profile photo <span className="text-white/25">(optional)</span>
              </label>
              <div className="flex items-center gap-3">
                {userData.profilePhoto ? (
                  <img
                    src={userData.profilePhoto}
                    alt="Preview"
                    className="w-10 h-10 rounded-full object-cover border border-white/20 flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-white/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="px-4 py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white/50 hover:text-white/70 hover:bg-white/[0.08] text-sm text-center transition-all duration-200">
                    {userData.profilePhoto ? "Change photo" : "Upload photo"}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <br />
            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
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
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <br />
          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-white/25 text-xs">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <br />
          {/* Login link */}
          <p className="text-center text-white/40 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200"
            >
              Sign in
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

export default Register;
