import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../Components/firebase";
import calculateDailyCalories from "./DailyCalories";

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

export async function getMealRecommendations(userProfile, userId) {
  const today = new Date().toISOString().split("T")[0]; //store today's date in YYYY-MM-DD format
  try {
    // Reference that points to mealPlans collection in database "users" for
    //the logged in user
    const mealPlansRef = collection(db, "users", userId, "mealPlans");

    // Query to look for meals stored in today's date
    const q = query(mealPlansRef, where("date", "==", today));
    //if there are any store them in querySnapshot
    const querySnapshot = await getDocs(q);

    // If querySnapshot is not empty, return it's meals
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      return docData.meals;
    }
    /*------------code below here only executes if there aren't any meals saved in today's date------------------- */

    //if querySnapshot happens to be empty then calculate the daily calories needed
    //by the logged-in user
    const targetCalories = calculateDailyCalories({
      weight: userProfile.weight,
      height: userProfile.height,
      age: userProfile.age,
      gender: userProfile.gender,
      goal: userProfile.goal,
      activityLevel: userProfile.activityLevel,
    });

    // After calculations Fetch meals from Spoonacular API
    const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch meals");

    const data = await response.json();
    const meals = data.meals;

    // Store the meals where mealPlanRef points with today's date
    await addDoc(mealPlansRef, {
      date: today,
      meals,
    });

    return meals;
  } catch (error) {
    console.error("Error fetching meal recommendations:", error);
    return [];
  }
}
