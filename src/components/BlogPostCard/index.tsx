import React from 'react';
import Link from '@docusaurus/Link';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  authors: Array<{
    name: string;
    title?: string;
    imageURL?: string;
  }>;
  permalink: string;
  readingTime?: number;
  tags: Array<{
    label: string;
    permalink: string;
  }>;
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps): JSX.Element {
  const author = post.authors[0]; // Use first author

  return (
    <article className="card-comic group hover:rotate-1 flex flex-col h-full">
      <div className="flex flex-col h-full">
        <header className="mb-4">
          <h2 className="text-2xl font-bold mb-3 leading-tight">
            <Link 
              to={post.permalink} 
              className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors no-underline"
            >
              {post.title}
            </Link>
          </h2>
          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date} className="flex items-center gap-1">
              📅 {post.formattedDate}
            </time>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                ⏱️ {Math.ceil(post.readingTime)} min read
              </span>
            )}
          </div>
        </header>
        
        <div className="flex-grow mb-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>
        
        <footer className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {author.imageURL && (
              <img 
                src={author.imageURL} 
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <div className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                {author.name}
              </div>
              {author.title && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {author.title}
                </div>
              )}
            </div>
          </div>
          
          <Link 
            to={post.permalink} 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary hover:text-primary-dark transition-all hover:translate-x-1 no-underline"
          >
            Read More
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}