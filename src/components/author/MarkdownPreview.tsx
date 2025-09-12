import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div className="p-4 h-96 overflow-y-auto prose prose-sm max-w-none">
      {content ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">
                {children}
              </blockquote>
            ),
            code: ({ children, className }) => {
              const isBlock = className?.includes('language-');
              return isBlock ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                  <code className="text-sm">{children}</code>
                </pre>
              ) : (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
              );
            },
            img: ({ src, alt }) => (
              <img src={src} alt={alt} className="max-w-full h-auto rounded-lg mb-4" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <div className="text-gray-400 text-center py-16">
          <p>Nothing to preview yet.</p>
          <p className="text-sm mt-2">Start writing in the Write tab to see your content here.</p>
        </div>
      )}
    </div>
  );
};

export default MarkdownPreview;