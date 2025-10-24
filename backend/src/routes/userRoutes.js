import express from "express";
import { registerUser, loginUser, getUser, updateUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get("/", getAllUsers)

export default router;