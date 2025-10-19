import express from "express";
import axios from "axios";
import Image from "../models/Image.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { protect } from "../middleware/authMiddleware.js";
import History from "../models/history.model.js"; // Add this import

const router = express.Router();

// Initialize Gemini with error handling
let genAI;
try {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not found in environment variables");
  } else {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("Gemini AI initialized successfully");
  }
} catch (error) {
  console.error("❌ Failed to initialize Gemini AI:", error.message);
}

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "Image API is working fine!",
    timestamp: new Date().toISOString(),
  });
});

//Helper — Analyze Image using Imagga API
async function getImaggaTags(imageBase64) {
  try {
    // Validate base64 format
    if (!imageBase64 || typeof imageBase64 !== "string") {
      throw new Error("Invalid image data format");
    }

    const auth = Buffer.from(
      `${process.env.IMAGGA_API_KEY}:${process.env.IMAGGA_API_SECRET}`
    ).toString("base64");

    const formData = new URLSearchParams();
    formData.append("image_base64", imageBase64);

    console.log("🔄 Making request to Imagga API...");
    const response = await axios.post(
      "https://api.imagga.com/v2/tags",
      formData,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    if (!response.data || !response.data.result || !response.data.result.tags) {
      throw new Error("Invalid response format from Imagga API");
    }

    return response.data.result.tags;
  } catch (error) {
    console.error("❌ Imagga API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.code === "ECONNABORTED") {
      throw new Error("Imagga API timeout - please try again");
    }

    throw new Error(
      `Imagga API failed: ${
        error.response?.data?.error?.message ||
        error.response?.data?.error ||
        error.message
      }`
    );
  }
}

// Helper — Get Detailed Gemini Answer
async function getGeminiAnswer(imageData, userQuestion) {
  try {
    const topTags = imageData.tags
      .slice(0, 8)
      .map((tag) => {
        if (typeof tag.tag === "object" && tag.tag.en) return tag.tag.en;
        return tag.tag || "unknown";
      })
      .join(", ");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `You are an expert visual analyst with the ability to interpret image analysis data. I have analyzed an image and extracted these visual elements:

**DETECTED ELEMENTS:** ${topTags}
**USER QUESTION:** "${userQuestion}"

**YOUR TASK:**
Act as if you can see the actual image. Use the detected elements to create a vivid, detailed response that directly answers the user's question. 

**GUIDELINES:**
- Write naturally and conversationally, as if describing what you see
- Synthesize the elements into a coherent scene description
- Focus specifically on answering the user's question
- Be descriptive and paint a mental picture
- If asking about objects, describe them and their relationships
- If asking about colors, infer and describe the color palette
- If asking "what is this", provide a comprehensive scene description
- If asking to "describe", give rich visual details
- Write 2-3 sentences that flow naturally

*SPECIALIZED ANALYSIS TASKS:*
1. *LOGO/BRAND IDENTIFICATION:* If elements suggest logos, brands, or company imagery (text, symbols, corporate colors), identify the specific company/brand and provide details about it
2. *TEXT RECOGNITION:* If text-related elements are detected (font, writing, signage, typography), describe what text might be visible and its context
3. *COMPANY/CORPORATE ANALYSIS:* If business-related elements appear, identify the industry, company type, or corporate context

*RESPONSE GUIDELINES:*
- For logos: Name the company, describe the logo design, mention brand colors/style
- For text: Describe the text content, font style, placement, and purpose
- For companies: Identify the brand, explain their business, mention key characteristics
- Be specific about brand names when elements clearly indicate them
- If uncertain, explain what type of logo/text/company it appears to be
- Provide context about the brand's industry and significance
- Write naturally as if directly observing the image

*EXAMPLES:*
- "This appears to be the Nike logo with its distinctive swoosh design..."
- "The text visible reads '[company name]' in bold corporate typography..."
- "This looks like a McDonald's logo with the iconic golden arches..."

Provide a detailed, informative response that identifies brands, text, and corporate elements accurately.

**IMPORTANT:** Respond as if you're directly observing the image, not analyzing tags. Make it engaging and insightful.`;

    const result = await model.generateContent(prompt);

    // Handle the response properly
    if (result && result.response) {
      const text = await result.response.text();
      return text;
    } else {
      throw new Error("Invalid response from Gemini API");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback response if Gemini fails
    const topTags = imageData.tags
      .slice(0, 5)
      .map((tag) => {
        if (typeof tag.tag === "object" && tag.tag.en) return tag.tag.en;
        return tag.tag || "unknown";
      })
      .join(", ");

    return `Based on the image analysis, I can see: ${topTags}. Regarding your question "${userQuestion}", the image appears to contain these key elements that may help answer your query.`;
  }
}

// Upload Image (Base64 stored directly)
router.post("/upload", async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64)
      return res.status(400).json({ error: "No image provided" });

    const newImage = new Image({ url: imageBase64 });
    await newImage.save();

    res.json({ message: "Image stored in MongoDB", imageUrl: newImage.url });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res
      .status(500)
      .json({ error: "Failed to store image", details: err.message });
  }
});

// Analyze Image with Imagga + Gemini
router.post("/analyze", protect, async (req, res) => {
  try {
    const { imageUrl, userQuestion } = req.body;

    // Validate input
    if (!imageUrl || !userQuestion) {
      return res.status(400).json({ error: "Image and question are required" });
    }

    console.log(`Analyzing image with question: "${userQuestion}"`);
    console.log(`Image data length: ${imageUrl.length}`);

    // Validate environment variables
    if (!process.env.IMAGGA_API_KEY || !process.env.IMAGGA_API_SECRET) {
      console.error("Missing Imagga API credentials");
      return res.status(500).json({
        error: "Server configuration error: Missing Imagga credentials",
      });
    }
    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing Gemini API key");
      return res
        .status(500)
        .json({ error: "Server configuration error: Missing Gemini API key" });
    }

    // Step 1: Get tags from Imagga
    console.log("Calling Imagga API...");
    const tags = await getImaggaTags(imageUrl);
    console.log(`Tags received: ${tags.length}`);

    if (!tags || tags.length === 0) {
      return res.status(400).json({ error: "No tags found in image analysis" });
    }

    // Step 2: Generate a detailed answer using Gemini
    console.log("Calling Gemini API...");
    const answer = await getGeminiAnswer({ tags }, userQuestion);
    console.log("Gemini response received");

    // Save to history if user is authenticated
    if (req.user) {
      const historyEntry = new History({
        userId: req.user._id,
        type: "image",
        content: {
          imageData: imageUrl.substring(0, 100) + "...", // Store truncated image data or reference
          result: answer,
        },
        title: `Image Analysis - ${new Date().toLocaleDateString()}`,
      });
      await historyEntry.save();
    }

    res.json({
      imageData: { tags: tags.slice(0, 10) }, // Limit tags in response
      answer,
    });
  } catch (err) {
    console.error("Analysis Error:", err.message);
    console.error("Full Error Stack:", err.stack);

    // Send more specific error messages
    let errorMessage = "Failed to analyze image";
    if (err.message.includes("Imagga")) {
      errorMessage = "Image analysis service error";
    } else if (err.message.includes("Gemini")) {
      errorMessage = "AI response generation error";
    }

    res.status(500).json({
      error: errorMessage,
      details: err.message,
    });
  }
});

export default router;
