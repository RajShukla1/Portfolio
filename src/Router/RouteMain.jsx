import { Route, Routes } from "react-router-dom";
import About from "../Components/About/About";
import Hero from "../Components/Hero/Hero";
import Skills from "../Components/Skills/Skills";
import Projects from "../Components/Projects/Projects.jsx";
import Contact from "../Components/Contact/Contact.jsx";
import BlogList from "../Components/Blog/BlogList.jsx";
import BlogPost from "../Components/Blog/BlogPost.jsx";

import LatestBlogs from "../Components/Blog/LatestBlogs.jsx";

export function RouteMain() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<><Hero /><LatestBlogs /></>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/about-me" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "100px" }}>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}
