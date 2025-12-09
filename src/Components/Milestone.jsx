import React from "react";
import milestone from "../assets/images/milestone.png";
import useUserStore from "../Context/userStore.jsx";

const Milestone = () => {
  const user = useUserStore((state) => state.user);
  //Milestone Calculations
  const milestoneCalc = Math.round(
    ((user?.startingWeight - user?.currentWeight) /
      (user?.startingWeight - user?.targetWeight)) *
      100
  );
  return (
    <div className="milestone userImg4">
      <img src={milestone} alt="" />
      <div className="milestone-info">
        <p id="percentage">{milestoneCalc || 0}%</p>
        <p id="milestone">Milestone</p>
        <p id="description">
          You've come {milestoneCalc || 0}% close to accomplishing your goal!
        </p>
      </div>
    </div>
  );
};

export default Milestone;
