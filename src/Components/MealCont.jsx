import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { getMealRecommendations } from "../Utils/mealsServics";
import "../Styles/DashboardMeals.css";

const MealCont = ({ num, type, cl, bkg }) => {
  const { profile } = useAuth();
  const [meals, setMeals] = useState([]);

  //if profile exists return meals
  useEffect(() => {
    if (profile) {
      getMealRecommendations(profile).then(setMeals);
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
