import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import TTS from './tts';

const ImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserQuestion(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageBase64(reader.result.split(',')[1]); // only base64
  };

  const handleUpload = async () => {
    if (!imageBase64) return alert('Select an image first');
    try {
      const res = await axios.post('https://final-deepseek2.onrender.com/api/image/upload', { imageBase64 });
      alert('Image stored in DB successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to store image');
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleAnalyze = async () => {
    if (!imageBase64 || !userQuestion) {
      alert('Please select an image and enter a question');
      return;
    }
    
    setLoading(true);
    setResult(null); // Clear previous results
    
    try {
      console.log('Sending analysis request...');
      const res = await axios.post('http://localhost:5000/api/image/analyze', {
        imageUrl: imageBase64,
        userQuestion,
      });
      console.log('Analysis response:', res.data);
      setResult(res.data);
    } catch (err) {
      console.error('Analysis error:', err.response?.data || err.message);
      alert(`Analysis failed: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">AI Image Analyzer</h1>
          
          {/* File Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Upload Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="hidden" 
                id="file-upload"
                accept="image/*"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-gray-500">
                  {/* <svg className="mx-auto h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg> */}
                  <p className="text-sm">{imageFile ? imageFile.name : 'Click to upload or drag and drop'}</p>
                </div>
              </label>
            </div>

            {/* DATABASE IMAGE STORAGE  */}
            {/* <button 
              onClick={handleUpload} 
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-lg"
              disabled={!imageFile}
            >
              Store Image in Database
            </button> */}
          </div>

          {/* Question Input Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Ask a Question</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type your question or use voice input..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                className="w-full p-4 pr-16 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 shadow-sm"
              />
              <button
                onClick={startListening}
                disabled={isListening}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                    : 'bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white'
                }`}
                title={isListening ? 'Listening...' : 'Voice input'}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {isListening && (
              <p className="text-sm text-red-600 mt-2 flex items-center">
                <span className="animate-pulse mr-2">🎤</span>
                Listening... Speak now
              </p>
            )}
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !imageBase64 || !userQuestion}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-4 px-6 rounded-xl transition-all shadow-lg transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="relative">
                  {/* Outer rotating ring */}
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {/* Inner pulsing dot */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
                {/* Animated dots */}
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
                <span className="text-white font-medium">Analyzing...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Analyze Image with AI</span>
              </span>
            )}
          </button>

          {/* Results Section */}
          {result && result.answer && (
            <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-3">🤖</span>
                AI Analysis Result
              </h3>
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {result.answer}
                </div>
                <TTS text={result.answer} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx="true">{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;
