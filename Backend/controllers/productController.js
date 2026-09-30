import productModel from "../models/productModel.js";
import fs from "fs";

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, brand, description, price, category, subCategory, sizes, colors, bestseller, offerPrice, quantity, watchGrade } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = images.map((item) => "https://brozzo.net/uploads/" + item.filename);

    const productData = {
      name,
      brand: brand || "",
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: JSON.parse(sizes || "[]"),
      colors: JSON.parse(colors || "[]"),
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

// Remove product (Ekhane File Delete er code add kora hoyeche)
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    
    if (product && product.image) {
      product.image.forEach((imgUrl) => {
        const filename = imgUrl.split("/").pop();
        const filePath = `/var/www/Brozzo/uploads/${filename}`;
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product and Images Removed" });
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

// Update Product Function (Ekhane purono chobi delete er code add kora hoyeche)
const updateProduct = async (req, res) => {
  try {
    const { id, name, brand, description, price, category, subCategory, sizes, colors, bestseller, offerPrice, quantity, watchGrade } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    let existingImages = req.body.image ? JSON.parse(req.body.image) : [];
    
    // Je chobi gulo user kete diyeche, segulo server theke delete kora
    if (product.image && Array.isArray(product.image)) {
      const deletedImages = product.image.filter(img => !existingImages.includes(img));
      deletedImages.forEach((imgUrl) => {
        const filename = imgUrl.split("/").pop();
        const filePath = `/var/www/Brozzo/uploads/${filename}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    let newlyUploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        newlyUploadedImages.push("https://brozzo.net/uploads/" + file.filename);
      }
    }

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
      colors: JSON.parse(colors || "[]"),
      offerPrice: offerPrice ? Number(offerPrice) : 0,
      quantity: Number(quantity),
      watchGrade: watchGrade || "",
      image: finalImages,
    };

    await productModel.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Product Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct };