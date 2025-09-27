import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../Components/firebase";

const NavBar = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const onClickEvent = (userLog) => {
    if (userLog) {
      navigate("/Dashboard");
    } else if (!userLog) {
      navigate("/LoginPage");
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
