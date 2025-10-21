import SignUp from "../models/signup.js";

export const getNumberOfAttendees = async (venueId) => {
  const result = await SignUp.aggregate([
    { $match: { venueId: venueId } },
    { $group: { _id: "$venueId", totalTickets: { $sum: "$ticketCount" } } }
  ]);

  return result[0]?.totalTickets || 0;
};