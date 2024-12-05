import express from "express";
import { deleteProduct, addProduct, getAllProducts, updateProduct, getSingleProduct } from "../controller/products.controller.ts";


const router = express.Router()

// ADD PRODUCT
router.post("/", addProduct);

// GET ALL PRODUCTS
router.get("/", getAllProducts)

// GET SINGLE PRODUCTS
router.get("/:id", getSingleProduct)

// UPDATE PRODUCT
router.post("/:id", updateProduct)

// DELETE PRODUCT
router.delete("/:id", deleteProduct);



export default router