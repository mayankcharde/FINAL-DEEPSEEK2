import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
// Import animations CSS
import "./styles/animations.css";
import "./styles/markdown.css";
createRoot(document.getElementById("root")).render(<App />);
