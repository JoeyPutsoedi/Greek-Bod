import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
  //get token from Autorization header
  const { authorization } = req.headers;

  //return message if token is not found
  if (!authorization) {
    return res.status(401).json({ error: "Authorisation token required" });
  }

  //extract toke (format: "Bearer TOKEN")

  const token = authorization.split(" ")[1];

  try {
    //verify token

    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(_id).select("_id");

    next();
  } catch (error) {
    console.error("error details:", error);
    return res.status(400).json({ error: error.message });
  }
};
