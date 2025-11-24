import React, { useState, useEffect } from "react";
import Bmr from "../Utils/Bmr.jsx";
import "../Styles/DashboardHome.css";
import calculateDailyCalories from "../Utils/DailyCalories.jsx";
import Calendar from "react-calendar";
import "../Styles/Calendar.css";

import useUserStore from "../Context/userStore.jsx";

const DashboardHome = () => {
  const user = useUserStore((state) => state.user);
  const loginDates = user?.loginDates;

  const [breakfastStatus, setBreakfastStatus] = useState(false);
  const [lunchStatus, setLunchStatus] = useState(false);
  const [dinnerStatus, setDinnerStatus] = useState(false);

  //function that coverts time to local time
  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const circumference = 450;
  //counts how many meals are true.
  //each ternary returns 1 for true or 0 for false

  const mealsDone =
    (breakfastStatus ? 1 : 0) + (lunchStatus ? 1 : 0) + (dinnerStatus ? 1 : 0);

  //cirumference = 450 for an empty progress bar/0 for a full progress bar
  // each meal toggle = 150
  //example: 1 meal done  = 450 - 150 whih equates to a quarter circle
  const strokeDashoffset = circumference - mealsDone * 150;

  //variable that displays complete if all tasks are done and Incomplete
  const overallTasksStatus = strokeDashoffset === 0 ? "Complete" : "Incomplete";

  //Call BMR Function
  const bmr = Bmr({
    weight: user?.weight,
    height: user?.height,
    age: user?.age,
    gender: user?.gender,
  });
  //Call Daily calories function
  const dailyCalories = calculateDailyCalories({
    weight: user?.weight,
    height: user?.height,
    age: user?.age,
    gender: user?.gender,
    goal: user?.goal,
    activityLevel: user?.activityLevel,
  });

  //FUNCTIONS------------------------------------------------------------------------------------------
  //Function to store meal task status on firebase
  // useEffect(() => {
  //   const loadMeals = async () => {
  //     const mealStatusRef = doc(db, "users", user.uid);
  //     const mealStatusSnap = await getDoc(mealStatusRef);
  //     if (mealStatusSnap.exists()) {
  //       const data = mealStatusSnap.data().mealStatus?.[today];
  //       if (data) {
  //         setBreakfastStatus(data.breakfast);
  //         setLunchStatus(data.lunch);
  //         setDinnerStatus(data.dinner);
  //       } else {
  //         await updateDoc(mealStatusRef, {
  //           [`mealStatus.${today}`]: {
  //             breakfast: false,
  //             lunch: false,
  //             dinner: false,
  //           },
  //         });
  //       }
  //     } else {
  //       await setDoc(mealStatusRef, {
  //         mealStatus: {
  //           [today]: {
  //             breakfast: false,
  //             lunch: false,
  //             dinner: false,
  //           },
  //         },
  //       });
  //     }
  //   };

  //   loadMeals();
  // }, [user.uid, today]);

  //Function to handle the change when a task button is clicked
  // const handleStatusUpdate = async (meal, value) => {
  //   const ref = doc(db, "users", user.uid);
  //   await updateDoc(ref, {
  //     [`mealStatus.${today}.${meal}`]: value,
  //   });
  //   if (meal === "breakfast") setBreakfastStatus(value);
  //   if (meal === "lunch") setLunchStatus(value);
  //   if (meal === "dinner") setDinnerStatus(value);
  // };
  //get user log-in log to display on calendar
  // useEffect(() => {
  //   const fetchLogins = async () => {
  //     if (user) {
  //       const dates = await getLoginDates(user.uid);
  //       setLoginDates(dates);
  //     }
  //   };
  //   fetchLogins();
  // }, [user]);

  //Function to display the amount of exercise weekly----------------------------
  // const ActivityQuantity = () => {
  //   let activityStatus;

  //   if (!profile?.activityLevel) return;

  //   if (profile?.activityLevel === "N/A") {
  //     activityStatus = "0 Days Of exercise weekly";
  //   } else if (profile?.activityLevel === "light") {
  //     activityStatus = "1-3 Days of exercise weekly";
  //   } else if (profile?.activityLevel === "medium") {
  //     activityStatus = "3-5 Days of exercise weekly";
  //   } else {
  //     activityStatus = "5-6 Days of exercise weekly";
  //   }
  //   return activityStatus;
  // };
  //Return-----------------------------------------------------------------------------------------------
  return (
    <div className="dashboard-container">
      {/*,Left column----------------------------------------------------------------------------*/}
      <section className="leftDash">
        <div className="upperLeftDash">
          <h1>Dashboard</h1>
          {/*Top left column----------------------------------------------------------------------------*/}

          <div className="dashBanner">
            <h2>Hello{", " + user?.firstName}</h2>
            <p>The Best way to get consistency is to track your stats</p>
          </div>
        </div>

        <div className="activityDash">
          <div className="upperActivity">
            <div className="bmrCont">
              {/*Activity---------------------------------- */}
              <div
                className="upperBmr"
                style={{ backgroundColor: "#4ac577ad" }}
              >
                <div className="upperBmrUpper">
                  <div className="blok">{user?.activityLevel || 0}</div>
                  <p>
                    Weekly Exercise Level <br />
                  </p>
                </div>

                <div className="white-lines">
                  <div className="line"></div>
                  <div className="line" style={{ opacity: "0.5" }}></div>
                </div>
              </div>
              {/*BMR---------------------------------- */}
              <div className="upperBmr" style={{ backgroundColor: "#4ac577" }}>
                <div className="upperBmrUpper">
                  <div className="blok">{bmr || 0}</div>
                  <p>Your Basal Metabolic Rate (kcal)</p>
                </div>

                <div className="white-lines">
                  <div className="line"></div>
                  <div className="line" style={{ opacity: "0.5" }}></div>
                </div>
              </div>

              {/*Calorie Target---------------------------------- */}
              <div className="upperBmr" style={{ backgroundColor: "#31a35b" }}>
                <div className="upperBmrUpper">
                  <div className="blok">{dailyCalories || 0}</div>
                  <p>
                    {" "}
                    Daily Calorie Target <br />
                    (kcal)
                  </p>
                </div>

                <div className="white-lines">
                  <div className="line"></div>
                  <div className="line" style={{ opacity: "0.5" }}></div>
                </div>
              </div>
            </div>

            {/*Calender Section------------------------------------------*/}
            <div className="calCont">
              <Calendar
                tileClassName={({ date }) => {
                  const dateString = formatLocalDate(date);
                  if (loginDates.includes(dateString)) {
                    return "highlight";
                  }
                  return null;
                }}
              />
            </div>
          </div>
          <div className="lowerActivity">
            <div className="breakfastCont lowerCont">
              <div className="LInfo">
                Breakfast Status:
                <br />
                {breakfastStatus ? "complete" : "Incomplete"}
              </div>
              <button
                className="Lbutton"
                onClick={() => handleStatusUpdate("breakfast", true)}
              >
                Done
              </button>
            </div>

            <div className="lunchCont lowerCont">
              <div className="LInfo">
                Lunch Status: <br />
                {lunchStatus ? "complete" : "Incomplete"}
              </div>
              <button
                className="Lbutton"
                onClick={() => handleStatusUpdate("lunch", true)}
              >
                Done
              </button>
            </div>

            <div className="dinnerCont lowerCont">
              <div className="LInfo">
                Dinner Status: <br />
                {dinnerStatus ? "complete" : "Incomplete"}
              </div>
              <button
                className="Lbutton"
                onClick={() => handleStatusUpdate("dinner", true)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </section>

      {/*Right column----------------------------------------------------------------------------*/}
      <section className="rightDash">
        {/*Top right column----------------------------------------------------------------------------*/}
        <div className="top-rightdash">
          <div className="imgplacehld">
            {/*if there is no profile picture return a placeholder of the first letter of user's name*/}
            {!user?.photoURL ? (
              <p>{user?.firstName.substring(0, 1)}</p>
            ) : (
              <img src={user?.photoURL} alt={user?.firstName.substring(0, 1)} />
            )}
          </div>
          <h1>{user?.firstName + "  " + user?.lastName}</h1>
          <p>{user?.gender}</p>
        </div>

        {/*below right column----------------------------------------------------------------------------*/}
        <div className="bottom-rightDash">
          <div className="popupStats">
            <div className="height">
              <p className="popupLabel">{user?.height || " 0 "} cm</p>
              <p>Height</p>
            </div>
            <div className="weight">
              <p className="popupLabel">{user?.weight || " 0 "} kg</p>
              <p>Weight</p>
            </div>
            <div className="age">
              <p className="popupLabel">{user?.age || " 0 "} yrs</p>

              <p>Age</p>
            </div>
          </div>
          <div className="exerciseQuant">
            <p>Activity </p>
            <p id="activityQuant">{"N/A Days of Exercise weekly"}</p>
          </div>
          <div className="chart">
            {/*-------------------Circular Progress bar-------------------------*/}
            <svg
              xmlns="https://www.w3.0rg/2000/svg"
              version="1.1"
              width="160px"
              height="160px"
            >
              <defs>
                <linearGradient id="GradientColor">
                  <stop offset="0%" stopColor="#4ac577" />
                  <stop offset="100%" stopColor="#0f5d6fcc" />
                </linearGradient>
              </defs>

              <circle
                cx="80"
                cy="80"
                r="70"
                strokeLinecap="round"
                strokeWidth="20px"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>

            <p>Daily Tasks: {overallTasksStatus} !</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
