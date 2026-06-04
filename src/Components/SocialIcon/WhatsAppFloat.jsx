import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styled from "styled-components";

const FloatButton = styled.a`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  font-size: 35px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }

  @media screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
    font-size: 30px;
  }
`;

function WhatsAppFloat() {
  return (
    <FloatButton
      href="https://wa.me/917394082638"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </FloatButton>
  );
}

export default WhatsAppFloat;
