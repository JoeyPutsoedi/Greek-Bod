import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const NavBar = () => {
  const { user } = useAuth();
  const onClickEvent = (userLog) => {
    if (userLog) {
      window.location.href = "/Dashboard";
    } else if (!userLog) {
      window.location.href = "/Login";
    }
  };
  return (
    <nav className="navBox">
      <div className="navItems ">
        <ul>
          <Link to="/">
            <li>HOME</li>
          </Link>
          <li>ABOUT</li>
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
