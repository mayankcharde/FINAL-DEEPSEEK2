import History from "../models/history.model.js";
import asyncHandler from "express-async-handler";

// Get all history items for a user (both chat and image)
export const getUserHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const history = await History.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await History.countDocuments({ userId });

  res.json({
    history,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

// Delete a history item
export const deleteHistoryItem = asyncHandler(async (req, res) => {
  const { historyId } = req.params;
  const userId = req.user._id;

  const historyItem = await History.findOne({ _id: historyId, userId });

  if (!historyItem) {
    res.status(404);
    throw new Error("History item not found");
  }

  await historyItem.remove();
  res.json({ message: "History item removed" });
});

// Clear all history for a user
export const clearHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await History.deleteMany({ userId });
  res.json({ message: "History cleared successfully" });
});
