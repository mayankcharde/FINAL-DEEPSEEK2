import React from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const TextChatHistoryItem = ({ chat, onDeleteSuccess }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { state: { chatData: chat } });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/chat/${chat._id}`);
      if (onDeleteSuccess) onDeleteSuccess(chat._id);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-800 cursor-pointer group transition-colors"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-blue-400" />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm text-zinc-200 truncate">{chat.title}</p>
          <p className="text-xs text-zinc-500">{formatDate(chat.createdAt)}</p>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TextChatHistoryItem;
