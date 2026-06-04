import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import blogsData from "../../data/blogs.json";
import "./Blog.css";

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Find the blog metadata based on the slug
  const blogMeta = blogsData.find((b) => b.slug === slug);

  useEffect(() => {
    if (blogMeta) {
      setLoading(true);
      fetch(`/blogs/${blogMeta.filename}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch blog content");
          }
          return response.text();
        })
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  }, [slug, blogMeta]);

  if (loading) {
    return <div className="loading">Loading article...</div>;
  }

  if (error || !blogMeta) {
    return (
      <div className="error-message">
        <h2>Article Not Found</h2>
        <p>Sorry, the blog post you're looking for doesn't exist or failed to load.</p>
        <Link to="/blogs" className="back-link" style={{ marginTop: '20px' }}>
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="blog-post-container">
      <Link to="/blogs" className="back-link">
        <ArrowLeft size={16} /> Back to Blogs
      </Link>
      
      <header className="post-header">
        <h1 className="post-title">{blogMeta.title}</h1>
        <div className="post-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={16} /> {blogMeta.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} /> {blogMeta.readTime}
          </span>
        </div>
      </header>

      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
