import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, Copy, Check } from 'lucide-react';
import axios from '../utils/axios';

const SavedResponse = () => {
  const [savedResponses, setSavedResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchSavedResponses();
  }, []);

  const fetchSavedResponses = async () => {
    try {
      const response = await axios.get('/api/saved-responses');
      setSavedResponses(response.data);
    } catch (error) {
      console.error('Error fetching saved responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSaved = async (id) => {
    try {
      await axios.delete(`/api/saved-responses/${id}`);
      setSavedResponses(savedResponses.filter(saved => saved._id !== id));
    } catch (error) {
      console.error('Error deleting saved response:', error);
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
            <Bookmark className="w-8 h-8 text-blue-500" />
            Saved Responses
          </h1>
          <p className="text-gray-600 mt-2">Your collection of saved responses</p>
        </div>
        
        {savedResponses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved responses yet</h3>
            <p className="text-gray-500">Start saving responses to access them later</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedResponses.map((saved) => (
              <div key={saved._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-gray-500">
                      {new Date(saved.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(saved.response, saved._id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy response"
                      >
                        {copiedId === saved._id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => removeSaved(saved._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete saved response"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{saved.response}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedResponse;