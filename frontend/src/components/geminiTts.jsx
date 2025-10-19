import React, { useState } from "react";

// Add a utility function that can be imported by other components
export async function generateGeminiResponse(prompt) {
  try {
    const response = await fetch("https://final-deepseek2.onrender.com/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.generatedText;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

function GeminiTts() {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const text = await generateGeminiResponse(prompt);
      setGeneratedText(text);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Gemini Text Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={5}
          className="prompt-textarea"
        />
        <button type="submit" disabled={loading} className="generate-btn">
          {loading ? "Generating..." : "Generate Text"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {generatedText && (
        <div className="result">
          <h2>Generated Text:</h2>
          <div className="generated-content">{generatedText}</div>
        </div>
      )}
    </div>
  );
}

export default GeminiTts;
