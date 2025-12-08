import { React, useState } from "react";
import "../Styles/Signin.css";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUserStore from "../Context/userStore";
import signinImg from "../assets/images/sign.jpg";
const Signin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //call zustand signup user action
  const signUpUser = useUserStore((state) => state.signUpUser);
  //FUNCTION FOR VALIDATION---------------------------------------------------
  const handleValidation = () => {
    let formErrors = {};
    let isValid = true;

    if (!firstName) {
      formErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!lastName) {
      formErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = "Password must be 6 character or more";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  //FUNCTION TO HANDLE SIGN IN------------------------------------------------
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!handleValidation()) return;

    try {
      await signUpUser({ email, password, firstName, lastName });

      console.log("User Registered successfully");
      toast.success("User registered successfully!!!!", {
        position: "top-left",
      });
      navigate("/LoginPage");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-left",
      });
    }
  };
  return (
    <div className="sign-wrapper">
      <NavBar />
      <section className="signin">
        <div className="left-section">
          <img src={signinImg} alt="" />
        </div>
        <div className="right-section">
          <div className="upper-right">
            <h1>SIGN IN</h1>
            <p>
              Hello there wandarer, we're pleased to have you! <br />
              we hope that this is the beginning of a productive friendship.
            </p>
          </div>
          {/*FORM--------------------------------------------------*/}
          <div className="lower-right">
            <form onSubmit={handleSignIn}>
              <label className="label" htmlFor="email">
                First Name:
              </label>

              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}

              <label className="label" htmlFor="email">
                Last Name:
              </label>

              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}

              <label className="label" htmlFor="password">
                Email Address:
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}

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

              <button class="signin-button" type="submit">
                Sign In
              </button>
              <div className="createAcc">
                <p>Already have an account?</p>
                <Link to="/LoginPage">
                  <p style={{ color: "#52a811" }}>login</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;
