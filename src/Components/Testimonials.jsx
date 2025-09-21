import React from "react";
import TestimonialCard from "./TestimonialCard";
import img1 from "../assets/images/caleb.jpg";
import img2 from "../assets/images/deborah.jpeg";
import img3 from "../assets/images/black.jpeg";
const Testimonials = () => {
  return (
    <div className="testimonial-wrapper">
      <h1>Testimonials</h1>
      <div className="testimonial-cont">
        <TestimonialCard
          name={"Caleb Mc'laughin"}
          age={"27"}
          goal={"Gain weight"}
          testimony={
            "Thank You greek For changing my life, Now I'm healthy enough to become the Athlete I've Always wanted to be"
          }
          img={img1}
        />
        <TestimonialCard
          name={"Odessa Carlton"}
          age={"24"}
          goal={"lose weight"}
          testimony={
            "For the longest time i've felt insecure about my body struggling to lose weight but Greek bod made it all easy for me and now i've lost 10kg."
          }
          img={img2}
        />
        <TestimonialCard
          name={"Jarome White"}
          age={"31"}
          goal={"Maintain Weight"}
          testimony={
            "As a working man it's hard to maintain your weight it fluctuates all the time. greekbod helps me maintain my weight it's tuff."
          }
          img={img3}
        />
      </div>
    </div>
  );
};

export default Testimonials;
