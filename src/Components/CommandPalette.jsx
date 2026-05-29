import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Home, User, Briefcase, Code, FileText, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import "./CommandPalette.css";

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const commands = [
    { id: "home", title: "Go to Home", icon: <Home size={18} />, action: () => navigate("/") },
    { id: "about", title: "Go to About", icon: <User size={18} />, action: () => navigate("/about-me") },
    { id: "projects", title: "Go to Projects", icon: <Briefcase size={18} />, action: () => navigate("/projects") },
    { id: "skills", title: "Go to Skills", icon: <Code size={18} />, action: () => navigate("/skills") },
    { id: "contact", title: "Go to Contact", icon: <FileText size={18} />, action: () => navigate("/contact") },
    { id: "resume", title: "Download Resume", icon: <FileText size={18} />, action: () => window.open("/files/rajResume.pdf", "_blank") },
    { id: "theme", title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? <Search size={18} /> : <Search size={18} />, action: toggleTheme },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div 
        className="command-palette-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="command-palette-header">
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="command-palette-body">
          {filteredCommands.length > 0 ? (
            <ul className="command-list">
              {filteredCommands.map((cmd) => (
                <li key={cmd.id}>
                  <button 
                    className="command-item"
                    onClick={() => {
                      cmd.action();
                      onClose();
                    }}
                  >
                    <span className="command-icon">{cmd.icon}</span>
                    <span className="command-title">{cmd.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="command-empty">No results found for "{query}"</div>
          )}
        </div>
        
        <div className="command-palette-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
