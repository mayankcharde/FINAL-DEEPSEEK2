const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

// Import Chat model
const Chat = require("../models/Chat");

// Get all chats for the current user
router.get("/history", auth, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({
      updatedAt: -1,
    });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Save a new chat or update existing
router.post("/save", auth, async (req, res) => {
  try {
    const { title, messages, type } = req.body;

    const newChat = new Chat({
      userId: req.user.id,
      title,
      messages,
      type: type || "text",
    });

    const chat = await newChat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update an existing chat
router.put("/:id", auth, async (req, res) => {
  try {
    const { messages } = req.body;

    // Find chat by ID and user ID (for security)
    let chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    // Update messages and set updated time
    chat.messages = messages;
    chat.updatedAt = Date.now();

    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a chat
router.delete("/:id", auth, async (req, res) => {
  try {
    // Find chat by ID and user ID (for security)
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    await chat.remove();
    res.json({ msg: "Chat removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
