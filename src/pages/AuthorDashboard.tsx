import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { apiService } from '../services/api';
import { BlogPost } from '../types/blog';

const AuthorDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const authorPosts = await apiService.getAuthorPosts();
      setPosts(authorPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiService.deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const publishedPosts = posts.filter(post => post.isPublished);
  const draftPosts = posts.filter(post => !post.isPublished);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Author Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your articles and track performance</p>
          </div>
          <Link
            to="/admin/new-post"
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Posts</h3>
            <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Published</h3>
            <p className="text-2xl font-bold text-green-600">{publishedPosts.length}</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Drafts</h3>
            <p className="text-2xl font-bold text-yellow-600">{draftPosts.length}</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Views</h3>
            <p className="text-2xl font-bold text-blue-600">
              {posts.reduce((total, post) => total + (post.likes * 10), 0)}
            </p>
          </div>
        </div>

        {/* Posts Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
            <div className="flex space-x-2">
              <button className="btn-secondary text-sm">All ({posts.length})</button>
              <button className="text-sm px-3 py-1 text-gray-600 hover:text-gray-900">
                Published ({publishedPosts.length})
              </button>
              <button className="text-sm px-3 py-1 text-gray-600 hover:text-gray-900">
                Drafts ({draftPosts.length})
              </button>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15.75 9.75L12 6l-3.75 3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-4">Start writing your first blog post</p>
              <Link
                to="/admin/new-post"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create First Post</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Published</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Views</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Likes</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-start space-x-3">
                          {post.thumbnail && (
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-900 line-clamp-1">{post.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{post.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            post.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{post.likes * 10}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{post.likes}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          {post.isPublished && (
                            <Link
                              to={`/blog/${post.id}`}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            to={`/admin/edit/${post.id}`}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="More"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;