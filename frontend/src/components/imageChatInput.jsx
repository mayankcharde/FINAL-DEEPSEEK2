import { useState, useRef, useEffect } from "react";
import React from "react";
import { Paperclip, ArrowUp, Mic, MicOff } from "lucide-react";

const ImageChatInput = ({ onSendMessage, uploadedImage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        if (result && result.includes(",")) {
          const base64 = result.split(",")[1];
          setSelectedImage({
            file,
            preview: result,
            base64,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = true;

      recognitionRef.current.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handleSend = () => {
    if (message.trim() && (selectedImage || uploadedImage)) {
      onSendMessage({
        text: message,
        image: selectedImage || uploadedImage,
      });
      setMessage("");
      setSelectedImage(null);
    }
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-zinc-900 rounded-xl sm:rounded-2xl shadow-2xl border border-zinc-800 w-full max-w-4xl mx-auto">
        {/* Image Preview */}
        {(selectedImage || uploadedImage) && (
          <div className="p-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              {(selectedImage || uploadedImage)?.preview && (
                <img
                  src={(selectedImage || uploadedImage).preview}
                  alt="Selected"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
              <span className="text-zinc-300 text-sm">
                {(selectedImage || uploadedImage)?.file?.name ||
                  "Uploaded Image"}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="ml-auto text-zinc-400 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Input Field */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={isListening ? "" : "Ask about the image..."}
                className={`w-full bg-transparent text-white placeholder-zinc-500 outline-none text-sm sm:text-base px-2 transition-all duration-300 ${
                  isListening ? "placeholder-blue-400" : ""
                }`}
              />
              {isListening && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-lg animate-pulse"></div>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <div
                      className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-1 md:gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 md:p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
              >
                <Paperclip className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>

              <button
                onClick={toggleVoiceRecognition}
                className={`p-1.5 md:p-2 rounded-lg transition-colors ${
                  isListening
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-3.5 h-3.5 md:w-4 md:h-4" />
                ) : (
                  <Mic className="w-3.5 h-3.5 md:w-4 md:h-4" />
                )}
              </button>

              <button
                onClick={handleSend}
                disabled={
                  !message.trim() ||
                  !(selectedImage || uploadedImage) ||
                  isLoading
                }
                className={`p-1.5 md:p-2 rounded-full transition-all ${
                  message.trim() &&
                  (selectedImage || uploadedImage) &&
                  !isLoading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageChatInput;
