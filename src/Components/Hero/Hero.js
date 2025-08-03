import React from "react";
import Avatar from "@mui/material/Avatar";
import SocialIcon from "../SocialIcon/SocialIcon";
import { Link } from "react-router-dom";

import {
  HeroContainer,
  HeroWrapper,
  HeroLeft,
  HeroRight,
} from "./HeroElements";
function Hero() {
  return (
    <div className="heroMain">
      <HeroContainer>
        <HeroWrapper>
          <HeroLeft>
  <h1>Hi, I'm Raj Pawan Shukla</h1>
  <h5>I'm a Web Developer | Magento 2 Specialist</h5>
  <p style={{ fontWeight: "500" }}>
    I enjoy building robust web solutions and solving real-world problems. With professional experience in
    <strong> Magento 2 development</strong>, I’ve worked on everything from custom module creation to theme integration and performance optimization. <br />
    I'm also exploring modern web technologies like <strong>React</strong> and <strong>AWS</strong>, and have contributed to training junior developers as well.
  </p>

  <p style={{ fontWeight: "500" }}>
    I believe in continuous learning and clean code. My stack includes <strong>PHP, JavaScript, MySQL, Knockout.js, XML</strong> and more — along with hands-on experience with cloud platforms and modern JavaScript frameworks.
  </p>

  <div className="download">
    <Link
      to="/files/RajResume.pdf"
      className="btn btn--outline"
      target="_blank"
      download
    >
      Download Resume
    </Link>
  </div>

  <SocialIcon />
</HeroLeft>

          <HeroRight>
            <Avatar
              alt="Remy Sharp"
              src="/images/avatar.jpg"
              sx={{ width: 300, height: 300 }}
            />
          </HeroRight>
        </HeroWrapper>
      </HeroContainer>
    </div>
  );
}

export default Hero;
