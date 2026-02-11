import mongoose from "mongoose";

const bentoSchema = new mongoose.Schema({
    position: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    bgColor: { type: String, default: "#3E3E3E" },
    category: { type: String, required: true }, 
});

const bentoModel = mongoose.models.bento || mongoose.model("bento", bentoSchema);
export default bentoModel;