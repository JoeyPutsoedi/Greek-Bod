import React from "react";

const TestimonialCard = ({ name, age, goal, testimony, img }) => {
  return (
    <div className="Testimonial-cards">
      <div className="imginfo">
        <div className="test-imgPlh">
          <img src={img} alt="" />
        </div>
        <p>
          <strong>{name}</strong>
          <br />
          Aged {age}
          <br />
          Goal: {goal}
        </p>
      </div>
      <div className="written-testimonial">{testimony}</div>
    </div>
  );
};

export default TestimonialCard;
