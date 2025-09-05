import React from "react";
import apple from "../assets/images/Apple.png";
import oatmeal from "../assets/images/oatmeal.png";
import choc from "../assets/images/chocolate.png";
import Card from "./Card";
const Cards = () => {
  const colors1 = "#e84457";
  const colors2 = "#449be8";
  const colors3 = "#44e852";
  return (
    <section className="cardsSection">
      <p className="cardsHeader">
        A diet plan for whatever
        <br /> needs you may have.
      </p>
      <div className="cards">
        <Card
          slogan="Whether you're looking to lose weight"
          img={apple}
          bkg={colors1}
        />
        <Card
          slogan="Even if you're looking to gain some weight"
          img={choc}
          bkg={colors2}
        />
        <Card
          slogan="Maybe just maintain your current weight"
          img={oatmeal}
          bkg={colors3}
        />
      </div>
    </section>
  );
};

export default Cards;
