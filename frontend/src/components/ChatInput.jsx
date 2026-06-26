import { useState, useRef, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Paperclip,
  ArrowUp,
  Zap,
  Image,
  MoreHorizontal,
  Mic,
} from "lucide-react";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Your browser does not support Speech Recognition.");
      return;
    }

    // Create recognition instance
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = window.navigator.language;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.continuous = true;

    // Capture speech results
    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setMessage(transcript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current && recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setMessage("");
      recognitionRef.current && recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid newline
      handleSend();
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-zinc-900 rounded-xl sm:rounded-2xl shadow-2xl border border-zinc-800 w-full max-w-[92%] sm:max-w-2xl md:max-w-3xl mx-auto">
        {/* Input Area */}
        <div className="p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Left Side Button - Single button for mobile */}
            <button
              onClick={() => navigate("/image-analysis")}
              className="p-1.5 md:p-2 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
            >
              <Zap className="w-4 h-4" />
            </button>

            {/* Input Field */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "Message DeepSeek"}
              className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm sm:text-base min-w-0 px-2"
              disabled={isLoading || isListening}
            />

            {/* Right Side Buttons - Streamlined for mobile */}
            <div className="flex items-center gap-2">
              {/* Voice Button */}
              <button
                onClick={toggleListening}
                disabled={isLoading}
                className={`p-1.5 rounded-full text-zinc-400 transition-colors ${
                  isListening
                    ? "bg-blue-600 text-white pulse-animation"
                    : "hover:bg-zinc-800 hover:text-zinc-300"
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* More options button with fixed position dropdown */}
              <div className="relative">
                <button
                  className="p-1.5 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {showMoreOptions && (
                  <div className="fixed bottom-20 right-4 sm:absolute sm:bottom-full sm:right-0 sm:mb-2 bg-zinc-900 rounded-lg shadow-xl border border-zinc-700 py-2 min-w-[160px] z-50">
                    <button
                      onClick={() => {
                        setShowMoreOptions(false);
                        navigate("/image-gen");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-800 text-zinc-300 text-sm flex items-center gap-2 transition-colors"
                    >
                      <Image className="w-4 h-4" />
                      Image Generation
                    </button>
                  </div>
                )}
              </div>

              {/* Send button with enhanced visibility and spacing */}
              <button
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                className={`p-2 rounded-full flex items-center justify-center transition-all ${
                  message.trim() && !isLoading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
                style={{ minWidth: "32px", minHeight: "32px" }}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* CSS for pulse animation using standard style tag */}
      <style>{`
        .pulse-animation {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatInput;
