import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Nodemailer Setup for Email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address in .env
    pass: process.env.EMAIL_PASS, // Your Gmail App Password in .env
  },
});

// Forgot Password Logic
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Generate a temporary token valid for 15 minutes
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request - Brozzo",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #18181b; margin: 0;">BROZZO</h1>
                    </div>
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <h2 style="color: #18181b; margin-top: 0;">Password Reset Request</h2>
                        <p style="color: #4b5563; line-height: 1.6;">Hello,</p>
                        <p style="color: #4b5563; line-height: 1.6;">We received a request to reset your password. Click the button below to choose a new one. This link is valid for 15 minutes.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetLink}" style="background-color: #FF4955; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
                        </div>
                        <p style="color: #6b7280; font-size: 14px;">If you didn't make this request, you can safely ignore this email.</p>
                    </div>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "Password reset link sent to your email.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
};

// Reset Password Logic
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    await userModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.json({
      success: true,
      message: "Password reset successfully. You can now login.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.json({ success: false, message: "Invalid or expired reset link." });
  }
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

// Add New Address
const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    await userModel.findByIdAndUpdate(userId, { $push: { address: address } });
    res.json({ success: true, message: "Address Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove Address by Index
const removeAddress = async (req, res) => {
  try {
    const { userId, index } = req.body;
    const user = await userModel.findById(userId);

    if (user && user.address) {
      user.address.splice(index, 1);
      await user.save();
      res.json({ success: true, message: "Address Removed Successfully" });
    } else {
      res.json({ success: false, message: "User or Address not found" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// FIXED: API to update user image (No req.body dependency)
const updateUserImage = async (req, res) => {
  try {
    // Multer clears req.body for form-data, so we extract user ID directly from the header token
    const token = req.headers.token;
    if (!token) return res.json({ success: false, message: "No token provided" });

    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded_token.id;

    const imageFile = req.file;
    if (!imageFile) {
      return res.json({ success: false, message: "Image Not Provided" });
    }

    // Upload to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Update database
    await userModel.findByIdAndUpdate(userId, { image: imageUrl });

    res.json({ success: true, message: "Profile Image Updated Successfully" });
  } catch (error) {
    console.log("Image Upload Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  loginAdmin,
  getUserProfile,
  updateUserProfile,
  addAddress,
  removeAddress,
  updateUserImage,
  forgotPassword,
  resetPassword,
};