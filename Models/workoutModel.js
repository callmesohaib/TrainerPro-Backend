const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["strength", "cardio", "swimming", "cycling", "other"],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  exercises: [{
    name: {
      type: String,
      required: true
    },
    sets: {
      type: Number,
      min: 1,
      default: 3
    },
    reps: {
      type: Number,
      min: 1,
      default: 10
    },
    duration: {
      type: Number,
      min: 1
    }
  }],
  notes: {
    type: String,
    default: ""
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
    default: "Beginner"
  },
  calories: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Workout", workoutSchema);