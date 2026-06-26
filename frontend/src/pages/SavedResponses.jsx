import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Copy, Trash2, Star, Calendar } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';

const SavedResponses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedResponses, setSavedResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch saved responses
  const fetchSavedResponses = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get('/api/saved-responses');
      setSavedResponses(response.data || []);
    } catch (error) {
      console.error('Error fetching saved responses:', error);
      setSavedResponses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedResponses();
    } else {
      setLoading(false);
      setSavedResponses([]);
    }
  }, [user]);

  // Delete saved response
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this response?')) return;
    
    try {
      await axios.delete(`/api/saved-responses/${id}`);
      setSavedResponses(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  // Copy to clipboard
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Add to favorites
  const handleAddToFavorites = async (response) => {
    try {
      await axios.post('/api/favorites', {
        title: response.title,
        content: response.content,
        type: 'saved-response'
      });
      // You could add a toast notification here
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  // Filter responses based on search
  const filteredResponses = savedResponses.filter(response =>
    response.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    response.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-black">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-zinc-900/50 border-b border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>
              <h1 className="text-2xl font-semibold text-white">Saved Responses</h1>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search responses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredResponses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                {searchTerm ? 'No matching responses' : 'No saved responses yet'}
              </h3>
              <p className="text-zinc-400">
                {searchTerm ? 'Try adjusting your search terms' : 'Save responses from your conversations to access them here'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResponses.map((response) => (
                <div
                  key={response._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-white text-sm line-clamp-2 flex-1">
                      {response.title}
                    </h3>
                    <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(response.content)}
                        className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-lg transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAddToFavorites(response)}
                        className="p-1.5 text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 rounded-lg transition-colors"
                        title="Add to Favorites"
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(response._id)}
                        className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 text-sm line-clamp-4 mb-3">
                    {response.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(response.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="bg-zinc-800 px-2 py-1 rounded-full">
                      {response.type || 'Response'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedResponses;