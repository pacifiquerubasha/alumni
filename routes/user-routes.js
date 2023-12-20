const express = require("express");
const { 
    signup, 
    verifyEmail, 
    getAllUsers, 
    resendVerificationCode, 
    login, 
    logout, 
    deleteUser, 
    getCurrentUser,
    getOneUser,
    updateUser,
    changePassword,
    softDeleteUser,
    changeProfilePicture,
    forgotPassword} = require("../controllers/users");

const upload = require("../utils/upload");
const {authMiddleware, adminMiddleware} = require("../middlewares/authMiddleware")

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/resend-code", resendVerificationCode);
userRouter.put("/forgot-password", forgotPassword);
userRouter.post("/verify-email", verifyEmail);
userRouter.get("/", adminMiddleware, getAllUsers);
userRouter.post("/login", login);
userRouter.get("/logout", authMiddleware, logout);
userRouter.delete("/delete", adminMiddleware, deleteUser);
userRouter.post("/me", getCurrentUser);
userRouter.get("/:id", authMiddleware, getOneUser);
userRouter.put("/:id", authMiddleware, updateUser);
userRouter.put("/change-password/:id", authMiddleware, changePassword);
userRouter.delete("/soft-delete/:id", adminMiddleware, softDeleteUser);
userRouter.put("/change-profile-picture/:id", authMiddleware, upload.single('image'), changeProfilePicture);


module.exports = {userRouter};

