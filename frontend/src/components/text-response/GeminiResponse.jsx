import React, { useState } from "react";
import TTS from "./tts";
import { Bot, Copy, Check, Heart, Bookmark } from "lucide-react";
import axios from "../../utils/axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css"; // Modern dark theme for code

const GeminiResponse = ({ response }) => {
  const [copied, setCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleFavorite = async () => {
    try {
      const title =
        response.length > 50 ? response.substring(0, 50) + "..." : response;
      const result = await axios.post("/api/favorites", {
        title,
        content: response,
        type: "image-analysis",
      });
      console.log("Favorite saved successfully:", result.data);
      setIsFavorited(true);
      setTimeout(() => setIsFavorited(false), 2000);
    } catch (error) {
      console.error(
        "Error saving favorite:",
        error.response?.data || error.message
      );
      // Show error feedback
      alert("Failed to save to favorites. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const title =
        response.length > 50 ? response.substring(0, 50) + "..." : response;
      const result = await axios.post("/api/saved-responses", {
        title,
        content: response,
        type: "image-analysis",
      });
      console.log("Response saved successfully:", result.data);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error(
        "Error saving response:",
        error.response?.data || error.message
      );
      // Show error feedback
      alert("Failed to save response. Please try again.");
    }
  };

  return (
    <div className="w-full flex justify-start mb-6 mt-2 px-2 sm:px-4">
      <div className="flex items-start gap-2 sm:gap-3 max-w-full sm:max-w-3xl">
        <div className="flex-shrink-0 mt-1">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-md">
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="bg-zinc-800/90 text-zinc-100 px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl rounded-tl-md shadow-lg border border-zinc-700/50">
            <div className="text-sm leading-relaxed mb-3 markdown-content overflow-auto max-h-[50vh]">
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  pre: ({ node, ...props }) => (
                    <pre
                      className="bg-zinc-900 p-3 rounded-md overflow-x-auto"
                      {...props}
                    />
                  ),
                  code: ({ node, inline, ...props }) => (
                    <code
                      className={
                        inline ? "bg-zinc-800 px-1 py-0.5 rounded" : ""
                      }
                      {...props}
                    />
                  ),
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
            <div className="flex items-center gap-2 flex-wrap border-t border-zinc-700/50 pt-2 mt-2">
              <TTS text={response} />
              <div className="flex-grow"></div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50 rounded transition-colors duration-200"
                title="Copy response"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
              <button
                onClick={handleFavorite}
                className="flex items-center gap-1 px-2 py-1 text-zinc-400 hover:text-red-400 hover:bg-zinc-700/50 rounded transition-colors duration-200"
                title="Add to favorites"
              >
                <Heart
                  className={`w-3 h-3 ${
                    isFavorited ? "text-red-400 fill-current" : ""
                  }`}
                />
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-2 py-1 text-zinc-400 hover:text-blue-400 hover:bg-zinc-700/50 rounded transition-colors duration-200"
                title="Save response"
              >
                <Bookmark
                  className={`w-3 h-3 ${
                    isSaved ? "text-blue-400 fill-current" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiResponse;
