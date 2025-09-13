import { mockPosts } from '../data/mockData';
import { BlogPost } from '../types/blog';

// In-memory storage for posts (in a real app, this would be a database)
let posts: BlogPost[] = [...mockPosts];
let nextId = posts.length + 1;

// User profile storage
let userProfile = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  bio: 'Full-stack developer passionate about React, TypeScript, and modern web technologies.',
  linkedinUrl: 'https://linkedin.com/in/johndoe',
  githubUrl: 'https://github.com/johndoe'
};
class ApiService {
  async getUserProfile() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return userProfile;
  }

  async updateUserProfile(data: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    userProfile = { ...userProfile, ...data };
    
    // Update all posts with new author info
    posts = posts.map(post => ({
      ...post,
      author: {
        ...post.author,
        name: userProfile.name,
        avatar: userProfile.avatar,
        bio: userProfile.bio,
        linkedinUrl: userProfile.linkedinUrl
      }
    }));
    
    return userProfile;
  }

  // Posts
  async getPosts() {
    // Only return published posts for public view
    return posts.filter(post => post.isPublished);
  }

  async getPost(id: string) {
    return posts.find(post => post.id === id);
  }

  async getAuthorPosts() {
    // Return all posts for author dashboard
    return posts;
  }

  async createPost(data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPost = {
      id: nextId.toString(),
      ...data,
      author: userProfile,
      publishedAt: data.isPublished ? new Date() : null,
      likes: 0,
      comments: 0,
      readTime: Math.max(1, Math.ceil(data.content.split(' ').length / 200)), // Estimate read time
    };
    
    posts.unshift(newPost);
    nextId++;
    return newPost;
  }

  async updatePost(id: string, data: any) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    const existingPost = posts[postIndex];
    const updatedPost = {
      ...existingPost,
      ...data,
      publishedAt: data.isPublished ? (existingPost.publishedAt || new Date()) : null,
      readTime: Math.max(1, Math.ceil(data.content.split(' ').length / 200)),
    };
    
    posts[postIndex] = updatedPost;
    return updatedPost;
  }

  async deletePost(id: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    posts.splice(postIndex, 1);
    return { success: true };
  }

  async likePost(id: string, userId?: string) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const post = posts.find(p => p.id === id);
    if (post) {
      post.likes += 1;
    }
    return { success: true };
  }
}

export const apiService = new ApiService();