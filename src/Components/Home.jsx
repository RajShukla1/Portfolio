import "./Styles.css";
import "./Blog/Blog.css"; // Import blog styles
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import blogsData from "../data/blogs.json";

export const Home = () => {
  const latestBlogs = blogsData.slice(0, 3); // Get latest 3 blogs

  return (
    <div className="homeMain">
      <div className="homeStart">
        <div>
          <Avatar
            alt="Raj"
            src="/images/avatar.jpeg"
            sx={{ width: 200, height: 200 }}
          />
        </div>
        <div>
          <div>Hi,</div>
          <div>I am Raj Pawan Shukla</div>
          <div>I am a Full Stack Web Developer</div>
          <div className="download">
            <Link to="/files/RajPawanShuklaMagento.pdf" target="_blank" download>
              Resume
            </Link>
          </div>
        </div>
      </div>
      <div className="homeSkills">
  <div>A little bit about myself</div>
  <div>
    I'm a passionate web developer with professional experience in Magento 2,
    specializing in custom module development, theme integration, and backend optimization.
    I enjoy learning and building in public, and I’m always open to collaborating with fellow developers.
  </div>
  <div>Skilled in</div>
  <div>
    Magento 2, PHP, JavaScript, HTML, CSS, MySQL, XML, Knockout.js, React, Node.js, Express, MongoDB, AWS
  </div>
  <div>Connect with me on – LinkedIn | GitHub | Email</div>
</div>

      <div style={{ padding: '0 5%', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', color: 'var(--text-primary)' }}>Latest Articles</h2>
        <div className="blog-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link to="/blogs" className="btn btn-outline">
            View All Articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="homeFooter">
        <div>© 2026 Raj Pawan Shukla</div>
        <div>All rights reserved</div>
      </div>
    </div>
  );
};
