import "./Footer.css";
import React from "react";

import { BsGithub } from "react-icons/bs";
import { FaGoogleDrive } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer">
      <span>Movie ticket booking system</span>
      <span>made by Adarsh Pandey</span>
      <div>
        <a
          href="https://github.com/theAdarshPandey/presidio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub />
        </a>
        <a
          href="https://drive.google.com/drive/folders/1AAN6xTZuQoZRztOxG0HL1AlRKQRXGv8l?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGoogleDrive />
        </a>
      </div>
      <a href="mailto:ap6570@srmist.edu.in">ap6570@srmist.edu.in</a>
    </footer>
  );
}
