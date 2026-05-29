import { useState, useEffect } from "react";
import { RouteMain } from "../Router/RouteMain";
import { Navbar } from "./Navbar";
import { CommandPalette } from "./CommandPalette";
import FixSocialIcon from "./SocialIcon/FixSocialIcon";

export const Main = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="main">
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <RouteMain />
      </main>
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
      <FixSocialIcon />
    </div>
  );
};
