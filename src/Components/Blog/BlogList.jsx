import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import blogsData from "../../data/blogs.json";
import "./Blog.css";

export default function BlogList() {
  return (
    <div className="blog-container">
      <Helmet>
        <title>Technical Blog | Raj Pawan Shukla</title>
        <meta name="description" content="Thoughts, tutorials, and insights on software development, Magento 2, Docker, and React by Raj Pawan Shukla." />
        <meta property="og:title" content="Technical Blog | Raj Pawan Shukla" />
        <meta property="og:description" content="Thoughts, tutorials, and insights on software development, Magento 2, Docker, and React by Raj Pawan Shukla." />
      </Helmet>
      <div className="blog-header">
        <h1>Technical Blog</h1>
        <p>Thoughts, tutorials, and insights on software development.</p>
      </div>
      
      <div className="blog-grid">
        {blogsData.map((blog) => (
          <Link to={`/blogs/${blog.slug}`} key={blog.slug} className="blog-card">
            <h2 className="blog-title">{blog.title}</h2>
            <div className="blog-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} /> {blog.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} /> {blog.readTime}
              </span>
            </div>
            <p className="blog-excerpt">{blog.excerpt}</p>
            <span className="blog-read-more">
              Read Article <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
