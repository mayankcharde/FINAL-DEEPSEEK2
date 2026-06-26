import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUp,
  Sparkles,
  Download,
  Copy,
  RefreshCw,
  Image as ImageIcon,
  RotateCw,
  History,
  ArrowLeft,
  Home,
} from "lucide-react";
import Sidebar from "./Sidebar";

const OpenRouterImageGen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastGeneration, setLastGeneration] = useState(0);
  const [imageHistory, setImageHistory] = useState([]);

  // Load image generation history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("imageGenerationHistory");
    if (savedHistory) {
      try {
        setImageHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading image history:", e);
      }
    }
  }, []);

  // Handle selected image from history
  useEffect(() => {
    if (location.state?.selectedImage) {
      const { prompt: historyPrompt, url: historyUrl } =
        location.state.selectedImage;
      setPrompt(historyPrompt);
      setImageUrl(historyUrl);
    }
  }, [location.state]);

  // Function to clear the form and reset state
  const resetImageGenerator = () => {
    setPrompt("");
    setImageUrl("");
    setError("");
    setLoading(false);
  };

  // Listen for new chat requests from the sidebar
  useEffect(() => {
    const handleNewChatRequest = () => {
      resetImageGenerator();
    };

    window.addEventListener("newChatRequested", handleNewChatRequest);
    return () => {
      window.removeEventListener("newChatRequested", handleNewChatRequest);
    };
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt!");
      return;
    }

    const now = Date.now();
    if (now - lastGeneration < 3000) {
      setError("Please wait 3 seconds between generations.");
      return;
    }
    setLastGeneration(now);

    setLoading(true);
    setImageUrl("");
    setError("");

    try {
      const encodedPrompt = encodeURIComponent(prompt);
      // Changed image dimensions from 1024x1024 to 512x512 for medium-sized images
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${Math.floor(
        Math.random() * 1000000
      )}`;

      // Test if image loads
      const img = new Image();
      img.onload = () => {
        setImageUrl(imageUrl);
        setLoading(false);

        // Add to history
        const newImage = {
          id: Date.now(),
          prompt: prompt,
          url: imageUrl,
          timestamp: new Date().toISOString(),
        };

        const updatedHistory = [newImage, ...imageHistory].slice(0, 15); // Keep last 15 images
        setImageHistory(updatedHistory);

        // Save to localStorage
        localStorage.setItem(
          "imageGenerationHistory",
          JSON.stringify(updatedHistory)
        );

        // Dispatch event to notify sidebar
        const event = new CustomEvent("imageGenerated", {
          detail: { image: newImage },
        });
        window.dispatchEvent(event);
      };
      img.onerror = () => {
        setError("Failed to generate image. Please try again.");
        setLoading(false);
      };
      img.src = imageUrl;
    } catch {
      // Catch any unexpected errors
      setError("Error generating image. Please try again.");
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `deepseek-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyImageUrl = () => {
    if (!imageUrl) return;
    navigator.clipboard
      .writeText(imageUrl)
      .then(() => {
        // Show temporary success message
        setError("Image URL copied to clipboard!");
        setTimeout(() => setError(""), 2000);
      })
      .catch((err) => {
        setError("Failed to copy URL: " + err);
      });
  };

  // Enhanced navigation handler for home button
  const handleHomeNavigation = (event) => {
    // Prevent any default behavior
    event.preventDefault();
    // Clear any existing state first
    resetImageGenerator();
    // Force sidebar to close if open on mobile
    const mobileSidebar = document.querySelector("aside");
    if (mobileSidebar && mobileSidebar.classList.contains("left-0")) {
      window.dispatchEvent(new CustomEvent("closeSidebar"));
    }
    // Use replace instead of navigate to avoid history stack issues
    navigate("/home", { replace: true });
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Keep the Sidebar visible */}
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Back Button - Improved for mobile with enhanced navigation */}
        <div className="fixed top-4 left-4 z-[100] md:absolute md:left-[280px] md:z-10">
          <button
            onClick={handleHomeNavigation}
            className="flex items-center justify-center md:justify-start gap-2 px-3 md:px-3.5 py-2.5 bg-blue-600 md:bg-zinc-900/80 backdrop-blur-sm hover:bg-blue-700 md:hover:bg-zinc-800 border border-blue-700/50 md:border-zinc-800 rounded-xl text-white md:text-zinc-300 hover:text-white transition-all shadow-lg hover:shadow-blue-900/10 transform hover:-translate-y-0.5"
            title="Back to Home"
            aria-label="Back to Home"
          >
            <Home className="h-4 w-4" />
            <span className="hidden md:inline text-sm font-medium">
              Back to Home
            </span>
          </button>
        </div>

        {/* Mobile back text indicator - Enhanced visibility and z-index */}
        <div className="fixed top-4 left-16 z-[100] md:hidden">
          <span className="text-xs font-medium text-white bg-zinc-800/80 px-2 py-1 rounded-lg">
            Home
          </span>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6 flex flex-col items-center justify-center">
          {/* Title and Info - Added top margin for mobile to accommodate the button */}
          <div className="mb-10 mt-10 md:mt-0 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              DeepSeek Image Generation
            </h1>
            {/* <p className="text-zinc-400 max-w-xl mx-auto text-center font-medium">
              Generate stunning AI images with detailed text prompts. Be
              specific for best results.
            </p> */}
          </div>

          <br />
          <br />
          {/* Removed one br tag to compensate for added margin top */}

          {/* Error Display - moved before input area */}
          {error && (
            <div
              className={`mb-6 p-4 rounded-lg w-full max-w-4xl border ${
                error.includes("copied")
                  ? "bg-green-900/20 border-green-700 text-green-300"
                  : "bg-red-900/20 border-red-700 text-red-300"
              }`}
            >
              <p className="flex items-center gap-2">
                {error.includes("copied") ? (
                  <Sparkles className="w-5 h-5" />
                ) : (
                  <RefreshCw className="w-5 h-5" />
                )}
                {error}
              </p>
            </div>
          )}

          {/* Input Area - Now centered and shifted down */}
          <div className="w-full max-w-3xl mb-10 mt-4">
            <div className="flex items-center gap-2 bg-zinc-900 rounded-xl border border-zinc-800 p-3 shadow-lg">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="flex-1 bg-transparent border-none text-white placeholder-zinc-500 outline-none text-sm py-2 px-3 min-h-[60px] resize-none"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    generateImage();
                  }
                }}
              />
              <button
                onClick={generateImage}
                disabled={!prompt.trim() || loading}
                className={`p-3 rounded-lg transition-all ${
                  prompt.trim() && !loading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-2 text-center">
              Be descriptive with details like style, mood, lighting, and
              subject. DeepSeek can make mistakes. Verify important information.
            </p>
          </div>

          <br />
          <br />

          {/* Generated Image Display - Adjusted container to better fit medium-sized images */}
          {imageUrl && (
            <div className="mb-8 w-full max-w-md mx-auto">
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-black/50 shadow-xl">
                <div className="p-1 md:p-2">
                  <img
                    src={imageUrl}
                    alt="Generated AI image"
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                {/* Image Actions Bar */}
                <div className="p-3 border-t border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                  <div className="text-xs text-zinc-400 truncate flex-1">
                    {prompt}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={downloadImage}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 transition-colors"
                      title="Download image"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={copyImageUrl}
                      className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 transition-colors"
                      title="Copy image URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder when no image - Adjusted size to match medium image size */}
          {!imageUrl && !loading && (
            <div className="mb-8 flex flex-col items-center justify-center text-zinc-500 p-8 border border-dashed border-zinc-700 rounded-xl bg-zinc-900/30 w-full max-w-md mx-auto">
              <ImageIcon className="w-12 h-12 mb-4 opacity-40" />
              <p className="text-center mb-2">
                Enter a prompt and click Generate to create an image
              </p>
              <p className="text-xs text-zinc-600 text-center max-w-md">
                Try detailed prompts like "A serene lake at sunset with
                mountains in the background, photorealistic style"
              </p>
            </div>
          )}

          {/* Loading State - Adjusted size to match medium image size */}
          {loading && (
            <div className="mb-8 flex flex-col items-center justify-center p-8 border border-zinc-800 rounded-xl bg-zinc-900/80 w-full max-w-md mx-auto">
              <RotateCw className="w-10 h-10 animate-spin text-blue-400 mb-4" />
              <p className="text-zinc-300 mb-1">
                Generating your masterpiece...
              </p>
              <p className="text-xs text-zinc-500 text-center">
                Creating image based on your prompt
              </p>
            </div>
          )}
        </div>

        {/* Footer with API Info */}
        <div className="border-t border-zinc-800 bg-black/20 backdrop-blur-sm p-3">
          <div className="max-w-4xl mx-auto">
            {/* <p className="text-xs text-zinc-500 text-center">
              Images are generated using Pollinations API. Results may vary.
            </p> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OpenRouterImageGen;
