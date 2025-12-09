import React from "react";
import useUserStore from "../Context/userStore.jsx";
import calculateDailyCalories from "../Utils/DailyCalories.jsx";
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
const BarChartCont = () => {
  const user = useUserStore((state) => state.user);
  //Call Daily calories function
  const dailyCalories = calculateDailyCalories({
    weight: user?.currentWeight,
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
  return (
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
              if (name === "completion") return [`${value}%`, "Completion"];
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
  );
};

export default BarChartCont;
