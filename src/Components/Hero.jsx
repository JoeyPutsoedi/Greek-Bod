import React from "react";
import APPLE from "../assets/images/Apple.png";
const hero = () => {
  return (
    <>
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
      <i class="fa-solid fa-certificate badge2"> </i>
    </>
  );
};

export default hero;
