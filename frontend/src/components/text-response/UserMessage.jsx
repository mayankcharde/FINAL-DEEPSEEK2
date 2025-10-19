import React from "react";
import { User } from "lucide-react";

const UserMessage = ({ message, image }) => {
  return (
    <div className="w-full flex justify-end mb-6 px-4">
      <div className="flex items-start gap-3 max-w-3xl">
        <div className="flex-1 min-w-0">
          {image &&
            image.preview &&
            image.preview !== "data:;base64,=" &&
            image.preview.startsWith("data:image") &&
            image.preview.includes(",") && (
              <div className="mb-3 flex justify-end">
                <img
                  src={image.preview}
                  alt="User uploaded"
                  className="w-48 h-32 object-cover rounded-xl border border-zinc-600 shadow-lg"
                  onError={(e) => {
                    e.target.src = "/deepseek.png";
                    e.target.onerror = null;
                  }}
                />
              </div>
            )}
          <div className="bg-blue-600/90 text-white px-4 py-3 rounded-2xl rounded-tr-md shadow-lg border border-blue-500/50">
            <div className="text-sm leading-relaxed break-words">{message}</div>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-md">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
