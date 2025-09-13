import React from 'react';
import { Linkedin, ExternalLink, MapPin, Users } from 'lucide-react';
import { apiService } from '../services/api';

const LinkedInProfile: React.FC = () => {
  const [profile, setProfile] = React.useState({
    name: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Full-stack developer passionate about React, TypeScript, and modern web technologies.',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    location: 'San Francisco, CA',
    connections: '500+'
  });

  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userProfile = await apiService.getUserProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">LinkedIn Profile</h3>
        <Linkedin className="w-6 h-6 text-blue-600" />
      </div>
      
      <div className="flex items-start space-x-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{profile.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{profile.bio}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.location || 'Location not set'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{profile.connections || '0'} connections</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Connect</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
              Message
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h5 className="text-sm font-medium text-gray-900 mb-2">Recent Activity</h5>
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            • Published article: "The Future of Web Development"
          </div>
          <div className="text-sm text-gray-600">
            • Shared insights on React best practices
          </div>
          <div className="text-sm text-gray-600">
            • Connected with 15 new professionals this week
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInProfile;