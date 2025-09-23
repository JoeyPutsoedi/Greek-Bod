import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import Bmr from "../Utils/Bmr";
import "../Styles/DashboardHome.css";
import calculateDailyCalories from "../Utils/DailyCalories";
import Calendar from "react-calendar";
import "../Styles/Calendar.css";
import { getLoginDates } from "../Utils/LogDates";

const DashboardHome = () => {
  const [breakfastStatus, setBreakfastStatus] = useState(false);
  const { user, profile } = useAuth();
  const [loginDates, setLoginDates] = useState([]);
  //Call Daily calories function
  const dailyCalories = calculateDailyCalories({
    weight: profile?.weight,
    height: profile?.height,
    age: profile?.age,
    gender: profile?.gender,
    goal: profile?.goal,
    activityLevel: profile?.activityLevel,
  });

  //fuction to handle whether user has completed breakfast or not
  const handleBreakfastDone = () => {
    setBreakfastStatus(true);
  };
  //get user log-in log to display on calendar
  useEffect(() => {
    const fetchLogins = async () => {
      if (user) {
        const dates = await getLoginDates(user.uid);
        setLoginDates(dates);
      }
    };
    fetchLogins();
  }, [user]);

  const highlightedDates = loginDates.map((date) => new Date(date));

  const ActivityQuantity = () => {
    let activityStatus;

    if (!profile?.activityLevel) return;

    if (profile?.activityLevel === "N/A") {
      activityStatus = "0 Days Of exercise weekly";
    } else if (profile?.activityLevel === "light") {
      activityStatus = "1-3 Days of exercise weekly";
    } else if (profile?.activityLevel === "medium") {
      activityStatus = "3-5 Days of exercise weekly";
    } else {
      activityStatus = "5-6 Days of exercise weekly";
    }
    return activityStatus;
  };

  return (
    <div className="dashboard-container">
      {/*,Left column----------------------------------------------------------------------------*/}
      <section className="leftDash">
        <div className="upperLeftDash">
          <h1>Dashboard</h1>
          {/*Top left column----------------------------------------------------------------------------*/}

          <div className="dashBanner">
            <h2>Hello{", " + profile?.firstName}</h2>
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
                  <div className="blok">{profile?.activityLevel || 0}</div>
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
                  <div className="blok">
                    {(
                      <Bmr
                        weight={profile?.weight}
                        height={profile?.height}
                        age={profile?.age}
                        gender={profile?.gender}
                      />
                    ) || 0}
                  </div>
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
                  if (
                    highlightedDates.find(
                      (d) => d.toDateString() === date.toDateString()
                    )
                  ) {
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
              <button className="Lbutton" onClick={handleBreakfastDone}>
                Done
              </button>
            </div>
            <div className="lunchCont lowerCont">
              <div className="LInfo">Lunch Status: Incomplete</div>
              <button className="Lbutton">Done</button>
            </div>

            <div className="dinnerCont lowerCont">
              <div className="LInfo">Dinner Status: Incomplete</div>
              <button className="Lbutton">Done</button>
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
            {!profile?.photoURL ? (
              <p>{profile?.firstName.substring(0, 1)}</p>
            ) : (
              <img
                src={profile?.photoURL}
                alt={profile?.firstName.substring(0, 1)}
              />
            )}
          </div>
          <h1>{profile?.firstName + "  " + profile?.lastName}</h1>
          <p>{profile?.gender}</p>
        </div>

        {/*below right column----------------------------------------------------------------------------*/}
        <div className="bottom-rightDash">
          <div className="popupStats">
            <div className="height">
              <p className="popupLabel">{profile?.height || " 0 "} cm</p>
              <p>Height</p>
            </div>
            <div className="weight">
              <p className="popupLabel">{profile?.weight || " 0 "} kg</p>
              <p>Weight</p>
            </div>
            <div className="age">
              <p className="popupLabel">{profile?.age || " 0 "} yrs</p>

              <p>Age</p>
            </div>
          </div>
          <div className="exerciseQuant">
            <p>Activity </p>
            <p id="activityQuant">{ActivityQuantity()}</p>
          </div>
          <div className="chart">
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

              <circle cx="80" cy="80" r="70" stroke-linecap="round" />
            </svg>

            <p>Daily Tasks: Incomplete !</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
