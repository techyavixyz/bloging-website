import React, { useState } from 'react';
import { ChevronDown, Globe, Lock, Users } from 'lucide-react';

interface AudienceSelectorProps {
  value: 'everyone' | 'private' | 'subscribers';
  onChange: (value: 'everyone' | 'private' | 'subscribers') => void;
}

const AudienceSelector: React.FC<AudienceSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'everyone', label: 'Everyone', icon: Globe, description: 'Visible to all readers' },
    { value: 'subscribers', label: 'Subscribers', icon: Users, description: 'Only subscribers can read' },
    { value: 'private', label: 'Private', icon: Lock, description: 'Only you can see this' },
  ] as const;

  const selectedOption = options.find(option => option.value === value)!;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <selectedOption.icon className="w-4 h-4" />
        <span className="text-sm font-medium">{selectedOption.label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <option.icon className="w-4 h-4 mt-0.5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AudienceSelector;