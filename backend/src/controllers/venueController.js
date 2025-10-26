import Venue from "../models/venue.js";
import SignUp from "../models/signup.js";

/**
 * Creates a new venue.
 *
 * @scope public
 * @param {Object} req.body - Request body containing venue data
 * @param {string} req.body.eventName - Name of the event
 * @returns {Object} The newly created venue document
 * @throws {Error} 400 if a venue with the same eventName already exists
 * @throws {Error} 500 if creation fails
 */

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
}

/**
 * Retrieves all venues.
 *
 * @scope public
 * @returns {Array<Object>} List of all venue documents
 * @throws {Error} 500 if query fails
 */

export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find({});
    res.json(venues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Retrieves a venue by ID, including computed number of attendees.
 *
 * @scope public
 * @param {string} req.params.id - Venue ID
 * @returns {Object} The venue document with derived attribute `numberOfAttendees`
 * @throws {Error} 404 if venue not found
 * @throws {Error} 500 if query fails
 */

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
}

/**
 * Updates a venue by ID.
 *
 * @scope public
 * @param {string} req.params.id - Venue ID
 * @param {Object} req.body - Updated venue data
 * @returns {Object} The updated venue document
 * @throws {Error} 500 if update fails
 */

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
}

// Delete a venue
export const deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.json({ message: "Venue deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
