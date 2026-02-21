import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // ফ্রন্টএন্ড থেকে পাঠানো quantity রিসিভ করা হচ্ছে (ডিফল্ট ১)
        const { userId, itemId, size, quantity = 1 } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // cartData ক্লোন করা হচ্ছে মিউটেশন এড়াতে
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
            cartData[itemId][size] = quantity;
        } else {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += quantity;
            } else {
                cartData[itemId][size] = quantity;
            }
        }

        // markModified ব্যবহার করা হয় যদি অবজেক্ট নেস্টেড হয়
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update user cart (প্লাস/মাইনাস বাটনের জন্য এটিই কাজ করবে)
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // আইটেম এবং সাইজ থাকলে সেটি আপডেট করবে
        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
            
            // যদি কোয়ান্টিটি ০ হয় বা তার নিচে যায়, তবে সেই সাইজটি রিমুভ করে দেওয়া ভালো
            if (quantity <= 0) {
                delete cartData[itemId][size];
                // যদি ওই আইটেমের আর কোনো সাইজ না থাকে, তবে আইটেমটিও রিমুভ হবে
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

// Get user cart data
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