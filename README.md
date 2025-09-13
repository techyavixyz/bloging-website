# BlogSpace - Modern Blogging Platform

A modern, self-hosted blogging platform built with React, TypeScript, and modern web technologies.

## Features

- 📝 Rich markdown editor with live preview
- 🎨 Modern, responsive design
- 👤 Author profile management
- 🔗 LinkedIn and GitHub integration
- 📱 Mobile-friendly interface
- 🚀 Fast and lightweight
- 🔒 Admin panel for content management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Public Access
- **Homepage**: `http://localhost:5173/` - View the main blog homepage
- **Blog**: `http://localhost:5173/blog` - Browse all published articles
- **Individual Posts**: `http://localhost:5173/blog/[post-id]` - Read specific articles

### Admin Access
- **Admin Panel**: `http://localhost:5173/admin` - Access the admin dashboard
- **Create Post**: `http://localhost:5173/admin/new-post` - Write new articles
- **Edit Post**: `http://localhost:5173/admin/edit/[post-id]` - Edit existing articles
- **Settings**: `http://localhost:5173/admin/settings` - Manage profile and integrations

### Admin Features

1. **Dashboard** (`/admin`)
   - View all posts (published and drafts)
   - Track post statistics
   - Quick access to editing and publishing

2. **Post Editor** (`/admin/new-post` or `/admin/edit/[id]`)
   - Rich markdown editor with live preview
   - Drag & drop image support
   - Tag management
   - Audience selection (Everyone, Subscribers, Private)
   - Thumbnail upload
   - Save as draft or publish immediately

3. **Profile Settings** (`/admin/settings`)
   - Update display name and bio
   - Upload profile picture
   - Set LinkedIn and GitHub URLs
   - Configure location and connection count
   - Real-time profile preview

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, SQLite (better-sqlite3)
- **Routing**: React Router
- **Markdown**: react-markdown with GitHub Flavored Markdown
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── author/         # Admin-specific components
│   ├── blog/           # Blog-related components
│   ├── Header.tsx      # Main navigation
│   ├── Footer.tsx      # Site footer
│   └── LinkedInProfile.tsx
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── BlogPage.tsx    # Blog listing
│   ├── BlogPostPage.tsx # Individual post view
│   ├── AuthorDashboard.tsx # Admin dashboard
│   └── IntegrationPage.tsx # Profile settings
├── services/           # API and data services
├── types/              # TypeScript type definitions
└── data/               # Mock data and constants
```

## Development

### Running the Full Stack

To run both the frontend and backend:

```bash
npm run dev:full
```

This starts:
- Frontend development server on `http://localhost:5173`
- Backend API server on `http://localhost:3001`

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server only
- `npm run dev:full` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please open an issue on the GitHub repository.