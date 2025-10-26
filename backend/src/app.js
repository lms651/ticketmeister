import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import cors from "cors";
import express from "express";


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/venues", venueRoutes);
app.use("/signups", signupRoutes);

export default app;