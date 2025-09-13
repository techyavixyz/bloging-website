import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Github } from 'lucide-react';
import LinkedInProfile from '../components/LinkedInProfile';
import PostCard from '../components/blog/PostCard';
import { mockPosts } from '../data/mockData';

const HomePage: React.FC = () => {
  const featuredPosts = mockPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Share Your <span className="text-primary-600">Stories</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A modern blogging platform where developers and creators share knowledge, 
              connect with readers, and build their audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/blog"
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-3"
              >
                <span>Explore Articles</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/admin"
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-3"
              >
                <BookOpen className="w-5 h-5" />
                <span>Admin Panel</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Blog</h2>
            <p className="text-lg text-gray-600 mb-8">
              Welcome to my personal blog where I share insights, tutorials, and thoughts about 
              web development, technology, and software engineering. This is a self-hosted platform 
              built with modern web technologies.
            </p>
            <div className="flex items-center justify-center space-x-6">
              <a
                href="https://github.com/yourusername/your-blog-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>View Source Code</span>
              </a>
              <div className="w-px h-6 bg-gray-300"></div>
              <span className="text-sm text-gray-500">Self-hosted • Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts & LinkedIn Profile */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
                <Link
                  to="/blog"
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                >
                  <span>View all</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <LinkedInProfile />
              
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
                <p className="text-gray-600 mb-4">
                  Get the latest articles and insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button className="w-full btn-primary">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Share Your Knowledge?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who are already sharing their expertise and building their audience.
          </p>
          <Link
            to="/admin"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span>Access Admin Panel</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;