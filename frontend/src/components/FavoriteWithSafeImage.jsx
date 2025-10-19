import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import SafeImage from "./SafeImage";
import { getFavorites, addFavorite, removeFavorite } from "../utils/hook";
import { Heart, Trash2, Copy, Check, AlertTriangle } from "lucide-react";

/**
 * Favorites Component with Safe Image Handling
 *
 * This component demonstrates:
 * 1. Using SafeImage for image rendering with fallbacks
 * 2. Using the API functions from hook.js
 * 3. Error handling with user feedback
 * 4. Loading states
 */
const FavoriteWithSafeImage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Fetch favorites on component mount
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFavorites();
        setFavorites(data || []);
      } catch (err) {
        setError("Failed to load favorites. Please try again.");
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Loading timed out. Please refresh to try again.");
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [user]);

  // Handle favorite removal
  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      setFavorites(favorites.filter((fav) => fav._id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
      // Toast notification handled in hook function
    }
  };

  // Copy content to clipboard
  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy to clipboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
            {/* <Heart className="w-8 h-8 text-red-500" /> */}
            Favorites
          </h1>
          <p className="text-gray-600 mt-2">Your saved favorite responses</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {/* <Heart className="w-8 h-8 text-red-500" /> */}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500">
              Start favoriting responses to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div
                key={favorite._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-gray-500">
                      {new Date(favorite.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          copyToClipboard(favorite.content, favorite._id)
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy content"
                      >
                        {copiedId === favorite._id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleRemoveFavorite(favorite._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove favorite"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title section */}
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {favorite.title}
                  </h3>

                  {/* Content section */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {favorite.content}
                    </p>
                  </div>

                  {/* Image section - using SafeImage component */}
                  {favorite.imageUrl && (
                    <div className="mt-4">
                      <SafeImage
                        src={favorite.imageUrl}
                        alt={`Image for ${favorite.title}`}
                        className="rounded-lg max-w-full h-auto"
                        style={{ maxHeight: "300px" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteWithSafeImage;
