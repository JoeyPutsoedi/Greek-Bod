import { React, useState } from "react";

import "../Styles/Login.css";
import NavBar from "../Components/NavBar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/firebase";
import { toast } from "react-toastify";
import Google from "../Components/signInWithGoogle";
/*FUNCTION----------------------------------------------- */
const Login = () => {
  /*USE STATE DEFINING------------------------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*FIREBASE AUTH------------------------------ */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User login successful");
      window.location.href = "/Dashboard";
      toast.success("User Logged in successfully!!!!", {
        position: "top-left",
      });
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "bottom-left",
      });
    }
  };

  /*RETURN------------------------------ */
  return (
    <>
      <NavBar />
      <section className="login">
        <div className="loginCont">
          <h1>Login</h1>
          {/*FORM------------------------------------------ */}
          <form onSubmit={handleLogin}>
            {/*EMAIL INPUT---------------------------------- */}
            <label className="label" htmlFor="email">
              Email:
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <br />
            {/*PASSWORD INPUT---------------------------------- */}
            <label className="label" htmlFor="password">
              Password:
            </label>
            <br />
            <input
              type="password"
              placeholder="Enter your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            {/*LOGIN BUTTON-------------------------------------- */}
            <button
              style={{
                marginTop: "3em",
                backgroundColor: "white",
                width: "19em",
                height: "3em",
                borderRadius: "6px",
                color: "black",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              }}
              type="submit"
            >
              Login
            </button>
          </form>
          {/*SIGN IN WITH GOOOGLE BUTTON----------------------- */}
          <Google />
        </div>
      </section>
    </>
  );
};

export default Login;
