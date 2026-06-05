import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import blogsData from "../../data/blogs.json";
import "./Blog.css";

const LatestBlogs = () => {
  const latestBlogs = blogsData.slice(0, 3);

  return (
    <section className="section container">
      <div className="section-header">
        <h2 className="section-title">Latest Articles</h2>
        <p className="section-subtitle">Thoughts and tutorials on development.</p>
      </div>
      <div className="blog-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {latestBlogs.map((blog) => (
          <Link to={`/blogs/${blog.slug}`} key={blog.slug} className="blog-card" style={{ textDecoration: 'none' }}>
            <h3 className="blog-title">{blog.title}</h3>
            <div className="blog-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={14} /> {blog.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} /> {blog.readTime}
              </span>
            </div>
            <p className="blog-excerpt" style={{ color: 'var(--text-secondary)' }}>{blog.excerpt}</p>
            <span className="blog-read-more" style={{ marginTop: 'auto' }}>
              Read Article <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/blogs" className="btn btn-outline">
          View All Articles <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
