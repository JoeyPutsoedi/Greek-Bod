import React, { useState, useEffect } from "react";
import MealCont from "./MealCont.jsx";
import "../Styles/DashboardMeals.css";
import useUserStore from "../Context/userStore.jsx";
import { motion } from "motion/react";

const DashboardMeals = () => {
  const user = useUserStore((state) => state.user);
  const getMeals = useUserStore((state) => state.fetchMeals);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  //Variables that hold the colours being sent to the reuseable meal card that generates meals cards.
  const green = "#31a35b";
  const transparent = "transparent";
  const white = "white";

  useEffect(() => {
    if (user) {
      const getMealRecommendations = async () => {
        try {
          const mealsData = await getMeals(user._id);
          setMeals(mealsData || []);
        } catch (error) {
          console.error("Error fetching meals:", error);
          setMeals([]);
        } finally {
          setLoading(false);
        }
      };

      getMealRecommendations();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="loadingScreen">
        <h1>Loading meals</h1>
        <div className="circles">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
          <div className="circle c3"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="mealsCont">
      {/*Meal header section----------------------------------------*/}
      <div className="upperMeals">
        <h2>Your Daily Meal Plan</h2>
        <p>Top choice</p>
      </div>
      {/*Meals section----------------------------------------*/}
      <div className="midMeals">
        <h2>What's On The Menu Today </h2>
        <div className="mealGrid">
          <div className="mgrid">
            <MealCont
              meals={meals}
              num={0}
              type={"Breakfast"}
              bkg={green}
              cl={white}
            />
          </div>
          <div className="mgrid">
            <MealCont
              meals={meals}
              num={1}
              type={"Lunch"}
              bkg={transparent}
              cl={green}
            />
          </div>
          <div className="mgrid">
            <MealCont
              meals={meals}
              num={2}
              type={"Dinner"}
              bkg={transparent}
              cl={green}
            />
          </div>
        </div>
      </div>
      {/*Snacks section----------------------------------------*/}
      {/* <div className="lowerMeals">
        <h2>Some Snacks </h2>
        <div className="lowerGrid">
          <div className="lgrid">
            <MealCont num={0} type={"Breakfast"} bkg={green} cl={white} />
          </div>
        </div>
      </div> */}
    </div>
    //
  );
};
``;

export default DashboardMeals;
