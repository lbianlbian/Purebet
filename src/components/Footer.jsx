import React from "react";
import "./component.scss";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="f-ele1">
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="heading"
          >
            Discord
          </a>
        </div>
        <div className="f-ele2">
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="heading"
          >
            Twitter
          </a>
        </div>
        <div className="f-ele3">
          <a
            href="http://"
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
