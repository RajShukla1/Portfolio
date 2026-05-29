import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="hero-section">
      {/* Animated Background Elements */}
      <div className="hero-bg-glow glow-1"></div>
      <div className="hero-bg-glow glow-2"></div>
      
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="live-indicator"></span>
            Available for new opportunities
          </motion.div>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            Building Scalable E-commerce <br />
            <span className="text-gradient">and Web Applications</span>
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Full Stack Developer specializing in Magento 2, React, and modern web solutions. I build custom e-commerce experiences, optimize performance, and architect robust backend integrations.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <Link to="/projects" className="btn btn-primary">
              View My Work <ArrowRight size={18} />
            </Link>
            <a href="/files/RajResume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" download>
              Download Resume <Download size={18} />
            </a>
          </motion.div>

          <motion.div className="hero-socials" variants={itemVariants}>
            <a href="https://github.com/RajShukla1" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={22} />
            </a>
            <a href="https://www.linkedin.com/in/rajshukla18/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={22} />
            </a>
            <a href="mailto:rajshukla140@gmail.com" aria-label="Email">
              <Mail size={22} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="avatar-container glass">
            <img src="/images/avatar.jpg" alt="Raj Pawan Shukla" className="hero-avatar" />
            
            {/* Floating Tech Badges */}
            <motion.div 
              className="tech-badge react-badge glass"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="React" />
            </motion.div>
            
            <motion.div 
              className="tech-badge magento-badge glass"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <img src="https://cdn.svgrepo.com/show/303592/magento-2-logo.svg" alt="Magento 2" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
