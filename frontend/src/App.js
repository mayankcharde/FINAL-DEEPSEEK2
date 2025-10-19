import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subscription from "./pages/subscription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
}

export default App;
