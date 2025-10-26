import SignUp from "../models/signup.js";

/**
 * Creates a new sign-up (ticket purchase) for a venue.
 *
 * @scope public
 * @param {Object} req.body - Request body
 * @param {string} req.body.userId - ID of the user making the purchase
 * @param {string} req.body.venueId - ID of the venue/event
 * @param {number} req.body.ticketCount - Number of tickets purchased
 * @returns {Object} The saved signup document
 * @throws {Error} 500 if signup creation fails
 */

export const createSignUp = async (req, res) => {
  try {
    const { userId, venueId, ticketCount } = req.body;

    const signup = new SignUp({ userId, venueId, ticketCount });
    const savedSignup = await signup.save();

    res.status(201).json(savedSignup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Retrieves all signups for a given venue.
 * Useful for chat attendee list or event management.
 *
 * @scope public
 * @param {string} req.params.venueId - ID of the venue/event
 * @returns {Array<Object>} List of signup documents populated with user info (name, phone)
 * @throws {Error} 500 if query fails
 */

export const getSignUpsByVenue = async (req, res) => {
  try {
    const signups = await SignUp.find({ venueId: req.params.venueId }).populate("userId", "name phone");
    res.json(signups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Retrieves all signups for a given user.
 * Useful to show purchased tickets on a user dashboard.
 *
 * @scope public
 * @param {string} req.params.userId - ID of the user
 * @returns {Array<Object>} List of signup documents populated with venue info
 * (eventName, venueName, eventDate, eventTime, ticketPrice)
 * @throws {Error} 500 if query fails
 */

export const getSignUpsByUser = async (req, res) => {
  try {
    const signups = await SignUp.find({ userId: req.params.userId }).populate("venueId", "eventName venueName eventDate eventTime ticketPrice");
    res.json(signups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}