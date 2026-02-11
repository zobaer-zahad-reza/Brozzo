import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    message: { type: Array, default: [] }, // Array হিসেবে সেভ হবে
    bgColour: { type: String, default: "#ffffff" },
    isReverse: { type: Boolean, default: false },
    isLeadership: { type: Boolean, default: false },
}, { timestamps: true });

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);
export default teamModel;