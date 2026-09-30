import mongoose from "mongoose";
import "dotenv/config";
import productModel from "./models/productModel.js";

const NEW_BASE_URL = "https://brozzo.net/uploads/";

async function updateImageUrls() {
  try {
    const MONGO_URI =
      process.env.MONGODB_URI || "YOUR_MONGODB_CONNECTION_STRING";

    console.log("Database e connect kora hocche...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected successfully.");

    const products = await productModel.find({});
    console.log(
      `Mot ${products.length} ti product pawa geche. Update shuru hocche...`,
    );

    let updateCount = 0;

    for (const product of products) {
      let updated = false;

      if (Array.isArray(product.image)) {
        product.image = product.image.map((imgUrl) => {
          if (
            typeof imgUrl === "string" &&
            imgUrl.includes("res.cloudinary.com")
          ) {
            const filename = imgUrl.split("/").pop();
            updated = true;
            return `\({NEW_BASE_URL}\){filename}`;
          }
          return imgUrl;
        });
      } else if (
        typeof product.image === "string" &&
        product.image.includes("res.cloudinary.com")
      ) {
        const filename = product.image.split("/").pop();
        product.image = `\({NEW_BASE_URL}\){filename}`;
        updated = true;
      }

      if (updated) {
        await product.save();
        updateCount++;
      }
    }

    console.log(
      `🎉 Migration sesh! Mot ${updateCount} ti product er image URL update hoyeche.`,
    );
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

updateImageUrls();
