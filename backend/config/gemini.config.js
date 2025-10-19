import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_RESPONSE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export default model;
