import mongoose from "mongoose";

const marqueeSchema = new mongoose.Schema({
    isActive: { type: Boolean, default: false },
    text: { type: String, required: true },
    expiryDate: { type: Date, required: true },
});

const marqueeModel = mongoose.models.marquee || mongoose.model("marquee", marqueeSchema);

export default marqueeModel;