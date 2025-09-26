import React from "react";
import chocw from "../assets/images/chocolate2.png";

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-wrapper">
        <div className="bannerCont">
          <p id="bText1">Calculate your BMR</p>
          <p id="bText2">
            Find the amount of calories
            <br />
            you need daily
          </p>
          <p id="bText3">
            Get Meal Recommendations & Recipes
            <br />
            tailored for your weight goals
          </p>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star star2"></i>
          <i className="fa-solid fa-star star3"></i>
          <i className="fa-solid fa-star star4"></i>
          <i className="fa-solid fa-star star5"></i>
          <p id="features">
            Some
            <br />
            Features
          </p>
          <div className="imageBkg">
            <img src={chocw} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
