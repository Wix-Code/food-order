import express from "express";
import { loginUser, logoutUser, registerUser, requestResetPassword, resetPassword } from "../controller/auth.controller.ts";


const router = express.Router()

// REGISTER ROUTE
router.post("/register", registerUser);

// LOGIN ROUTE
router.post("/login", loginUser);

// LOGOUT ROUTE
router.post("/logout", logoutUser)

// REQUEST RESET PASSWORD ROUTE
router.post("/forgotpassword", requestResetPassword)

// RESET PASSWORD ROUTE
router.post("/resetpassword", resetPassword)

export default router