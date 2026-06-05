import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ExternalLink, CheckCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ProjectList } from "../../data/ProjectData";
import "./Projects.css";

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Case Studies | Raj Pawan Shukla</title>
        <meta name="description" content="Detailed case studies of my recent work, including Magento 2 e-commerce platforms and full-stack React applications." />
      </Helmet>

      <section className="projects-section container">
        <div className="section-header">
          <h2 className="section-title">Featured Case Studies</h2>
          <p className="section-subtitle">Deep dives into complex problems I've solved.</p>
        </div>

        <div className="projects-list">
          {ProjectList.map((project, index) => (
            <motion.div 
              className="project-case-study card glass"
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="project-content">
                {project.image && (
                  <div className="project-image-container">
                    <img src={project.image} alt={project.title} className="project-image" />
                  </div>
                )}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-short-desc">{project.shortDesc}</p>
                
                <div className="project-tech-stack">
                  {project.tech_stack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-details">
                  <div className="detail-section">
                    <h4>The Problem</h4>
                    <p>{project.problem}</p>
                  </div>
                  <div className="detail-section">
                    <h4>The Solution</h4>
                    <p>{project.solution}</p>
                  </div>
                  <div className="detail-section achievements">
                    <h4>Technical Achievements</h4>
                    <ul>
                      {project.achievements.map((achievement, i) => (
                        <li key={i}>
                          <CheckCircle size={16} className="check-icon" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="project-actions">
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <FaGithub size={18} /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
