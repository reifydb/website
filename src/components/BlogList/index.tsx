import React from 'react';
import Layout from '@theme/Layout';
import BlogPostCard from '../BlogPostCard';
import PageHeader from '../PageHeader';

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

interface BlogListProps {
  posts: BlogPost[];
  metadata: {
    blogTitle: string;
    blogDescription: string;
  };
}

export default function BlogList({ posts, metadata }: BlogListProps): JSX.Element {
  return (
    <Layout
      title={metadata.blogTitle}
      description={metadata.blogDescription}
    >
      <div className="blog-list-container">
        <PageHeader 
          title="REIFYDB BLOG"
          subtitle="Latest updates, technical insights, and best practices for building with ReifyDB"
        />
        
        <div className="blog-list-content">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}