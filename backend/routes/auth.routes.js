// import express from "express";
// import {
//   Login,
//   logOut,
//   signUp,
//   getCurrentUser,
// } from "../controllers/auth.controllers.js";
// import { protect } from "../middleware/authMiddleware.js";

// const authRouter = express.Router();

// // Public routes
// authRouter.post("/signup", signUp);
// authRouter.post("/login", Login);
// authRouter.post("/logout", logOut);

// // Protected routes
// // authRouter.get("/me", protect, getCurrentUser);

// export default authRouter;

import express from "express";
import {
  Login,
  logOut,
  signUp,
  getCurrentUser,
  updateProfile,
  deleteProfile,
} from "../controllers/auth.controllers.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

// Public routes
authRouter.post("/signup", signUp);
authRouter.post("/signin", Login);
authRouter.post("/login", Login); // Alternative endpoint
authRouter.post("/logout", logOut);

// Protected routes
authRouter.get("/me", protect, getCurrentUser);
authRouter.put("/profile", protect, updateProfile);
authRouter.delete("/profile", protect, deleteProfile);

export default authRouter;
