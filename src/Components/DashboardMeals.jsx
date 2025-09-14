import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { getMealRecommendations } from "../Utils/mealsServics";

const DashboardMeals = () => {
  const { profile } = useAuth();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (profile) {
      getMealRecommendations(profile).then(setMeals);
    }
  }, [profile]);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Daily Meal Plan</h2>

      {meals.length === 0 ? (
        <p>No meals found. Try updating your profile info.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{meal.title}</h3>
              <img
                src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
                alt={meal.title}
                className="rounded-md mb-2"
              />
              <a
                href={meal.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardMeals;
