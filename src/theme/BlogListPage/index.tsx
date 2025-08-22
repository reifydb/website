import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import BlogList from '../../components/BlogList';
import type { Props } from '@theme/BlogListPage';

interface BlogItem {
  content: {
    metadata: {
      permalink: string;
      title: string;
      date: string;
      formattedDate: string;
      description?: string;
      readingTime?: number;
      tags?: Array<{
        label: string;
        permalink: string;
      }>;
      authors?: Array<{
        name: string;
        title?: string;
        imageURL?: string;
      }>;
      frontMatter: {
        image?: string;
        description?: string;
        authors?: Array<{
          name: string;
          title?: string;
          imageURL?: string;
        }>;
      };
    };
  };
}

interface ExtendedProps extends Props {
  items: BlogItem[];
  metadata?: {
    totalPages: number;
    totalCount: number;
    page: number;
    blogTitle?: string;
    blogDescription?: string;
  };
}

const BlogListPageWrapper: React.FC<ExtendedProps> = (props) => {
  // Check if we're on the main blog page (avoid window during SSR)
  const isMainBlogPage = typeof window !== 'undefined' 
    ? !window.location.pathname.includes('/page/')
    : true;
  
  if (isMainBlogPage && props.items && props.items.length > 0) {
    // Transform Docusaurus blog data to our format
    const transformedPosts = props.items.map((item, index) => ({
      id: `post-${index}`,
      title: item.content.metadata.title,
      description: item.content.metadata.description || item.content.metadata.frontMatter.description || '',
      date: item.content.metadata.date,
      formattedDate: item.content.metadata.formattedDate || new Date(item.content.metadata.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      authors: item.content.metadata.authors || item.content.metadata.frontMatter.authors || [{ name: 'Anonymous' }],
      permalink: item.content.metadata.permalink,
      readingTime: item.content.metadata.readingTime,
      tags: item.content.metadata.tags || [],
    }));

    const metadata = {
      blogTitle: props.metadata?.blogTitle || 'ReifyDB Blog',
      blogDescription: props.metadata?.blogDescription || 'Stay up to date with the latest ReifyDB news, features, and best practices'
    };

    return (
      <BlogList 
        posts={transformedPosts} 
        metadata={metadata}
      />
    );
    
  }

  // For paginated pages, use the original component
  return <BlogListPage {...props} />;
};

export default BlogListPageWrapper;