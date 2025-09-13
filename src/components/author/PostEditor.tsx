import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, Upload, Link as LinkIcon, AtSign, Bell } from 'lucide-react';
import { apiService } from '../../services/api';
import AudienceSelector from './AudienceSelector';
import ThumbnailUpload from './ThumbnailUpload';
import MarkdownTabs from './MarkdownTabs';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';
import Toolbar from './Toolbar';

const PostEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [audience, setAudience] = useState<'everyone' | 'private' | 'subscribers'>('everyone');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (isEditing && id) {
      loadPost(id);
    }
  }, [id, isEditing]);

  const loadPost = async (postId: string) => {
    setLoading(true);
    try {
      const post = await apiService.getPost(postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setThumbnail(post.thumbnail || '');
        setTags(post.tags);
        setAudience(post.audience);
      }
    } catch (error) {
      console.error('Failed to load post:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateExcerpt = (content: string) => {
    // Remove markdown formatting and get first 160 characters
    const plainText = content
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .trim();
    
    return plainText.length > 160 ? plainText.substring(0, 160) + '...' : plainText;
  };

  const handleSave = async (publish = false) => {
    if (!title.trim()) {
      alert('Please enter a title for your post');
      return;
    }

    setSaving(true);
    try {
      const postData = {
        title: title.trim(),
        content,
        excerpt: excerpt || generateExcerpt(content),
        thumbnail,
        tags,
        audience,
        isPublished: publish
      };

      if (isEditing && id) {
        await apiService.updatePost(id, postData);
      } else {
        await apiService.createPost(postData);
      }

      navigate('/admin');
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = () => {
    // Save logic here
    handleSave(false);
  };

  const handlePublish = () => {
    // Publish logic here
    handleSave(true);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveDraft}
              disabled={saving}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={saving}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              <span>{saving ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          <AudienceSelector value={audience} onChange={setAudience} />
          <div className="flex items-center space-x-2">
            <Bell className={`w-4 h-4 ${notifications ? 'text-primary-600' : 'text-gray-400'}`} />
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span>Receive updates when members engage</span>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <ThumbnailUpload value={thumbnail} onChange={setThumbnail} />
        
        <div>
          <input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-bold border-none outline-none placeholder-gray-400 bg-transparent"
            maxLength={250}
          />
          <div className="text-right text-sm text-gray-400 mt-1">
            {title.length}/250
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (optional)
          </label>
          <textarea
            placeholder="Brief description of your post... (will be auto-generated if left empty)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
            maxLength={300}
          />
          <div className="text-right text-sm text-gray-400 mt-1">
            {excerpt.length}/300
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <MarkdownTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <Toolbar />
          
          {activeTab === 'write' ? (
            <MarkdownEditor value={content} onChange={setContent} />
          ) : (
            <MarkdownPreview content={content} />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (press Enter to add)
          </label>
          <input
            type="text"
            placeholder="Add tags..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                const newTag = e.currentTarget.value.trim();
                if (!tags.includes(newTag)) {
                  setTags([...tags, newTag]);
                }
                e.currentTarget.value = '';
              }
            }}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-sm rounded-full cursor-pointer hover:bg-primary-100"
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
              >
                {tag} ×
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;