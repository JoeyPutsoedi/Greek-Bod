import React from "react";
import APPLE from "../assets/images/Apple.png";

const hero = () => {
  return (
    <section className="heroCont">
      <img className="appleRed" src={APPLE} />
      <div className="mainText">GreekBod.</div>
      <div className="subtextsMain">
        <p className="subtextLogo">
          For Him, Her & Them.
          <br />
          It's Never Been Easier To Reach Your Dieting Goals.
        </p>
        <p>Plan Smart. Eat Right. Live Greek.</p>
      </div>
      <p className="organic text-black">
        100%
        <br /> Organic
      </p>
      <i className="fa-solid fa-certificate badge2"> </i>
    </section>
  );
};

export default hero;

// initial={{
//   scale: 0.2,
//   y: 0,
//   x: 280,
//   rotate: 0,
// }}
// animate={{ y: 775, x: -455, scale: 0.25, rotate: 360 }}
// transition={{ duration: 9, ease: "easeIn", delay: 0.2 }}
