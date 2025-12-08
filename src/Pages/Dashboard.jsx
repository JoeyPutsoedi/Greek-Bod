import React, { useState, useEffect } from "react";
import "../Styles/Dashboard.css";
import { Link } from "react-router-dom";
import PopUp from "../Components/PopUp.jsx";
import Settings from "../Components/Settings.jsx";
import DashboardHome from "../Components/DashboardHome.jsx";
import DashboardMeals from "../Components/DashboardMeals.jsx";
import useUserStore from "../Context/userStore.jsx";
import TargetPopUp from "../Components/TargetPopUp.jsx";

import "../Styles/DashboardResponsive.css";
const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const signOut = useUserStore((state) => state.signOutUser);

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "home";
  });

  /*Sign out function-------------- */
  const signOutUser = () => {
    try {
      signOut();
      // alert("log out sucesssful");
      window.location.href = "/";
    } catch (error) {
      alert("failed to signOut");
    }
  };

  // Save activeTab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  /*Access to user information--------------- */

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome />;
      case "settings":
        return <Settings />;
      case "meals":
        return <DashboardMeals />;
      case "upload":
        return <DashboardUpload />;
      default:
        return <DashboardHome />;
    }
  };
  return (
    <>
      <PopUp />
      <TargetPopUp />
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
            {/* <i
              onClick={() => setActiveTab("upload")}
              class="fa-solid fa-camera"
            ></i> */}
            <Link to="/Contact">
              <i class="fa-solid fa-envelope"></i>
            </Link>
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
          <section className="dashHome">{renderContent()}</section>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
