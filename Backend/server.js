import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import path from "path";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import marqueeRouter from "./routes/marqueeRoute.js";
import orderRouter from "./routes/orderRoute.js";
import sliderRouter from "./routes/sliderRoute.js";
import productModel from "./models/productModel.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// connection call
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS configuration
const allowedOrigins = [
  "https://brozzo.net",
  "https://admin.brozzo.net",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error(
            "The CORS policy for this site does not allow access from the specified Origin."
          ),
          false
        );
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// API Endpoints
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/marquee", marqueeRouter);
app.use("/api/order", orderRouter);
app.use("/api/slider", sliderRouter);

app.get("/api", (req, res) => {
  res.send("API Working for Brozzo");
});

// Dynamic Route for Open Graph (Preview Image & SEO)
app.get("/product/:slug/:id", async (req, res) => {
  const indexPath = "/var/www/Brozzo/Frontend/dist/index.html";
  try {
    const productId = req.params.id;
    console.log(`[OG Route] Request asche productId: ${productId} er jonno`); 

    // Database product fetch
    const product = await productModel.findById(productId);

    // Static index.html read 
    let htmlData = fs.readFileSync(indexPath, "utf8");

    if (product) {
      // Image extraction - 'image' / 'images' 
      let productImage = "";
      
      if (product.images && Array.isArray(product.images) && product.images.length > 0) {
          productImage = product.images[0];
      } else if (product.image && Array.isArray(product.image) && product.image.length > 0) {
          productImage = product.image[0];
      } else if (typeof product.image === 'string') {
          productImage = product.image;
      }
      
      console.log(`[OG Route] Chobi pawa geche: ${productImage}`);

      const productName = product.name || "Brozzo Product";
      const productDesc = product.description ? product.description.substring(0, 150) : "Buy from Brozzo";

      // Meta tags inject 
      const ogTags = `
        <title>${productName} - Brozzo</title>
        <meta property="og:title" content="${productName}" />
        <meta property="og:description" content="${productDesc}" />
        <meta property="og:image" content="${productImage}" />
        <meta property="og:image:secure_url" content="${productImage}" />
        <meta property="og:url" content="https://brozzo.net/product/${req.params.slug}/${productId}" />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
      `;
      
      htmlData = htmlData.replace("</head>", `${ogTags}</head>`);
    } else {
      console.log(`[OG Route] Product khuje pawa jayni DB te`);
    }
    
    res.send(htmlData);
  } catch (error) {
    console.error("[OG Route Error]:", error);
    res.sendFile(indexPath);
  }
});

app.listen(port, () => console.log("Server started on PORT : " + port));
