import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserHistory,
  deleteHistoryItem,
  clearHistory,
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", protect, getUserHistory);
router.delete("/:historyId", protect, deleteHistoryItem);
router.delete("/", protect, clearHistory);

export default router;
