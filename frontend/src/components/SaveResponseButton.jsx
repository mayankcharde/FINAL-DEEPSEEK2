import React, { useState } from "react";
import { Bookmark, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { saveResponse } from "../utils/hook";

const SaveResponseButton = ({ title, content, type = "response" }) => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveResponse = async () => {
    if (!user) {
      // If not logged in, redirect to login or show a notification
      alert("Please log in to save responses");
      return;
    }

    try {
      setIsSaving(true);
      await saveResponse({
        title: title || "Saved Response",
        content,
        type,
      });

      // Show success indication
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving response:", error);
      // Error is already handled in the hook function with a toast
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleSaveResponse}
      disabled={isSaving}
      className={`p-2 rounded-lg transition-colors ${
        saved
          ? "text-green-500 bg-green-100"
          : isSaving
          ? "text-gray-400 bg-gray-100"
          : "text-zinc-400 hover:text-blue-400 hover:bg-zinc-800"
      }`}
      title={saved ? "Saved!" : "Save Response"}
    >
      {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
    </button>
  );
};

export default SaveResponseButton;
