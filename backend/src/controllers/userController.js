import User from "../models/user.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, phone, phoneType, address, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      phone,
      phoneType,
      address,
      password: hashedPassword
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check password hash
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    // If password is being updated, hash it
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
