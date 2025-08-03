import "./Styles.css";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="homeMain">
      <div className="homeStart">
        <div>
          <Avatar
            alt="Raj"
            src="/images/avatar.jpeg"
            sx={{ width: 200, height: 200 }}
          />
        </div>
        <div>
          <div>Hi,</div>
          <div>I am Raj Pawan Shukla</div>
          <div>I am a Full Stack Web Developer</div>
          <div className="download">
            <Link to="/files/rajResume.pdf" target="_blank" download>
              Resume
            </Link>
          </div>
        </div>
      </div>
      <div className="homeSkills">
  <div>A little bit about myself</div>
  <div>
    I'm a passionate web developer with professional experience in Magento 2,
    specializing in custom module development, theme integration, and backend optimization.
    I enjoy learning and building in public, and I’m always open to collaborating with fellow developers.
  </div>
  <div>Skilled in</div>
  <div>
    Magento 2, PHP, JavaScript, HTML, CSS, MySQL, XML, Knockout.js, React, Node.js, Express, MongoDB, AWS
  </div>
  <div>Connect with me on – LinkedIn | GitHub | Email</div>
</div>
      <div className="homeFooter">
        <div>© 2025 Raj Pawan Shukla</div>
        <div>All rights reserved</div>
      </div>
    </div>
  );
};
