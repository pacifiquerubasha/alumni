const express = require("express");
const { signup, verifyEmail, getAllUsers, resendVerificationCode, login, logout, deleteUser, getCurrentUser } = require("../controllers/users");


const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/resend-code", resendVerificationCode)
userRouter.post("/verify-email", verifyEmail)
userRouter.get("/", getAllUsers)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.delete("/delete", deleteUser)
userRouter.post("/me", getCurrentUser)


module.exports = {userRouter};

