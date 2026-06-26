const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  messages: [
    {
      id: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        enum: ["user", "ai"],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  type: {
    type: String,
    enum: ["text", "image-analysis", "image-generation"],
    default: "text",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("chat", ChatSchema);
