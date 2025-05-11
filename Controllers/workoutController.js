const Workout = require("../Models/workoutModel");
const { validationResult } = require("express-validator");

const createWorkout = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const workout = new Workout({
      userId: req.user.id,
      ...req.body,
    });

    await workout.save();
    res.status(201).json({
      success: true,
      message: "Workout created successfully",
      workout,
    });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.user.id,
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      workouts,
    });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const editWorkout = async (req, res) => {
  try {
    const { date, exercises } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { date, exercises },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const {
      name,
      type,
      date,
      duration,
      completed,
      exercises,
      notes,
      difficulty,
      calories,
    } = req.body;

    if (
      !name ||
      !type ||
      !date ||
      !duration ||
      !difficulty ||
      calories === undefined
    ) {
      return res
        .status(400)
        .json({
          message:
            "Missing required fields: name, type, date, duration, difficulty, and calories are required",
        });
    }

    // Validate exercises array (ensure it exists and has at least one exercise with a name)
    if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one exercise is required" });
    }

    for (const exercise of exercises) {
      if (!exercise.name) {
        return res
          .status(400)
          .json({ message: "Each exercise must have a name" });
      }
      // Ensure numeric fields are valid (if provided)
      if (
        exercise.sets !== undefined &&
        (isNaN(exercise.sets) || exercise.sets < 1)
      ) {
        return res
          .status(400)
          .json({
            message:
              "Exercise sets must be a number greater than or equal to 1",
          });
      }
      if (
        exercise.reps !== undefined &&
        (isNaN(exercise.reps) || exercise.reps < 1)
      ) {
        return res
          .status(400)
          .json({
            message:
              "Exercise reps must be a number greater than or equal to 1",
          });
      }
      if (
        exercise.duration !== undefined &&
        exercise.duration !== null &&
        (isNaN(exercise.duration) || exercise.duration < 1)
      ) {
        return res
          .status(400)
          .json({
            message:
              "Exercise duration must be a number greater than or equal to 1",
          });
      }
    }

    // Validate difficulty
    const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
    if (!validDifficulties.includes(difficulty)) {
      return res
        .status(400)
        .json({
          message:
            "Difficulty must be one of: Beginner, Intermediate, Advanced",
        });
    }

    // Validate calories
    if (isNaN(calories) || calories < 0) {
      return res
        .status(400)
        .json({
          message: "Calories must be a number greater than or equal to 0",
        });
    }

    // Update the workout
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        date: new Date(date), // Ensure date is properly formatted
        duration: Number(duration),
        completed: Boolean(completed),
        exercises,
        notes: notes || "", // Default to empty string if not provided
        difficulty,
        calories: Number(calories),
      },
      { new: true, runValidators: true } // Ensure schema validation is applied
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.status(200).json({ success: true, workout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markWorkoutAsCompleted = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    workout.completed = true;
    await workout.save();

    return res.status(200).json({ success: true, workout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getWorkouts,
  getWorkout,
  deleteWorkout,
  editWorkout,
  updateWorkout,
  createWorkout,
  markWorkoutAsCompleted
};
