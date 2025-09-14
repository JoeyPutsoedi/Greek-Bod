import MealCont from "./MealCont";
import "../Styles/DashboardMeals.css";

const DashboardMeals = () => {
  const green = "#31a35b";
  const transparent = "transparent";
  const white = "white";
  return (
    <div className="mealsCont" style={{ overflow: "scroll" }}>
      <div className="upperMeals">
        <h2>Your Daily Meal Plan</h2>
        <p>Top choice</p>
      </div>
      <div className="midMeals">
        <h2>What's On The Menu Today </h2>
        <div className="mealGrid">
          <div className="mgrid">
            <MealCont num={0} type={"Breakfast"} bkg={green} cl={white} />
          </div>
          <div className="mgrid">
            <MealCont num={1} type={"Lunch"} bkg={transparent} cl={green} />
          </div>
          <div className="mgrid">
            <MealCont num={2} type={"Dinner"} bkg={transparent} cl={green} />
          </div>
        </div>
      </div>
      <div className="lowerMeals">
        <h2>Some Snacks </h2>
        <div className="lowerGrid">
          <div className="lgrid">
            <MealCont num={0} type={"Breakfast"} bkg={green} cl={white} />
          </div>
        </div>
      </div>
    </div>
    //
  );
};

export default DashboardMeals;
