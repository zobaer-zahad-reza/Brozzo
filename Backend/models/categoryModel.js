import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    bgColor: { type: String, default: "#c88b083a" }
}, { timestamps: true });

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;