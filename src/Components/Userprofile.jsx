import React from "react";
import useUserStore from "../Context/userStore.jsx";
const Userprofile = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className=" userImg1">
      {!user?.photoURL ? (
        <p id="imgPlh">{user?.firstName.substring(0, 1).toUpperCase()}</p>
      ) : (
        <img src={user?.photoURL} alt={user?.firstName.substring(0, 1)} />
      )}
      <div className="userTitle">
        <p>{user?.firstName + " " + user?.lastName}</p>
        <p id="userMail">{user?.email}</p>
      </div>
    </div>
  );
};

export default Userprofile;
