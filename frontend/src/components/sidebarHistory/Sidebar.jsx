// import React, { useState, useEffect } from 'react';
// // ... existing imports ...
// import TextChatHistoryItem from './TextChatHistoryItem';
// import axios from '../../utils/axios';
// import { useAuth } from '../../context/AuthContext';

// const Sidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'images', 'history'
//   const { user } = useAuth();
//   const [history, setHistory] = useState([]);
  
//   // Fetch history when user changes or after a chat is saved
//   const fetchHistory = async () => {
//     if (!user) {
//       setHistory([]);
//       return;
//     }
    
//     try {
//       const response = await axios.get('/api/chat/history');
//       setHistory(response.data || []);
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     }
//   };
  
//   useEffect(() => {
//     if (user) {
//       fetchHistory();
//     }
//   }, [user]);
  
//   // Listen for chat saved events
//   useEffect(() => {
//     const handleChatSaved = () => {
//       fetchHistory();
//     };
    
//     window.addEventListener('chatSaved', handleChatSaved);
//     return () => {
//       window.removeEventListener('chatSaved', handleChatSaved);
//     };
//   }, []);
  
//   const handleDeleteChat = (chatId) => {
//     setHistory(prev => prev.filter(chat => chat._id !== chatId));
//   };
  
//   const handleNewChat = () => {
//     window.dispatchEvent(new CustomEvent('newChatRequested'));
//   };
  
//   // ... existing code ...
  
//   // Separate chats by type
//   const textChats = history.filter(chat => chat.type === 'text');
//   const imageAnalysisChats = history.filter(chat => chat.type === 'image-analysis');
  
//   return (
//     <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
//       {/* ... existing sidebar header ... */}
      
//       {/* New Chat Button */}
//       <button onClick={handleNewChat} className="new-chat-button">
//         <PlusCircle className="icon" />
//         {isExpanded && <span>New Chat</span>}
//       </button>
      
//       {/* Tabs */}
//       <div className="tabs">
//         <button 
//           className={`tab ${activeTab === 'chat' ? 'active' : ''}`} 
//           onClick={() => setActiveTab('chat')}
//         >
//           <MessageSquare className="icon" />
//           {isExpanded && <span>Chat</span>}
//         </button>
//         <button 
//           className={`tab ${activeTab === 'images' ? 'active' : ''}`}
//           onClick={() => setActiveTab('images')}
//         >
//           <Image className="icon" />
//           {isExpanded && <span>Images</span>}
//         </button>
//       </div>
      
//       {/* History Section */}
//       {activeTab === 'chat' && (
//         <div className="history-section">
//           <h3 className="history-title">{isExpanded && 'Recent Chats'}</h3>
//           <div className="history-items">
//             {textChats.length > 0 ? (
//               textChats.map(chat => (
//                 <TextChatHistoryItem 
//                   key={chat._id} 
//                   chat={chat} 
//                   onDeleteSuccess={handleDeleteChat}
//                 />
//               ))
//             ) : (
//               isExpanded && <p className="empty-history">No recent chats</p>
//             )}
//           </div>
//         </div>
//       )}
      
//       {activeTab === 'images' && (
//         <div className="history-section">
//           <h3 className="history-title">{isExpanded && 'Image Analysis History'}</h3>
//           <div className="history-items">
//             {imageAnalysisChats.length > 0 ? (
//               imageAnalysisChats.map(analysis => (
//                 // ... existing image analysis history items ...
//               ))
//             ) : (
//               isExpanded && <p className="empty-history">No image analysis history</p>
//             )}
//           </div>
//         </div>
//       )}
      
//       {/* ... existing sidebar footer ... */}
//     </div>
//   );
// };

// export default Sidebar;
