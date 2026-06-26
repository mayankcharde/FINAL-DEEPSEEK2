import React from "react";
import { useAuth } from "../context/AuthContext";
import SafeImage from "./SafeImage";

/**
 * Safe Image Message Component
 *
 * This component handles displaying chat messages that may contain images,
 * ensuring that invalid image URLs don't break the UI.
 *
 * @param {Object} props - Component props
 * @param {Object} props.message - The message object
 * @param {boolean} props.isUser - Whether the message is from the current user
 * @returns {React.ReactElement} - React component
 */
const SafeImageMessage = ({ message, isUser = false }) => {
  const { user } = useAuth();

  // Process the content to safely handle images
  const processImageContent = (content) => {
    if (!content) return null;

    // Check if the content is an image URL or base64 data
    if (
      typeof content === "string" &&
      (content.startsWith("http") || content.startsWith("data:"))
    ) {
      return (
        <div className="message-image-container">
          <SafeImage
            src={content}
            alt="Message image"
            className="rounded-lg max-w-full"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
            fallbackSrc="https://via.placeholder.com/400x300?text=Image+Not+Available"
          />
        </div>
      );
    }

    // Handle text content
    return <div className="message-text whitespace-pre-wrap">{content}</div>;
  };

  return (
    <div
      className={`message-container my-2 flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`message p-3 rounded-lg max-w-[80%] ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-gray-200 text-gray-800 rounded-tl-none"
        }`}
      >
        {/* Display user name if needed */}
        {!isUser && message.userName && (
          <div className="message-user font-medium text-xs mb-1">
            {message.userName}
          </div>
        )}

        {/* Message content - safely process images */}
        {processImageContent(message.content)}

        {/* Timestamp */}
        <div
          className={`message-time text-xs mt-1 text-right ${
            isUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default SafeImageMessage;
