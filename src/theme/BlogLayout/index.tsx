import React, { useEffect } from 'react';
import BlogLayout from '@theme-original/BlogLayout';
import type { Props } from '@theme/BlogLayout';

const BlogLayoutWrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    // Add custom class to blog pages
    document.body.classList.add('blog-page');

    // Add floating animation to blog cards
    const articles = document.querySelectorAll<HTMLElement>('article');
    articles.forEach((article, index) => {
      article.style.animationDelay = `${index * 0.1}s`;
      article.classList.add('blog-card-animation');
    });

    // Add gradient background animation
    const blogWrapper = document.querySelector<HTMLElement>('.blog-wrapper');
    if (!blogWrapper) {
      const main = document.querySelector<HTMLElement>('main');
      if (main) {
        main.classList.add('blog-wrapper');
      }
    }

    return () => {
      document.body.classList.remove('blog-page');
    };
  }, []);

  return <BlogLayout {...props} />;
};

export default BlogLayoutWrapper;
