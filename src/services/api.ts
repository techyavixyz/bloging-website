import { mockPosts, mockAuthor } from '../data/mockData';

class ApiService {
  // Mock API methods for demo purposes
  async updateUserProfile(data: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...mockAuthor, ...data };
  }

  // Posts
  async getPosts() {
    return mockPosts;
  }

  async getPost(id: string) {
    return mockPosts.find(post => post.id === id);
  }

  async getAuthorPosts() {
    return mockPosts;
  }

  async createPost(data: any) {
    // Simulate creating a new post
    const newPost = {
      id: Date.now().toString(),
      ...data,
      author: mockAuthor,
      publishedAt: new Date(),
      likes: 0,
      comments: 0,
    };
    return newPost;
  }

  async updatePost(id: string, data: any) {
    // Simulate updating a post
    return { ...data, id };
  }

  async deletePost(id: string) {
    // Simulate deleting a post
    return { success: true };
  }

  async likePost(id: string, userId?: string) {
    // Simulate liking a post
    return { success: true };
  }
}

export const apiService = new ApiService();