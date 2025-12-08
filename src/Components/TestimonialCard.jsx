import React, { forwardRef } from "react";

const TestimonialCard = forwardRef(
  ({ name, age, goal, testimony, img }, ref) => {
    return (
      <div ref={ref} id="Tcards" className="Testimonial-cards">
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
  }
);

export default TestimonialCard;
