import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";

dotenv.config();
connectDB();

import express from "express";
const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/venues", venueRoutes);
app.use("/signups", signupRoutes);


app.get("/", (req, res) => res.send("API is running..."));

export default app;