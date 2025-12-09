import React from "react";
import useUserStore from "../Context/userStore.jsx";
const Userattributes = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="userImg userImg2">
      <div className="attribute">
        <div className="attri-icons">
          <i class="fa-solid fa-arrows-up-down"></i>
        </div>
        <p>Height</p>
        <p id="attribute">{user?.height || 0}</p>
      </div>
      <div className="attribute">
        <div className="attri-icons">
          <i class="fa-solid fa-weight-scale"></i>
        </div>{" "}
        <p>Weight</p>
        <p id="attribute">{user?.currentWeight}</p>
      </div>
      <div className="attribute">
        <div className="attri-icons">
          <i class="fa-solid fa-mars-and-venus"></i>
        </div>
        <p>Gender</p>
        <p id="attribute">{user?.gender}</p>
      </div>
      <div className="attribute">
        <div className="attri-icons">
          <i class="fa-solid fa-user-clock"></i>
        </div>
        <p>Age</p>
        <p id="attribute">{user?.age}</p>
      </div>
    </div>
  );
};

export default Userattributes;
