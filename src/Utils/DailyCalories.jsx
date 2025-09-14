const calculateDailyCalories = ({
  weight,
  height,
  age,
  gender,
  goal,
  activityLevel,
}) => {
  let dailycalories;
  let bmr;
  let tdee;

  if (gender === "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  if (activityLevel === "N/A") {
    tdee = bmr * 1.2;
  } else if (activityLevel === "light") {
    tdee = bmr * 1.375;
  } else if (activityLevel === "medium") {
    tdee = bmr * 1.55;
  } else {
    tdee = bmr * 1.9;
  }

  if (goal === "gain") {
    dailycalories = tdee + 500;
  } else if (goal === "lose") {
    dailycalories = tdee - 500;
  } else {
    dailycalories = tdee;
  }

  return Math.round(dailycalories);
};

export default calculateDailyCalories;
