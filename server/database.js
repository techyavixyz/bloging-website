import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, '../blog.db'));

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    provider TEXT DEFAULT 'local',
    provider_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    thumbnail TEXT,
    tags TEXT, -- JSON array as string
    author_id TEXT NOT NULL,
    published_at DATETIME,
    read_time INTEGER DEFAULT 5,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    audience TEXT DEFAULT 'everyone',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
  );

  CREATE TABLE IF NOT EXISTS likes (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    post_id TEXT NOT NULL,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts (id),
    UNIQUE(user_id, post_id),
    UNIQUE(ip_address, post_id)
  );

  -- Insert default author if not exists
  INSERT OR IGNORE INTO users (id, email, name, avatar, bio, linkedin_url, github_url)
  VALUES (
    'default-author',
    'author@example.com',
    'John Doe',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    'Full-stack developer passionate about React, TypeScript, and modern web technologies.',
    'https://linkedin.com/in/johndoe',
    'https://github.com/johndoe'
  );
`);

export default db;