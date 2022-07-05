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
        <div className="body-text">Featured Events</div>
        <Link to="/About" className="body-text">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
