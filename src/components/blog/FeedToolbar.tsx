import React from 'react';
import { Search, Filter, TrendingUp, Clock } from 'lucide-react';

interface FeedToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'newest' | 'popular';
  onSortChange: (sort: 'newest' | 'popular') => void;
}

const FeedToolbar: React.FC<FeedToolbarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">Sort by:</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onSortChange('newest')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              sortBy === 'newest'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Newest</span>
          </button>
          <button
            onClick={() => onSortChange('popular')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              sortBy === 'popular'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-3 h-3" />
            <span>Popular</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedToolbar;