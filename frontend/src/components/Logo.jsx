// src/components/Logo.jsx
import { Brain } from 'lucide-react';
import React from 'react';

const Logo = ({ showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-1.5">
        <Brain className={`${sizeClasses[size]} text-white`} />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-semibold text-white`}>
          deepseek
        </span>
      )}
    </div>
  );
};

export default Logo;