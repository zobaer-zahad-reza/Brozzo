import express from "express";
import { getMarquee, updateMarquee } from "../controllers/marqueeController.js";
import adminAuth from "../middleware/adminAuth.js"; // Vivid Valley admin check

const marqueeRouter = express.Router();

marqueeRouter.get("/get", getMarquee);
marqueeRouter.post("/update", adminAuth, updateMarquee); // Sudhu admin edit korte parbe

export default marqueeRouter;
