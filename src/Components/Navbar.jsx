import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Search, Menu, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import "./Navbar.css";

export const Navbar = ({ onOpenCommandPalette }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-me" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`navbar ${isScrolled ? "glass scrolled" : ""}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">RS.</span>
        </Link>

        <nav className={`navbar-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="action-btn search-btn"
            onClick={onOpenCommandPalette}
            aria-label="Search"
          >
            <Search size={20} />
            <span className="search-shortcut">Ctrl K</span>
          </button>
          
          <button
            className="action-btn theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
