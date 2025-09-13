import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "../styles/popup.css";

const PopUp = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    height: "",
    weight: "",
    age: "",
    goal: "",
    gender: "",
    activityLevel: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists() || !snap.data().profileComplete) {
        setOpen(true); // open popup if profile not complete
      } else {
        // Prefill if already exists
        setProfile(snap.data().profile || profile);
      }
    };
    checkProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        height: profile.height || "",
        weight: profile.weight || "",
        age: profile.age || "",
        goal: profile.goal || "",
        gender: profile.gender || "",
        activityLevel: profile.activityLevel || "",
        profileComplete: true,
      },
      { merge: true }
    );
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Complete Your Profile</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {/*Height-------------------------------------*/}
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={profile.height}
            onChange={handleChange}
            required
          />

          {/*Weight-------------------------------------*/}
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={profile.weight}
            onChange={handleChange}
            required
          />

          {/*Age-------------------------------------*/}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={profile.age}
            onChange={handleChange}
            required
          />

          {/*Goal-------------------------------------*/}
          <select
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            required
          >
            <option value="">Select Goal</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Muscle</option>
            <option value="maintain">Maintain</option>
          </select>

          {/*Gender-------------------------------------*/}
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            required
          >
            <option value="">What is your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/*Activity level-------------------------------------*/}
          <select
            name="activityLevel"
            value={profile.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="">How often do you exercise weekly?</option>
            <option value="N/A">No exercise</option>
            <option value="light">1-3 Days</option>
            <option value="medium">3-5 Days</option>
            <option value="heavy">6-7 Days</option>
          </select>

          <div className="actions">
            <button
              type="button"
              className="cancel"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
