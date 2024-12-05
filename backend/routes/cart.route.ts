import express from "express";
import { addCart, getCart, removeCart, removeFromCart, pushCart, clearCart } from "../controller/cartData.controller.ts";


const router = express.Router()

// ADD PRODUCT TO CART
router.post("/add", addCart);

// DECREASE PRODUCT CART
router.post("/decrease", removeCart)

// REMOVE PRODUCT FROM CART
router.post("/remove", removeFromCart)

// PUSH PRODUCT FROM LOCALSTORAGE TO DATABASE CART
router.post("/push", pushCart)



router.post("/get", getCart)


router.post("/clear", clearCart)


export default router