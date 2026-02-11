import express from "express";
import { addSlider, listSliders, removeSlider } from "../controllers/sliderController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js"; 

const sliderRouter = express.Router();

sliderRouter.post("/add", adminAuth, upload.single('image'), addSlider);
sliderRouter.get("/list", listSliders);
sliderRouter.post("/remove", adminAuth, removeSlider);

export default sliderRouter;