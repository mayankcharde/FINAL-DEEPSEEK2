// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
// import axios from "../../utils/axios";

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formFocused, setFormFocused] = useState(false);
//   const formRef = useRef(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // Track mouse position for interactive background effects
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   // Check if the form is focused
//   useEffect(() => {
//     const checkFocus = (e) => {
//       if (formRef.current && formRef.current.contains(e.target)) {
//         setFormFocused(true);
//       } else {
//         setFormFocused(false);
//       }
//     };

//     document.addEventListener("focusin", checkFocus);
//     document.addEventListener("click", checkFocus);
//     return () => {
//       document.removeEventListener("focusin", checkFocus);
//       document.removeEventListener("click", checkFocus);
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("/api/auth/login", credentials);

//       if (response.data.user) {
//         login(response.data.user);
//         setTimeout(() => {
//           navigate("/home", { replace: true });
//         }, 0);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-6 py-16 relative overflow-hidden">
//       {/* Advanced Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Dynamic nebula-like formations */}
//         <div
//           className="absolute w-[900px] h-[900px] rounded-full bg-gradient-to-br from-blue-900/20 via-indigo-800/15 to-purple-900/20 blur-[120px] animate-nebula-pulse"
//           style={{
//             top: `calc(${mousePosition.y / 20}px - 450px)`,
//             left: `calc(${mousePosition.x / 20}px - 450px)`,
//             transform: `scale(${formFocused ? 1.1 : 1})`,
//             transition: "transform 1s ease-out",
//           }}
//         ></div>

//         <div className="absolute top-0 -left-40 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-700/30 via-blue-700/20 to-cyan-500/30 blur-[120px] animate-float"></div>
//         <div className="absolute bottom-0 -right-40 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-fuchsia-700/20 via-purple-700/20 to-violet-500/30 blur-[120px] animate-float animation-delay-3000"></div>

//         {/* Aurora effect */}
//         <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-blue-900/10 to-transparent overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 animate-aurora-wave"></div>
//         </div>

//         {/* Cosmic dust particles */}
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={`dust-${i}`}
//             className="absolute rounded-full bg-white/30 backdrop-blur-sm animate-particle-drift"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               width: `${Math.random() * 60 + 20}px`,
//               height: `${Math.random() * 60 + 20}px`,
//               opacity: Math.random() * 0.2 + 0.1,
//               animationDelay: `${Math.random() * 10}s`,
//               animationDuration: `${20 + Math.random() * 20}s`,
//             }}
//           ></div>
//         ))}

//         {/* Interactive gradient rotation based on mouse position */}
//         <div
//           className="absolute inset-0 opacity-20 pointer-events-none"
//           style={{
//             background: `conic-gradient(from ${
//               (mousePosition.x / window.innerWidth) * 360
//             }deg at 50% 50%, rgba(56, 189, 248, 0.3) 0deg, rgba(192, 132, 252, 0.3) 180deg, rgba(56, 189, 248, 0.3) 360deg)`,
//             transition: "background 0.5s ease",
//           }}
//         ></div>

//         {/* Enhanced stars effect with three star types */}
//         <div className="stars-container">
//           {/* Bright larger stars with strong glow */}
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={`bright-star-${i}`}
//               className="absolute"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 width: `${Math.max(2, Math.random() * 4)}px`,
//                 height: `${Math.max(2, Math.random() * 4)}px`,
//                 borderRadius: "50%",
//                 background: "white",
//                 boxShadow: `0 0 ${Math.random() * 15 + 10}px ${
//                   Math.random() * 5 + 3
//                 }px rgba(255,255,255,${Math.random() * 0.7 + 0.3})`,
//                 animation: `pulse-glow ${
//                   3 + Math.random() * 4
//                 }s ease-in-out infinite ${Math.random() * 10}s`,
//               }}
//             >
//               {/* Star flare effect */}
//               <div
//                 className="absolute w-[200%] h-[1px] bg-white/20"
//                 style={{
//                   top: "50%",
//                   left: "-50%",
//                   transform: `rotate(${Math.random() * 180}deg)`,
//                 }}
//               ></div>
//               <div
//                 className="absolute w-[1px] h-[200%]  bg-white/20"
//                 style={{
//                   top: "-50%",
//                   left: "50%",
//                   transform: `rotate(${Math.random() * 180}deg)`,
//                 }}
//               ></div>
//             </div>
//           ))}

//           {/* Medium sparkling stars */}
//           {[...Array(30)].map((_, i) => (
//             <div
//               key={`sparkle-star-${i}`}
//               className="absolute animate-sparkle"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 width: `${Math.random() * 3 + 2}px`,
//                 height: `${Math.random() * 3 + 2}px`,
//                 borderRadius: "50%",
//                 background: "white",
//                 boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() * 3 + 2}px rgba(255,255,255,${Math.random() * 0.6 + 0.4})`,
//                 "--sparkle-duration": `${Math.random() * 4 + 2}s`,
//                 animationDelay: `${Math.random() * 10}s`,
//               }}
//             ></div>
//           ))}

//           {/* Small background stars */}
//           {[...Array(60)].map((_, i) => (
//             <div
//               key={`small-star-${i}`}
//               className="absolute bg-white rounded-full animate-twinkle"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 width: `${Math.max(1, Math.random() * 2)}px`,
//                 height: `${Math.max(1, Math.random() * 2)}px`,
//                 opacity: Math.random() * 0.5 + 0.1,
//                 animationDelay: `${Math.random() * 10}s`,
//                 animationDuration: `${3 + Math.random() * 7}s`,
//               }}
//             ></div>
//           ))}

//           {/* Enhanced shooting stars */}
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={`shooting-star-${i}`}
//               className={`absolute animate-shooting-star animation-delay-${i * 2000}`}
//               style={{
//                 top: `${Math.random() * 50}%`,
//                 left: `${Math.random() * 30}%`,
//                 opacity: 0,
//                 zIndex: 2,
//               }}
//             >
//               <div
//                 className="w-[150px] h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent"
//                 style={{
//                   transform: `rotate(${Math.random() * 45 + 15}deg)`,
//                 }}
//               >
//                 <div
//                   className="absolute left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
//                   style={{
//                     boxShadow:
//                       "0 0 20px 4px rgba(255,255,255,0.8), 0 0 30px 8px rgba(200,220,255,0.6)",
//                   }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Dynamic vignette that responds to form focus */}
//         <div
//           className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] transition-opacity duration-1000"
//           style={{
//             opacity: formFocused ? 0.9 : 0.7,
//           }}
//         ></div>
//       </div>

//       <div ref={formRef} className="relative z-10 w-full max-w-lg mx-auto">
//         {/* Logo Section with enhanced glow */}
//         <div className="text-center mb-14">
//           <div className="flex justify-center mb-8">
//             <div
//               className="relative group"
//               style={{
//                 transform: `translateY(${formFocused ? "-10px" : "0px"})`,
//                 transition: "transform 0.5s ease-out",
//               }}
//             >
//               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-40 blur-xl group-hover:opacity-70 group-hover:blur-2xl transition duration-1000 animate-pulse-glow"></div>
//               <div className="relative">
//                 <img
//                   src="/deepseekfinal.jpg"
//                   alt="DeepSeek Logo"
//                   className="h-24 transition-all duration-500 hover:scale-110 drop-shadow-2xl rounded-full"
//                 />
//               </div>
//             </div>
//           </div>
//           <div
//             className="space-y-4 transition-all duration-500"
//             style={{ transform: formFocused ? "scale(0.95)" : "scale(1)" }}
//           >
//             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-indigo-300 tracking-tight">
//               Welcome Back
//             </h1>
//             <p className="text-zinc-400 text-lg font-medium">
//               Sign in to continue your AI journey
//             </p>
//           </div>
//         </div>

//         {/* Enhanced Login Form with advanced glass effect */}
//         <div
//           className={`bg-zinc-900/40 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-12 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] transition-all duration-500 ${
//             formFocused
//               ? "shadow-[0_20px_80px_-10px_rgba(56,189,248,0.3)]"
//               : "hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)]"
//           }`}
//         >
//           {error && (
//             <div className="mb-10 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium backdrop-blur-sm animate-pulse">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Form fields container with proper spacing */}
//             <div className="space-y-6">
//               {/* Email Input with enhanced styling */}
//               <div className="space-y-2.5">
//                 <label className="text-zinc-300 text-sm font-medium ml-1 flex items-center gap-2 transition-colors duration-300">
//                   <Mail className="h-4 w-4 text-blue-400" />
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl"></div>
//                   <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors duration-300" />
//                   </div>
//                   <input
//                     type="email"
//                     placeholder="Enter your email address"
//                     value={credentials.email}
//                     onChange={(e) =>
//                       setCredentials({ ...credentials, email: e.target.value })
//                     }
//                     className="w-full pl-14 pr-5 py-4 bg-zinc-800/50 border border-zinc-600/40 rounded-2xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300 text-base relative focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Input with enhanced styling */}
//               <div className="space-y-2.5">
//                 <label className="text-zinc-300 text-sm font-medium ml-1 flex items-center gap-2 transition-colors duration-300">
//                   <Lock className="h-4 w-4 text-blue-400" />
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl"></div>
//                   <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors duration-300" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={credentials.password}
//                     onChange={(e) =>
//                       setCredentials({
//                         ...credentials,
//                         password: e.target.value,
//                       })
//                     }
//                     className="w-full pl-14 pr-14 py-4 bg-zinc-800/50 border border-zinc-600/40 rounded-2xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300 text-base relative focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Forgot Password Link */}
//             <div className="text-right">
//               <a
//                 href="#"
//                 className="text-sm text-blue-400 hover:text-blue-300 transition-all duration-300 hover:underline hover:underline-offset-4"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Advanced Login Button with hover and focus effects */}
//             <div className="pt-4">
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow"></div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="relative w-full py-4 rounded-2xl font-semibold text-base transition-all duration-500 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-white shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
//                 >
//                   {loading ? (
//                     <span className="inline-flex items-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Signing in...
//                     </span>
//                   ) : (
//                     <>
//                       <LogIn className="h-5 w-5" />
//                       <span>Sign In</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>

//           {/* Enhanced Divider with animated gradient */}
//           <div className="relative my-10">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-6 bg-zinc-900/40 text-zinc-400 font-medium backdrop-blur-sm">
//                 or continue with
//               </span>
//             </div>
//           </div>

//           {/* Register Link with enhanced styling and hover effect */}
//           <div className="text-center space-y-4 pt-2">
//             <p className="text-zinc-400 text-base">Don't have an account?</p>
//             <Link
//               to="/register"
//               className="relative inline-flex items-center justify-center w-full px-6 py-4 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-600/40 hover:border-zinc-500/40 text-zinc-200 hover:text-white rounded-2xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 transform hover:-translate-y-1 overflow-hidden group"
//             >
//               <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
//               <span className="relative">Create New Account</span>
//             </Link>
//           </div>
//         </div>

//         {/* Added footer text with subtle hover effect */}
//         <div className="mt-8 text-center">
//           <p className="text-zinc-500 text-sm transition-colors duration-300 hover:text-zinc-400">
//             © 2023 DeepSeek AI. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import axios from "../../utils/axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();



  // Check if the form is focused
  useEffect(() => {
    const checkFocus = (e) => {
      if (formRef.current && formRef.current.contains(e.target)) {
        setFormFocused(true);
      } else {
        setFormFocused(false);
      }
    };

    document.addEventListener("focusin", checkFocus);
    document.addEventListener("click", checkFocus);
    return () => {
      document.removeEventListener("focusin", checkFocus);
      document.removeEventListener("click", checkFocus);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", credentials);

      if (response.data.user) {
        login(response.data.user);
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 0);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 py-16 relative overflow-hidden">
      {/* Futuristic smooth background */}
      <div className="absolute inset-0 animate-futuristic-flow"></div>
      <div className="absolute inset-0 bg-black/75"></div>

      <div ref={formRef} className="relative z-10 w-full max-w-lg mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </button>
        </div>
        
        {/* Logo Section with enhanced glow */}
        <div className="text-center mb-14">
          <div className="flex justify-center mb-8">
            <div
              className="relative group"
              style={{
                transform: `translateY(${formFocused ? "-10px" : "0px"})`,
                transition: "transform 0.5s ease-out",
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-40 blur-xl group-hover:opacity-70 group-hover:blur-2xl transition duration-1000 animate-pulse-glow"></div>
              <div className="relative">
                <img
                  src="/deepseekfinal.jpg"
                  alt="DeepSeek Logo"
                  className="h-24 transition-all duration-500 hover:scale-110 drop-shadow-2xl rounded-full"
                />
              </div>
            </div>
          </div>
          <div
            className="space-y-4 transition-all duration-500"
            style={{ transform: formFocused ? "scale(0.95)" : "scale(1)" }}
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-indigo-300 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-zinc-400 text-lg font-medium">
              Sign in to continue your AI journey
            </p>
          </div>
        </div>

        {/* Enhanced Login Form with advanced glass effect */}
        <div
          className={`bg-zinc-900/40 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-12 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] transition-all duration-500 ${
            formFocused
              ? "shadow-[0_20px_80px_-10px_rgba(56,189,248,0.3)]"
              : "hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)]"
          }`}
        >
          {error && (
            <div className="mb-10 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium backdrop-blur-sm animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form fields container with proper spacing */}
            <div className="space-y-6">
              {/* Email Input with enhanced styling */}
              <div className="space-y-2.5">
                <label className="text-zinc-300 text-sm font-medium ml-1 flex items-center gap-2 transition-colors duration-300">
                  {/* <Mail className="h-4 w-4 text-blue-400" /> */}
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    className="w-full pl-5 pr-5 py-4 bg-zinc-800/50 border border-zinc-600/40 rounded-2xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300 text-base relative focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                    required
                  />
                </div>
              </div>

              {/* Password Input with enhanced styling */}
              <div className="space-y-2.5">
                <label className="text-zinc-300 text-sm font-medium ml-1 flex items-center gap-2 transition-colors duration-300">
                  {/* <Lock className="h-4 w-4 text-blue-400" /> */}
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="w-full pl-5 pr-14 py-4 bg-zinc-800/50 border border-zinc-600/40 rounded-2xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300 text-base relative focus:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 transition-all duration-300 hover:underline hover:underline-offset-4"
              >
                Forgot password?
              </a>
            </div>

            {/* Advanced Login Button with hover and focus effects */}
            <div className="pt-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow"></div>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-4 rounded-2xl font-semibold text-base transition-all duration-500 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-white shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Enhanced Divider with animated gradient */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-6 bg-zinc-900/40 text-zinc-400 font-medium backdrop-blur-sm">
                or continue with
              </span>
            </div>
          </div>

          {/* Register Link with enhanced styling and hover effect */}
          <div className="text-center space-y-4 pt-2">
            <p className="text-zinc-400 text-base">Don't have an account?</p>
            <Link
              to="/register"
              className="relative inline-flex items-center justify-center w-full px-6 py-4 bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-600/40 hover:border-zinc-500/40 text-zinc-200 hover:text-white rounded-2xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 transform hover:-translate-y-1 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative">Create New Account</span>
            </Link>
          </div>
        </div>

        {/* Added footer text with subtle hover effect */}
        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm transition-colors duration-300 hover:text-zinc-400">
            © 2023 DeepSeek AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
