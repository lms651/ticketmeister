import SignUp from "../models/signup.js";

/**
 * Computes the total number of tickets purchased for a given venue.
 *
 * @scope public
 * @param {string} venueId - The ID of the venue
 * @returns {Promise<number>} Total number of tickets purchased (0 if none)
 * @throws {Error} If the database query fails
 */

export const getNumberOfAttendees = async (venueId) => {
  const result = await SignUp.aggregate([
    { $match: { venueId: venueId } },
    { $group: { _id: "$venueId", totalTickets: { $sum: "$ticketCount" } } }
  ])

  return result[0]?.totalTickets || 0;
}