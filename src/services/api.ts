const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Auth
  async loginWithGoogle(token: string) {
    return this.request('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async loginWithGitHub(code: string) {
    return this.request('/api/auth/github', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  // User
  async getUserProfile() {
    return this.request('/api/user/profile');
  }

  async updateUserProfile(data: any) {
    return this.request('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Posts
  async getPosts() {
    return this.request('/api/posts');
  }

  async getPost(id: string) {
    return this.request(`/api/posts/${id}`);
  }

  async getAuthorPosts() {
    return this.request('/api/author/posts');
  }

  async createPost(data: any) {
    return this.request('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(id: string, data: any) {
    return this.request(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string) {
    return this.request(`/api/posts/${id}`, {
      method: 'DELETE',
    });
  }

  async likePost(id: string, userId?: string) {
    return this.request(`/api/posts/${id}/like`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }
}

export const apiService = new ApiService();