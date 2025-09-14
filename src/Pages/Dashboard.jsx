import React, { useState } from "react";
import "../Styles/Dashboard.css";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Components/firebase";
import { useAuth } from "../Context/AuthContext";
import PopUp from "../Components/PopUp";
import Settings from "../Components/Settings";
import DashboardHome from "../Components/DashboardHome";
import DashboardMeals from "../Components/DashboardMeals";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState();
  /*Sign out function-------------- */
  const signOutUser = () => {
    signOut(auth);
    window.location.href = "/";
  };

  /*Access to user information--------------- */
  const { user, profile } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome />;
      case "settings":
        return <Settings />;
      case "meals":
        return <DashboardMeals />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <>
      <PopUp />
      <section className="dashCont">
        <div className="dashTools">
          {/*--------------logo----------------------*/}
          <div className="logoSec">
            <div className="logoBox">
              <Link to="/">
                g<i class="fas fa-apple-alt"></i>
              </Link>
            </div>
          </div>
          {/*-----------tools-----------------------*/}
          <div className="navSec">
            <i
              onClick={() => setActiveTab("home")}
              class="fa-solid fa-house"
            ></i>
            <i
              onClick={() => setActiveTab("meals")}
              class="fa-solid fa-utensils"
            ></i>
            <i class="fa-solid fa-camera"></i>
            <i class="fa-solid fa-envelope"></i>
            <i
              onClick={() => setActiveTab("settings")}
              class="fa-solid fa-gear"
            ></i>
          </div>
          {/*------------------logout-------------------*/}
          <div className="logout">
            <button onClick={signOutUser}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
        {/*DASHBOARD MAIN INFO--------------------------- */}
        <div className="dashInfo">
          <section className="dashHome">
            {/* <Settings /> */}
            {renderContent()}
          </section>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
