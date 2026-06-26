import { generateMistralContent } from "../config/mistral.config.js";

/**
 * Generate text response using Mistral AI
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

    // Verify API key is available
    if (!process.env.MISTRAL_API_KEY) {
      console.error("Missing Mistral API key");
      return res.status(500).json({
        error: "Server configuration error: Missing API key",
        details: "The Mistral API key is not configured properly",
      });
    }

    // Generate content using Mistral
    const text = await generateMistralContent(prompt);

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
