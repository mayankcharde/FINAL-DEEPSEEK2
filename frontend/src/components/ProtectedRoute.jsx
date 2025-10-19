import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Track redirects to prevent loops
let redirectAttempted = false;

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Reset redirect flag when component unmounts
    return () => {
      redirectAttempted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user && !isRedirecting && !redirectAttempted) {
    redirectAttempted = true;
    setIsRedirecting(true);
    return <Navigate to="/login" replace />;
  }

  // If we have a user, render children
  if (user) {
    redirectAttempted = false;
    return children;
  }

  // Show loading if we're in a redirect state
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default ProtectedRoute;
