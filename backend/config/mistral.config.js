import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

/**
 * Generate text content using Mistral API
 * @param {string} prompt - The text prompt for Mistral
 * @param {string} [model="mistral-large-latest"] - The Mistral model to use
 * @returns {Promise<string>} The generated text response
 */
export const generateMistralContent = async (prompt, model = "mistral-small-latest") => {
  if (!MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is not defined in environment variables");
  }

  try {
    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: model,
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${MISTRAL_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 60000 // 60s timeout
      }
    );

    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error("Invalid response structure from Mistral API");
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("❌ Mistral API Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error?.message || error.message || "Failed to generate content from Mistral"
    );
  }
};

export default generateMistralContent;
