import React from 'react';
import { Image, Link, AtSign, Bold, Italic, Code } from 'lucide-react';

const Toolbar: React.FC = () => {
  const tools = [
    { icon: Image, label: 'Attach image', action: () => console.log('Attach image') },
    { icon: Link, label: 'Insert link', action: () => console.log('Insert link') },
    { icon: AtSign, label: 'Mention user', action: () => console.log('Mention user') },
    { icon: Bold, label: 'Bold', action: () => console.log('Bold') },
    { icon: Italic, label: 'Italic', action: () => console.log('Italic') },
    { icon: Code, label: 'Code', action: () => console.log('Code') },
  ];

  return (
    <div className="flex items-center space-x-1 px-4 py-2 border-b border-gray-200 bg-gray-50">
      {tools.map((tool, index) => (
        <button
          key={index}
          onClick={tool.action}
          title={tool.label}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
        >
          <tool.icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};

export default Toolbar;