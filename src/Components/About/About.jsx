import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  Code2, 
  ShoppingCart, 
  Zap, 
  Blocks, 
  Network, 
  Settings,
  Laptop,
  Briefcase,
  Layers,
  Database
} from "lucide-react";
import "./About.css";

const journeyData = [
  {
    phase: "Foundation",
    title: "Learning Web Development",
    description: "Built a strong foundation in modern web technologies, focusing on core programming concepts, HTML, CSS, JavaScript, and backend integration fundamentals."
  },
  {
    phase: "Specialization",
    title: "Mastering Magento 2",
    description: "Deep dived into the Magento 2 ecosystem at Sprinix Technolabs. Developed custom modules, optimized catalog configurations, and implemented backend customizations for enterprise clients."
  },
  {
    phase: "Evolution",
    title: "React & Modern Frontend",
    description: "Transitioned to modern component-driven architectures. Mastered React to build dynamic, highly interactive user interfaces and headless e-commerce frontends."
  },
  {
    phase: "Current Focus",
    title: "Full-Stack E-commerce Architect",
    description: "Currently engineering high-performance, scalable web applications integrating robust Magento 2 backends with modern frontend frameworks and third-party APIs."
  }
];

const experienceCards = [
  {
    icon: <ShoppingCart size={28} />,
    title: "Magento 2 Development",
    skills: ["Custom Modules", "Admin Configurations", "Backend Development", "Catalog Customizations"]
  },
  {
    icon: <Layers size={28} />,
    title: "Hyvä Development",
    skills: ["Theme Customization", "Alpine.js Components", "Frontend Optimization", "Performance Tuning"]
  },
  {
    icon: <Network size={28} />,
    title: "Integrations",
    skills: ["Klaviyo", "Braintree", "OTP Systems", "Akeneo PIM", "Fastly CDN"]
  },
  {
    icon: <Zap size={28} />,
    title: "Performance Optimization",
    skills: ["Caching Strategies", "Frontend Optimization", "Query Improvements", "Store Performance"]
  },
  {
    icon: <Settings size={28} />,
    title: "E-commerce Engineering",
    skills: ["Product Management", "Import/Export Workflows", "Checkout Customizations", "API Integrations"]
  }
];

const servicesCards = [
  { icon: <ShoppingCart size={32} />, title: "E-commerce Solutions" },
  { icon: <Blocks size={32} />, title: "Magento Extensions" },
  { icon: <Laptop size={32} />, title: "Business Websites" },
  { icon: <Code2 size={32} />, title: "Full Stack Applications" },
  { icon: <Briefcase size={32} />, title: "Admin Dashboards" },
  { icon: <Database size={32} />, title: "API Integrations" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Me | Raj Pawan Shukla</title>
        <meta name="description" content="Professional experience and development journey of Raj Pawan Shukla, Full Stack Developer at Sprinix Technolabs." />
      </Helmet>
      
      <section className="about-section container animate-fade-in">
        <div className="section-header">
          <h2 className="section-title">My Journey & Expertise</h2>
          <p className="section-subtitle">Bridging the gap between complex backend architectures and seamless user experiences.</p>
        </div>

        <div className="about-intro glass card">
          <h3>Professional Profile</h3>
          <p>
            I am a Software Developer at <strong>Sprinix Technolabs</strong>, specializing in scalable e-commerce development and modern web applications. 
            My technical focus revolves around the powerful combination of <strong>Magento 2, PHP, and React</strong>.
          </p>
          <p>
            I have extensive experience working on complex business requirements: from engineering custom Magento modules and optimizing Hyvä themes, 
            to seamlessly integrating third-party services like Akeneo, Klaviyo, and Fastly CDN. I build solutions that prioritize performance, security, and maintainability.
          </p>
        </div>

        {/* Development Journey Timeline */}
        <div className="journey-container mt-section">
          <h3 className="subsection-title">Development Journey</h3>
          <div className="timeline">
            {journeyData.map((item, index) => (
              <motion.div 
                className="timeline-item" 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content glass">
                  <span className="timeline-phase">{item.phase}</span>
                  <h4 className="timeline-role">{item.title}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Experience Cards */}
        <div className="experience-container mt-section">
          <h3 className="subsection-title">Professional Experience & Contributions</h3>
          <p className="subsection-desc">Core areas of focus in my day-to-day engineering roles.</p>
          
          <div className="experience-grid">
            {experienceCards.map((card, index) => (
              <motion.div 
                className="exp-card glass"
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="exp-icon">{card.icon}</div>
                <h4 className="exp-title">{card.title}</h4>
                <ul className="exp-skills-list">
                  {card.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What I Build */}
        <div className="services-container mt-section">
          <h3 className="subsection-title">What I Build</h3>
          <div className="services-grid">
            {servicesCards.map((service, index) => (
              <motion.div 
                className="service-card glass"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h4 className="service-title">{service.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
};

export default About;
