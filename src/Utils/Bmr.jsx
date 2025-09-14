const Bmr = ({ weight, height, age, gender }) => {
  let bmr;

  if (gender === "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  // console.log(bmr);
  return Math.round(bmr);
};

export default Bmr;
