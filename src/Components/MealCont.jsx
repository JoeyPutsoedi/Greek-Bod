import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { getMealRecommendations } from "../Utils/mealsServics";
import "../Styles/DashboardMeals.css";

const MealCont = ({ num, type, cl, bkg }) => {
  const { profile } = useAuth();
  const [meals, setMeals] = useState([]);

  //if profile exists return meals
  useEffect(() => {
    if (!profile) return;

    const today = new Date().toISOString().split("T")[0]; //stores today's date
    const storedPlan = JSON.parse(localStorage.getItem("dailyMealPlan")); //stores today's meals

    //if there is a meal stored in "storedPlan" & the date it was stored matches the date stored in "today"
    //then set meals to today's meals
    if (storedPlan && storedPlan.Date === today) {
      setMeals(storedPlan.meals);
      return;
    } else {
      //fetch meals from the Api and store them in item "dailyMealPlan" in localStorag.
      // store them with the date inside variable "today".
      getMealRecommendations(profile).then((fetchedMeals) => {
        setMeals(fetchedMeals);
        localStorage.setItem(
          "dailyMealPlan",
          JSON.stringify({ date: today, meals: fetchedMeals })
        );
      });
    }
  }, [profile]);

  //Menu image------------------------------------------------------------------
  const MealCard = ({ meal }) => {
    if (!meal) return null;
    return (
      <div>
        {meal.image && (
          <img
            src={
              meal.image.startsWith("http")
                ? meal?.image
                : `https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`
            }
            alt={meal?.title || meal?.name}
          />
        )}
      </div>
    );
  };
  //Menu Title------------------------------------------------------------------
  const MealTitle = ({ meal }) => {
    if (!meal) return null;
    return <h3>{meal?.title}</h3>;
  };
  //Menu Reciper------------------------------------------------------------------
  const MealRecipe = ({ meal }) => {
    if (!meal) return null;
    return (
      <div className="linkHold">
        <a
          href={`https://spoonacular.com/recipes/${meal.title
            ?.replace(/\s+/g, "-")
            .toLowerCase()}-${meal.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Recipe
        </a>
      </div>
    );
  };

  return (
    <div className="mgrid">
      <div
        className="mealType"
        style={{ backgroundColor: `${bkg}`, color: `${cl}` }}
      >
        {type}
      </div>
      <div className="mealHold">
        <MealCard meal={meals[num]} />
        <MealTitle meal={meals[num]} />
        <MealRecipe meal={meals[num]} />
      </div>
    </div>
  );
};

export default MealCont;
