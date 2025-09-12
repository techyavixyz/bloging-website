import { BlogPost, Author } from '../types/blog';

export const mockAuthor: Author = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  bio: 'Full-stack developer passionate about React, TypeScript, and modern web technologies.',
  linkedinUrl: 'https://linkedin.com/in/johndoe'
};

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    content: `# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building robust web applications. In this post, we'll explore the fundamentals of setting up a React project with TypeScript.

## Why TypeScript?

TypeScript provides static type checking, which helps catch errors early in development and improves code maintainability.

## Setting Up Your Project

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This command creates a new React project with TypeScript configuration out of the box.

## Key Benefits

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Documentation**: Types serve as documentation
- **Easier Refactoring**: Confident code changes

## Conclusion

TypeScript enhances the React development experience significantly. Start small and gradually adopt more advanced features as you become comfortable.`,
    excerpt: 'Learn how to set up and use React with TypeScript for better development experience.',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'TypeScript', 'Web Development'],
    author: mockAuthor,
    publishedAt: new Date('2024-01-15'),
    readTime: 5,
    likes: 42,
    comments: 8,
    isPublished: true,
    audience: 'everyone'
  },
  {
    id: '2',
    title: 'Modern CSS Techniques for Better Layouts',
    content: `# Modern CSS Techniques for Better Layouts

CSS has evolved significantly over the years. Let's explore modern techniques that make creating layouts easier and more maintainable.

## CSS Grid vs Flexbox

Both are powerful, but serve different purposes:

### CSS Grid
- Two-dimensional layouts
- Better for complex layouts
- Grid-template-areas for semantic layouts

### Flexbox
- One-dimensional layouts
- Perfect for components
- Great for alignment

## Container Queries

The future of responsive design:

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

## CSS Custom Properties

Dynamic styling with CSS variables:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --spacing: 1rem;
}
\`\`\`

These techniques will revolutionize how you approach CSS layouts.`,
    excerpt: 'Discover modern CSS techniques including Grid, Flexbox, and Container Queries.',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['CSS', 'Web Design', 'Frontend'],
    author: mockAuthor,
    publishedAt: new Date('2024-01-10'),
    readTime: 7,
    likes: 35,
    comments: 12,
    isPublished: true,
    audience: 'everyone'
  },
  {
    id: '3',
    title: 'Building Scalable Node.js Applications',
    content: `# Building Scalable Node.js Applications

As your Node.js application grows, scalability becomes crucial. Here are proven strategies for building applications that can handle increased load.

## Architecture Patterns

### Microservices
Break your application into smaller, independent services.

### Event-Driven Architecture
Use events to decouple components and improve scalability.

## Performance Optimization

### Caching Strategies
- Redis for session storage
- Memory caching for frequently accessed data
- CDN for static assets

### Database Optimization
- Connection pooling
- Query optimization
- Read replicas

## Monitoring and Logging

Implement comprehensive monitoring:
- Application metrics
- Error tracking
- Performance monitoring

## Deployment Strategies

- Blue-green deployments
- Rolling updates
- Container orchestration with Kubernetes

Building scalable applications requires careful planning and the right tools.`,
    excerpt: 'Learn strategies for building Node.js applications that scale with your business.',
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Node.js', 'Backend', 'Scalability'],
    author: mockAuthor,
    publishedAt: new Date('2024-01-05'),
    readTime: 8,
    likes: 28,
    comments: 6,
    isPublished: true,
    audience: 'everyone'
  }
];