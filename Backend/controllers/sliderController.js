import { v2 as cloudinary } from "cloudinary";
import sliderModel from "../models/sliderModel.js";


// add slide
const addSlider = async (req, res) => {
    try {
        const imageFile = req.file; 
        const { link } = req.body;

        if (!imageFile) {
            return res.json({ success: false, message: "Image not found" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const sliderData = new sliderModel({
            image: imageUrl,
            link: link || "",
            date: Date.now()
        });

        await sliderData.save();
        res.json({ success: true, message: "Slider added successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const listSliders = async (req, res) => {
    try {
        const sliders = await sliderModel.find({}).sort({ date: -1 });
        res.json({ success: true, sliders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// slide remove function
const removeSlider = async (req, res) => {
    try {
        await sliderModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Slider removed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addSlider, listSliders, removeSlider };