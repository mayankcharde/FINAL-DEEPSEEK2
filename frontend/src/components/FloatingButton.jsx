// src/components/FloatingButtons.jsx
import { Scissors, Settings } from 'lucide-react';
import React from 'react';

const FloatingButton = () => {
  return (
    <div className="fixed bottom-20 right-3 flex flex-col gap-2 z-20">
      <button className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-110 shadow-lg">
        <Scissors className="w-4 h-4" />
      </button>

      <button className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-110 shadow-lg">
        <Settings className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FloatingButton;