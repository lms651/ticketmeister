import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
    venueName: { type: String, required: true },
    eventName: { type: String, required: true, unique: true },
    eventDescription: { type: String },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    imageSrc: { type: String },
}, {
    timestamps: true
})

const Venue = mongoose.model("Venue", venueSchema);
export default Venue;