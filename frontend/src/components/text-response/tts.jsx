import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TTS = ({ text }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'ma-IN', name: 'Marathi' },
    { code: 'zh-CN', name: 'Chinese' }
  ];

  const speakText = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-700/30">
      <select 
        value={selectedLanguage} 
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="px-2 py-1 bg-zinc-700/50 border border-zinc-600/50 rounded-md text-zinc-300 text-xs focus:outline-none hover:bg-zinc-700"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>
      
      <button 
        onClick={isSpeaking ? stopSpeaking : speakText}
        disabled={!text}
        className={`p-2 rounded-full transition-all duration-200 ${
          !text ? 'text-zinc-600 cursor-not-allowed' :
          isSpeaking ? 'text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20' : 
          'text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10'
        }`}
        title={isSpeaking ? 'Stop speaking' : 'Play audio'}
      >
        {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default TTS;