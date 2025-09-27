import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
const NavBar = () => {
  const { user } = useAuth();
  const onClickEvent = (userLog) => {
    if (userLog) {
      window.location.href = "/Dashboard";
    } else if (!userLog) {
      window.location.href = "/LoginPage";
    }
  };
  return (
    <nav className="navBox">
      <div className="navItems ">
        <ul>
          <Link to="/">
            <li>HOME</li>
          </Link>
          <a href="#footer">
            <li>NEWSLETTER</li>
          </a>
          <Link to="/Contact">
            <li>CONTACT</li>
          </Link>
          <button onClick={() => onClickEvent(user)}>
            <p>GET STARTED</p>
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
