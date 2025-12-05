import React, { useState, useEffect } from "react";
import Bmr from "../Utils/Bmr.jsx";
import "../Styles/DashboardHome.css";
import calculateDailyCalories from "../Utils/DailyCalories.jsx";
import Calendar from "react-calendar";
import "../Styles/Calendar.css";
import milestone from "../assets/images/milestone.png";
import useUserStore from "../Context/userStore.jsx";

const DashboardHome = () => {
  const user = useUserStore((state) => state.user);
  const updateMealStatus = useUserStore((state) => state.updateMealStatus);
  const loginDates = user?.loginDates;

  const today = new Date().toISOString().split("T")[0];

  const todayMeals = user?.mealStatus?.[today] || {
    breakfast: false,
    lunch: false,
    dinner: false,
  };
  const breakfastStatus = todayMeals.breakfast;
  const lunchStatus = todayMeals.lunch;
  const dinnerStatus = todayMeals.dinner;

  //function that coverts time to local time
  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const percentage =
    (breakfastStatus ? 33.33 : 0) +
    (lunchStatus ? 33.33 : 0) +
    (dinnerStatus ? 33.33 : 0);

  const circumference = 450;
  //counts how many meals are true.
  //each ternary returns 1 for true or 0 for false

  const mealsDone =
    (breakfastStatus ? 1 : 0) + (lunchStatus ? 1 : 0) + (dinnerStatus ? 1 : 0);

  //cirumference = 450 for an empty progress bar/0 for a full progress bar
  // each meal toggle = 150
  //example: 1 meal done  = 450 - 150 whih equates to a quarter circle
  const strokeDashoffset = circumference - mealsDone * 150;

  //variable that displays complete if all tasks are done and Incomplete
  const overallTasksStatus = strokeDashoffset === 0 ? "Complete" : "Incomplete";

  //Call BMR Function
  const bmr = Bmr({
    weight: user?.weight,
    height: user?.height,
    age: user?.age,
    gender: user?.gender,
  });
  //Call Daily calories function
  const dailyCalories = calculateDailyCalories({
    weight: user?.weight,
    height: user?.height,
    age: user?.age,
    gender: user?.gender,
    goal: user?.goal,
    activityLevel: user?.activityLevel,
  });

  const handleStatusUpdate = async (meal) => {
    try {
      await updateMealStatus(user._id, { meal, status: true });
    } catch (error) {
      console.error("failed to update meal status:", error);
      alert("Failed to update meal status");
    }
  };

  //Return-----------------------------------------------------------------------------------------------
  return (
    <div className="dashboard-container">
      {/*Upper Container Content ------------------------------------------------------------------------ */}

      <div className="upper-container">
        <div className="intro">
          <h2>Hello There, {"  " + user?.firstName}</h2>
        </div>
      </div>

      {/*Inner Container Content------------------------------------------------------------------------- */}
      <div className="inner-container">
        {/*Streaks Content---------------------------- */}
        <div className="streak-section">
          {/* Streak Days*/}

          <div className="streak-container">
            <div className="streakInfo">
              <div className="streakNumber">
                <p>21</p>
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
        {/* Inner Section*/}

        <div className="innerInfo">
          {/* user image*/}
          <div className="userImg userImg1">
            {!user?.photoURL ? (
              <p>{user?.firstName.substring(0, 1)}</p>
            ) : (
              <img src={user?.photoURL} alt={user?.firstName.substring(0, 1)} />
            )}
            <div className="userTitle">
              <p>{user?.firstName + " " + user?.lastName}</p>
              <p id="userMail">{user?.email}</p>
            </div>
          </div>
          {/* attributes*/}
          <div className="userImg userImg2">
            <div className="attribute">
              <div className="attri-icons">
                <i class="fa-solid fa-arrows-up-down"></i>
              </div>
              <p>Height</p>
              <p id="attribute">{user?.height || 0}</p>
            </div>
            <div className="attribute">
              <div className="attri-icons">
                <i class="fa-solid fa-weight-scale"></i>
              </div>
              <p>Weight</p>
              <p id="attribute">{user?.weight}</p>
            </div>
            <div className="attribute">
              <div className="attri-icons">
                <i class="fa-solid fa-mars-and-venus"></i>
              </div>
              <p>Gender</p>
              <p id="attribute">{user?.gender}</p>
            </div>
            <div className="attribute">
              <div className="attri-icons">
                <i class="fa-solid fa-user-clock"></i>
              </div>
              <p>Age</p>
              <p id="attribute">{user?.age}</p>
            </div>
          </div>
          {/*calendar*/}
          <div className="userImg userImg3">
            <Calendar
              tileClassName={({ date }) => {
                const dateString = formatLocalDate(date);
                if (loginDates.includes(dateString)) {
                  return "highlight";
                }
                return null;
              }}
            />
          </div>
          {/* Milestone*/}
          <div className="milestone userImg4">
            <img src={milestone} alt="" />
            <div className="milestone-info">
              <p id="percentage">90%</p>
              <p id="milestone">Milestone</p>
              <p id="description">
                You've come 90% close to accomplishing your goal!
              </p>
            </div>
          </div>
          <div className="Stats userImg5">
            <p id="dailytasks">Daily Tasks: {overallTasksStatus} </p>
            <div className="chart">
              {/*-------------------Circular Progress bar-------------------------*/}
              <svg
                xmlns="https://www.w3.0rg/2000/svg"
                version="1.1"
                width="160px"
                height="160px"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#4ac577" />
                    <stop offset="100%" stopColor=" #77c84eb7" />
                  </linearGradient>
                </defs>

                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  strokeLinecap="round"
                  strokeWidth="20px"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />

                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="24"
                  fill="#333"
                >
                  {Math.round(percentage)}%
                </text>
              </svg>
            </div>
            <div className="buttons">
              <button
                className={breakfastStatus ? "active" : ""}
                onClick={() => handleStatusUpdate("breakfast", true)}
              >
                Breakfast
              </button>
              <button
                className={lunchStatus ? "active" : ""}
                onClick={() => handleStatusUpdate("lunch", true)}
              >
                Lunch
              </button>
              <button
                className={dinnerStatus ? "active" : ""}
                onClick={() => handleStatusUpdate("dinner", true)}
              >
                Dinner
              </button>
            </div>
          </div>
          <div className="Stats userImg6"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
