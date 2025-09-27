import React, { useRef } from "react";
import "../Styles/Contact.css";
import emailjs from "@emailjs/browser";
import NavBar from "../Components/NavBar.jsx";
import img1 from "../assets/images/-business-communication.png";

const Contact = () => {
  const form = useRef();

  const SendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_gs0okgw",
        "template_bsnuy2k",
        form.current,
        "IvGDtCx0_oj--EA4l"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send message, please try again.", error.text);
        }
      );
  };

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
          <form ref={form} onSubmit={SendEmail}>
            <div className="madens">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Firstname"
              />
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
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
