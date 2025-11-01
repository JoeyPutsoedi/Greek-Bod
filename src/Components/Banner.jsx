import React, { useState, useEffect } from "react";
import chocw from "../assets/images/chocolate2.png";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

const Banner = () => {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const scaleF = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);
  const opacityA = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scaleA = useTransform(scrollYProgress, [0.36, 0.38, 0.39], [0, 1.2, 1]);
  const rotateA = useTransform(scrollYProgress, [0.36, 0.39, 0.41], [0, 9, 4]);
  const scaleB = useTransform(scrollYProgress, [0.42, 0.44, 0.46], [0, 1.2, 1]);
  const rotateB = useTransform(
    scrollYProgress,
    [0.42, 0.44, 0.46],
    [0, -11, -8]
  );
  const scaleC = useTransform(scrollYProgress, [0.45, 0.46, 0.47], [0, 1.2, 1]);
  const rotateC = useTransform(
    scrollYProgress,
    [0.45, 0.46, 0.47],
    [0, -5, -2]
  );

  const yA = useTransform(scrollYProgress, [0.2, 0.24, 0.4], [-870, -870, 0]);
  const rotateD = useTransform(scrollYProgress, [0.3, 0.4], [0, -12]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0.35, 0.4],
    [
      " 0px 0px 0px rgba(0, 0, 0, 0.0),inset 0 0px 0px rgba(255, 255, 255, 0)",
      " 6px 9px 7px rgba(0, 0, 0, 0.1),  inset 0 0px 25px rgba(255, 255, 255, 0.3)",
    ]
  );
  const bkg = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.4],
    [
      "rgba(255, 255, 255, 0)",
      "rgba(255, 255, 255, 0)",
      "rgba(255, 255, 255, 0.143)",
    ]
  );
  const outline = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.4],
    [
      "0px solid rgba(245, 245, 245, 0.524)",
      "0px solid rgba(245, 245, 245, 0.524)",
      "1px solid rgba(245, 245, 245, 0.524)",
    ]
  );

  return (
    <section className="banner">
      <div className="banner-wrapper">
        <div className="bannerCont">
          <motion.p
            style={isDesktop ? { scale: scaleA, rotate: rotateA } : {}}
            id="bText1"
          >
            Calculate your BMR
          </motion.p>
          <motion.p
            style={isDesktop ? { scale: scaleB, rotate: rotateB } : {}}
            id="bText2"
          >
            Find the amount of calories
            <br />
            you need daily
          </motion.p>
          <motion.p
            style={isDesktop ? { scale: scaleC, rotate: rotateC } : {}}
            id="bText3"
          >
            Get Meal Recommendations & Recipes
            <br />
            tailored for your weight goals
          </motion.p>
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
          <motion.div
            style={
              isDesktop
                ? {
                    opacity: opacityA,
                    scale: scaleF,
                    y: yA,
                    rotate: rotateD,
                    boxShadow,
                    backgroundColor: bkg,
                    outline,
                  }
                : {}
            }
            className="imageBkg"
          >
            <img src={chocw} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
