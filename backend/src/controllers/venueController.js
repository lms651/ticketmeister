import Venue from "../models/venue.js";
import SignUp from "../models/signup.js";

// Create a new venue
export const createVenue = async (req, res) => {
  try {
    const { eventName } = req.body;

    // Check if eventName already exists
    const existingVenue = await Venue.findOne({ eventName });
    if (existingVenue) {
      return res.status(400).json({ error: "An event with this name already exists" });
    }

    const venue = new Venue(req.body);
    const savedVenue = await venue.save();
    res.status(201).json(savedVenue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all venues (for landing page)
export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find({});
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get venue by ID (for event details)
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ error: "Venue not found" });

    // Dynamically compute number of attendees (derived attribute)
    const signups = await SignUp.find({ venueId: req.params.id });
    const numberOfAttendees = signups.reduce((sum, s) => sum + s.ticketCount, 0);

    res.json({ ...venue.toObject(), numberOfAttendees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a venue
export const updateVenue = async (req, res) => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedVenue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a venue
export const deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.json({ message: "Venue deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
