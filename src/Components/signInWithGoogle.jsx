import React from "react";
import "../Styles/Login.css";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const signInWithGoogle = () => {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if (result.user) {
        window.location.href = "/Dashboard";
      }
    });
  }
  return (
    <div className="signAcc">
      <button onClick={googleLogin} className="brandBtn" type="submit">
        Login With
        <i class="fa-brands fa-google"></i>oogle
      </button>
      <Link to="/Signin">
        <p>Dont have an account?</p>
      </Link>
    </div>
  );
};

export default signInWithGoogle;
