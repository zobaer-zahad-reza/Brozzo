import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "User doesn't exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route for User Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "User already exists" });

    if (!validator.isEmail(email))
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    if (password.length < 8)
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Route for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get User Profile Data
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, userData: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone } = req.body;
    if (!name) return res.json({ success: false, message: "Name is required" });

    await userModel.findByIdAndUpdate(userId, { name, phone });
    res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update User Address
const updateUserAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    await userModel.findByIdAndUpdate(userId, { address });
    res.json({ success: true, message: "Address Updated Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to update user image (Cloudinary)
const updateUserImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, message: "Image Not Provided" });
    }

    // Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    await userModel.findByIdAndUpdate(userId, { image: imageUrl });

    res.json({ success: true, message: "Profile Image Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  loginAdmin,
  getUserProfile,
  updateUserProfile,
  updateUserAddress,
  updateUserImage,
};
