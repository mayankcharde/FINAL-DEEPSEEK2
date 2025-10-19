// // src/components/Sidebar.jsx
// import {
//   Plus,
//   User,
//   Search,
//   BookOpen,
//   History,
//   Layout,
//   FileText,
//   Bookmark,
//   Settings,
//   Star,
//   Menu,
//   X,
//   LogOut,
//   Edit,
//   HelpCircle,
// } from "lucide-react";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import axios from "../utils/axios";
// import { Image as ImageIcon } from "lucide-react";
// import TextChatHistoryItem from "./sidebarHistory/TextChatHistoryItem";

// // Image Generation History Component
// const ImageGenerationHistory = () => {
//   const [imageHistory, setImageHistory] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Load image history from localStorage
//     const loadHistory = () => {
//       try {
//         const savedHistory = localStorage.getItem("imageGenerationHistory");
//         if (savedHistory) {
//           setImageHistory(JSON.parse(savedHistory));
//         }
//       } catch (e) {
//         console.error("Error loading image history:", e);
//         setImageHistory([]);
//       }
//     };

//     // Load initial history
//     loadHistory();

//     // Listen for new image generations
//     const handleImageGenerated = () => {
//       loadHistory();
//     };

//     window.addEventListener("imageGenerated", handleImageGenerated);

//     // Cleanup
//     return () => {
//       window.removeEventListener("imageGenerated", handleImageGenerated);
//     };
//   }, []);

//   const navigateToImage = (imageData) => {
//     navigate("/image-gen", {
//       state: { selectedImage: imageData },
//     });
//   };

//   // Group images by date
//   const groupImagesByDate = () => {
//     if (!imageHistory.length) return [];

//     const today = new Date().toDateString();
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);
//     const yesterdayString = yesterday.toDateString();

//     const groups = {
//       Today: [],
//       Yesterday: [],
//       Older: [],
//     };

//     imageHistory.forEach((img) => {
//       const date = new Date(img.timestamp).toDateString();
//       if (date === today) {
//         groups["Today"].push(img);
//       } else if (date === yesterdayString) {
//         groups["Yesterday"].push(img);
//       } else {
//         groups["Older"].push(img);
//       }
//     });

//     return Object.entries(groups)
//       .filter(([, images]) => images.length > 0)
//       .map(([label, images]) => ({ label, images }));
//   };

//   if (imageHistory.length === 0) {
//     return (
//       <div className="text-center text-zinc-500 text-sm py-8">
//         No image generation history
//       </div>
//     );
//   }

//   return (
//     <div>
//       {groupImagesByDate().map((group) => (
//         <div key={group.label} className="mb-3">
//           <h4 className="text-xs font-medium text-zinc-500 mb-2 px-1">
//             {group.label}
//           </h4>
//           <div className="space-y-2">
//             {group.images.map((image) => (
//               <button
//                 key={image.id}
//                 onClick={() => navigateToImage(image)}
//                 className="w-full text-left px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800/80 transition-all duration-200 flex items-center gap-2"
//               >
//                 {image.url && (
//                   <div className="w-8 h-8 rounded overflow-hidden shrink-0 bg-black">
//                     <img
//                       src={image.url}
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//                 <div className="flex-1 min-w-0">
//                   <div className="text-xs truncate">{image.prompt}</div>
//                   <div className="text-xs text-zinc-500 mt-0.5">
//                     {new Date(image.timestamp).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </div>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Sidebar = () => {
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [activeButton, setActiveButton] = useState(null);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [imageHistory, setImageHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const userMenuRef = useRef(null);
//   const { user: userData, logout } = useAuth();

//   // Fetch chat history
//   const fetchChatHistory = useCallback(async () => {
//     if (!userData) {
//       setChatHistory([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.get("/api/chat/history");
//       // Separate chats by type
//       const textChats = response.data.filter((chat) => chat.type === "text");
//       const imageChats = response.data.filter(
//         (chat) => chat.type === "image-analysis"
//       );

//       setChatHistory(textChats);
//       setImageHistory(imageChats);
//     } catch (error) {
//       console.error("❌ Error fetching chat history:", error.response?.status);
//       setChatHistory([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [userData]);

//   // Load chat history on component mount and when user changes
//   useEffect(() => {
//     if (userData) {
//       fetchChatHistory();
//     }
//   }, [userData, fetchChatHistory]);

//   // Listen for chat saved events to refresh history
//   useEffect(() => {
//     const handleChatSaved = () => {
//       console.log("🔔 chatSaved event received in sidebar");
//       fetchChatHistory();
//     };

//     window.addEventListener("chatSaved", handleChatSaved);
//     return () => {
//       window.removeEventListener("chatSaved", handleChatSaved);
//     };
//   }, [fetchChatHistory]);

//   // Function to handle navigation to the subscription page
//   const handleUpgradeClick = () => {
//     setIsMobileOpen(false); // Close mobile sidebar when navigating
//     setUserDropdownOpen(false); // Close dropdown if open
//     navigate("/subscription");
//   };

//   // Function to toggle user dropdown
//   const toggleUserDropdown = () => {
//     setUserDropdownOpen(!userDropdownOpen);
//   };

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setUserDropdownOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Handle profile actions
//   const handleEditProfile = () => {
//     setUserDropdownOpen(false);
//     setIsMobileOpen(false); // Close mobile sidebar when navigating
//     navigate("/profile");
//     console.log("Navigating to profile edit page"); // Add this for debugging
//   };

//   const handleDeleteProfile = async () => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete your profile? This action cannot be undone."
//       )
//     ) {
//       setUserDropdownOpen(false);
//       try {
//         await axios.delete("/api/auth/profile");
//         await logout();
//         navigate("/login");
//       } catch (error) {
//         console.error("Failed to delete profile:", error);
//       }
//     }
//   };

//   const handleLogout = async () => {
//     setUserDropdownOpen(false);
//     await logout();
//     navigate("/login");
//   };

//   const handleHelp = () => {
//     setUserDropdownOpen(false);
//     setIsMobileOpen(false); // Close mobile sidebar when navigating
//     navigate("/help");
//   };

//   // Group chats by date
//   const groupChatsByDate = (chats) => {
//     const now = new Date();
//     const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//     const groups = {
//       "30 Days": [],
//       Older: [],
//     };

//     chats.forEach((chat) => {
//       const chatDate = new Date(chat.createdAt);
//       if (chatDate >= thirtyDaysAgo) {
//         groups["30 Days"].push(chat);
//       } else {
//         groups["Older"].push(chat);
//       }
//     });

//     return Object.entries(groups)
//       .filter(([, chats]) => chats.length > 0)
//       .map(([label, chats]) => ({ label, chats }));
//   };

//   // Handle chat selection
//   const handleChatSelect = async (chatId) => {
//     try {
//       const response = await axios.get(`/api/chat/${chatId}`);
//       // Navigate to appropriate page based on chat type
//       if (response.data.type === "image-analysis") {
//         navigate("/image-analysis", { state: { chatData: response.data } });
//       } else {
//         navigate("/home", { state: { chatData: response.data } });
//       }
//       setIsMobileOpen(false);
//     } catch (error) {
//       console.error("Error loading chat:", error);
//     }
//   };

//   // Handle deleting chat items
//   const handleDeleteChat = (chatId) => {
//     setChatHistory((prev) => prev.filter((chat) => chat._id !== chatId));
//     setImageHistory((prev) => prev.filter((chat) => chat._id !== chatId));
//   };

//   // Handle starting a new chat
//   const handleNewChat = () => {
//     window.dispatchEvent(new CustomEvent("newChatRequested"));
//   };

//   return (
//     <>
//       {/* Mobile Menu Toggle Button with updated styling */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-zinc-700/50"
//         onClick={() => setIsMobileOpen(!isMobileOpen)}
//       >
//         {isMobileOpen ? (
//           <X className="h-5 w-5 text-zinc-200 animate-in fade-in duration-200" />
//         ) : (
//           <Menu className="h-5 w-5 text-zinc-200 animate-in fade-in duration-200" />
//         )}
//       </button>

//       {/* Sidebar with modernized styling */}
//       <aside
//         className={`
//           fixed md:relative w-[85%] sm:w-72 lg:w-80 bg-black h-full flex flex-col 
//           border-r border-zinc-800/80 overflow-y-auto overflow-x-hidden transition-all duration-400 ease-in-out 
//           z-40 shadow-2xl md:shadow-none backdrop-blur-xl scrollbar-thin scrollbar-thumb-blue-800/40 scrollbar-track-transparent
//           ${
//             isMobileOpen
//               ? "left-0 animate-in fade-in-5 duration-300"
//               : "-left-full md:left-0"
//           }
//         `}
//       >
//         {/* Mobile Close Button - Top right on mobile */}
//         <div className="absolute top-4 right-4 md:hidden">
//           <button
//             className="p-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700/90 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300"
//             onClick={() => setIsMobileOpen(false)}
//           >
//             <X className="h-4 w-4 text-zinc-200" />
//           </button>
//         </div>

//         {/* Top Section with Logo/Brand - Enhanced with animation */}
//         <div className="p-5 sm:p-6 pb-4">
//           <div className="flex items-center gap-3 group">
//             {/* <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-800/20 group-hover:shadow-blue-700/30 group-hover:scale-105 transition-all duration-300">
//               <Layout className="h-5 w-5 text-white animate-pulse" />
//             </div> */}
//             <img
//               src="/deepseekfinal.jpg"
//               alt="DeepSeek Logo"
//               className="h-25 transition-all duration-300 group-hover:scale-105"
//             />
//           </div>
//         </div>

//         {/* Search Component - Modernized */}
//         <div className="px-4 sm:px-5 pt-1 pb-4">
//           <div className="relative group">
//             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//               {/* <Search className="h-3.5 w-3.5 text-zinc-500 group-focus-within:text-blue-400 transition-colors duration-300" /> */}
//             </div>
//             {/* <input
//               type="text"
//               placeholder="Search conversations..."
//               className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/40 border border-zinc-700/50 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/70 focus:border-blue-500/70 transition-all duration-300 backdrop-blur-sm hover:bg-zinc-800/60"
//             /> */}
//           </div>
//         </div>

//         {/* Library Section - With increased font size */}
//         <div className="px-4 sm:px-5 pt-1 pb-4">
//           <div className="flex items-center gap-2 mb-3 px-2">
//             <h2 className="text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-blue-300 tracking-wide">
//               Library
//             </h2>
//           </div>
//           <div className="space-y-2 bg-zinc-800/30 rounded-3xl p-3 border border-zinc-700/20">
//             {["Templates", "Saved Responses"].map((item, index) => {
//               const icons = [
//                 <FileText key={1} />,
//                 <Bookmark key={2} />,
//                 <Star key={3} />,
//               ];

//               const handleLibraryClick = (index) => {
//                 setActiveButton(index);
//                 setIsMobileOpen(false);
//                 if (index === 0) {
//                   // Templates
//                   navigate("/templates");
//                 } else if (index === 1) {
//                   // Saved Responses
//                   navigate("/saved-responses");
//                 } else if (index === 2) {
//                   // Favorites
//                   navigate("/favorites");
//                 }
//               };

//               return (
//                 <button
//                   key={index}
//                   className={`w-full text-left px-4 py-3 rounded-2xl text-zinc-400 transition-all duration-300 text-sm flex items-center gap-3 group
//                     ${
//                       activeButton === index
//                         ? "bg-gradient-to-r from-blue-900/40 to-indigo-900/20 text-white border border-blue-700/30 shadow-md shadow-blue-900/10 transform scale-[1.02]"
//                         : "hover:bg-zinc-800/80 hover:border hover:border-zinc-700/40 hover:text-zinc-100 hover:shadow-md hover:shadow-blue-900/5 hover:transform hover:scale-[1.01]"
//                     }`}
//                   onClick={() => handleLibraryClick(index)}
//                 >
//                   <div
//                     className={`h-4 w-4 transition-all duration-300 ${
//                       activeButton === index
//                         ? "text-blue-400"
//                         : "text-zinc-500 group-hover:text-blue-400"
//                     }`}
//                   >
//                     {icons[index]}
//                   </div>
//                   <span className="font-medium">{item}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Divider line - Enhanced gradient with more margin */}
//         <div className="h-px bg-gradient-to-r from-transparent via-blue-700/30 to-transparent mx-4 my-3"></div>

//         {/* Gray divider line between Library and History */}
//         <div className="h-[3px] bg-blue-600 mx-4 my-2"></div>

//         {/* History Section - With increased font size */}
//         <div className="px-4 sm:px-5 pt-3 pb-3">
//           <div className="flex items-center justify-between mb-2.5 px-2">
//             <div className="flex items-center gap-2">
//               <History className="h-4 w-4 text-blue-400" strokeWidth={2} />
//               <h2 className="text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-blue-300 tracking-wide">
//                 History
//               </h2>
//             </div>
//             <button
//               onClick={fetchChatHistory}
//               className="text-zinc-500 hover:text-blue-400 p-1.5 rounded-full hover:bg-blue-900/20 transition-all duration-300 hover:shadow-sm hover:shadow-blue-500/20"
//               title="Refresh History"
//             >
//               {/* <Settings className="h-3.5 w-3.5" strokeWidth={2} /> */}
//             </button>
//           </div>
//         </div>

//         {/* Chat History - With more rounded corners */}
//         <div className="px-4 sm:px-5 mb-3">
//           <div className="border border-zinc-800/60 rounded-3xl bg-zinc-800/30 shadow-inner backdrop-blur-sm h-[35vh] relative overflow-hidden">
//             {/* Subtle background decoration */}
//             <div className="absolute inset-0 overflow-hidden opacity-10">
//               <div className="absolute top-0 left-0 w-full h-20 bg-blue-500/10 blur-3xl rounded-full"></div>
//               <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>
//             </div>

//             <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700/50 scrollbar-thumb-rounded-full scrollbar-track-transparent px-3 py-3 relative z-10">
//               {loading ? (
//                 <div className="flex items-center justify-center h-full">
//                   <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//               ) : chatHistory.length === 0 ? (
//                 <div className="text-center text-zinc-500 text-sm py-8">
//                   No chat history yet
//                 </div>
//               ) : (
//                 groupChatsByDate(chatHistory).map((group) => (
//                   <div key={group.label} className="mb-5 sm:mb-6">
//                     <h3 className="text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 sm:mb-3.5 px-1.5">
//                       {group.label}
//                     </h3>
//                     <div className="space-y-2">
//                       {group.chats.map((chat) => (
//                         <button
//                           key={chat._id}
//                           onClick={() => handleChatSelect(chat._id)}
//                           className="w-full text-left px-3.5 py-2.5 rounded-xl text-zinc-300 hover:bg-gradient-to-r hover:from-zinc-800/90 hover:to-zinc-800/40 hover:border hover:border-zinc-700/40 transition-all duration-300 group hover:shadow-md hover:shadow-blue-900/5 hover:transform hover:translate-x-0.5"
//                         >
//                           <span className="text-xs sm:text-sm truncate block group-hover:text-white transition-all duration-300">
//                             {chat.title}
//                           </span>
//                           <span className="text-xs text-zinc-500 block mt-1">
//                             {chat.type === "image-analysis" ? "📷" : "💬"}{" "}
//                             {new Date(chat.createdAt).toLocaleDateString()}
//                           </span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Image Generation History */}
//         <div className="px-4 sm:px-5 mb-3">
//           <div className="border border-zinc-800/60 rounded-3xl bg-zinc-800/30 shadow-inner backdrop-blur-sm h-[25vh] relative overflow-hidden">
//             {/* Subtle background decoration */}
//             <div className="absolute inset-0 overflow-hidden opacity-10">
//               <div className="absolute top-0 right-0 w-full h-20 bg-purple-500/10 blur-3xl rounded-full"></div>
//               <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
//             </div>

//             <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700/50 scrollbar-thumb-rounded-full scrollbar-track-transparent px-3 py-3 relative z-10">
//               <h3 className="text-xs sm:text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3 sm:mb-3.5 px-1.5 flex items-center gap-2">
//                 <ImageIcon className="h-3.5 w-3.5" /> Image History
//               </h3>

//               <ImageGenerationHistory />
//             </div>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <div className="px-4 sm:px-5 mb-3">
//           <h3 className="text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
//             {/* <Menu className="h-3.5 w-3.5" />  */}
//           </h3>
//           <div className="border border-zinc-800/60 rounded-3xl bg-zinc-800/30 shadow-inner backdrop-blur-sm max-h-[30vh] relative overflow-hidden">
//             {/* Subtle background decoration */}
//             <div className="absolute inset-0 overflow-hidden opacity-10">
//               <div className="absolute top-0 left-0 w-full h-20 bg-blue-500/10 blur-3xl rounded-full"></div>
//               <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full"></div>
//             </div>

//             <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700/50 scrollbar-thumb-rounded-full scrollbar-track-transparent px-3 py-3 relative z-10">
//               <div className="space-y-2">
//                 {/* Removed duplicate New Chat Button */}

//                 {/* Edit Profile Button */}
//                 <button
//                   onClick={handleEditProfile}
//                   className="w-full text-left px-4 py-3 rounded-xl text-zinc-300 hover:bg-gradient-to-r hover:from-zinc-800/90 hover:to-zinc-800/40 hover:border hover:border-zinc-700/40 transition-all duration-300 flex items-center gap-3"
//                 >
//                   <User className="h-4 w-4 text-zinc-400" />
//                   <span className="font-medium text-sm">Edit Profile</span>
//                 </button>

//                 {/* Help Button */}
//                 <button
//                   onClick={handleHelp}
//                   className="w-full text-left px-4 py-3 rounded-xl text-zinc-300 hover:bg-gradient-to-r hover:from-zinc-800/90 hover:to-zinc-800/40 hover:border hover:border-zinc-700/40 transition-all duration-300 flex items-center gap-3"
//                 >
//                   <HelpCircle className="h-4 w-4 text-zinc-400" />
//                   <span className="font-medium text-sm">Help</span>
//                 </button>

//                 {/* Upgrade to Pro Button */}
//                 <button
//                   onClick={handleUpgradeClick}
//                   className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/20 transform hover:-translate-y-0.5 border border-blue-500/20 mt-3"
//                 >
//                   <div className="bg-white/20 rounded-full p-1 backdrop-blur-sm">
//                     <Star className="h-3.5 w-3.5" strokeWidth={2} />
//                   </div>
//                   <span className="font-medium text-sm tracking-wide">
//                     Upgrade to Pro
//                   </span>
//                   <div className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5">
//                     Save 20%
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Flexible spacer - smaller now */}
//         <div className="flex-grow"></div>

//         {/* New Chat Button - Keep this one */}
//         <div className="px-4 sm:px-5 pb-6 sm:pb-7">
//           <button
//             onClick={() => {
//               console.log("🆕 New Chat button clicked");
//               setIsMobileOpen(false); // Close mobile sidebar
//               window.dispatchEvent(new CustomEvent("newChatRequested"));
//             }}
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-3.5 rounded-3xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-900/30 transform hover:-translate-y-0.5 border border-blue-500/20"
//           >
//             <div className="bg-white/20 rounded-full p-1 backdrop-blur-sm">
//               <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
//             </div>
//             <span className="font-medium text-sm tracking-wide">New Chat</span>
//           </button>
//         </div>

//         {/* User Profile - Compact version */}
//         <div className="border-t border-zinc-800/60 mt-3 mb-5">
//           <div className="flex items-center justify-between px-6 py-4 mx-2 mt-2 rounded-3xl bg-zinc-800/40 border border-zinc-700/30 shadow-inner">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg border border-zinc-600/50 overflow-hidden">
//                 {userData?.profilePhoto ? (
//                   <img
//                     src={userData.profilePhoto}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <User className="w-4 h-4 text-white" strokeWidth={2} />
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm font-medium text-zinc-200 tracking-wide">
//                   {userData?.name || "User"}
//                 </span>
//                 <span className="text-xs text-zinc-400">
//                   {userData?.subscription || "Free Account"}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center">
//               <button
//                 className="text-zinc-400 hover:text-blue-400 p-2 rounded-lg hover:bg-zinc-700/50 transition-all"
//                 onClick={toggleUserDropdown}
//                 title="User menu"
//               >
//                 {/* <Settings className="h-4 w-4" strokeWidth={2} /> */}
//               </button>

//               <button
//                 className="ml-1 text-zinc-400 hover:text-red-400 p-2 rounded-lg hover:bg-zinc-700/50 transition-all"
//                 onClick={handleLogout}
//                 title="Logout"
//               >
//                 <LogOut className="h-4 w-4" strokeWidth={2} />
//               </button>
//             </div>

//             {/* User dropdown menu */}
//             {userDropdownOpen && (
//               <div className="absolute top-[70px] right-4 w-48 bg-zinc-800 rounded-xl shadow-lg shadow-blue-900/20 border border-zinc-700/50 animate-in fade-in duration-200 z-50">
//                 <div className="py-1 flex flex-col">
//                   <button
//                     onClick={handleDeleteProfile}
//                     className="flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-sm"
//                   >
//                     <User className="h-4 w-4 text-red-400" />
//                     Delete Profile
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>

//       {/* Mobile Overlay - Enhanced with blur effect */}
//       {isMobileOpen && (
//         <div
//           className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 animate-in fade-in duration-300"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;






// src/components/Sidebar.jsx
import {
  Plus,
  User,
  Search,
  BookOpen,
  History,
  Layout,
  FileText,
  Bookmark,
  Settings,
  Star,
  Menu,
  X,
  LogOut,
  Edit,
  HelpCircle,
} from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";
import { Image as ImageIcon } from "lucide-react";
import TextChatHistoryItem from "./sidebarHistory/TextChatHistoryItem";

// Image Generation History Component
const ImageGenerationHistory = () => {
  const [imageHistory, setImageHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load image history from localStorage
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem("imageGenerationHistory");
        if (savedHistory) {
          setImageHistory(JSON.parse(savedHistory));
        }
      } catch (e) {
        console.error("Error loading image history:", e);
        setImageHistory([]);
      }
    };

    // Load initial history
    loadHistory();

    // Listen for new image generations
    const handleImageGenerated = () => {
      loadHistory();
    };

    window.addEventListener("imageGenerated", handleImageGenerated);

    // Cleanup
    return () => {
      window.removeEventListener("imageGenerated", handleImageGenerated);
    };
  }, []);

  const navigateToImage = (imageData) => {
    navigate("/image-gen", {
      state: { selectedImage: imageData },
    });
  };

  // Group images by date
  const groupImagesByDate = () => {
    if (!imageHistory.length) return [];

    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    const groups = {
      Today: [],
      Yesterday: [],
      Older: [],
    };

    imageHistory.forEach((img) => {
      const date = new Date(img.timestamp).toDateString();
      if (date === today) {
        groups["Today"].push(img);
      } else if (date === yesterdayString) {
        groups["Yesterday"].push(img);
      } else {
        groups["Older"].push(img);
      }
    });

    return Object.entries(groups)
      .filter(([, images]) => images.length > 0)
      .map(([label, images]) => ({ label, images }));
  };

  if (imageHistory.length === 0) {
    return (
      <div className="text-center text-zinc-500 text-sm py-8">
        No image generation history
      </div>
    );
  }

  return (
    <div>
      {groupImagesByDate().map((group) => (
        <div key={group.label} className="mb-3">
          <h4 className="text-xs font-medium text-zinc-500 mb-2 px-1">
            {group.label}
          </h4>
          <div className="space-y-2">
            {group.images.map((image) => (
              <button
                key={image.id}
                onClick={() => navigateToImage(image)}
                className="w-full text-left px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800/80 transition-all duration-200 flex items-center gap-2"
              >
                {image.url && (
                  <div className="w-8 h-8 rounded overflow-hidden shrink-0 bg-black">
                    <img
                      src={image.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs truncate">{image.prompt}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {new Date(image.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [imageHistory, setImageHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const { user: userData, logout } = useAuth();

  // Fetch chat history
  const fetchChatHistory = useCallback(async () => {
    if (!userData) {
      setChatHistory([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("/api/chat/history");
      // Separate chats by type
      const textChats = response.data.filter((chat) => chat.type === "text");
      const imageChats = response.data.filter(
        (chat) => chat.type === "image-analysis"
      );

      setChatHistory(textChats);
      setImageHistory(imageChats);
    } catch (error) {
      console.error("❌ Error fetching chat history:", error.response?.status);
      setChatHistory([]);
    } finally {
      setLoading(false);
    }
  }, [userData]);

  // Load chat history on component mount and when user changes
  useEffect(() => {
    if (userData) {
      fetchChatHistory();
    }
  }, [userData, fetchChatHistory]);

  // Listen for chat saved events to refresh history
  useEffect(() => {
    const handleChatSaved = () => {
      console.log("🔔 chatSaved event received in sidebar");
      fetchChatHistory();
    };

    window.addEventListener("chatSaved", handleChatSaved);
    return () => {
      window.removeEventListener("chatSaved", handleChatSaved);
    };
  }, [fetchChatHistory]);

  // Function to handle navigation to the subscription page
  const handleUpgradeClick = () => {
    setIsMobileOpen(false); // Close mobile sidebar when navigating
    setUserDropdownOpen(false); // Close dropdown if open
    navigate("/subscription");
  };

  // Function to toggle user dropdown
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle profile actions
  const handleEditProfile = () => {
    setUserDropdownOpen(false);
    setIsMobileOpen(false); // Close mobile sidebar when navigating
    navigate("/profile");
    console.log("Navigating to profile edit page"); // Add this for debugging
  };

  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      setUserDropdownOpen(false);
      try {
        await axios.delete("/api/auth/profile");
        await logout();
        navigate("/login");
      } catch (error) {
        console.error("Failed to delete profile:", error);
      }
    }
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
    navigate("/login");
  };

  const handleHelp = () => {
    setUserDropdownOpen(false);
    setIsMobileOpen(false); // Close mobile sidebar when navigating
    navigate("/help");
  };

  // Group chats by date
  const groupChatsByDate = (chats) => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const groups = {
      "30 Days": [],
      Older: [],
    };

    chats.forEach((chat) => {
      const chatDate = new Date(chat.createdAt);
      if (chatDate >= thirtyDaysAgo) {
        groups["30 Days"].push(chat);
      } else {
        groups["Older"].push(chat);
      }
    });

    return Object.entries(groups)
      .filter(([, chats]) => chats.length > 0)
      .map(([label, chats]) => ({ label, chats }));
  };

  // Handle chat selection
  const handleChatSelect = async (chatId) => {
    try {
      const response = await axios.get(`/api/chat/${chatId}`);
      // Navigate to appropriate page based on chat type
      if (response.data.type === "image-analysis") {
        navigate("/image-analysis", { state: { chatData: response.data } });
      } else {
        navigate("/home", { state: { chatData: response.data } });
      }
      setIsMobileOpen(false);
    } catch (error) {
      console.error("Error loading chat:", error);
    }
  };

  // Handle deleting chat items
  const handleDeleteChat = (chatId) => {
    setChatHistory((prev) => prev.filter((chat) => chat._id !== chatId));
    setImageHistory((prev) => prev.filter((chat) => chat._id !== chatId));
  };

  // Handle starting a new chat
  const handleNewChat = () => {
    window.dispatchEvent(new CustomEvent("newChatRequested"));
  };

  return (
    <>
      {/* Mobile Menu Toggle Button with updated styling */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border border-zinc-700/50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-5 w-5 text-zinc-200 animate-in fade-in duration-200" />
        ) : (
          <Menu className="h-5 w-5 text-zinc-200 animate-in fade-in duration-200" />
        )}
      </button>

      {/* Sidebar with modernized styling */}
      <aside
        className={`
          fixed md:relative w-[85%] sm:w-72 lg:w-80 bg-black h-full flex flex-col 
          border-r border-zinc-800/80 overflow-y-auto overflow-x-hidden transition-all duration-400 ease-in-out 
          z-40 shadow-2xl md:shadow-none backdrop-blur-xl scrollbar-thin scrollbar-thumb-blue-800/40 scrollbar-track-transparent
          ${
            isMobileOpen
              ? "left-0 animate-in fade-in-5 duration-300"
              : "-left-full md:left-0"
          }
        `}
      >
        {/* Mobile Close Button - Top right on mobile */}
        <div className="absolute top-4 right-4 md:hidden">
          <button
            className="p-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700/90 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-4 w-4 text-zinc-200" />
          </button>
        </div>

        {/* Top Section with Logo/Brand - Enhanced with animation */}
        <div className="p-5 sm:p-6 pb-4">
          <div className="flex items-center gap-3 group">
            {/* <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-800/20 group-hover:shadow-blue-700/30 group-hover:scale-105 transition-all duration-300">
              <Layout className="h-5 w-5 text-white animate-pulse" />
            </div> */}
            <img
              src="/deepseekfinal.jpg"
              alt="DeepSeek Logo"
              className="h-25 transition-all duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Search Component - Modernized */}
        <div className="px-4 sm:px-5 pt-1 pb-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              {/* <Search className="h-3.5 w-3.5 text-zinc-500 group-focus-within:text-blue-400 transition-colors duration-300" /> */}
            </div>
            {/* <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/40 border border-zinc-700/50 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/70 focus:border-blue-500/70 transition-all duration-300 backdrop-blur-sm hover:bg-zinc-800/60"
            /> */}
          </div>
        </div>

        {/* Library Section - With increased font size */}
        <div className="px-4 sm:px-5 pt-1 pb-4">
          <div className="flex items-center gap-2 mb-3 px-2">
            <h2 className="text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-blue-300 tracking-wide">
              Library
            </h2>
          </div>
          <div className="space-y-2 bg-zinc-800/30 rounded-3xl p-3 border border-zinc-700/20">
            {["Templates", "Saved Responses"].map((item, index) => {
              const icons = [
                <FileText key={1} />,
                <Bookmark key={2} />,
                <Star key={3} />,
              ];

              const handleLibraryClick = (index) => {
                setActiveButton(index);
                setIsMobileOpen(false);
                if (index === 0) {
                  // Templates
                  navigate("/templates");
                } else if (index === 1) {
                  // Saved Responses
                  navigate("/saved-responses");
                } else if (index === 2) {
                  // Favorites
                  navigate("/favorites");
                }
              };

              return (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-zinc-400 transition-all duration-300 text-sm flex items-center gap-3 group
                    ${
                      activeButton === index
                        ? "bg-gradient-to-r from-blue-900/40 to-indigo-900/20 text-white border border-blue-700/30 shadow-md shadow-blue-900/10 transform scale-[1.02]"
                        : "hover:bg-zinc-800/80 hover:border hover:border-zinc-700/40 hover:text-zinc-100 hover:shadow-md hover:shadow-blue-900/5 hover:transform hover:scale-[1.01]"
                    }`}
                  onClick={() => handleLibraryClick(index)}
                >
                  <div
                    className={`h-4 w-4 transition-all duration-300 ${
                      activeButton === index
                        ? "text-blue-400"
                        : "text-zinc-500 group-hover:text-blue-400"
                    }`}
                  >
                    {icons[index]}
                  </div>
                  <span className="font-medium">{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider line - Enhanced gradient with more margin */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-700/30 to-transparent mx-4 my-3"></div>

        {/* Gray divider line between Library and History */}
        <div className="h-[3px] bg-blue-600 mx-4 my-2"></div>

        {/* History Section - With increased font size */}
        <div className="px-4 sm:px-5 pt-3 pb-3">
          <div className="flex items-center justify-between mb-2.5 px-2">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-blue-400" strokeWidth={2} />
              <h2 className="text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-blue-300 tracking-wide">
                History
              </h2>
            </div>
            <button
              onClick={fetchChatHistory}
              className="text-zinc-500 hover:text-blue-400 p-1.5 rounded-full hover:bg-blue-900/20 transition-all duration-300 hover:shadow-sm hover:shadow-blue-500/20"
              title="Refresh History"
            >
              {/* <Settings className="h-3.5 w-3.5" strokeWidth={2} /> */}
            </button>
          </div>
        </div>

        {/* Chat History - With more rounded corners */}
        <div className="px-4 sm:px-5 mb-3">
          <div className="border border-zinc-800/60 rounded-3xl bg-zinc-800/30 shadow-inner backdrop-blur-sm h-[35vh] relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute top-0 left-0 w-full h-20 bg-blue-500/10 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>
            </div>

            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700/50 scrollbar-thumb-rounded-full scrollbar-track-transparent px-3 py-3 relative z-10">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : chatHistory.length === 0 ? (
                <div className="text-center text-zinc-500 text-sm py-8">
                  No chat history yet
                </div>
              ) : (
                groupChatsByDate(chatHistory).map((group) => (
                  <div key={group.label} className="mb-5 sm:mb-6">
                    <h3 className="text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 sm:mb-3.5 px-1.5">
                      {group.label}
                    </h3>
                    <div className="space-y-2">
                      {group.chats.map((chat) => (
                        <button
                          key={chat._id}
                          onClick={() => handleChatSelect(chat._id)}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl text-zinc-300 hover:bg-gradient-to-r hover:from-zinc-800/90 hover:to-zinc-800/40 hover:border hover:border-zinc-700/40 transition-all duration-300 group hover:shadow-md hover:shadow-blue-900/5 hover:transform hover:translate-x-0.5"
                        >
                          <span className="text-xs sm:text-sm truncate block group-hover:text-white transition-all duration-300">
                            {chat.title}
                          </span>
                          <span className="text-xs text-zinc-500 block mt-1">
                            {chat.type === "image-analysis" ? "📷" : "💬"}{" "}
                            {new Date(chat.createdAt).toLocaleDateString()}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Image Generation History */}
        <div className="px-4 sm:px-5 mb-3">
          <div className="border border-zinc-800/60 rounded-3xl bg-zinc-800/30 shadow-inner backdrop-blur-sm h-[25vh] relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute top-0 right-0 w-full h-20 bg-purple-500/10 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
            </div>

            <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700/50 scrollbar-thumb-rounded-full scrollbar-track-transparent px-3 py-3 relative z-10">
              <h3 className="text-xs sm:text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3 sm:mb-3.5 px-1.5 flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5" /> Image History
              </h3>

              <ImageGenerationHistory />
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="px-4 sm:px-5 mb-3">
          <h3 className="text-xs sm:text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
            {/* <Menu className="h-3.5 w-3.5" />  */}
          </h3>
          <div className="border border-zinc-800/60 rounded-3xl bg-zinc-800/30 shadow-inner backdrop-blur-sm max-h-[30vh] relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute top-0 left-0 w-full h-20 bg-blue-500/10 blur-3xl rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl rounded-full"></div>
            </div>

            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700/50 scrollbar-thumb-rounded-full scrollbar-track-transparent px-3 py-3 relative z-10">
              <div className="space-y-2">
                {/* Removed duplicate New Chat Button */}

                {/* Edit Profile Button */}
                <button
                  onClick={handleEditProfile}
                  className="w-full text-left px-4 py-3 rounded-xl text-zinc-300 hover:bg-gradient-to-r hover:from-zinc-800/90 hover:to-zinc-800/40 hover:border hover:border-zinc-700/40 transition-all duration-300 flex items-center gap-3"
                >
                  <User className="h-4 w-4 text-zinc-400" />
                  <span className="font-medium text-sm">Edit Profile</span>
                </button>

                {/* Help Button */}
                <button
                  onClick={handleHelp}
                  className="w-full text-left px-4 py-3 rounded-xl text-zinc-300 hover:bg-gradient-to-r hover:from-zinc-800/90 hover:to-zinc-800/40 hover:border hover:border-zinc-700/40 transition-all duration-300 flex items-center gap-3"
                >
                  <HelpCircle className="h-4 w-4 text-zinc-400" />
                  <span className="font-medium text-sm">Help</span>
                </button>

                {/* Upgrade to Pro Button */}
                <button
                  onClick={handleUpgradeClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/20 transform hover:-translate-y-0.5 border border-blue-500/20 mt-3"
                >
                  <div className="bg-white/20 rounded-full p-1 backdrop-blur-sm">
                    <Star className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                  <span className="font-medium text-sm tracking-wide">
                    Upgrade to Pro
                  </span>
                  <div className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5">
                    Save 20%
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Flexible spacer - smaller now */}
        <div className="flex-grow"></div>

        {/* New Chat Button - Keep this one */}
        <div className="px-4 sm:px-5 pb-6 sm:pb-7">
          <button
            onClick={() => {
              console.log("🆕 New Chat button clicked");
              setIsMobileOpen(false); // Close mobile sidebar
              window.dispatchEvent(new CustomEvent("newChatRequested"));
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-3.5 rounded-3xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-900/30 transform hover:-translate-y-0.5 border border-blue-500/20"
          >
            <div className="bg-white/20 rounded-full p-1 backdrop-blur-sm">
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            </div>
            <span className="font-medium text-sm tracking-wide">New Chat</span>
          </button>
        </div>

        {/* User Profile - Compact version */}
        <div className="border-t border-zinc-800/60 mt-3 mb-5">
          <div className="flex items-center justify-between px-6 py-4 mx-2 mt-2 rounded-3xl bg-zinc-800/40 border border-zinc-700/30 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg border border-zinc-600/50 overflow-hidden">
                {userData?.profilePhoto ? (
                  <img
                    src={userData.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-white" strokeWidth={2} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-200 tracking-wide">
                  {userData?.name || "User"}
                </span>
                <span className="text-xs text-zinc-400">
                  {userData?.subscription || "Free Account"}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <button
                className="text-zinc-400 hover:text-blue-400 p-2 rounded-lg hover:bg-zinc-700/50 transition-all"
                onClick={toggleUserDropdown}
                title="User menu"
              >
                {/* <Settings className="h-4 w-4" strokeWidth={2} /> */}
              </button>

              <button
                className="ml-1 text-zinc-400 hover:text-red-400 p-2 rounded-lg hover:bg-zinc-700/50 transition-all"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            {/* User dropdown menu */}
            {/* {userDropdownOpen && (
              <div className="absolute top-[70px] right-4 w-48 bg-zinc-800 rounded-xl shadow-lg shadow-blue-900/20 border border-zinc-700/50 animate-in fade-in duration-200 z-50">
                <div className="py-1 flex flex-col">
                  <button
                    onClick={handleDeleteProfile}
                    className="flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-sm"
                  >
                    <User className="h-4 w-4 text-red-400" />
                    Delete Profile
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Developer Credit */}
        <div className="text-center text-white text-[12px] mb-7 px-3.5 italic">
          Designed & Developed by Mayank Shirish Charde
        </div>
      </aside>

      {/* Mobile Overlay - Enhanced with blur effect */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
