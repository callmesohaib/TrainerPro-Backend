const express = require("express");
const userRouter = express.Router();
const { registerUser, loginUser ,getUser ,updateUser} = require("../Controllers/userController");
const authenticateToken = require("../Middlewares/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authenticateToken, getUser); 
userRouter.put("/me", authenticateToken, updateUser);  


module.exports = userRouter;
