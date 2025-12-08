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
    startingWeight: { type: Number },
    currentWeight: { type: Number },
    targetWeight: { type: Number },
    goal: {
      type: String,
    },
    gender: { type: String },
    activityLevel: { type: String },
    photoURL: { type: String },
    loginDates: [{ type: String }],
    lastLogin: { type: Date },
    streakCount: { type: Number, default: 0 },
    lastStreakDate: { type: String },
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
