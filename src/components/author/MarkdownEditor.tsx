import React, { useRef } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      // In a real app, you'd upload these images
      // For demo, we'll insert placeholder markdown
      const imageMarkdown = imageFiles
        .map((file, index) => `![${file.name}](https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800)`)
        .join('\n\n');
      
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = value.slice(0, start) + imageMarkdown + value.slice(end);
        onChange(newValue);
        
        // Set cursor position after inserted text
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + imageMarkdown.length;
          textarea.focus();
        }, 0);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        placeholder="Write your post content here... You can drag and drop images directly into the editor."
        className="w-full h-96 p-4 border-none outline-none resize-none font-mono text-sm leading-relaxed"
      />
      
      {value === '' && (
        <div className="absolute top-16 left-4 text-gray-400 text-sm pointer-events-none">
          <p>💡 Tips:</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• Use # for headings</li>
            <li>• Use **bold** for emphasis</li>
            <li>• Use ```code``` for code blocks</li>
            <li>• Drag & drop images directly</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;