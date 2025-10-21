import SignUp from "../models/signup.js";

// Create a new signup (purchase tickets)
export const createSignUp = async (req, res) => {
  try {
    const { userId, venueId, ticketCount } = req.body;

    const signup = new SignUp({ userId, venueId, ticketCount });
    const savedSignup = await signup.save();

    res.status(201).json(savedSignup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all signups for a venue (for chat / attendee list)
export const getSignUpsByVenue = async (req, res) => {
  try {
    const signups = await SignUp.find({ venueId: req.params.venueId }).populate("userId", "name phone");
    res.json(signups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all signups for a user (to show purchased tickets)
export const getSignUpsByUser = async (req, res) => {
  try {
    const signups = await SignUp.find({ userId: req.params.userId }).populate("venueId", "eventName venueName eventDate eventTime ticketPrice");
    res.json(signups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};