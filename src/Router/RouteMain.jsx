import { Route, Routes } from "react-router-dom";
import About from "../Components/About/About";
import Hero from "../Components/Hero/Hero";
import Skills from "../Components/Skills/Skills";
import Projects from "../Components/Projects/Projects.jsx";
import Contact from "../Components/Contact/Contact.jsx";

export function RouteMain() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/about-me" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "100px" }}>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}
