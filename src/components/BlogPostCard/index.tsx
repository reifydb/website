import React from 'react';
import Link from '@docusaurus/Link';
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

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps): JSX.Element {
  const author = post.authors[0]; // Use first author

  return (
    <article className={styles.blogCard}>
      <div className={styles.cardContent}>
        <header className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <Link to={post.permalink} className={styles.titleLink}>
              {post.title}
            </Link>
          </h2>
          <div className={styles.cardMeta}>
            <time dateTime={post.date} className={styles.cardDate}>
              📅 {post.formattedDate}
            </time>
            {post.readingTime && (
              <span className={styles.readingTime}>
                ⏱️ {Math.ceil(post.readingTime)} min read
              </span>
            )}
          </div>
        </header>
        
        <div className={styles.cardBody}>
          <p className={styles.cardDescription}>{post.description}</p>
        </div>
        
        <footer className={styles.cardFooter}>
          <div className={styles.authorInfo}>
            {author.imageURL && (
              <img 
                src={author.imageURL} 
                alt={author.name}
                className={styles.authorAvatar}
              />
            )}
            <div className={styles.authorDetails}>
              <div className={styles.authorName}>{author.name}</div>
              {author.title && (
                <div className={styles.authorTitle}>{author.title}</div>
              )}
            </div>
          </div>
          
          <Link to={post.permalink} className={styles.readMoreButton}>
            Read More
            <span className={styles.readMoreArrow}>→</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}