import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navBox">
      <div className="navItems ">
        <ul>
          <Link to="/">
            <li>HOME</li>
          </Link>
          <li>ABOUT</li>
          <li>CONTACT</li>
          <Link to="/Login">
            <p>GET STARTED</p>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
