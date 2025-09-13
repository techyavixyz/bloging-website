import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import db from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Posts Routes
app.get('/api/posts', (req, res) => {
  const posts = db.prepare(`
    SELECT p.*, u.name as author_name, u.avatar as author_avatar, u.bio as author_bio
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.is_published = 1
    ORDER BY p.published_at DESC
  `).all();
  
  const formattedPosts = posts.map(post => ({
    ...post,
    tags: JSON.parse(post.tags || '[]'),
    author: {
      id: post.author_id,
      name: post.author_name,
      avatar: post.author_avatar,
      bio: post.author_bio
    }
  }));
  
  res.json(formattedPosts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = db.prepare(`
    SELECT p.*, u.name as author_name, u.avatar as author_avatar, u.bio as author_bio, u.linkedin_url, u.github_url
    FROM posts p
    JOIN users u ON p.author_id = u.id
    WHERE p.id = ?
  `).get(req.params.id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const formattedPost = {
    ...post,
    tags: JSON.parse(post.tags || '[]'),
    author: {
      id: post.author_id,
      name: post.author_name,
      avatar: post.author_avatar,
      bio: post.author_bio,
      linkedinUrl: post.linkedin_url,
      githubUrl: post.github_url
    }
  };
  
  res.json(formattedPost);
});

app.get('/api/author/posts', (req, res) => {
  const posts = db.prepare(`
    SELECT * FROM posts ORDER BY created_at DESC
  `).all();
  
  const formattedPosts = posts.map(post => ({
    ...post,
    tags: JSON.parse(post.tags || '[]')
  }));
  
  res.json(formattedPosts);
});

app.post('/api/posts', (req, res) => {
  const { title, content, excerpt, thumbnail, tags, audience, isPublished } = req.body;
  const postId = uuidv4();
  const defaultAuthorId = 'default-author'; // Use a default author ID
  
  db.prepare(`
    INSERT INTO posts (id, title, content, excerpt, thumbnail, tags, author_id, audience, is_published, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    postId, 
    title, 
    content, 
    excerpt, 
    thumbnail, 
    JSON.stringify(tags || []), 
    defaultAuthorId, 
    audience || 'everyone',
    isPublished ? 1 : 0,
    isPublished ? new Date().toISOString() : null
  );
  
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId);
  res.json(post);
});

app.put('/api/posts/:id', (req, res) => {
  const { title, content, excerpt, thumbnail, tags, audience, isPublished } = req.body;
  
  db.prepare(`
    UPDATE posts 
    SET title = ?, content = ?, excerpt = ?, thumbnail = ?, tags = ?, audience = ?, 
        is_published = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title, 
    content, 
    excerpt, 
    thumbnail, 
    JSON.stringify(tags || []), 
    audience || 'everyone',
    isPublished ? 1 : 0,
    isPublished ? new Date().toISOString() : null,
    req.params.id
  );
  
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  res.json(post);
});

app.delete('/api/posts/:id', (req, res) => {
  db.prepare('DELETE FROM posts WHERE id = ?')
    .run(req.params.id);
  
  res.json({ success: true });
});

// Like Routes
app.post('/api/posts/:id/like', (req, res) => {
  const { userId } = req.body;
  const ipAddress = req.ip;
  const likeId = uuidv4();
  
  try {
    db.prepare(`
      INSERT INTO likes (id, user_id, post_id, ip_address)
      VALUES (?, ?, ?, ?)
    `).run(likeId, userId, req.params.id, ipAddress);
    
    // Update post likes count
    db.prepare('UPDATE posts SET likes = likes + 1 WHERE id = ?')
      .run(req.params.id);
    
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Already liked' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});