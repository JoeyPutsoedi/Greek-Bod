import User from "../models/userModel.js";
import mongoose from "mongoose";

//create user
export const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    res.send(`User ${firstName} created....`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//update user details
export const updateUser = async (req, res) => {
  try {
    res.send("User updated....");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete user

export const deleteUser = async (req, res) => {
  const { firstName } = req.body;
  try {
    res.send(`user ${firstName} deleted.....`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//fetch user

export const fetchUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    res.send(`user: \n${firstName}\n${lastName}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
