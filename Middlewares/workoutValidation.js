const { body, param } = require("express-validator");

exports.createWorkoutValidation = [
  body("name").notEmpty().withMessage("Workout name is required"),
  body("type").isIn(["strength", "cardio", "swimming", "cycling", "other"])
    .withMessage("Invalid workout type"),
  body("date").isISO8601().withMessage("Invalid date format"),
  body("duration").isInt({ min: 1 }).withMessage("Duration must be at least 1 minute"),
  body("exercises").optional().isArray().withMessage("Exercises must be an array")
];

exports.updateWorkoutValidation = [
  param("workoutId").isMongoId().withMessage("Invalid workout ID"),
  body("completed").optional().isBoolean().withMessage("Completed must be a boolean")
];