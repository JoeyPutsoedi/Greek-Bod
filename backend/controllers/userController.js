import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

//jwt template------------------------------------------------------------------------------------
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

//signup user-------------------------------------------------------------------------------------
export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password required!" });
    }

    //check if email exists
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    //validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Not a valid email..." });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Not a valid password..." });
    }

    //generate salt and hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //create user document
    const user = await User.create({
      email,
      password: hash,
      firstName,
      lastName,
    });

    //create token
    const token = createToken(user._id);

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log("Sign up error!!!", error);
    return res.status(400).json({ error: error.message });
  }
};

//login user------------------------------------------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and Password are required!" });
    }

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Not a valid email..." });
    }

    //match password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Not a valid password..." });
    }

    //create a token
    const token = createToken(user._id);

    //log log-in date
    const today = new Date().toISOString().split("T")[0];
    const logDate = await User.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { loginDates: today },
        lastLogin: new Date(),
      },
      { new: true }
    );

    return res.status(200).json({ user: logDate, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//update user details---------------------------------------------------------------------------
export const updateUser = async (req, res) => {
  const { id } = req.params;

  // //verify the authenticated user matches the id being updated
  if (req.user._id.toString() !== id) {
    return res.status(403).json({ error: "Not autorized to update this user" });
  }
  const {
    firstName,
    lastName,
    age,
    height,
    currentWeight,
    startingWeight,
    targetWeight,
    goal,
    activityLevel,
    gender,
  } = req.body;

  try {
    const userProfile = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        age,
        height,
        startingWeight,
        currentWeight,
        targetWeight,
        goal,
        gender,
        activityLevel,
      },
      { new: true }
    );

    if (!userProfile) {
      return res
        .status(400)
        .json({ error: "Failed to update user profile..." });
    }
    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//fetch user details
export const fetchProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ error: "User does not exist..." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
