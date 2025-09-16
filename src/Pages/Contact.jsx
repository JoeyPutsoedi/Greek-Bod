import React from "react";
import "../Styles/Contact.css";
import NavBar from "../Components/NavBar";
import img1 from "../assets/images/-business-communication.png";
const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="contactCont">
        <div className="bkgCircles">
          <img src={img1} alt="" />
        </div>
        <div className="contactInfo">
          <div className="headerTxt">
            <h1>
              LET'S GET
              <br /> IN<i class="fa-solid fa-arrow-right"></i>TOUCH
            </h1>
            <p>
              We care about more than just you keeping up with your weight goals
              <br />
              we want to ensure that you also receive the best service <br />
              we can offer so reach out with your queries and
              <br />
              we'll make sure to contact you.
            </p>
          </div>
          <form>
            <div className="madens">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Firstname"
              />
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Lastname"
              />
            </div>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
            />
            <textarea
              name="message"
              id="textarea"
              placeholder="your message"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
