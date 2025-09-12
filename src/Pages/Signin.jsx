import { React, useState } from "react";
import "../Styles/Signin.css";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Signin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }
      console.log("User Registered successfully");
      toast.success("User registered successfully!!!!", {
        position: "top-left",
      });
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <NavBar />
      <section className="signin">
        <div className="signinCont">
          <h1>SIGN IN</h1>

          {/*FORM--------------------------------------------------*/}
          <form onSubmit={handleSignIn}>
            <label className="label" htmlFor="email">
              First Name:
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <br /> <br />
            <label className="label" htmlFor="email">
              Last Name:
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <br />
            <br />
            <label className="label" htmlFor="password">
              Email Address:
            </label>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <br />
            <br />
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
            <br />
            <br />
            <br />
            <button
              style={{
                backgroundColor: "white",
                width: "19em",
                height: "3em",
                borderRadius: "6px",
                color: "black",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              }}
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="createAcc">
            {/* <button style={{ backgroundColor: "white" }} type="submit">
              <Link to="/Login">Sign In</Link>
            </button> */}

            <Link to="/Login">
              <p>Already have an account?</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
