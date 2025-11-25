import User from "../models/userModel.js";

export const updateMealStatus = async (req, res) => {
  const { id } = req.params;
  const { meal, status } = req.body;
  const today = new Date().toISOString().split("T")[0];

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

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error details: ", error);
    return res.status(500).json({ error: error.message });
  }
};
