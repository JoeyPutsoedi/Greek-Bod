import React from "react";
import Noise from "../Components/Noise";
import NavBar from "../Components/NavBar";
import Hero from "../Components/Hero";
import Cards from "../Components/Cards";
import Banner from "../Components/Banner";
import Onboard from "../Components/Onboard";
import Footer from "../Components/Footer";
const Landing = () => {
  return (
    <>
      <NavBar />
      <div className="container">
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
    </>
  );
};

export default Landing;
