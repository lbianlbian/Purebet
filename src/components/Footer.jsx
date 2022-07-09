import React from "react";
import "./component.scss";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="f-ele1">
          <a
            href="https://discord.com/invite/3UWkCEQGka"
            target="_blank"
            rel="noopener noreferrer"
            className="heading"
          >
            Discord
          </a>
        </div>
        <div className="f-ele2">
          <a
            href="https://twitter.com/Purebet_io"
            target="_blank"
            rel="noopener noreferrer"
            className="heading"
          >
            Twitter
          </a>
        </div>
        <div className="f-ele3">
          <a
            href="https://www.metajam.studio/project/purebet"
            target="_blank"
            rel="noopener noreferrer"
            className="heading"
          >
            Vote for us!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
