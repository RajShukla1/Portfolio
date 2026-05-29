import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail, MessageSquare, Send, CheckCircle, Phone, Smartphone } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitMethod, setSubmitMethod] = useState("email");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (submitMethod === "whatsapp") {
      // Construct WhatsApp message
      const text = `Hi Raj, my name is ${formData.name} (${formData.email}).%0A%0A${formData.message}`;
      const whatsappUrl = `https://wa.me/917394082638?text=${text}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Construct Email message
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:rajshukla140@gmail.com?subject=${subject}&body=${body}`;
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Contact Me | Raj Pawan Shukla</title>
        <meta name="description" content="Get in touch for freelance projects, job opportunities, or consulting regarding Magento 2 and React development." />
      </Helmet>

      <section className="contact-section container">
        <div className="section-header">
          <h2 className="section-title">Let's Build Something Great</h2>
          <p className="section-subtitle">Have a project in mind or looking for a skilled developer? Let's talk.</p>
        </div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info glass card"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Contact Information</h3>
            <p className="contact-desc">
              I'm currently available for freelance work and full-time opportunities. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon"><Mail size={20} /></div>
                <div className="method-details">
                  <span>Email</span>
                  <a href="mailto:rajshukla140@gmail.com">rajshukla140@gmail.com</a>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon"><Phone size={20} /></div>
                <div className="method-details">
                  <span>Mobile</span>
                  <a href="tel:+916391391377">+91 63913 91377</a>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon"><Smartphone size={20} /></div>
                <div className="method-details">
                  <span>WhatsApp</span>
                  <a href="https://wa.me/917394082638" target="_blank" rel="noopener noreferrer">+91 73940 82638</a>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon"><MessageSquare size={20} /></div>
                <div className="method-details">
                  <span>Social</span>
                  <a href="https://www.linkedin.com/in/rajshukla18/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container glass card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSuccess ? (
              <div className="success-state">
                <CheckCircle size={48} className="success-icon" />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <button className="btn btn-outline" onClick={() => setIsSuccess(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="rahul@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Hi Raj, I have a project in mind..."
                  ></textarea>
                </div>
                <div className="form-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" onClick={() => setSubmitMethod("email")} className="btn btn-primary submit-btn" style={{ margin: 0, flex: '1 1 150px' }} disabled={isSubmitting}>
                    <Mail size={18} /> Send via Email
                  </button>
                  <button type="submit" onClick={() => setSubmitMethod("whatsapp")} className="btn btn-outline" style={{ margin: 0, flex: '1 1 150px' }} disabled={isSubmitting}>
                    <Smartphone size={18} /> Send via WhatsApp
                  </button>
                  <a href="tel:+916391391377" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1 1 150px', textDecoration: 'none' }}>
                    <Phone size={18} /> Call Directly
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
