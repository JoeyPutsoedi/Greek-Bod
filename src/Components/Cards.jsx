import React, { useState, useEffect } from "react";
import Apple from "../assets/images/apple-icon.png";
import oatmeal from "../assets/images/Oatmeal.png";
import choc from "../assets/images/chocolate2.png";
import Card from "./Card.jsx";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const Cards = () => {
  const colors1 = "#e84457";
  const colors2 = "#449be8";
  const colors3 = "#44e852";
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const blur = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["blur(10px)", "blur(0px)"]
  );
  const y = useTransform(scrollYProgress, [0, 0.2], [12, 0]);

  return (
    <section className="cardsSection">
      <motion.p
        style={isDesktop ? { opacity, y, filter: blur } : {}}
        className="cardsHeader"
      >
        A diet plan for whatever
        <br /> needs you may have.
      </motion.p>
      <motion.div
        style={
          isDesktop
            ? {
                scale,
                opacity,
              }
            : {}
        }
        className="cards"
      >
        <Card
          slogan="Whether you're looking to lose weight"
          img={isDesktop ? null : Apple}
          bkg={colors1}
        />
        <Card
          img={isDesktop ? null : choc}
          slogan="Even if you're looking to gain some weight"
          bkg={colors2}
        />
        <Card
          slogan="Maybe just maintain your current weight"
          img={oatmeal}
          bkg={colors3}
        />
      </motion.div>
    </section>
  );
};

export default Cards;
