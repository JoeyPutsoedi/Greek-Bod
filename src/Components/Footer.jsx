import React from "react";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footerCont">
        <div className="foot1">
          <p>
            Subscribe to our newsletter
            <br />
            Get updates on:
          </p>

          <ul>
            <li style={{ width: "11em" }}> New Features</li>
            <li style={{ width: "9em" }}> Testimonials</li>
            <li style={{ width: "13em" }}> Tips on Body Health</li>
          </ul>
        </div>
        <div className="foot2">
          <label
            htmlFor=""
            style={{ fontFamily: "mier", paddingLeft: "0.5em" }}
          >
            Gain access to our newsletter:
          </label>
          <br />
          <input type="text" placeholder="enter your email address" />
          <br />
          <button>Submit</button>
          <p>THANK YOU FOR VISITING!</p>
        </div>
        <div className="foot3">
          <div className="icons">
            <i class="bx bxl-instagram-alt"></i>
            <i class="bx bxl-tiktok"></i>
            <i class="bx bxl-twitter"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
