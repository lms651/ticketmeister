import express from "express";
import { createSignUp, getSignUpsByVenue, getSignUpsByUser } from "../controllers/signupController.js";

const router = express.Router();

// Purchase tickets
router.post("/", createSignUp);

// Get all signups for a venue
router.get("/venue/:venueId", getSignUpsByVenue);

// Get all signups for a user
router.get("/user/:userId", getSignUpsByUser);

export default router;