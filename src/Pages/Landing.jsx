import React from "react";
import Noise from "../Components/Noise.jsx";
import NavBar from "../Components/NavBar.jsx";
import Hero from "../Components/Hero.jsx";
import Cards from "../Components/Cards";
import Banner from "../Components/Banner.jsx";
import Onboard from "../Components/Onboard.jsx";
import Footer from "../Components/Footer.jsx";
import Testimonials from "../Components/Testimonials.jsx";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
const Landing = () => {
  return (
    <div className="wrapper">
      <NavBar />

      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={15}
      />
      <Hero />

      <Cards />
      <Banner />
      <Testimonials />
      <Onboard
        marqueeText="Now✦ Is ✦ Always ✦ The Best ✦ Time ✦"
        speed={3}
        curveAmount={500}
        direction="right"
        interactive={true}
        className="custom-text-style"
      />
      <Footer />
    </div>
  );
};

export default Landing;
