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
    <article className="blog-post-card">
      <div className="flex flex-col h-full">
        <header>
          <h2 className="blog-post-card-title">
            <Link to={post.permalink}>
              {post.title}
            </Link>
          </h2>
          <div className="blog-post-card-meta">
            <time dateTime={post.date} className="blog-post-card-date">
              {post.formattedDate}
            </time>
            {post.readingTime && (
              <span className="blog-post-card-reading-time">
                {Math.ceil(post.readingTime)} MIN READ
              </span>
            )}
          </div>
        </header>
        
        <div className="blog-post-card-description">
          {post.description}
        </div>
        
        <footer className="blog-post-card-footer">
          <div className="blog-post-card-author">
            {author.imageURL && (
              <img 
                src={author.imageURL} 
                alt={author.name}
                className="blog-post-card-author-image"
              />
            )}
            <div className="blog-post-card-author-info">
              <div className="blog-post-card-author-name">
                {author.name}
              </div>
              {author.title && (
                <div className="blog-post-card-author-title">
                  {author.title}
                </div>
              )}
            </div>
          </div>
          
          <Link 
            to={post.permalink} 
            className="blog-post-card-read-more"
          >
            READ MORE
          </Link>
        </footer>
      </div>
    </article>
  );
}