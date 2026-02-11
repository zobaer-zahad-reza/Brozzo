import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    image: { type: String, required: true },
    link: { type: String, default: "" },
    date: { type: Number, required: true }
});

const sliderModel = mongoose.models.slider || mongoose.model("slider", sliderSchema);
export default sliderModel;