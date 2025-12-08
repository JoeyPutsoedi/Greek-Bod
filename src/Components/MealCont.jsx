import "../Styles/DashboardMeals.css";

const MealCont = ({ meals, num, type, cl, bkg }) => {
  const meal = meals[num];

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
        <MealCard meal={meal} />
        <MealTitle meal={meal} />
        <MealRecipe meal={meal} />
      </div>
    </div>
  );
};

export default MealCont;
