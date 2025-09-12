import React from "react";
import { useAuth } from "../Context/AuthContext";
import "../Styles/DashboardHome.css";
const DashboardHome = () => {
  const { user, profile } = useAuth();

  return (
    <div className="dashboard-container">
      {/* TOP: Welcome + Profile */}
      <div className="profile-summary card">
        <div>
          <h2>User Data: {profile?.firstName}</h2>
          <br />

          <p>
            Height: {profile?.height} cm <br />
            Current Weight: {profile?.weight}kg <br />
            Age: {profile?.age}yrs <br />
            Weight Goal: {profile?.goal}
          </p>
        </div>
      </div>

      {/* MIDDLE: Goal Progress */}
      <div className="goal-progress card">
        <h3>Progress Toward Goal</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${user?.progress}%` }}
          ></div>
        </div>
        <p>{user.progress}% complete</p>
      </div>

      {/* MIDDLE: Daily Nutrition */}
      <div className="nutrition-summary card">
        <h3>Daily Nutrition</h3>
        <p>
          {user?.consumedCalories} / {user?.targetCalories} kcal
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${
                (user?.consumedCalories / user?.targetCalories) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* BOTTOM: Quick Actions */}
      <div className="quick-actions card">
        <h3>Quick Actions</h3>
        <div className="buttons">
          <button>Log Meal</button>
          <button>Scan Food</button>
          <button>Log Workout</button>
        </div>
      </div>

      {/* BOTTOM: Motivation */}
      <div className="motivation card">
        <p>💪 "Every rep brings you closer to your best self!"</p>
      </div>
    </div>
  );
};

export default DashboardHome;
<div className="dashHead"></div>;

{
  /* MIDDLE: Daily Check------------------------------ */
}
<div className="dailycheck">
  {/* MIDDLE: Goal Progress------------------------------- */}

  {/* MIDDLE: Daily Nutrition */}
</div>;
{
  /* overview----------------------------------------------*/
}
<div className="overview">Overview</div>;
{
  /* overview----------------------------------------------*/
}
