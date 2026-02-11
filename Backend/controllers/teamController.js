import { v2 as cloudinary } from 'cloudinary';
import teamModel from '../models/teamModel.js';

// Add Team Member
const addTeamMember = async (req, res) => {
    try {
        const { name, role, message, bgColour, isReverse, isLeadership } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: "Image is required" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        const teamData = {
            name,
            role,
            bgColour,
            isReverse: isReverse === 'true',
            isLeadership: isLeadership === 'true',
            message: JSON.parse(message), 
            image: imageUpload.secure_url
        };

        const newMember = new teamModel(teamData);
        await newMember.save();

        res.json({ success: true, message: "Member Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Remove Team Member
const removeTeamMember = async (req, res) => {
    try {
        await teamModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Member Removed Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// List Team Members
const listTeamMembers = async (req, res) => {
    try {
        const members = await teamModel.find({});
        res.json({ success: true, members });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// সব ফাংশন একসাথে এক্সপোর্ট করুন
export { addTeamMember, listTeamMembers, removeTeamMember };