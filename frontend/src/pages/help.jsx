import React, { useState } from "react";
import {
  ArrowLeft,
  HelpCircle,
  Book,
  MessageSquare,
  FileText,
  Link2,
  Search,
  Settings,
  Shield,
  Zap,
  Brain,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Book,
      color: "blue",
      description:
        "New to DeepSeek? Learn the basics and get up and running quickly.",
      topics: [
        "What is DeepSeek AI?",
        "Creating your first account",
        "Starting your first conversation",
        "Understanding the interface",
        "Basic chat commands",
      ],
    },
    {
      id: "features",
      title: "Features & Usage",
      icon: Settings,
      color: "purple",
      description: "Discover all the powerful features DeepSeek has to offer.",
      topics: [
        "Switching between AI models",
        "Voice input and output",
        "File and image uploads",
        "Sharing conversations",
        "Customizing preferences",
      ],
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: Shield,
      color: "green",
      description: "Learn how we protect your data and maintain your privacy.",
      topics: [
        "Data encryption and storage",
        "Managing chat history",
        "Account security settings",
        "Privacy controls",
        "Data deletion requests",
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: Zap,
      color: "yellow",
      description: "Quick solutions to common issues and technical problems.",
      topics: [
        "Connection problems",
        "Model not responding",
        "Login and authentication issues",
        "Performance optimization",
        "Browser compatibility",
      ],
    },
    {
      id: "prompts",
      title: "Better Prompts",
      icon: Brain,
      color: "indigo",
      description:
        "Master the art of writing effective prompts for better AI responses.",
      topics: [
        "Writing clear instructions",
        "Providing context and examples",
        "Structuring complex requests",
        "Using system prompts",
        "Prompt engineering tips",
      ],
    },
    {
      id: "support",
      title: "Get Support",
      icon: Phone,
      color: "red",
      description: "Contact our support team or find additional resources.",
      topics: [
        "Email support",
        "Community forum",
        "Bug reporting",
        "Feature requests",
        "Status page",
      ],
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      green: "bg-green-500/10 text-green-400 border-green-500/20",
      yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      red: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-blue-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent mb-6">
              Help Center
            </h1>
            {/* <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions and learn how to get the most out
              of DeepSeek AI.
            </p> */}
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-6">
            <div className="relative">
              {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-zinc-400"
              /> */}
            </div>
          </div>
        </div>

        {/* Help Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {helpCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 hover:bg-zinc-900/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 h-full flex flex-col"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${getColorClasses(
                    category.color
                  )} border`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors">
                  {category.title}
                </h3>

                <p className="text-zinc-400 mb-4 leading-relaxed">
                  {category.description}
                </p>

                <ul className="space-y-2 mt-auto">
                  {category.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-zinc-300 hover:text-blue-400 transition-colors cursor-pointer">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          {/* <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/30 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-blue-100">
              Quick Start Guide
            </h3>
            <p className="text-blue-200/80 mb-6 leading-relaxed">
              Get up and running with DeepSeek in just a few minutes. Perfect
              for new users.
            </p>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-lg mt-auto self-start">
              Start Tutorial
            </button>
          </div> */}

          {/* <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/30 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-purple-100">
              Video Tutorials
            </h3>
            <p className="text-purple-200/80 mb-6 leading-relaxed">
              Watch step-by-step video guides to master DeepSeek's advanced
              features.
            </p>
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-lg mt-auto self-start">
              Watch Videos
            </button>
          </div> */}
        </div>

        <br />
        <br />
        {/* Contact Support */}
        <div className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/30 border border-zinc-700 rounded-4xl p-4 sm:p-8 lg:p-5 text-center max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Still need help?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Our support team is ready to assist with any questions or issues
              you might have. We typically respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-3 justify-center hover:scale-105 hover:shadow-lg">
                <Link2 className="h-5 w-5" />
                <span>Contact Support-[+91 9699561658]</span>
              </button>
              <button className="border border-zinc-600 hover:border-zinc-500 text-zinc-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-3 justify-center hover:bg-zinc-800/50">
                <MessageSquare className="h-5 w-5" />
                <span>Email: mayankcharde2@gmail.com</span>
              </button>
            </div>
          </div>
        </div>

        <br />
        <br />
        {/* Developer Info Section */}
        <div className="mt-16 mb-10 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 border border-blue-800/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Designed and Developed By
            </h2>

            <br />
            <div className="flex justify-center">
              <br />
              {/* Lead Developer */}
              <div className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-4xl p-5 hover:border-blue-600/50 transition-all duration-300 max-w-md w-full">
                <div className="flex items-center mb-4 justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    MC
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      Mayank Shirish Charde
                    </h3>
                    {/* <p className="text-blue-400 text-sm">Lead Developer</p> */}
                  </div>
                </div>
                <br />

                <div className="mt-4 flex gap-3 justify-center">
                  <a
                    href="https://github.com/mayankcharde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <br />
                  <br />
                  <a
                    href="https://www.linkedin.com/in/mayank-charde-56636b2a4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-zinc-400 text-sm">
                © {new Date().getFullYear()} DeepSeek AI
              </p>
              <p className="text-zinc-500 text-xs mt-2">
                Version 1.0.0 | Last Updated: Oct 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
