// const { scrollY } = useScroll();

// useMotionValueEvent(scrollY, "change", (latest) => {
//   console.log("Page scroll: ", latest);
// });

import APPLE from "../assets/images/Apple.png";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "motion/react";

const hero = () => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 0.2], [280, -455]);
  const y = useTransform(scrollYProgress, [0, 0.2], [-45, 775]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.2, 0.25]);
  const rotate = useTransform(scrollYProgress, [0, 0.2], [0, 360]);
  const dropShadow = useTransform(
    scrollYProgress,
    [0, 0.2],
    [
      "drop-shadow(22px 24px 26px rgba(0,0,0,0.5))",
      "drop-shadow(22px 24px 26px rgba(0,0,0,0))",
    ]
  );
  return (
    <section className="heroCont">
      <motion.img
        style={{ x, y, scale, rotate, filter: dropShadow }}
        className="appleRed"
        src={APPLE}
      />
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
