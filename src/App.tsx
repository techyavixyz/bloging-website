import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AuthorPage from './pages/AuthorPage';
import LoginPage from './pages/LoginPage';
import IntegrationPage from './pages/IntegrationPage';
import PostEditor from './components/author/PostEditor';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/author" element={
                <ProtectedRoute>
                  <AuthorPage />
                </ProtectedRoute>
              } />
              <Route path="/author/new-post" element={
                <ProtectedRoute>
                  <PostEditor />
                </ProtectedRoute>
              } />
              <Route path="/integration" element={
                <ProtectedRoute>
                  <IntegrationPage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;