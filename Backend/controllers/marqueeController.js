import marqueeModel from "../models/marqueeModel.js";

// Marquee data fetch kora
const getMarquee = async (req, res) => {
  try {
    const marquee = await marqueeModel.findOne().sort({ updatedAt: -1 });
    if (!marquee) {
      return res.json({
        success: true,
        marquee: { text: "Welcome!", isActive: false },
      });
    }
    res.json({ success: true, marquee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin panel theke update korar jonno (Upcoming)
const updateMarquee = async (req, res) => {
  try {
    const { text, isActive, expiryDate } = req.body;
    const marquee = await marqueeModel.findOneAndUpdate(
      {},
      { text, isActive, expiryDate },
      { upsert: true, new: true },
    );
    res.json({ success: true, message: "Marquee Updated", marquee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getMarquee, updateMarquee };
