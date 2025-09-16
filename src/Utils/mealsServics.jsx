import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Components/firebase";
import calculateDailyCalories from "./DailyCalories";

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

export const getMealRecommendations = async (profile, userId) => {
  try {
    const today = new Date().toISOString().split("T")[0]; //stores today's date
    const mealDocRef = doc(db, "users", userId, "mealPlan", today);
    const mealSnap = await getDoc(mealDocRef);

    if (mealSnap.exists()) {
      //if userSnap has data/exists let userData = the data inside userSnap

      return mealSnap.data().meals;
      //if userData.mealPlan has meals stored in it and those meals were stored on today's date
      // then return those meals
    }
    //otherwise if no meal is stored store it:
    //targetCalories is variable that comes with the api,
    //the api recommmends meals based off of the value of target calories
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
    await setDoc(mealDocRef, {
      date: today,
      meals: data.meals,
    });

    return data.meals;
  } catch (error) {
    console.error("Error fetching meal recommendations:", error);
    return [];
  }
};
