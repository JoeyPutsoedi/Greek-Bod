import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
dotenv.config();

//create express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use("/api/user", userRoutes);
//listen to port
app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
