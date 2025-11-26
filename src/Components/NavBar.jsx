import { Link, useNavigate } from "react-router-dom";

import useUserStore from "../Context/userStore";

const NavBar = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

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
