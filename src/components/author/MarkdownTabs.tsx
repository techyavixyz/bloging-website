import React from 'react';
import { Edit, Eye } from 'lucide-react';

interface MarkdownTabsProps {
  activeTab: 'write' | 'preview';
  onTabChange: (tab: 'write' | 'preview') => void;
}

const MarkdownTabs: React.FC<MarkdownTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => onTabChange('write')}
        className={`flex items-center space-x-2 px-4 py-2 font-medium text-sm transition-colors ${
          activeTab === 'write'
            ? 'text-primary-600 border-b-2 border-primary-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Edit className="w-4 h-4" />
        <span>Write</span>
      </button>
      <button
        onClick={() => onTabChange('preview')}
        className={`flex items-center space-x-2 px-4 py-2 font-medium text-sm transition-colors ${
          activeTab === 'preview'
            ? 'text-primary-600 border-b-2 border-primary-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Eye className="w-4 h-4" />
        <span>Preview</span>
      </button>
    </div>
  );
};

export default MarkdownTabs;