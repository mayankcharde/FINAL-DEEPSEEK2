import express from "express";
import Chat from "../models/chat.model.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "Chat routes working",
    timestamp: new Date().toISOString(),
  });
});

// Test save without auth
router.post("/test-save", async (req, res) => {
  try {
    const testChat = new Chat({
      userId: "507f1f77bcf86cd799439011", // dummy ObjectId
      title: "Test Chat",
      messages: [
        { id: 1, type: "user", message: "test", timestamp: new Date() },
      ],
      type: "text",
    });
    const saved = await testChat.save();
    res.json({ message: "Test chat saved", id: saved._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save chat to history
router.post("/save", protect, async (req, res) => {
  try {
    const { title, messages, type } = req.body;
    const userId = req.user._id;

    console.log("💾 Saving chat for user:", req.user.name);
    console.log("💾 Chat details:", {
      title,
      messageCount: messages?.length,
      type,
    });

    const newChat = new Chat({
      userId,
      title,
      messages,
      type: type || "text",
    });

    const savedChat = await newChat.save();
    console.log("✅ Chat saved with ID:", savedChat._id);

    res.status(201).json(savedChat);
  } catch (error) {
    console.error("❌ Error saving chat:", error);
    res.status(500).json({
      error: "Failed to save chat",
      details: error.message,
    });
  }
});

// Get user's chat history
router.get("/history", protect, async (req, res) => {
  try {
    console.log("📥 Fetching history for user:", req.user.name);
    const userId = req.user._id;

    const chats = await Chat.find({ userId }).sort({ createdAt: -1 }).limit(50);

    console.log("📋 Found chats:", chats.length);
    res.json(chats);
  } catch (error) {
    console.error("❌ Error fetching chat history:", error);
    res.status(500).json({
      error: "Failed to fetch chat history",
      details: error.message,
    });
  }
});

// Get specific chat by ID
router.get("/:chatId", protect, async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("❌ Error fetching chat:", error);
    res.status(500).json({
      error: "Failed to fetch chat",
      details: error.message,
    });
  }
});

// Update specific chat by ID
router.put("/:chatId", protect, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { messages } = req.body;
    const userId = req.user._id;

    console.log(
      "🔄 Updating chat:",
      chatId,
      "with",
      messages?.length,
      "messages"
    );

    const chat = await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { messages },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    console.log("✅ Chat updated successfully");
    res.json(chat);
  } catch (error) {
    console.error("❌ Error updating chat:", error);
    res.status(500).json({
      error: "Failed to update chat",
      details: error.message,
    });
  }
});

// Delete chat by ID
router.delete("/:chatId", protect, async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    const result = await Chat.findOneAndDelete({ _id: chatId, userId });

    if (!result) {
      return res.status(404).json({ error: "Chat not found" });
    }

    console.log("🗑️ Chat deleted successfully:", chatId);
    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting chat:", error);
    res.status(500).json({
      error: "Failed to delete chat",
      details: error.message,
    });
  }
});

export default router;
