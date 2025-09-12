import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share2, Clock } from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface PostCardProps {
  post: BlogPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="card hover:shadow-md transition-shadow">
      {post.thumbnail && (
        <Link to={`/blog/${post.id}`}>
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        </Link>
      )}
      
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <Link to={`/blog/${post.id}`}>
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
          {post.title}
        </h2>
      </Link>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{post.publishedAt.toLocaleDateString()}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.comments}</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-yellow-500 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="text-gray-500 hover:text-green-500 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;