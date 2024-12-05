import express from "express";
import { postBooking, userOrders, verifyPayment } from "../controller/booking.controller.ts";


const router = express.Router()

// ORDER FOOD
router.post("/", postBooking);

//USER ORDERS
router.post("/user", userOrders);

//VERIFY PAYMENT
router.post("/verify", verifyPayment);

export default router