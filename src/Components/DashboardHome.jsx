import React, { useState, useEffect } from "react";
import Bmr from "../Utils/Bmr.jsx";
import "../Styles/DashboardHome.css";
import calculateDailyCalories from "../Utils/DailyCalories.jsx";
import milestone from "../assets/images/milestone.png";
import useUserStore from "../Context/userStore.jsx";
import Calendar from "./Calendar.jsx";
import MealStatus from "./MealStatus.jsx";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const DashboardHome = () => {
  const user = useUserStore((state) => state.user);

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

  // Prepare data for weekly meal completion chart
  const getWeeklyData = () => {
    const data = [];
    const mealStatusMap = user?.mealStatus || {};

    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];

      const dayMeals = mealStatusMap[dateString] || {
        breakfast: false,
        lunch: false,
        dinner: false,
      };

      const mealsCompleted =
        (dayMeals.breakfast ? 1 : 0) +
        (dayMeals.lunch ? 1 : 0) +
        (dayMeals.dinner ? 1 : 0);

      const completionRate = Math.round((mealsCompleted / 3) * 100);

      // Format date as short day name
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      data.push({
        day: dayName,
        completion: completionRate,
        meals: mealsCompleted,
        target: dailyCalories || 2000,
      });
    }

    return data;
  };

  const weeklyData = getWeeklyData();
  //Return-----------------------------------------------------------------------------------------------
  return (
    <div className="dashboard-container">
      <div className="IntroSection">
        <div className="intro">
          <h2>Hello There, {"  " + user?.firstName}</h2>
        </div>
      </div>
      <div className="StreakSection">
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
      </div>
      <div className="ContentSection">
        <div className="innerInfo">
          {/* user image*/}
          <div className=" userImg1">
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
              </div>{" "}
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
          <Calendar />
          {/*meal satus*/}
          <MealStatus />
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
          <div className="Stats userImg6">
            <p id="weeklytitle">Weekly Meal Tracking</p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 10, right: 0, left: 10, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#666", fontSize: 8, fontFamily: "mier" }}
                  axisLine={{ stroke: "#ccc" }}
                  height={20}
                />
                <YAxis
                  tick={{ fill: "#666", fontSize: 8, fontFamily: "mier" }}
                  axisLine={{ stroke: "#ccc" }}
                  width={20}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontFamily: "mier",
                    fontSize: "0.9em",
                  }}
                  formatter={(value, name) => {
                    if (name === "completion")
                      return [`${value}%`, "Completion"];
                    return [value, name];
                  }}
                />
                <Bar
                  dataKey="completion"
                  fill="#77c84eb7"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
