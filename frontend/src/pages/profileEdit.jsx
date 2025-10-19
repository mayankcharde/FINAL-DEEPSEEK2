import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Camera, Save, ArrowLeft } from 'lucide-react';
import axios from '../utils/axios';

const ProfileEdit = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePhoto: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        profilePhoto: user.profilePhoto || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put('/api/auth/profile', formData);
      if (response.data.user) {
        login(response.data.user);
        setSuccess('Profile updated successfully!');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const maxWidth = 300;
        const maxHeight = 300;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setFormData({ ...formData, profilePhoto: compressedDataUrl });
      };
      
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-all duration-300 mb-8 group"
          >
            <div className="p-2 rounded-full bg-zinc-800/50 group-hover:bg-purple-500/20 transition-all duration-300">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="relative">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 mb-4 tracking-tight">
              Profile Settings
            </h1>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60"></div>
          </div>
          <p className="text-zinc-400 text-lg font-light">Customize your digital identity</p>
        </div>

        {/* Main Form Container */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
          
          <div className="relative bg-zinc-900/60 backdrop-blur-2xl border border-zinc-700/30 rounded-3xl p-10 shadow-2xl">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60 blur-lg group-hover:opacity-80 transition-all duration-300"></div>
                <div className="relative w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-600 overflow-hidden">
                  {formData.profilePhoto ? (
                    <img
                      src={formData.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-8 w-8 text-zinc-400" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 p-2 bg-purple-600 rounded-full border-2 border-zinc-900">
                  <Camera className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm backdrop-blur-sm animate-in fade-in duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  {error}
                </div>
              </div>
            )}

            {success && (
              <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-sm backdrop-blur-sm animate-in fade-in duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {success}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Name Field */}
              <div className="space-y-4 group">
                <label className="text-zinc-300 text-sm font-semibold flex items-center gap-3 tracking-wide uppercase">
                  <div className="p-2.5 bg-purple-500/20 rounded-xl border border-purple-500/30 group-hover:bg-purple-500/30 transition-all duration-300">
                    <User className="h-4 w-4 text-purple-400" />
                  </div>
                  Display Name
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-700 blur-xl scale-105"></div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="relative w-full px-6 py-5 bg-zinc-800/50 border border-zinc-600/40 rounded-2xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 transition-all duration-500 text-lg font-medium backdrop-blur-sm hover:bg-zinc-800/60 focus:bg-zinc-800/70 focus:scale-[1.02] transform"
                    placeholder="Enter your display name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-4 group">
                <label className="text-zinc-300 text-sm font-semibold flex items-center gap-3 tracking-wide uppercase">
                  <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30 group-hover:bg-blue-500/30 transition-all duration-300">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-700 blur-xl scale-105"></div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="relative w-full px-6 py-5 bg-zinc-800/50 border border-zinc-600/40 rounded-2xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition-all duration-500 text-lg font-medium backdrop-blur-sm hover:bg-zinc-800/60 focus:bg-zinc-800/70 focus:scale-[1.02] transform"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-4 group">
                <label className="text-zinc-300 text-sm font-semibold flex items-center gap-3 tracking-wide uppercase">
                  <div className="p-2.5 bg-cyan-500/20 rounded-xl border border-cyan-500/30 group-hover:bg-cyan-500/30 transition-all duration-300">
                    <Camera className="h-4 w-4 text-cyan-400" />
                  </div>
                  Profile Photo
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl scale-105"></div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="relative w-full px-6 py-5 bg-zinc-800/50 border border-zinc-600/40 rounded-2xl text-zinc-100 transition-all duration-500 backdrop-blur-sm hover:bg-zinc-800/60 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-purple-500 file:to-blue-500 file:text-white hover:file:from-purple-400 hover:file:to-blue-400 file:transition-all file:duration-300 file:shadow-lg hover:file:shadow-xl file:cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-6 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center justify-center gap-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white shadow-2xl transform hover:-translate-y-2 hover:scale-[1.02] active:translate-y-0 active:scale-100 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100 tracking-wider uppercase font-black"
                  >
                    {loading ? (
                      <div className="flex items-center gap-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span className="animate-pulse">Updating Profile...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <Save className="h-6 w-6" />
                        <span>Save Changes</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;