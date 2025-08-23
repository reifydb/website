import React from 'react';
import Layout from '@theme/Layout';
import BlogPostCard from '../BlogPostCard';

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
      <div className="min-h-screen bg-gradient-to-br from-warm-bg to-white dark:from-dark-warm-bg dark:to-gray-900">
        <div className="py-16 bg-gradient-to-r from-primary to-accent-vibrant">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-black text-white mb-4">ReifyDB Blog</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Stay up to date with the latest ReifyDB news, features, and best practices
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}