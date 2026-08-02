import express from "express";
import {
  registerUser,
  loginUser,
  userCredit,
  paymentRazorpay,
} from "../controllers/userControllers.js";

import userAuth from "../middlewares/auth.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected Routes
userRouter.post("/credits", userAuth, userCredit);
userRouter.post("/pay-razor", userAuth, paymentRazorpay);

export default userRouter;