import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue", required: true },
    ticketCount: { type: Number, required: true }
}, {
    timestamps: true
});

const SignUp = mongoose.model("SignUp", signupSchema);
export default SignUp;