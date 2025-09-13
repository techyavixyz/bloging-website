export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  tags: string[];
  author: Author;
  publishedAt: Date | null;
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
  githubUrl?: string;
  location?: string;
  connections?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: Date;
  postId: string;
}