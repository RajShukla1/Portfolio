import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { FaReact, FaNodeJs, FaDocker, FaAws, FaMagento, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiPostgresql, SiFastly } from "react-icons/si";
import "./Skills.css";

const skillsData = {
  "Frontend": [
    { name: "React", icon: <FaReact size={32} color="#61dafb" /> },
    { name: "JavaScript", icon: <FaJs size={32} color="#f7df1e" /> },
    { name: "HTML", icon: <FaHtml5 size={32} color="#e34c26" /> },
    { name: "CSS", icon: <FaCss3Alt size={32} color="#264de4" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={32} color="#38b2ac" /> },
    { name: "Alpine.js", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#8bc0d0'}}>Alp</div> },
  ],
  "Backend": [
    { name: "PHP", icon: <FaPhp size={32} color="#777bb3" /> },
    { name: "Node.js", icon: <FaNodeJs size={32} color="#68a063" /> },
    { name: "REST APIs", icon: <FaNodeJs size={32} color="var(--text-primary)" /> },
    { name: "RabbitMQ", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#FF6600'}}>RMQ</div> },
  ],
  "E-commerce": [
    { name: "Magento 2", icon: <FaMagento size={32} color="#f26322" /> },
    { name: "Hyvä", icon: <FaMagento size={32} color="#1E3A8A" /> },
    { name: "Fastly CDN", icon: <SiFastly size={32} color="#FF282D" /> },
    { name: "Klaviyo", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#28E0B3'}}>K</div> },
    { name: "Akeneo PIM", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#8831b5'}}>A</div> },
    { name: "Braintree", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#000000'}}>B</div> },
    { name: "Doofinder", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#10529A'}}>D</div> },
    { name: "Razorpay", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#3395FF'}}>R</div> },
  ],
  "DevOps & Tools": [
    { name: "AWS", icon: <FaAws size={32} color="#ff9900" /> },
    { name: "Docker", icon: <FaDocker size={32} color="#2496ed" /> },
    { name: "Git", icon: <FaGithub size={32} color="var(--text-primary)" /> },
    { name: "Bitbucket", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#2684FF'}}>Bit</div> },
    { name: "Jira", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#0052CC'}}>J</div> },
    { name: "FileZilla", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#BF0000'}}>FZ</div> },
  ],
  "Database & Cache": [
    { name: "MySQL", icon: <SiMysql size={32} color="#4479a1" /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={32} color="#336791" /> },
    { name: "Elasticsearch", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#005571'}}>ES</div> },
    { name: "Redis", icon: <div style={{fontWeight: 'bold', fontSize: '18px', color: '#DC382D'}}>Re</div> },
  ]
};

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = Object.keys(skillsData).reduce((acc, category) => {
    const matchedSkills = skillsData[category].filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchedSkills.length > 0) {
      acc[category] = matchedSkills;
    }
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>Technical Expertise | Raj Pawan Shukla</title>
        <meta name="description" content="Technical skills and expertise in Magento 2, React, PHP, Node.js, AWS, and modern web development technologies." />
      </Helmet>

      <section className="skills-section container">
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">A comprehensive overview of the technologies I use to build scalable applications.</p>
        </div>

        <div className="skills-search">
          <div className="search-input-wrapper glass">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search technologies (e.g., React, Magento...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="skills-grid">
          {Object.keys(filteredSkills).length > 0 ? (
            Object.entries(filteredSkills).map(([category, skills], index) => (
              <motion.div 
                key={category} 
                className="skill-category glass card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="category-title">{category}</h3>
                <div className="category-skills">
                  {skills.map((skill, idx) => (
                    <motion.div 
                      key={skill.name}
                      className="skill-badge-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (index * 0.1) + (idx * 0.05) }}
                    >
                      <div className="skill-icon">{skill.icon}</div>
                      <span className="skill-name">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-results">
              <p>No technologies found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Skills;
