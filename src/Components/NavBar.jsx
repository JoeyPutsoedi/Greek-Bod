import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Components/firebase";
import { onAuthStateChanged } from "firebase/auth";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const onClickEvent = () => {
    if (user) {
      navigate("/Dashboard");
    } else if (!user) {
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
          <button onClick={onClickEvent}>
            <p>GET STARTED</p>
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
