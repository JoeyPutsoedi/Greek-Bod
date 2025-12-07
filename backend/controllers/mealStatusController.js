import User from "../models/userModel.js";

//function that checks if all meals are completed
const areAllMealsCompleted = (mealStatus) => {
  //if a all meals are complete, this funxction will return true
  return mealStatus.breakfast && mealStatus.lunch && mealStatus.dinner;
};

//function that checks if dates are consecutive
const areDatesConsecutive = (date1String, date2String) => {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  //subtract the dates from each other
  //when you subtract dates from each other you get an answer in milliseconds
  //Maths.abs() converts the answer we get to a positive value
  const diffTime = Math.abs(date2 - date1);
  //Maths.ceil() converts the milliseconds we got from diffTime to a days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //if the days a 1day apart then return true, if the dates are more that a day apart return false
  return diffDays === 1;
};

//function to update user meal status
export const updateMealStatus = async (req, res) => {
  const { id } = req.params;
  const { meal, status } = req.body;
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  try {
    //find user
    const user = await User.findById(id);

    //if user not found return message
    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    //if there is no meal status object create a new one
    if (!user.mealStatus) {
      user.mealStatus = new Map();
    }

    const todayMeals = user.mealStatus.get(today) || {
      breakfast: false,
      lunch: false,
      dinner: false,
    };

    // Update the specific meal
    todayMeals[meal] = status;
    user.mealStatus.set(today, todayMeals);

    //checks if all meals are ompleted for today
    if (areAllMealsCompleted(todayMeals)) {
      //initalize streak for users created before the streak feature was added.
      if (user.streakCount === undefined) {
        user.streakCount = 0;
      }

      //check if this is a new streak
      if (user.lastStreakDate !== today) {
        if (
          user.lastStreakDate &&
          areDatesConsecutive(user.lastStreakDate, today)
        ) {
          user.streakCount += 1;
        } else if (!user.lastStreakDate) {
          //first streak day ever
          user.streakCount = 1;
        } else {
          user.streakCount = 1;
        }

        user.lastStreakDate = today;
      }
    }

    // If last streak date was not yesterday or today, reset streak
    if (
      user.lastStreakDate &&
      user.lastStreakDate !== today &&
      user.lastStreakDate !== yesterday
    ) {
      user.streakCount = 0;
    }
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error details: ", error);
    return res.status(500).json({ error: error.message });
  }
};
