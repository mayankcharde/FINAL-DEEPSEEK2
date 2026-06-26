import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/razorpay/ProductCard";
import ProductCard2 from "../components/razorpay/ProductCard2";
import ProductCard3 from "../components/razorpay/ProductCard3";

const Subscription = () => {
  const [showProductCard, setShowProductCard] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 text-white relative overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-blue-600 scrollbar-thumb-rounded-full lg:flex lg:items-center lg:justify-center">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] opacity-50"></div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 lg:py-16 xl:py-20 relative z-10 min-h-screen lg:min-h-0 lg:flex lg:flex-col lg:justify-center">
        {/* Back Button */}
        <button
          onClick={() => navigate('/home')}
          className="mb-3 inline-flex items-center gap-1 px-2 py-1 text-xs bg-slate-800/30 hover:bg-slate-700/40 border border-slate-600/20 hover:border-slate-500/30 rounded-md text-slate-400 hover:text-white transition-all duration-200"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline text-xs">Back</span>
        </button>
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 xl:mb-14 w-full">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-5 lg:mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 text-sm font-medium">Premium Plans Available</span>
          </div>
          <br />
          <br />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight px-2 sm:px-4">
            Choose Your Plan
          </h1>
          <p className="text-center text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-300 mb-6 lg:mb-8 xl:mb-10 max-w-4xl mx-auto leading-relaxed">
            {/* Unlock the full potential of AI with our carefully crafted subscription plans designed for every need */}
          </p>
        </div>

        <br />
        <br />
     
    

        {/* Plans Grid */}
        <div className="w-full mb-10 sm:mb-12 lg:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
            {/* Free Plan */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-800/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-black/80 backdrop-blur-2xl border border-slate-600/30 rounded-3xl p-8 flex flex-col transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] hover:border-slate-400/50 hover:scale-[1.03] h-full text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                
                <div className="relative z-10 mb-8">
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-slate-500/50 transition-all duration-700 group-hover:rotate-6 group-hover:scale-110">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                      <div className="absolute inset-0 bg-slate-400/10 rounded-2xl animate-pulse"></div>
                      <svg className="w-10 h-10 text-slate-200 relative z-10 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-slate-100 transition-colors duration-300">Free</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                  </div>
                  <div className="text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-white to-slate-300 bg-clip-text group-hover:from-slate-100 group-hover:to-white transition-all duration-500">
                    ₹0
                    <span className="text-xl font-medium text-slate-400 ml-2 group-hover:text-slate-300 transition-colors duration-300">
                      /mo
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-300">
                    Perfect for exploring AI capabilities
                  </p>
                </div>
                <button
                  onClick={() => navigate('/home')}
                  className="relative w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-500 hover:to-slate-600 mb-8 transition-all duration-300 shadow-lg overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
                  <span className="relative z-10">Current Plan</span>
                </button>
                <ul className="space-y-3 flex-grow mb-5 text-left">
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Access to Deepseek
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Limited file uploads
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Limited and slower image generation
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Limited memory and context
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Limited deep research
                  </li>
                </ul>
                <div className="text-xs text-gray-500 mt-auto">
                  <a href="#" className="text-blue-500 hover:underline">
                    {/* Have an existing plan? See billing help */}
                  </a>
                </div>
              </div>
            </div>

            {/* Go Plan */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-900/90 via-blue-800/70 to-indigo-900/80 backdrop-blur-2xl border-2 border-blue-400/60 rounded-3xl p-8 flex flex-col transition-all duration-700 hover:-translate-y-6 hover:shadow-[0_50px_100px_-20px_rgba(59,130,246,0.6)] hover:border-blue-300/80 hover:scale-[1.05] h-full text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:h-2 transition-all duration-700"></div>
                
                {/* Enhanced Popular tag */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-2xl shadow-orange-500/50 border border-yellow-300/50 group-hover:scale-110 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <span>Most Popular</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
                
                <div className="relative z-10 mb-8 mt-8">
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-blue-500/60 transition-all duration-700 group-hover:rotate-12 group-hover:scale-125">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                      <div className="absolute inset-0 bg-blue-400/20 rounded-2xl animate-pulse"></div>
                      <svg className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-100 transition-colors duration-300">Go</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-full group-hover:w-24 group-hover:h-1.5 transition-all duration-500"></div>
                  </div>
                  <div className="text-5xl font-bold mb-2 text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text group-hover:from-white group-hover:to-blue-100 transition-all duration-500">
                    ₹1
                    <span className="text-xl font-medium text-blue-200 ml-2 group-hover:text-blue-100 transition-colors duration-300">
                      /mo
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/80 mb-4 font-medium group-hover:text-blue-100/90 transition-colors duration-300">(inclusive of GST)</p>
                  <p className="text-blue-100 leading-relaxed text-base group-hover:text-white transition-colors duration-300">
                    Enhanced AI for power users
                  </p>
                </div>
                <button 
                  onClick={() => setShowProductCard('go')}
                  className="relative w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-2xl shadow-blue-600/50 mb-8 transform hover:scale-105 hover:shadow-3xl overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Upgrade to Go</span>
                </button>
                <ul className="space-y-3 flex-grow mb-5 text-left">
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Access to Deepseek
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Expanded messaging and uploads
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Expanded and faster image creation
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Longer memory and context
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Limited deep research
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Projects, tasks, custom GPTs
                  </li>
                </ul>
                <div className="text-xs text-gray-500 mt-auto">
                  {/* <p>Only available in certain regions. Limits apply</p> */}
                </div>
              </div>
            </div>

            {/* Plus Plan */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-purple-900/80 via-indigo-900/70 to-pink-900/60 backdrop-blur-2xl border-2 border-purple-500/50 rounded-3xl p-8 flex flex-col transition-all duration-700 hover:-translate-y-5 hover:shadow-[0_45px_90px_-20px_rgba(168,85,247,0.5)] hover:border-purple-400/70 hover:scale-[1.04] h-full text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent group-hover:h-1.5 transition-all duration-700"></div>
                
                <div className="relative z-10 mb-8">
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-700 to-pink-700 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-purple-500/60 transition-all duration-700 group-hover:rotate-[-6deg] group-hover:scale-115">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent rounded-2xl"></div>
                      <div className="absolute inset-0 bg-purple-400/20 rounded-2xl animate-pulse"></div>
                      <svg className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-purple-100 transition-colors duration-300">Plus</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full group-hover:w-20 group-hover:h-1.5 transition-all duration-500"></div>
                  </div>
                  <div className="text-5xl font-bold mb-2 text-transparent bg-gradient-to-r from-purple-200 via-white to-pink-200 bg-clip-text group-hover:from-white group-hover:to-purple-100 transition-all duration-500">
                    ₹1
                    <span className="text-xl font-medium text-purple-200 ml-2 group-hover:text-purple-100 transition-colors duration-300">
                      /mo
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/80 mb-4 font-medium group-hover:text-purple-100/90 transition-colors duration-300">(inclusive of GST)</p>
                  <p className="text-purple-100 leading-relaxed text-base group-hover:text-white transition-colors duration-300">
                    Professional AI for advanced workflows
                  </p>
                </div>
                <button 
                  onClick={() => setShowProductCard('plus')}
                  className="relative w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-2xl shadow-blue-600/40 mb-8 transform hover:scale-105 hover:shadow-3xl overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Get Plus</span>
                </button>
                <ul className="space-y-3 flex-grow mb-5 text-left">
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Deepseek with advanced reasoning
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Expanded messaging and uploads
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Expanded and faster image creation
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Longer memory and context
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Limited deep research
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-blue-500 font-bold mr-2">✓</span>
                    Projects, tasks, custom GPTs
                  </li>
                </ul>
                <div className="text-xs text-gray-500 mt-auto">
                  {/* <p>Only available in certain regions. Limits apply</p> */}
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-orange-600/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-900/95 via-black/80 to-amber-900/60 backdrop-blur-2xl border-2 border-amber-500/60 rounded-3xl p-8 flex flex-col transition-all duration-700 hover:-translate-y-6 hover:shadow-[0_50px_100px_-20px_rgba(245,158,11,0.6)] hover:border-amber-400/80 hover:scale-[1.05] h-full text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent group-hover:h-2 transition-all duration-700"></div>
                
                <div className="relative z-10 mb-8">
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-amber-400 via-orange-600 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-amber-500/60 transition-all duration-700 group-hover:rotate-12 group-hover:scale-125">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                      <div className="absolute inset-0 bg-amber-400/30 rounded-2xl animate-pulse"></div>
                      <svg className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-amber-100 transition-colors duration-300">Pro</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 rounded-full group-hover:w-24 group-hover:h-1.5 transition-all duration-500"></div>
                  </div>
                  <div className="text-5xl font-bold mb-2 text-transparent bg-gradient-to-r from-amber-200 via-white to-orange-200 bg-clip-text group-hover:from-white group-hover:to-amber-100 transition-all duration-500">
                    ₹1
                    <span className="text-xl font-medium text-amber-200 ml-2 group-hover:text-amber-100 transition-colors duration-300">
                      /mo
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/80 mb-4 font-medium group-hover:text-amber-100/90 transition-colors duration-300">(inclusive of GST)</p>
                  <p className="text-amber-100 leading-relaxed text-base group-hover:text-white transition-colors duration-300">
                    Enterprise-grade AI solutions
                  </p>
                </div>
                <button 
                  onClick={() => setShowProductCard('pro')}
                  className="relative w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-600 to-orange-700 text-white hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-2xl shadow-amber-600/40 mb-8 transform hover:scale-105 hover:shadow-3xl overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Upgrade to Pro</span>
                </button>
                <ul className="space-y-3 flex-grow mb-5 text-left">
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Advanced Deepseek with pro reasoning
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Unlimited messages and uploads
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Unlimited and faster image creation
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Maximum memory and context
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Maximum deep research and agent mode
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Expanded projects, tasks, and custom Deepseek
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Expanded Deepseek video generation
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Expanded Codex agent
                  </li>
                  <li className="flex items-start text-sm leading-relaxed">
                    <span className="text-amber-400 font-bold mr-2">✓</span>
                    Research preview of new features
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        {/* <div className="w-full flex justify-center items-center px-4">
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 lg:p-12 max-w-2xl w-full text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Need a Custom Enterprise Solution?
            </h3>
            <p className="text-slate-300 mb-6 sm:mb-8 text-base sm:text-lg">
              Get tailored AI solutions designed specifically for your organization's unique requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all duration-300 group shadow-lg shadow-blue-600/30 transform hover:scale-105">
                Contact Sales
              </button>
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition-all duration-300 group">
                Schedule Demo
              </button>
            </div>
          </div>
        </div> */}
      </div>
      
      {/* ProductCard Modal */}
      {showProductCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button 
              onClick={() => setShowProductCard(null)}
              className="absolute -top-4 -right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors duration-200"
            >
              ×
            </button>
            {showProductCard === 'go' && <ProductCard2 />}
            {showProductCard === 'plus' && <ProductCard3 />}
            {showProductCard === 'pro' && <ProductCard />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
