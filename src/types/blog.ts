export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  tags: string[];
  author: Author;
  publishedAt: Date;
  readTime: number;
  likes: number;
  comments: number;
  isPublished: boolean;
  audience: 'everyone' | 'private' | 'subscribers';
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  linkedinUrl?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: Date;
  postId: string;
}