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
    changeProfilePicture} = require("../controllers/users");

const upload = require("../utils/upload");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/resend-code", resendVerificationCode)
userRouter.post("/verify-email", verifyEmail)
userRouter.get("/", getAllUsers)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.delete("/delete", deleteUser)
userRouter.post("/me", getCurrentUser)
userRouter.get("/:id", getOneUser)
userRouter.put("/:id", updateUser)
userRouter.put("/change-password/:id", changePassword)
userRouter.delete("/soft-delete/:id", softDeleteUser)
userRouter.put("/change-profile-picture/:id", upload.single('image'), changeProfilePicture)



module.exports = {userRouter};

