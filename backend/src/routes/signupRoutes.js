import express from "express";
import { createSignUp, getSignUpsByVenue, getSignUpsByUser } from "../controllers/signupController.js";

const router = express.Router();

router.post("/", createSignUp);
router.get("/venue/:venueId", getSignUpsByVenue);
router.get("/user/:userId", getSignUpsByUser);

export default router;