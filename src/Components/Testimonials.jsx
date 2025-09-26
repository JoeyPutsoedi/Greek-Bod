import React from "react";
import TestimonialCard from "./TestimonialCard";
import img1 from "../assets/images/caleb.jpg";
import img2 from "../assets/images/deborah.jpeg";
import img3 from "../assets/images/black.jpeg";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
const MotionCard = motion.create(TestimonialCard, { forwardMotionProps: true });

const Testimonials = () => {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("Page scroll: ", latest);
  // });
  const opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  const xA = useTransform(scrollYProgress, [0.6, 0.674, 0.73], [450, 450, 0]);
  const xB = useTransform(scrollYProgress, [0.6, 0.674, 0.73], [-450, -450, 0]);
  const yA = useTransform(scrollYProgress, [0.6, 0.674, 0.73], [350, 350, 0]);
  const oA = useTransform(scrollYProgress, [0.6, 0.674, 0.73], [0, 0, 1]);
  const dA = useTransform(
    scrollYProgress,
    [0.6, 0.674, 0.73],
    ["0px 0px 0px #fff", " 0px 0px 0px #fff", " 0px 0px 20px #fff"]
  );
  const rotateA = useTransform(
    scrollYProgress,
    [0.6, 0.64, 0.674, 0.73],
    [0, 0, 20, 0]
  );
  const rotateB = useTransform(
    scrollYProgress,
    [0.6, 0.64, 0.674, 0.73],
    [0, 0, -20, 0]
  );
  return (
    <div className="testimonial-wrapper">
      <h1>Testimonials</h1>
      <div className="testimonial-cont">
        <MotionCard
          style={{ x: xA, boxShadow: dA, rotate: rotateB }}
          name={"Caleb Ashvon"}
          age={"27"}
          goal={"Gain weight"}
          testimony={
            "Thank You greek For changing my life, Now I'm healthy enough to become the Athlete I've Always wanted to be"
          }
          img={img1}
        />
        <MotionCard
          style={{ y: yA, opacity: oA, boxShadow: dA }}
          name={"Odessa Carlton"}
          age={"24"}
          goal={"lose weight"}
          testimony={
            "For the longest time i've felt insecure about my body struggling to lose weight but Greek bod made it all easy for me and now i've lost 10kg."
          }
          img={img2}
        />
        <MotionCard
          style={{ x: xB, boxShadow: dA, rotate: rotateA }}
          name={"Jarome White"}
          age={"31"}
          goal={"Maintain Weight"}
          testimony={
            "As a working man it's hard to maintain your weight it fluctuates all the time. greekbod helps me maintain my weight it's tuff."
          }
          img={img3}
        />
      </div>
    </div>
  );
};

export default Testimonials;
