const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
import calculateDailyCalories from "./DailyCalories";

export const getMealRecommendations = async (profile) => {
  try {
    //tagetCalories is variable that comes with the api, the api recommmends meals based off of the value of target calories
    const targetCalories = calculateDailyCalories({
      weight: profile?.weight,
      height: profile?.height,
      age: profile?.age,
      gender: profile?.gender,
      goal: profile?.goal,
      activityLevel: profile?.activityLevel,
    });

    console.log("Target calories: " + targetCalories);
    console.log("API KEY: " + API_KEY);
    const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch meals");

    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching meal recommendations:", error);
    return [];
  }
};
