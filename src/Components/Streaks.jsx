import React from "react";
import Bmr from "../Utils/Bmr.jsx";
import calculateDailyCalories from "../Utils/DailyCalories.jsx";
import useUserStore from "../Context/userStore.jsx";
const Streaks = () => {
  const user = useUserStore((state) => state.user);
  //Call BMR Function
  const bmr = Bmr({
    weight: user?.currentWeight,
    height: user?.height,
    age: user?.age,
    gender: user?.gender,
  });
  //Call Daily calories function
  const dailyCalories = calculateDailyCalories({
    weight: user?.currentWeight,
    height: user?.height,
    age: user?.age,
    gender: user?.gender,
    goal: user?.goal,
    activityLevel: user?.activityLevel,
  });

  return (
    <div className="StreakSection">
      {/*Streaks Content---------------------------- */}

      <div className="streak-section">
        {/* Streak Days*/}

        <div className="streak-container">
          <div className="streakInfo">
            <div className="streakNumber">
              <p>{user?.streakCount}</p>
            </div>
            <p id="day">Days Streak</p>
          </div>
        </div>
        {/* Activity level*/}

        <div className="streak-container">
          <div className="streakInfo">
            <div className="streakNumber">
              <p id="activity">{user?.activityLevel}</p>
            </div>
            <p id="days">Weekly Activity Level</p>
          </div>
        </div>
        {/* BMR level*/}

        <div className="streak-container">
          <div className="streakInfo">
            <div className="streakNumber">
              <p>{bmr || 0}</p>
            </div>
            <p id="days">Basal Metabolic Rate </p>
          </div>
        </div>
        {/* Daily Calories level*/}

        <div className="streak-container">
          <div className="streakInfo">
            <div className="streakNumber">
              <p>{dailyCalories || 0}</p>
            </div>
            <p id="days">Daily Calories (kcal)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streaks;
