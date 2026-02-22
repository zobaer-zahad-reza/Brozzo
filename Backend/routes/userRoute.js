import express from "express";
import {
    loginAdmin,
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    addAddress,       
    removeAddress,    
    updateUserImage,
    forgotPassword, // Imported
    resetPassword   // Imported
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/admin", loginAdmin);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Password Reset Routes
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

userRouter.get("/profile", authUser, getUserProfile);
userRouter.post("/update-profile", authUser, updateUserProfile);

userRouter.post("/add-address", authUser, addAddress);
userRouter.post("/remove-address", authUser, removeAddress);

userRouter.post(
    "/update-image",
    authUser,
    upload.single("image"),
    updateUserImage,
);

export default userRouter;