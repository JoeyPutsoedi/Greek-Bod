import React, { useState, useEffect } from "react";

import "../Styles/DashboardHome.css";
import Milestone from "./Milestone.jsx";
import Calendar from "./Calendar.jsx";
import MealStatus from "./MealStatus.jsx";
import Streaks from "./Streaks.jsx";
import BarChartCont from "./BarChart.jsx";
import Userattributes from "./Userattributes.jsx";
import useUserStore from "../Context/userStore.jsx";
import Userprofile from "./Userprofile.jsx";
const DashboardHome = () => {
  const user = useUserStore((state) => state.user);

  //Return-----------------------------------------------------------------------------------------------
  return (
    <div className="dashboard-container">
      <div className="IntroSection">
        <div className="intro">
          <h2>Hello There, {"  " + user?.firstName}</h2>
        </div>
      </div>
      {/* Streaks*/}
      <Streaks />
      <div className="ContentSection">
        <div className="innerInfo">
          {/* user image*/}
          <Userprofile />
          {/* attributes*/}
          <Userattributes />
          {/*calendar*/}
          <Calendar />
          {/*meal status*/}
          <MealStatus />
          {/* Milestone*/}
          <Milestone />
          {/* Bar chart*/}
          <BarChartCont />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
