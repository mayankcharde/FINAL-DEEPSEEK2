// src/components/ChatArea.jsx
import ChatInput from "./ChatInput";
import React, { useState, useEffect, useRef } from "react";
import { useTemplate } from "../context/TemplateContext";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import UserMessage from "./text-response/UserMessage";
import GeminiResponse from "./text-response/GeminiResponse";
import axios from "../utils/axios";
import { generateGeminiResponse } from "./geminiTts";

const ChatArea = () => {
  const { selectedTemplate } = useTemplate();
  const { user } = useAuth();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  // Save chat to history
  const saveChatToHistory = async () => {
    if (conversations.length > 0 && user) {
      try {
        // Get first user message for the title
        const firstUserMessage = conversations.find(
          (msg) => msg.type === "user"
        );
        const chatTitle = firstUserMessage
          ? firstUserMessage.message.substring(0, 30) + "..."
          : "Text Chat";

        let response;

        if (currentChatId) {
          // Update existing chat
          response = await axios.put(`/api/chat/${currentChatId}`, {
            messages: conversations,
          });
        } else {
          // Create new chat
          response = await axios.post("/api/chat/save", {
            title: chatTitle,
            messages: conversations,
            type: "text",
          });

          // Set current chat ID from response
          if (response.data && response.data._id) {
            setCurrentChatId(response.data._id);
          }
        }

        // Dispatch event to refresh sidebar history
        window.dispatchEvent(new CustomEvent("chatSaved"));
      } catch (error) {
        console.error("Error saving chat:", error);
      }
    }
  };

  // Save chat after each new AI response
  useEffect(() => {
    // Check if the last message is from AI
    if (
      conversations.length > 0 &&
      conversations[conversations.length - 1].type === "ai"
    ) {
      saveChatToHistory();
    }
  }, [conversations]);

  // Save current chat to history and start new chat
  const handleNewChat = async () => {
    // Just clear conversation since we're already saving after each exchange
    setConversations([]);
    setCurrentChatId(null);

    // Dispatch event to notify sidebar that a new chat has started
    window.dispatchEvent(new CustomEvent("chatSaved"));
  };

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
      handleNewChat();
    };

    window.addEventListener("newChatRequested", handleNewChatEvent);
    return () => {
      window.removeEventListener("newChatRequested", handleNewChatEvent);
    };
  }, [conversations]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: "user",
      message: message,
      timestamp: new Date(),
    };

    setConversations((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Use Gemini TTS to generate response
      const response = await generateGeminiResponse(message);

      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        message: response || "I received your message!",
        timestamp: new Date(),
      };

      setConversations((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorResponse = {
        id: Date.now() + 1,
        type: "ai",
        message: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setConversations((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
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

      {/* Chat Messages Area - Improved bottom spacing and mobile responsiveness */}
      <div
        className="flex-1 relative z-10 overflow-y-auto pb-28 sm:pb-36"
        style={{ maxHeight: "calc(100vh - 100px)" }} // Adjusted for mobile
      >
        {conversations.length === 0 ? (
          <div className="flex items-center justify-center min-h-full p-3 sm:p-6 md:p-8">
            <div className="text-center space-y-4 sm:space-y-8 w-full max-w-4xl mx-auto">
              {!selectedTemplate && (
                <div className="flex justify-center transform scale-75 sm:scale-100">
                  <img
                    src="/deepseeklogo.png"
                    alt="Chat Logo"
                    className="h-16 sm:h-20 md:h-24"
                  />
                </div>
              )}
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white px-2 sm:px-4">
                How can I help you?
              </h1>
            </div>
          </div>
        ) : (
          <div className="w-full py-4 sm:py-8">
            <div className="max-w-5xl mx-auto">
              {conversations.map((conv) =>
                conv.type === "user" ? (
                  <UserMessage key={conv.id} message={conv.message} />
                ) : (
                  <GeminiResponse key={conv.id} response={conv.message} />
                )
              )}
              {isLoading && (
                <div className="w-full flex justify-start mb-4 sm:mb-8 mt-2 sm:mt-4 px-1 sm:px-4">
                  <div className="flex items-start gap-1.5 sm:gap-3 w-full max-w-full sm:max-w-3xl">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-zinc-800/90 text-zinc-400 px-2.5 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-tl-md shadow-lg border border-zinc-700/50">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                          <span className="ml-1 text-xs sm:text-sm">
                            Thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Chat Input - Better positioned for mobile */}
      <div className="fixed bottom-2 sm:bottom-6 left-0 right-0 z-30 bg-transparent">
        <div className="container mx-auto px-1 sm:px-3">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          <div className="text-center mt-1 text-[10px] sm:text-xs text-gray-400/70">
            DeepSeek can make mistakes. Verify important information.
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatArea;
