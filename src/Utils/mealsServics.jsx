const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
import calculateDailyCalories from "./DailyCalories";

export async function getMealRecommendations(userProfile) {
  try {
    // compute dailyCalories using utils function
    const targetCalories = calculateDailyCalories({
      weight: userProfile.weight,
      height: userProfile.height,
      age: userProfile.age,
      gender: userProfile.gender,
      goal: userProfile.goal,
      activityLevel: userProfile.activityLevel,
    });

    const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&apiKey=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch meals");

    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching meal recommendations:", error);
    return [];
  }
}
