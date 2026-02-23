import userModel from "../models/userModel.js";

// cart item add, update and get logic here
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const qty = Number(quantity) || 1;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Deep clone for Mongoose detection
    let cartData = JSON.parse(JSON.stringify(userData.cartData || {}));

    if (!cartData[itemId]) {
      cartData[itemId] = {};
      cartData[itemId][size] = qty;
    } else {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += qty;
      } else {
        cartData[itemId][size] = qty;
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Deep clone for Mongoose detection
    let cartData = JSON.parse(JSON.stringify(userData.cartData || {}));

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = Number(quantity);

    if (Number(quantity) <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user cart data get
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
