import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import IntegrationPage from './pages/IntegrationPage';
import PostEditor from './components/author/PostEditor';
import AuthorDashboard from './pages/AuthorDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/admin" element={<AuthorDashboard />} />
            <Route path="/admin/new-post" element={<PostEditor />} />
            <Route path="/admin/edit/:id" element={<PostEditor />} />
            <Route path="/admin/settings" element={<IntegrationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;