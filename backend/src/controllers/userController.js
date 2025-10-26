import User from "../models/user.js";
import bcrypt from "bcryptjs";

/**
 * Registers a new user.
 *
 * @scope public
 * @param {Object} req.body - Request body
 * @param {string} req.body.name - User's name
 * @param {string} req.body.phone - User's phone number
 * @param {string} req.body.phoneType - Type of phone (mobile, home, etc.)
 * @param {string} req.body.address - User's address
 * @param {string} req.body.password - User's password
 * @returns {Object} The saved user document
 * @throws {Error} 400 if user already exists
 * @throws {Error} 500 if registration fails
 */

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
}

/**
 * Logs in a user.
 *
 * @scope public
 * @param {Object} req.body - Request body
 * @param {string} req.body.name - User's name
 * @param {string} req.body.password - User's password
 * @returns {Object} The user document if authentication succeeds
 * @throws {Error} 404 if user not found
 * @throws {Error} 401 if password is invalid
 * @throws {Error} 500 if login fails
 */

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
}

/**
 * Retrieves a user by ID.
 *
 * @scope public
 * @param {string} req.params.id - User ID
 * @returns {Object} The user document
 * @throws {Error} 404 if user not found
 * @throws {Error} 500 if query fails
 */

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Retrieves all users (omitting passwords).
 *
 * @scope public
 * @returns {Array<Object>} List of user documents without passwords
 * @throws {Error} 500 if query fails
 */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // omit passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Updates a user profile.
 *
 * @scope public
 * @param {string} req.params.id - User ID
 * @param {Object} req.body - Updated user data (name, phone, address, password, etc.)
 * @returns {Object} The updated user document
 * @throws {Error} 500 if update fails
 */

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
}