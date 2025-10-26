import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    phone: { type: String },
    phoneType: { 
        type: String, 
        enum: ["mobile", "home"], 
        default: "mobile"
    },
    address: { type: String },
    password: { type: String, required: true } // Switch to google auth later
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);
export default User;