import React from "react";
import "../Styles/Notfound.css";
import Apple from "../assets/images/Apple.png";

const NotFound404 = () => {
  return (
    <div className="notfound-wrapper">
      <p>ERROR: 404</p>
      <div className="imgPlh">
        <img src={Apple} alt="404" />
      </div>
      <p>
        Hello There Wanderer.
        <br />
        It seems the page you're <br />
        looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound404;
