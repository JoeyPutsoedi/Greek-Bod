import { React, useState } from "react";
import "../Styles/Login.css";
import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import loginImg from "../assets/images/login.jpg";

import { useNavigate } from "react-router-dom";
import useUserStore from "../Context/userStore";

/*FUNCTIONS---------------------------------------------------------------------- */

const Login = () => {
  //navigation
  const navigate = useNavigate();
  const login = useUserStore((state) => state.loginUser);

  /*USE STATE DEFINING------------------------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); //State to hold error messages

  /*FUNCTION FOR VALIDATION------------------------------------ */
  const validateForm = () => {
    let formErrors = {}; //local variable to hold error messages
    let isValid = true;

    if (!email) {
      //if no email is entered
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      //if email doesn't satisfy regular expression
      formErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!password) {
      //if no password is entered
      formErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      //if password length is less than 6 characters
      formErrors.password = "Password must be more than 6 characters";
      isValid = false;
    }

    setErrors(formErrors); //update state with error messages
    return isValid; //retrun whether validation is passed or not
  };

  /*FIREBASE AUTH FOR LOGIN------------------------------ */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    try {
      // await signInWithEmailAndPassword(auth, email, password);
      await login({ email, password });
      console.log("User login successful");
      navigate("/Dashboard");
      toast.success("User Logged in successfully!!!!", {
        position: "top-left",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-left",
      });
    }
  };

  /*RETURN------------------------------ */
  return (
    <div className="login-wrapper">
      <NavBar />
      <section className="login">
        <div className="left-section">
          <div className="upper-left">
            <h1>WELCOME BACK</h1>
            <p>
              Cherished wanderer we've awaited your return since <br /> last we
              saw you. It's good to have you back with us!
            </p>
          </div>
          <div className="lower-left">
            <form onSubmit={handleLogin}>
              {/*EMAIL INPUT---------------------------------- */}
              <label className="label" htmlFor="email">
                Email:
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {errors.email && <p className="error">{errors.email}</p>}
              {/*if errors.email exists render <p> with error text */}
              {/*PASSWORD INPUT---------------------------------- */}
              <label className="label" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
              {/*if errors.password exists render <p> with error text */}
              {/*LOGIN BUTTON-------------------------------------- */}

              <button class="login-button" type="submit">
                Login
              </button>
              <div className="signAcc">
                <p>Don't have an account?</p>
                <Link to="/Signin">
                  <p style={{ color: "#52a811" }}>sign up</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="right-section">
          <img src={loginImg} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Login;
