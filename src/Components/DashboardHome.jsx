import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import Bmr from "../Utils/Bmr";
import "../Styles/DashboardHome.css";
import calculateDailyCalories from "../Utils/DailyCalories";
import Calendar from "react-calendar";
import "../Styles/Calendar.css";
import { getLoginDates } from "../Utils/LogDates";

const DashboardHome = () => {
  const { user, profile } = useAuth();
  const [loginDates, setLoginDates] = useState([]);
  const dailyCalories = calculateDailyCalories({
    weight: profile?.weight,
    height: profile?.height,
    age: profile?.age,
    gender: profile?.gender,
    goal: profile?.goal,
    activityLevel: profile?.activityLevel,
  });

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
          <div className="lowerActivity"></div>
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
          <h1>{profile?.firstName + "  " + profile?.lastName}</h1>{" "}
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
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
