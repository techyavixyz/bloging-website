import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, Trash2, MoreHorizontal } from 'lucide-react';
import { mockPosts, mockAuthor } from '../data/mockData';

const AuthorPage: React.FC = () => {
  const authorPosts = mockPosts.filter(post => post.author.id === mockAuthor.id);
  const publishedPosts = authorPosts.filter(post => post.isPublished);
  const draftPosts = authorPosts.filter(post => !post.isPublished);

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
            to="/author/new-post"
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
            <p className="text-2xl font-bold text-gray-900">{authorPosts.length}</p>
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
            <p className="text-2xl font-bold text-blue-600">12.5K</p>
          </div>
        </div>

        {/* Posts Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
            <div className="flex space-x-2">
              <button className="btn-secondary text-sm">All</button>
              <button className="text-sm px-3 py-1 text-gray-600 hover:text-gray-900">Published</button>
              <button className="text-sm px-3 py-1 text-gray-600 hover:text-gray-900">Drafts</button>
            </div>
          </div>

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
                {authorPosts.map((post) => (
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
                      {post.publishedAt.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">2.1K</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{post.likes}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/blog/${post.id}`}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
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
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;