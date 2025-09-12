import React from 'react';
import { BlogPost } from '../../types/blog';
import PostCard from './PostCard';

interface PostGridProps {
  posts: BlogPost[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;