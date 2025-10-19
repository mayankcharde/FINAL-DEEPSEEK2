import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import ImageChatInput from "./imageChatInput";
import UserMessage from "./text-response/UserMessage";
import GeminiResponse from "./text-response/GeminiResponse";
import { useTemplate } from "../context/TemplateContext";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";

const ImageAnalysis = () => {
  const { selectedTemplate } = useTemplate();
  const navigate = useNavigate();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  const { user } = useAuth();

  // Start new chat (save current and clear)
  const handleNewChat = useCallback(async () => {
    console.log("🆕 Starting new chat");

    // Save current chat if it exists and has messages
    if (conversations.length > 0 && currentChatId && user) {
      try {
        console.log("💾 Final save of current chat before new chat");
        await axios.put(`/api/chat/${currentChatId}`, {
          messages: conversations,
        });
        console.log("✅ Current chat saved before starting new one");
      } catch (error) {
        console.error("❌ Error saving current chat:", error);
      }
    }

    // Clear for new chat
    setConversations([]);
    setCurrentChatId(null);
  }, [conversations, currentChatId, user]);

  // Load chat data if coming from sidebar
  useEffect(() => {
    if (location.state?.chatData) {
      const chatData = location.state.chatData;
      setConversations(chatData.messages || []);
      setCurrentChatId(chatData._id);
      // Clear the state to prevent reloading on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Listen for new chat events from Sidebar
  useEffect(() => {
    const handleNewChatEvent = () => {
      console.log("🎯 newChatRequested event received");
      handleNewChat();
    };

    window.addEventListener("newChatRequested", handleNewChatEvent);
    return () => {
      window.removeEventListener("newChatRequested", handleNewChatEvent);
    };
  }, [handleNewChat]);

  const handleSendMessage = async ({ text, image }) => {
    if (!text.trim() || !image) return;

    const newUserMessage = {
      id: Date.now(),
      type: "user",
      message: text,
      image: image,
      timestamp: new Date(),
    };

    const isFirstMessage = conversations.length === 0;
    setConversations((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post("/api/image/analyze", {
        imageUrl: image.base64,
        userQuestion: text,
      });

      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        message: response.data.answer,
        timestamp: new Date(),
      };

      setConversations((prev) => {
        const updatedConversations = [...prev, aiResponse];

        // Save or update chat
        if (user) {
          setTimeout(async () => {
            try {
              if (isFirstMessage) {
                // Create new chat
                const chatTitle =
                  text.substring(0, 50) + (text.length > 50 ? "..." : "");
                console.log("💾 Creating new chat:", chatTitle);

                const saveResponse = await axios.post("/api/chat/save", {
                  title: chatTitle,
                  messages: updatedConversations,
                  type: "image-analysis",
                });

                setCurrentChatId(saveResponse.data.chatId);
                console.log(
                  "✅ New chat created with ID:",
                  saveResponse.data.chatId
                );

                // Refresh sidebar history
                window.dispatchEvent(new CustomEvent("chatSaved"));
              } else if (currentChatId) {
                // Update existing chat
                console.log("🔄 Updating existing chat:", currentChatId);
                await axios.put(`/api/chat/${currentChatId}`, {
                  messages: updatedConversations,
                });
                console.log("✅ Chat updated successfully");
              }
            } catch (error) {
              console.error(
                "❌ Error saving/updating chat:",
                error.response?.data || error.message
              );
            }
          }, 500);
        }

        return updatedConversations;
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      const errorResponse = {
        id: Date.now() + 1,
        type: "ai",
        message:
          "Sorry, I encountered an error while analyzing the image. Please try again.",
        timestamp: new Date(),
      };
      setConversations((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-black">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-full relative">
        {/* Background Image */}
        {selectedTemplate && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/templates/${selectedTemplate})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        )}

        {/* Back Button */}
        <div className="absolute top-3 left-3 z-20">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-0.5 px-1.5 py-0.5 bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-300 hover:text-white rounded transition-all duration-300 border border-zinc-700/50 text-xs"
          >
            <ArrowLeft className="w-2.5 h-2.5" />
            <span className="text-[10px]">Back</span>
          </button>
        </div>

        {/* Chat Messages Area - Scrollable */}
        <div
          className="flex-1 pt-20 relative z-10 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          {conversations.length === 0 ? (
            <div className="flex items-center justify-center min-h-full px-8 py-16">
              <div className="text-center space-y-8 w-full max-w-2xl mx-auto">
                {!selectedTemplate && (
                  <div className="flex justify-center">
                    <img
                      src="/deepseeklogo.png"
                      alt="Chat Logo"
                      className="h-16 sm:h-20 md:h-24 opacity-80"
                    />
                  </div>
                )}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90">
                  Upload an Image and Ask Questions
                </h1>
                <p className="text-zinc-400 text-lg">
                  Select an image and ask me anything about it
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full py-8">
              <div className="max-w-5xl mx-auto">
                {conversations.map((conv) =>
                  conv.type === "user" ? (
                    <UserMessage
                      key={conv.id}
                      message={conv.message}
                      image={conv.image}
                    />
                  ) : (
                    <GeminiResponse key={conv.id} response={conv.message} />
                  )
                )}
                {isLoading && (
                  <div className="w-full flex justify-start mb-8 px-4">
                    <div className="flex items-start gap-3 max-w-3xl">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-md">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-zinc-800/90 text-zinc-400 px-4 py-3 rounded-2xl rounded-tl-md shadow-lg border border-zinc-700/50">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <div
                              className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                            <span className="ml-2 text-sm">
                              Analyzing image...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chat Input - Fixed at Bottom */}
        <div className="absolute bottom-20 left-0 right-0 z-20">
          <div className="bg-gradient-to-t from-black via-black/98 to-black/80 pt-6 pb-4">
            <div className="flex justify-center px-4 sm:px-6 md:px-8">
              <div className="w-full max-w-3xl">
                <ImageChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />
                <div className="text-center mt-1 text-[10px] sm:text-xs text-gray-400/70">
                  DeepSeek can make mistakes. Verify important information.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysis;
