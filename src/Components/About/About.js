import React from "react";
import Avatar from "@mui/material/Avatar";
import { Image, ContactWrapper } from "./AboutElements";
function About() {
  return (
    <ContactWrapper id="about">
      <div className="Container">
        <div className="SectionTitle">
          <div
            style={{
              fontSize: "40px",
              fontFamily: "'Trebuchet MS', sans-serif",
            }}
          >
            Contact Me
          </div>
          <hr
            style={{
              marginLeft: "5px",
              width: "177px",
              background: "#d24d57",
            }}
          />
        </div>
        <div className="BigCard">
          <Image>
            <Avatar
              alt="Remy Sharp"
              src="/images/avatar.jpg"
              sx={{ width: 150, height: 150 }}
            />
          </Image>
          <div className="AboutBio">
  <div
    style={{
      fontSize: "28px",
      fontFamily: "'Trebuchet MS', sans-serif",
      marginBottom: "10px",
    }}
  >
    👋 Hello! Feel free to reach out
  </div>

  <p style={{ fontWeight: "500", marginBottom: "6px" }}>
    I'm based in <strong>Lucknow, Uttar Pradesh</strong>.
  </p>

  <p style={{ fontWeight: "500", marginBottom: "6px" }}>
    📞 <strong>Phone:</strong> <a href="tel:+916391391377">+91 6391391377</a>
  </p>

  <p style={{ fontWeight: "500", marginBottom: "6px" }}>
    📧 <strong>Email:</strong>{" "}
    <a href="mailto:rajshukla140@gmail.com">rajshukla140@gmail.com</a>
  </p>

  <p style={{ fontWeight: "500", marginTop: "10px" }}>
    Connect with me on:{" "}
    <a href="https://www.linkedin.com/in/rajshukla18" target="_blank" rel="noopener noreferrer">
      LinkedIn
    </a>{" "}
    |{" "}
    <a href="https://github.com/RajShukla1" target="_blank" rel="noopener noreferrer">
      GitHub
    </a>{" "}
    
  </p>
</div>

        </div>
      </div>
    </ContactWrapper>
  );
}

export default About;
