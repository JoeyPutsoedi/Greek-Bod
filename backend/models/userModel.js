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
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    goal: {
      type: String,
    },
    gender: { type: String },
    activityLevel: { type: String },
    photoURL: { type: String },
    loginDates: [{ type: String }],
    lastLogin: { type: Date },
    mealStatus: {
      type: Map,
      of: {
        breakfast: { type: Boolean, default: false },
        lunch: { type: Boolean, default: false },
        dinner: { type: Boolean, default: false },
      },
    },
    meals: [
      {
        date: { type: String, required: true },
        mealData: [mongoose.Schema.Types.Mixed],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
