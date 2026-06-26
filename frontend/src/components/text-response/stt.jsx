import React, { useState, useRef, useEffect } from 'react';

const VoiceToText = () => {
  const [text, setText] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }

    // Create recognition instance
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = window.navigator.language;
    recognitionRef.current.interimResults = true;

    // Capture speech results
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setText(transcript);
    };

    // Cleanup on unmount
    return () => {
      recognitionRef.current && recognitionRef.current.abort();
    };
  }, []);

  const startRecognition = () => {
    recognitionRef.current && recognitionRef.current.start();
  };

  const stopRecognition = () => {
    recognitionRef.current && recognitionRef.current.stop();
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* <textarea
        value={text}
        readOnly
        rows={8}
        cols={80}
        style={{ marginBottom: '10px', display: 'block' }}
      />
      <button onClick={startRecognition} style={{ marginRight: '10px' }}>Start</button>
      <button onClick={stopRecognition}>Stop</button> */}
    </div>
  );
};

export default VoiceToText;
