import express from "express";
import { deleteUser } from "../controller/user.controller.ts";


const router = express.Router()

// DELETING USER
router.delete("/:id", deleteUser);

export default router