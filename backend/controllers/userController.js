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
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json("Email and Password required!");
    }

    //check if email exists
    const exists = await User.findOne({ email });

    if (exists) {
      res.status(400).json("Email already in use");
    }

    //validation
    if (!validator.isEmail(email)) {
      res.status(400).json("Not a valid email...");
    }

    if (!validator.isStrongPassword(password)) {
      res.status(400).json("Not a valid password...");
    }

    //generate salt and hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //create user document
    const user = await User.create({ email, password: hash });

    //create token
    const token = createToken(User._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user------------------------------------------------------------------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json("Email and Password are required!");
    }

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json("Not a valid email...");
    }

    //match password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json("Not a valid password...");
    }

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update user details---------------------------------------------------------------------------
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    age,
    height,
    weight,
    goal,
    activityLevel,
    profilePicture,
  } = req.body;

  try {
    const userProfile = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      age,
      height,
      weight,
      goal,
      activityLevel,
      profilePicture,
    });

    if (!userProfile) {
      res.status(400).json("Failed to update user profile...");
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//fetch user details
export const fetchProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(400).json("User does not exist...");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
