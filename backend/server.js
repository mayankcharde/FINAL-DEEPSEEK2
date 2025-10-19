import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

// Import all route files
import authRouter from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.js";
import imageRoutes from "./routes/Image.js";
import chatRouter from "./routes/chat.routes.js";
import testRouter from "./routes/test.routes.js";
import savedResponseRoutes from "./routes/savedResponse.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import historyRoutes from "./routes/history.routes.js"; // Add this line

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ---------- Connect to Database ----------
try {
  await connectDb();
  console.log("✅ Database connected successfully");
} catch (error) {
  console.error("❌ Database connection error:", error);
  process.exit(1);
}

// ---------- CORS Configuration ----------
const allowedOrigins = [
  "http://localhost:5173",
  // "http://localhost:8000",
  // "http://localhost:3000",
  process.env.FRONTEND_URL, // production frontend URL
].filter(Boolean); // remove undefined

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        console.warn(`⚠️ Origin ${origin} not allowed by CORS`);
        if (process.env.NODE_ENV === "development") {
          return callback(null, true); // allow in development
        }
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ---------- Middleware ----------
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Log each request
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.path}`);
  next();
});

// ---------- Routes ----------
app.use("/api/auth", authRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/chat", chatRouter);
app.use("/api/image", imageRoutes);
app.use("/api/saved-responses", savedResponseRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/test", testRouter);
app.use("/api", aiRoutes);
app.use("/api/history", historyRoutes); // Add this line

// ---------- Root Route ----------
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API is running successfully",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ---------- Public Test Routes ----------
app.get("/api/test/favorites", (req, res) => {
  res.json({
    message: "✅ Favorites route working",
    note: "This is just a test endpoint. Real endpoints require authentication.",
  });
});

app.get("/api/test/saved-responses", (req, res) => {
  res.json({
    message: "✅ Saved responses route working",
    note: "This is just a test endpoint. Real endpoints require authentication.",
  });
});

// ---------- Temporary Public Routes for Testing ----------
app.post("/api/public/favorites", (req, res) => {
  const { title, content, type = "response" } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  res.status(201).json({
    _id: "temp-" + Date.now(),
    title,
    content,
    type,
    createdAt: new Date().toISOString(),
  });
});

app.post("/api/public/saved-responses", (req, res) => {
  const { title, content, type = "response" } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  res.status(201).json({
    _id: "temp-" + Date.now(),
    title,
    content,
    type,
    createdAt: new Date().toISOString(),
  });
});

// ---------- Error Handling ----------
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
