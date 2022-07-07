import { Link } from "gatsby";
import React from "react";
import "./component.scss";

const Nav = () => {
  return (
    <nav className="nav-container">
      <div className="heading logo">PureBet.</div>
      <div className="nav-items">
        <Link to="/" className="body-text">
          Home
        </Link>
        <Link to="/About" className="body-text">
          About
        </Link>
        <Link to="/HowToUse" className="body-text">
          How To Use
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
