import React from 'react';
import Layout from '@theme/Layout';
import BlogPostCard from '../BlogPostCard';
import styles from './styles.module.css';

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
      <div className={styles.blogWrapper}>
        <div className={styles.blogHeader}>
          <div className="container">
            <h1 className={styles.blogTitle}>ReifyDB Blog</h1>
            <p className={styles.blogDescription}>
              Stay up to date with the latest ReifyDB news, features, and best practices
            </p>
          </div>
        </div>
        
        <div className="container">
          <div className={styles.blogGrid}>
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}