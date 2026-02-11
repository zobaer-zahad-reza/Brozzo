import { v2 as cloudinary } from 'cloudinary';
import bentoModel from '../models/bentoModel.js';

const updateBento = async (req, res) => {
    try {
        const { position, title, category, bgColor } = req.body;
        const imageFile = req.file;

        let updateData = { position, title, category, bgColor };

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            updateData.image = imageUpload.secure_url;
        }

        const bento = await bentoModel.findOneAndUpdate(
            { position: position },
            updateData,
            { upsert: true, new: true }
        );

        res.json({ success: true, message: "Bento Box Updated", data: bento });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const listBento = async (req, res) => {
    try {
        const data = await bentoModel.find({});
        res.json({ success: true, data });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { updateBento, listBento };