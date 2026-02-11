import { v2 as cloudinary } from "cloudinary";
import categoryModel from "../models/categoryModel.js";

// add category
const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: "Image is required" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const categoryData = {
            name,
            image: imageUrl
        };

        const category = new categoryModel(categoryData);
        await category.save();

        res.json({ success: true, message: "Category Added Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// sub category
const listCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.json({ success: true, categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// category delete
const removeCategory = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Category Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addCategory, listCategory, removeCategory };