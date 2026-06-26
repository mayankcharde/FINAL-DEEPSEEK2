import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const testRouter = express.Router();

// Test protected route
testRouter.get("/protected", protect, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

// Test public route
testRouter.get("/public", (req, res) => {
  res.json({
    message: "This is a public route",
    timestamp: new Date().toISOString(),
  });
});

export default testRouter;