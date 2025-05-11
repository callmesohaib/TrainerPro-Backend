require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("../utils/db");
const cors = require("cors");
const userRouter = require("../Routers/userRouter");
const contactRouter = require("../Routers/contactRouter");
const workoutRouter = require("../Routers/workoutRouter");
const corOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use(cors(corOptions));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api", contactRouter);
app.use("/api/workouts", workoutRouter);

connectDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
