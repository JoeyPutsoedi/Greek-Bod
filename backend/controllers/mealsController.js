import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const fetchMeals = async (req, res) => {
  const { id } = req.params;
  const today = new Date().toISOString().split("T")[0];

  try {
    //search for user
    const user = await User.findById(id);

    //if no user is found then return an error
    if (!user) {
      return res.status(404).json({ error: "User not found!!!" });
    }

    // Check if user has required fields for calorie calculation
    if (
      !user.currentWeight ||
      !user.height ||
      !user.age ||
      !user.gender ||
      !user.goal ||
      !user.activityLevel
    ) {
      return res.status(400).json({
        error:
          "User profile incomplete. Please update your weight, height, age, gender, goal, and activity level.",
      });
    }

    //query to check if there are any meals stored for today
    const todaysMeals = user.meals.find((meal) => meal.date === today);

    if (todaysMeals) {
      return res.status(200).json({
        date: today,
        meals: todaysMeals.mealData,
        cached: true,
      });
    }

    // Calculate target calories
    const { currentWeight, height, age, gender, goal, activityLevel } = user;

    let bmr;
    if (gender === "Male") {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
    }

    let tdee;
    if (activityLevel === "N/A") {
      tdee = bmr * 1.2;
    } else if (activityLevel === "light") {
      tdee = bmr * 1.375;
    } else if (activityLevel === "medium") {
      tdee = bmr * 1.55;
    } else {
      tdee = bmr * 1.9;
    }

    let dailycalories;
    if (goal === "gain") {
      dailycalories = tdee + 500;
    } else if (goal === "lose") {
      dailycalories = tdee - 500;
    } else {
      dailycalories = tdee;
    }

    const targetCalories = Math.round(dailycalories);

    // Fetch meals from Spoonacular
    const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&apiKey=${process.env.VITE_SPOONACULAR_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({
        error: "Failed to fetch meals from Spoonacular API",
      });
    }

    const data = await response.json();
    const meals = data.meals;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          meals: { date: today, mealData: meals },
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ date: today, meals: meals, cached: false, user: updatedUser });
  } catch (error) {
    console.error("error details:", error);
    return res.status(500).json({ error: error.message });
  }
};
