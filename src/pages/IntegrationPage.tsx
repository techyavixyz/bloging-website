import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Save, ExternalLink, Upload, X } from 'lucide-react';
import { apiService } from '../services/api';

const IntegrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
    linkedinUrl: '',
    githubUrl: '',
    location: '',
    connections: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await apiService.getUserProfile();
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        avatar: profile.avatar || '',
        linkedinUrl: profile.linkedinUrl || '',
        githubUrl: profile.githubUrl || '',
        location: profile.location || '',
        connections: profile.connections || '',
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await apiService.updateUserProfile(formData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      // For demo purposes, we'll use a placeholder URL
      const placeholderUrl = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150';
      setFormData({ ...formData, avatar: placeholderUrl });
    }
  };

  const handleRemoveAvatar = () => {
    setFormData({ ...formData, avatar: '' });
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile & Integrations</h1>
          <p className="text-gray-600 mt-2">
            Manage your profile information and social media integrations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                
                {formData.avatar ? (
                  <div className="relative inline-block">
                    <img
                      src={formData.avatar}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </label>
                  </div>
                )}
                
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-2">Click to upload a profile picture</p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell readers about yourself..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn Profile URL</span>
                  </div>
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Github className="w-4 h-4 text-gray-900" />
                    <span>GitHub Profile URL</span>
                  </div>
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="connections" className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Connections
                </label>
                <input
                  type="text"
                  id="connections"
                  name="connections"
                  value={formData.connections}
                  onChange={handleChange}
                  placeholder="e.g., 500+"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.includes('successfully') 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Preview</h3>
              <div className="flex items-start space-x-4">
                <img
                  src={formData.avatar || 'https://via.placeholder.com/150x150?text=No+Image'}
                  alt={formData.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{formData.name || 'Your Name'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.bio || 'Your bio will appear here...'}
                  </p>
                  {(formData.location || formData.connections) && (
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                      {formData.location && (
                        <div className="flex items-center space-x-1">
                          <span>📍</span>
                          <span>{formData.location}</span>
                        </div>
                      )}
                      {formData.connections && (
                        <div className="flex items-center space-x-1">
                          <span>👥</span>
                          <span>{formData.connections} connections</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex space-x-2 mt-3">
                    {formData.linkedinUrl && (
                      <a
                        href={formData.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {formData.githubUrl && (
                      <a
                        href={formData.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-gray-700"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p>Your LinkedIn profile will be displayed on your blog posts and homepage</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p>GitHub integration helps showcase your development projects</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p>A good bio helps readers connect with your content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPage;