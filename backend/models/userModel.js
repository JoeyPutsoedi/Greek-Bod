import mongoose from "mongoose";

//define user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    age: {
      type: Number,
    },
    goal: {
      type: String,
      enum: ["lose", "maintain", "gain"],
    },
    activityLevel: {
      type: String,
    },
    profilePicture: {
      type: String,
    },

    mealPlan: {
      date: { type: String },
      meals: { type: Array },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
