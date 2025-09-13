import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import db from './database.js';
import { 
  generateToken, 
  authMiddleware, 
  verifyGoogleToken, 
  verifyGitHubToken 
} from './auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);
    
    if (!payload) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    let user = db.prepare('SELECT * FROM users WHERE email = ?').get(payload.email);
    
    if (!user) {
      const userId = uuidv4();
      db.prepare(`
        INSERT INTO users (id, email, name, avatar, provider, provider_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(userId, payload.email, payload.name, payload.picture, 'google', payload.sub);
      
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    }

    const authToken = generateToken(user);
    res.json({ token: authToken, user });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

app.post('/api/auth/github', async (req, res) => {
  try {
    const { code } = req.body;
    const userData = await verifyGitHubToken(code);
    
    if (!userData) {
      return res.status(401).json({ error: 'Invalid GitHub code' });
    }

    let user = db.prepare('SELECT * FROM users WHERE provider_id = ? AND provider = ?')
      .get(userData.id.toString(), 'github');
    
    if (!user) {
      const userId = uuidv4();
      db.prepare(`
        INSERT INTO users (id, email, name, avatar, provider, provider_id, github_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        userId, 
        userData.email || `${userData.login}@github.local`, 
        userData.name || userData.login, 
        userData.avatar_url, 
        'github', 
        userData.id.toString(),
        userData.html_url
      );
      
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    }

    const authToken = generateToken(user);
    res.json({ token: authToken, user });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// User Routes
app.get('/api/user/profile', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

app.put('/api/user/profile', authMiddleware, (req, res) => {
  const { name, bio, linkedin_url, github_url } = req.body;
  
  db.prepare(`
    UPDATE users 
    SET name = ?, bio = ?, linkedin_url = ?, github_url = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(name, bio, linkedin_url, github_url, req.user.id);
  
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

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

app.get('/api/author/posts', authMiddleware, (req, res) => {
  const posts = db.prepare(`
    SELECT * FROM posts WHERE author_id = ? ORDER BY created_at DESC
  `).all(req.user.id);
  
  const formattedPosts = posts.map(post => ({
    ...post,
    tags: JSON.parse(post.tags || '[]')
  }));
  
  res.json(formattedPosts);
});

app.post('/api/posts', authMiddleware, (req, res) => {
  const { title, content, excerpt, thumbnail, tags, audience, isPublished } = req.body;
  const postId = uuidv4();
  
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
    req.user.id, 
    audience || 'everyone',
    isPublished ? 1 : 0,
    isPublished ? new Date().toISOString() : null
  );
  
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId);
  res.json(post);
});

app.put('/api/posts/:id', authMiddleware, (req, res) => {
  const { title, content, excerpt, thumbnail, tags, audience, isPublished } = req.body;
  
  db.prepare(`
    UPDATE posts 
    SET title = ?, content = ?, excerpt = ?, thumbnail = ?, tags = ?, audience = ?, 
        is_published = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND author_id = ?
  `).run(
    title, 
    content, 
    excerpt, 
    thumbnail, 
    JSON.stringify(tags || []), 
    audience || 'everyone',
    isPublished ? 1 : 0,
    isPublished ? new Date().toISOString() : null,
    req.params.id,
    req.user.id
  );
  
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  res.json(post);
});

app.delete('/api/posts/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM posts WHERE id = ? AND author_id = ?')
    .run(req.params.id, req.user.id);
  
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