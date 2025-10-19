import model from "../config/gemini.config.js";

/**
 * Generate text response using Gemini AI
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Received prompt:", prompt);
    console.log("Using model:", model);

    // Verify API key is available
    if (!process.env.GEMINI_RESPONSE_API_KEY) {
      console.error("Missing Gemini API key");
      return res.status(500).json({
        error: "Server configuration error: Missing API key",
        details: "The Gemini API key is not configured properly",
      });
    }

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Generated text length:", text.length);

    res.json({
      generatedText: text,
      status: "success",
    });
  } catch (error) {
    console.error("Error generating text:", error.message);
    console.error("Stack trace:", error.stack);

    // Determine specific error type for better client feedback
    if (error.message?.includes("API key")) {
      return res
        .status(500)
        .json({ error: "API key error. Please check server configuration." });
    }

    res.status(500).json({
      error: "Failed to generate text",
      message: error.message,
    });
  }
};
