import React, { useEffect } from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import type { Props } from '@theme/BlogPostPage';

const BlogPostPageWrapper: React.FC<Props> = (props) => {
  useEffect(() => {
    // Add brutalist blog post page class
    const pageContainer = document.querySelector<HTMLElement>('.blog-wrapper, [class*="blogPostPage"]');
    if (pageContainer) {
      pageContainer.classList.add('blog-post-page');
    }
    
    // Add brutalist styling to blog post header
    const blogHeader = document.querySelector<HTMLElement>('header.hero');
    if (blogHeader) {
      blogHeader.classList.add('blog-post-header');
    }
    
    // Add brutalist styling to blog post content
    const blogContent = document.querySelector<HTMLElement>('article[itemProp="blogPost"]');
    if (blogContent) {
      blogContent.parentElement?.classList.add('blog-post-content');
    }
    
    // Hide edit this page link
    const editLink = document.querySelector<HTMLElement>('.theme-edit-this-page');
    if (editLink) {
      editLink.style.display = 'none';
    }
    
    // Hide the edit link in the blog post footer
    const editContainer = document.querySelector<HTMLElement>('.col.margin-top--sm');
    if (editContainer && editContainer.textContent?.includes('Edit this page')) {
      editContainer.style.display = 'none';
    }
    
    // Hide tags section in blog posts
    const tagsContainer = document.querySelector<HTMLElement>('.margin-vert--md');
    if (tagsContainer && tagsContainer.querySelector('.badge')) {
      tagsContainer.style.display = 'none';
    }
    
    // Also hide tags in the footer area
    const footerTags = document.querySelectorAll<HTMLElement>('.col--6 .margin-vert--md');
    footerTags.forEach((container) => {
      if (container.querySelector('.badge')) {
        container.style.display = 'none';
      }
    });
  }, []);

  return <BlogPostPage {...props} />;
};

export default BlogPostPageWrapper;