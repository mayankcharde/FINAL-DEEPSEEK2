// src/components/FloatingButtons.jsx
import { Scissors, Settings } from 'lucide-react';
import React from 'react';

const FloatingButton = () => {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col gap-3 z-50">
      <button className="w-10 h-10 md:w-12 md:h-12 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-110 shadow-lg">
        <Scissors className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <button className="w-10 h-10 md:w-12 md:h-12 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-110 shadow-lg">
        <Settings className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default FloatingButton;