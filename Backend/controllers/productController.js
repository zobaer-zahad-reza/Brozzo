import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      offerPrice,
      quantity,
      watchGrade,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      brand: brand || "",
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes || "[]"),
      offerPrice: offerPrice ? Number(offerPrice) : 0,
      quantity: quantity ? Number(quantity) : 0,
      watchGrade: watchGrade || "",
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Product Function (FIXED FOR MULTER AND CLOUDINARY)
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      brand,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      offerPrice,
      quantity,
      watchGrade,
    } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // ১. আগের ইমেজগুলো রিসিভ করা (যেগুলো ডিলিট করা হয়নি)
    let existingImages = req.body.image ? JSON.parse(req.body.image) : [];

    // ২. নতুন ইমেজগুলো ক্লাউডিনারিতে আপলোড করা
    let newlyUploadedImages = [];

    // upload.array('newImages', 4) ব্যবহার করার কারণে req.files নিজেই একটি array হবে
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        newlyUploadedImages.push(result.secure_url);
      }
    }

    // ৩. পুরোনো এবং নতুন ইমেজগুলো একসাথে করা
    const finalImages = [...existingImages, ...newlyUploadedImages];

    const updateData = {
      name,
      brand: brand || "",
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: JSON.parse(sizes || "[]"),
      offerPrice: offerPrice ? Number(offerPrice) : 0,
      quantity: Number(quantity),
      watchGrade: watchGrade || "",
      image: finalImages, // ফাইনালাইজড ইমেজ সেভ করা হলো
    };

    await productModel.findByIdAndUpdate(id, updateData);

    res.json({ success: true, message: "Product Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
};
