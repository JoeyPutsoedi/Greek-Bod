import React from "react";
import { useAuth } from "../Context/AuthContext";
import "../Styles/DashboardHome.css";
const DashboardHome = () => {
  const { user, profile } = useAuth();

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
          <div className="upperActivity"></div>
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
          <h1>{profile?.firstName + "  " + profile?.lastName}</h1>
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
