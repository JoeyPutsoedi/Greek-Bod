import useUserStore from "../Context/userStore.jsx";

const MealStatus = () => {
  const user = useUserStore((state) => state.user);

  const updateMealStatus = useUserStore((state) => state.updateMealStatus);

  const today = new Date().toISOString().split("T")[0];

  const todayMeals = user?.mealStatus?.[today] || {
    breakfast: false,
    lunch: false,
    dinner: false,
  };
  const breakfastStatus = todayMeals.breakfast;
  const lunchStatus = todayMeals.lunch;
  const dinnerStatus = todayMeals.dinner;

  const percentage =
    (breakfastStatus ? 33.33 : 0) +
    (lunchStatus ? 33.33 : 0) +
    (dinnerStatus ? 33.33 : 0);

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

  const handleStatusUpdate = async (meal) => {
    try {
      await updateMealStatus(user._id, { meal, status: true });
    } catch (error) {
      console.error("failed to update meal status:", error);
      alert("Failed to update meal status");
    }
  };

  return (
    <div className="Stats userImg5">
      <p id="dailytasks">Daily Tasks: {overallTasksStatus} </p>
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
              <stop offset="100%" stopColor=" #77c84eb7" />
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

          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="24"
            fill="#333"
          >
            {Math.round(percentage)}%
          </text>
        </svg>
      </div>
      <div className="buttons">
        <button
          className={breakfastStatus ? "active" : ""}
          onClick={() => handleStatusUpdate("breakfast", true)}
        >
          Breakfast
        </button>
        <button
          className={lunchStatus ? "active" : ""}
          onClick={() => handleStatusUpdate("lunch", true)}
        >
          Lunch
        </button>
        <button
          className={dinnerStatus ? "active" : ""}
          onClick={() => handleStatusUpdate("dinner", true)}
        >
          Dinner
        </button>
      </div>
    </div>
  );
};

export default MealStatus;
