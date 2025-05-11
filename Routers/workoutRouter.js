const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
  editWorkout,
  markWorkoutAsCompleted,
} = require("../Controllers/workoutController");
const authenticateToken = require("../Middlewares/authMiddleware");
const { createWorkoutValidation } = require("../Middlewares/workoutValidation");
const express = require("express");
const workoutRouter = express.Router();

workoutRouter.get("/all-workouts", authenticateToken, getWorkouts);
workoutRouter.post(
  "/",
  authenticateToken,
  createWorkoutValidation,
  createWorkout
);
workoutRouter.get("/:id", getWorkout);
workoutRouter.delete("/:id", deleteWorkout);
workoutRouter.put("/:id", updateWorkout);
workoutRouter.put("/edit/:id", editWorkout);
workoutRouter.patch("/:id/complete", markWorkoutAsCompleted);
module.exports = workoutRouter;
