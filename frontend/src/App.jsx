import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./styles/animations.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TemplateProvider } from "./context/TemplateContext";
import Subscription from "./pages/subscription";
import Help from "./pages/help";
import ProfileEdit from "./pages/profileEdit";
import Template from "./pages/template";
import ImageAnalysis from "./components/imageAnalysis";
import OpenRouterImageGen from "./components/imageGen";
import Favorites from "./pages/Favorites";
import SavedResponses from "./pages/SavedResponses";

function AppRoutes() {
  const { loading } = useAuth();

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-black">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/help" element={<Help />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/templates"
        element={
          <ProtectedRoute>
            <Template />
          </ProtectedRoute>
        }
      />
      <Route
        path="/image-analysis"
        element={
          <ProtectedRoute>
            <ImageAnalysis />
          </ProtectedRoute>
        }
      />
      <Route
        path="/image-gen"
        element={
          <ProtectedRoute>
            <OpenRouterImageGen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved-responses"
        element={
          <ProtectedRoute>
            <SavedResponses />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <TemplateProvider>
        <Router>
          <AppRoutes />
        </Router>
      </TemplateProvider>
    </AuthProvider>
  );
}

export default App;
