import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import type { Props } from '@theme/BlogListPage';

interface BlogItem {
  content: {
    metadata: {
      permalink: string;
      title: string;
      date: string;
      description?: string;
      readingTime?: number;
      tags?: Array<{
        label: string;
        permalink: string;
      }>;
      frontMatter: {
        image?: string;
        description?: string;
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
  };
}

const BlogListPageWrapper: React.FC<ExtendedProps> = (props) => {
  // Check if we're on the main blog page (avoid window during SSR)
  const isMainBlogPage = typeof window !== 'undefined' 
    ? !window.location.pathname.includes('/page/')
    : true;
  
  if (isMainBlogPage && props.items && props.items.length > 0) {
    const featuredPost = props.items[0];
    const allOtherPosts = props.items.slice(1);
    
    return (
      <Layout title="Blog" description="ReifyDB Blog - Latest updates, tutorials, and insights">
        <div className="custom-blog-page">
          {/* Hero Section */}
          <div className="blog-hero">
            <div className="blog-hero-content">
              <h1 className="blog-hero-title">ReifyDB Blog</h1>
              <p className="blog-hero-subtitle">
                Stay updated with the latest features, tutorials, and best practices
              </p>
            </div>
          </div>

          {/* Featured Post Section */}
          {featuredPost && featuredPost.content && (
            <div className="featured-post-section">
              <div className="container">
                <h2 className="section-title">Featured Post</h2>
                <Link to={featuredPost.content.metadata.permalink} className="featured-post-card">
                  <div 
                    className="featured-post-image" 
                    style={{
                      backgroundImage: featuredPost.content.metadata.frontMatter.image 
                        ? `url(${featuredPost.content.metadata.frontMatter.image})`
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <div className="featured-post-overlay">
                      <span className="featured-badge">Latest</span>
                    </div>
                  </div>
                  <div className="featured-post-content">
                    <div className="featured-post-meta">
                      <span className="featured-post-date">
                        {new Date(featuredPost.content.metadata.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      {featuredPost.content.metadata.readingTime && (
                        <span className="featured-post-reading-time">
                          {Math.ceil(featuredPost.content.metadata.readingTime)} min read
                        </span>
                      )}
                    </div>
                    <h3 className="featured-post-title">
                      {featuredPost.content.metadata.title}
                    </h3>
                    <p className="featured-post-description">
                      {featuredPost.content.metadata.description || 
                       featuredPost.content.metadata.frontMatter.description ||
                       'Click to read more...'}
                    </p>
                    <div className="featured-post-tags">
                      {featuredPost.content.metadata.tags?.map((tag, idx) => (
                        <span key={idx} className="post-tag">{tag.label}</span>
                      ))}
                    </div>
                    <span className="read-more-link">
                      Read Full Article →
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* All Posts List */}
          {allOtherPosts.length > 0 && (
            <div className="all-posts-section">
              <div className="container">
                <h2 className="section-title">All Posts</h2>
                <div className="posts-list">
                  {allOtherPosts.map((post, index) => (
                    post.content && (
                      <Link 
                        key={index} 
                        to={post.content.metadata.permalink}
                        className="post-list-item"
                      >
                        <div 
                          className="post-list-image" 
                          style={{
                            backgroundImage: post.content.metadata.frontMatter.image 
                              ? `url(${post.content.metadata.frontMatter.image})`
                              : `linear-gradient(135deg, hsl(${220 + (index % 6) * 60}, 70%, 60%) 0%, hsl(${250 + (index % 6) * 60}, 70%, 50%) 100%)`
                          }}
                        />
                        <div className="post-list-content">
                          <div className="post-list-header">
                            <h3 className="post-list-title">
                              {post.content.metadata.title}
                            </h3>
                            <div className="post-list-meta">
                              <span className="post-list-date">
                                {new Date(post.content.metadata.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              {post.content.metadata.readingTime && (
                                <span className="post-list-reading-time">
                                  • {Math.ceil(post.content.metadata.readingTime)} min read
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="post-list-description">
                            {post.content.metadata.description || 
                             post.content.metadata.frontMatter.description ||
                             'Click to read more...'}
                          </p>
                          <div className="post-list-tags">
                            {post.content.metadata.tags?.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="post-list-tag">{tag.label}</span>
                            ))}
                          </div>
                        </div>
                        <div className="post-list-arrow">
                          →
                        </div>
                      </Link>
                    )
                  ))}
                </div>
                
                {props.metadata && props.metadata.totalPages > 1 && (
                  <div className="pagination-info">
                    <p>Showing {props.items.length} of {props.metadata.totalCount} posts</p>
                    {props.metadata.page < props.metadata.totalPages && (
                      <Link to={`/blog/page/${props.metadata.page + 1}`} className="load-more-button">
                        Load More Posts
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <style 
            dangerouslySetInnerHTML={{
              __html: `
            .custom-blog-page {
              min-height: 100vh;
              background: var(--ifm-background-color);
            }

            .blog-hero {
              background: linear-gradient(135deg, 
                var(--ifm-color-primary) 0%, 
                var(--ifm-color-primary-dark) 100%);
              padding: 4rem 0;
              text-align: center;
              position: relative;
              overflow: hidden;
            }

            .blog-hero::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            }

            .blog-hero-content {
              position: relative;
              z-index: 1;
            }

            .blog-hero-title {
              font-size: 3.5rem;
              font-weight: 800;
              color: white;
              margin-bottom: 1rem;
              animation: fadeInUp 0.6s ease-out;
            }

            .blog-hero-subtitle {
              font-size: 1.25rem;
              color: rgba(255, 255, 255, 0.9);
              max-width: 600px;
              margin: 0 auto;
              animation: fadeInUp 0.8s ease-out;
            }

            .section-title {
              font-size: 2rem;
              font-weight: 700;
              text-align: center;
              margin-bottom: 3rem;
              color: var(--ifm-font-color-base);
            }

            .featured-post-section {
              padding: 4rem 0;
              background: var(--ifm-background-surface-color);
            }

            .featured-post-card {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 3rem;
              text-decoration: none;
              color: inherit;
              background: white;
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease;
            }

            .featured-post-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
              text-decoration: none;
              color: inherit;
            }

            .featured-post-image {
              height: 400px;
              background-size: cover;
              background-position: center;
              position: relative;
            }

            .featured-post-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
              display: flex;
              align-items: flex-start;
              padding: 2rem;
            }

            .featured-badge {
              background: var(--ifm-color-primary);
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 30px;
              font-weight: 600;
              font-size: 0.9rem;
            }

            .featured-post-content {
              padding: 3rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }

            .featured-post-meta {
              display: flex;
              gap: 1rem;
              margin-bottom: 1rem;
              color: var(--ifm-color-emphasis-600);
              font-size: 0.9rem;
            }

            .featured-post-title {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 1rem;
              line-height: 1.3;
              color: var(--ifm-font-color-base);
            }

            .featured-post-description {
              font-size: 1.1rem;
              line-height: 1.6;
              color: var(--ifm-color-emphasis-700);
              margin-bottom: 1.5rem;
            }

            .featured-post-tags {
              display: flex;
              gap: 0.5rem;
              flex-wrap: wrap;
              margin-bottom: 1.5rem;
            }

            .post-tag {
              padding: 0.3rem 0.8rem;
              background: var(--ifm-color-emphasis-100);
              border-radius: 20px;
              font-size: 0.85rem;
              color: var(--ifm-color-emphasis-700);
            }

            .read-more-link {
              color: var(--ifm-color-primary);
              font-weight: 600;
              font-size: 1.1rem;
              display: inline-flex;
              align-items: center;
              transition: transform 0.3s;
            }

            .featured-post-card:hover .read-more-link {
              transform: translateX(5px);
            }

            .all-posts-section {
              padding: 4rem 0;
              background: var(--ifm-background-color);
            }

            .posts-list {
              max-width: 900px;
              margin: 0 auto;
            }

            .post-list-item {
              display: flex;
              align-items: center;
              gap: 2rem;
              padding: 2rem;
              margin-bottom: 1.5rem;
              background: var(--ifm-background-surface-color);
              border-radius: 16px;
              text-decoration: none;
              color: inherit;
              transition: all 0.3s ease;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
              border: 1px solid var(--ifm-color-emphasis-200);
              position: relative;
              overflow: hidden;
            }

            .post-list-item::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              background: var(--ifm-color-primary);
              transform: scaleY(0);
              transition: transform 0.3s ease;
            }

            .post-list-item:hover::before {
              transform: scaleY(1);
            }

            .post-list-item:hover {
              transform: translateX(8px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
              border-color: var(--ifm-color-primary-lightest);
              text-decoration: none;
              color: inherit;
            }

            .post-list-image {
              width: 180px;
              height: 120px;
              flex-shrink: 0;
              background-size: cover;
              background-position: center;
              border-radius: 12px;
            }

            .post-list-content {
              flex: 1;
              min-width: 0;
            }

            .post-list-header {
              margin-bottom: 0.75rem;
            }

            .post-list-title {
              font-size: 1.5rem;
              font-weight: 700;
              margin: 0 0 0.5rem 0;
              line-height: 1.3;
              color: var(--ifm-font-color-base);
              transition: color 0.3s;
            }

            .post-list-item:hover .post-list-title {
              color: var(--ifm-color-primary);
            }

            .post-list-meta {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              color: var(--ifm-color-emphasis-600);
              font-size: 0.9rem;
            }

            .post-list-description {
              font-size: 1rem;
              line-height: 1.6;
              color: var(--ifm-color-emphasis-700);
              margin: 0 0 1rem 0;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .post-list-tags {
              display: flex;
              gap: 0.5rem;
              flex-wrap: wrap;
            }

            .post-list-tag {
              padding: 0.25rem 0.75rem;
              background: var(--ifm-color-emphasis-100);
              border-radius: 20px;
              font-size: 0.85rem;
              color: var(--ifm-color-emphasis-700);
              transition: all 0.2s;
            }

            .post-list-item:hover .post-list-tag {
              background: var(--ifm-color-primary-lightest);
              color: var(--ifm-color-primary-dark);
            }

            .post-list-arrow {
              font-size: 2rem;
              color: var(--ifm-color-primary);
              transition: transform 0.3s;
              margin-left: 1rem;
            }

            .post-list-item:hover .post-list-arrow {
              transform: translateX(5px);
            }

            .pagination-info {
              text-align: center;
              margin-top: 3rem;
              padding-top: 2rem;
              border-top: 1px solid var(--ifm-color-emphasis-200);
            }

            .pagination-info p {
              color: var(--ifm-color-emphasis-600);
              margin-bottom: 1rem;
            }

            .load-more-button {
              display: inline-block;
              padding: 0.75rem 2rem;
              background: var(--ifm-color-primary);
              color: white;
              border-radius: 30px;
              font-weight: 600;
              text-decoration: none;
              transition: all 0.3s;
            }

            .load-more-button:hover {
              background: var(--ifm-color-primary-dark);
              transform: translateY(-2px);
              box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
              color: white;
              text-decoration: none;
            }

            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @media (max-width: 768px) {
              .blog-hero-title {
                font-size: 2.5rem;
              }

              .featured-post-card {
                grid-template-columns: 1fr;
              }

              .featured-post-image {
                height: 250px;
              }

              .featured-post-content {
                padding: 2rem;
              }

              .post-list-item {
                flex-direction: column;
                padding: 1.5rem;
              }

              .post-list-image {
                width: 100%;
                height: 180px;
              }

              .post-list-title {
                font-size: 1.25rem;
              }

              .post-list-arrow {
                display: none;
              }
            }

            [data-theme='dark'] .featured-post-card {
              background: var(--ifm-background-color);
            }

            [data-theme='dark'] .post-list-item {
              background: var(--ifm-background-color);
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
              border-color: var(--ifm-color-emphasis-300);
            }

            [data-theme='dark'] .post-list-item:hover {
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
            }

            [data-theme='dark'] .post-tag,
            [data-theme='dark'] .post-list-tag {
              background: var(--ifm-color-emphasis-200);
              color: var(--ifm-color-emphasis-800);
            }

            [data-theme='dark'] .post-list-item:hover .post-list-tag {
              background: rgba(96, 165, 250, 0.2);
              color: var(--ifm-color-primary);
            }
          `
            }} 
          />
        </div>
      </Layout>
    );
  }

  // For paginated pages, use the original component
  return <BlogListPage {...props} />;
};

export default BlogListPageWrapper;