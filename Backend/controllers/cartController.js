import userModel from "../models/userModel.js";

// ১. কার্টে আইটেম যোগ করা (ফিক্সড)
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // cartData ক্লোন করা হচ্ছে
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        } else {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        }

        // সরাসরি আপডেট করা হচ্ছে যাতে ডাটাবেসে সেভ নিশ্চিত হয়
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// ২. কার্ট আপডেট করা (প্লাস/মাইনাস বাটনের জন্য এটিই কাজ করবে)
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            // নিশ্চিত করা হচ্ছে কোয়ান্টিটি নাম্বার হিসেবে যাচ্ছে
            cartData[itemId][size] = Number(quantity);
            
            // যদি কোয়ান্টিটি ০ হয় তবে ডিলিট করা
            if (Number(quantity) <= 0) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// ৩. ইউজারের কার্ট ডাটা গেট করা
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
}

export { addToCart, updateCart, getUserCart }