import { React, useState } from "react";
import "../Styles/Login.css";
import NavBar from "../Components/NavBar";

import { toast } from "react-toastify";

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
            />
            {errors.email && <p className="error">{errors.email}</p>}
            {/*if errors.email exists render <p> with error text */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            {/*if errors.password exists render <p> with error text */}
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
        </div>
      </section>
    </>
  );
};

export default Login;
