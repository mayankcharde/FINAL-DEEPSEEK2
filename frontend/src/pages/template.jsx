import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTemplate } from "../context/TemplateContext";
import { Search, Filter, Grid, List, Star, Download, Eye, Heart, ChevronDown, X, Check, Clock, ArrowRight, Bookmark, RefreshCw } from "lucide-react";

const Template = () => {
  const navigate = useNavigate();
  const { setSelectedTemplate } = useTemplate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Advanced filtering options
  const categories = [
    { id: "all", name: "All Templates" },
    { id: "business", name: "Business" },
    { id: "creative", name: "Creative" },
    { id: "portfolio", name: "Portfolio" },
    { id: "blog", name: "Blog" },
    { id: "ecommerce", name: "E-commerce" }
  ];
  
  const handleUseTemplate = () => {
    setSelectedTemplate(selectedImage);
    navigate('/home');
  };

  // Add favorite functionality
  const toggleFavorite = (e, imageId) => {
    e.stopPropagation();
    if (favorites.includes(imageId)) {
      setFavorites(favorites.filter(id => id !== imageId));
    } else {
      setFavorites([...favorites, imageId]);
    }
  };

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('templateFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    // Track scroll for header effects
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('templateFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.png",
    "image4.png",
    "image5.png",
    "image6.png",
    "image7.png",
    "image8.png",
    "image9.png",
    "image10.png",
    "image11.png",
    "image12.png",
    "image13.png",
    "image14.png",
    "image15.png",
    "image16.png",
    "image17.png",
    "image18.png",
    "image19.png",
    "image20.png",
    "image21.png",
    "image22.png",
    "image23.jpeg",
    "image24.jpeg",
    "image25.jpeg",
    "image26.jpeg",
    "image27.jpeg",
    "image28.jpeg",
    "image29.jpeg",
    "image30.jpeg",
    "image31.jpeg",
    "image32.jpeg",
    "image33.jpeg",
    "image34.jpeg",
  ];

  // Filter images based on search term and category
  const filteredImages = useMemo(() => {
    return images.filter(image => {
      // In a real app, you'd have metadata for each image to filter by
      // For now, let's just filter by name for demonstration
      return image.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [images, searchTerm, selectedCategory]);

  // Skeleton loader for better UX
  const renderSkeletonLoaders = () => {
    return Array(8).fill().map((_, index) => (
      <div 
        key={`skeleton-${index}`}
        className="bg-white/5 rounded-xl overflow-hidden animate-pulse border border-white/10"
      >
        <div className="aspect-square bg-white/10"></div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-3 bg-white/10 rounded w-1/2"></div>
          <div className="flex gap-2 pt-1">
            <div className="h-6 w-6 rounded-full bg-white/10"></div>
            <div className="h-6 w-6 rounded-full bg-white/10"></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoNjB2NjBIMzB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-20"></div>

      {/* Multiple animated gradient orbs for a more dynamic background */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/30 rounded-full filter blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
      <div className="absolute top-3/4 left-1/2 w-60 h-60 bg-cyan-500/20 rounded-full filter blur-[100px] animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-pink-500/10 rounded-full filter blur-[80px] animate-pulse-slow"></div>

      {/* Fixed header with search and controls */}
      <header 
        className={`sticky top-0 z-30 w-full backdrop-blur-xl transition-all duration-300 ${
          scrolled 
            ? "bg-black/60 shadow-lg shadow-cyan-500/10 border-b border-white/10" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg border border-white/20 hover:border-cyan-400/50 text-white hover:text-cyan-300 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </motion.button>
          

          
          <div className="flex items-center gap-3">
            {/* View toggle buttons */}
            <div className="flex bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white/20 text-cyan-300" : "text-gray-400 hover:text-white"} transition-all duration-300`}
                title="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-white/20 text-cyan-300" : "text-gray-400 hover:text-white"} transition-all duration-300`}
                title="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>
      


      <div className="relative w-full max-w-[1400px] mx-auto px-6 py-12">        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.3)]"
        >
          Template Gallery
          <div className="h-1 w-40 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mt-4"></div>
        </motion.h1>
        


        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mx-auto`}
            style={{ maxWidth: "1200px", margin: "0 auto" }}
          >
            {renderSkeletonLoaders()}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={viewMode === "grid" 
              ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mx-auto"
              : "flex flex-col gap-6 max-w-3xl mx-auto"
            }
            style={viewMode === "grid" ? { maxWidth: "1200px", margin: "0 auto" } : {}}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{
                  scale: viewMode === "grid" ? 1.05 : 1.02,
                  y: -5,
                  boxShadow: "0 0 30px 5px rgba(56, 189, 248, 0.3)",
                }}
                className={`group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer h-full shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]`}
                onClick={() => setSelectedImage(image)}
              >
                {/* Favorite button */}
                <button
                  onClick={(e) => toggleFavorite(e, image)}
                  className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                    favorites.includes(image)
                      ? "bg-white/20 text-pink-500"
                      : "bg-black/30 text-white opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <Heart size={16} fill={favorites.includes(image) ? "#ec4899" : "none"} />
                </button>
                
                {viewMode === "grid" ? (
                  <>
                    {/* Card styling enhancements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

                    <div className="aspect-square overflow-hidden relative z-10">
                      <img
                        src={`/templates/${image}`}
                        alt={`Template ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                        loading="lazy"
                      />

                      {/* Enhanced gradient overlay on hover with glass effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full backdrop-blur-sm bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-white/10">
                          <p className="text-white font-medium">
                            Template {index + 1}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-cyan-300 text-sm flex items-center">
                              <Eye size={14} className="mr-1" /> View details
                            </p>
                            <div className="flex items-center">
                              <span className="inline-block px-2 py-0.5 bg-cyan-900/40 text-cyan-300 text-xs rounded">
                                Premium
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // List view with enhanced design
                  <div className="flex h-24 sm:h-28">
                    <div className="w-32 sm:w-40 overflow-hidden relative">
                      <img
                        src={`/templates/${image}`}
                        alt={`Template ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between relative">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="font-medium text-white">Template {index + 1}</h3>
                          <span className="text-xs text-cyan-300 bg-cyan-900/40 px-2 py-0.5 rounded">
                            Premium
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1">Modern design template</p>
                      </div>
                      <div className="flex items-center text-gray-400 text-xs">
                        <Clock size={12} className="mr-1" />
                        Added recently
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex items-center px-4 border-l border-white/10">
                      <ArrowRight size={16} className="text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Enhanced modal with more details and better layout */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl max-h-[90vh] w-full bg-gray-900/40 backdrop-blur-xl rounded-xl border border-white/10 mx-auto shadow-[0_0_25px_rgba(56,189,248,0.2)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced modal glow effects */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur opacity-70"></div>
              <div className="absolute inset-0 rounded-xl bg-gray-900/60 backdrop-blur-xl z-10"></div>

              <button
                className="absolute top-4 right-4 text-white hover:text-cyan-400 transition-colors z-30 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X size={20} />
              </button>
              
              <div className="relative z-20 flex flex-col lg:flex-row h-full max-h-[80vh]">
                <div className="lg:w-2/3 overflow-auto flex items-center justify-center p-4 bg-black/20">
                  <img
                    src={`/templates/${selectedImage}`}
                    alt="Selected template"
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                  />
                </div>
                
                <div className="lg:w-1/3 p-6 flex flex-col justify-center">
                  <button 
                    onClick={handleUseTemplate}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40"
                  >
                    <Check size={18} /> Use This Template
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Template;
