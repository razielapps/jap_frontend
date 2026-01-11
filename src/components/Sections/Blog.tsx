// src/components/Sections/Blog.tsx - UPDATED
import React from 'react';
import { Blog as BlogType } from '../../lib/api';
import './Blog.css';

interface BlogProps {
  blogs: BlogType[];
  onViewDetail?: () => void;
}

export const BlogSection: React.FC<BlogProps> = ({ blogs, onViewDetail }) => (
  <section className="blog-section" id="blog">
    <div className="section-header">
      <h2 className="section-title">Blog & Writings</h2>
      {onViewDetail && (
        <button onClick={onViewDetail} className="view-detail-button">
          View All Posts →
        </button>
      )}
    </div>
    <div className="blog-list">
      {blogs.slice(0, 4).map((blog, index) => (
        <article key={blog.id} className="blog-preview-card" style={{ '--item-index': index } as React.CSSProperties}>
          <div className="blog-preview-content">
            <h3 className="blog-preview-title">{blog.title}</h3>
            
            <div className="blog-preview-meta">
              {blog.published_date && (
                <span className="blog-preview-date">
                  📅 Published: {new Date(blog.published_date).toLocaleDateString()}
                </span>
              )}
              {blog.read_time && (
                <span className="blog-preview-read-time">📖 {blog.read_time} min read</span>
              )}
            </div>
            
            <p className="blog-preview-summary">{blog.summary}</p>
            
            <a 
              href={blog.medium_blog_link}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-preview-link"
            >
              Read on Medium →
            </a>
          </div>
        </article>
      ))}
    </div>
    
    {blogs.length > 4 && onViewDetail && (
      <div className="section-footer">
        <button onClick={onViewDetail} className="view-more-button">
          View all {blogs.length} blog posts →
        </button>
      </div>
    )}
  </section>
);