import { useState, useEffect } from "react";
import useUserStore from "../Context/userStore";
import destination from "../assets/images/destination.PNG";
import "../Styles/modal.css";

const TargetPopUp = () => {
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState("");
  const user = useUserStore((state) => state.user);
  const userId = user._id;
  const updateUser = useUserStore((state) => state.updateUserInfo);

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;

      if (!user.targetWeight || user.targetWeight === 0) {
        setOpen(true);
      }
    };
    checkProfile();
  }, [user]);

  const handleChange = (e) => {
    setWeight(e.target.value);
  };
  const handleSave = async () => {
    try {
      const updatedData = {
        targetWeight: weight,
      };

      await updateUser(userId, updatedData);
    } catch (err) {
      console.error("failed to update user", err);
      alert("failed updating user information");
    }

    setOpen(false);
  };
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <form
          className="targetForm"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="targetImage">
            <img src={destination} alt="destination" />
            <p id="targetText">
              What is your
              <br /> target weight?
            </p>
          </div>
          <input
            type="number"
            name="weight"
            value={weight}
            placeholder="Target Weight (kg)"
            onChange={handleChange}
          />
          <div className="actions">
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TargetPopUp;
