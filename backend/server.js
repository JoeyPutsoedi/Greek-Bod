import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

//create express app
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://greek-bod.vercel.app",
      "http://localhost:3000",
      "https://backend-little-tree-1198.fly.dev",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use("/api/user", userRoutes);

//connect to mongoDb
mongoose.connect(process.env.MONGO_URL).then(
  //listen to port
  app.listen(process.env.PORT, () => {
    console.log("Connected to MongoDb and Listening on port", process.env.PORT);
  })
);
