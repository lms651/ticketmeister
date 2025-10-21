import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // <-- Make sure this exists!

dotenv.config();
connectDB();

import express from "express";
const app = express();
app.use(express.json());

// User routes
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("API is running..."));

export default app;