import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import marqueeRouter from "./routes/marqueeRoute.js";
import orderRouter from "./routes/orderRoute.js";
import sliderRouter from "./routes/sliderRoute.js";
// import bentoRouter from './routes/bentoRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// connection call
connectDB();
connectCloudinary();

// Middlewares

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS configuration
const allowedOrigins = [
  'https://brozzo.net',
  'https://admin.brozzo.net'
  // 'http://localhost:5173', 
  // 'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// API Endpoints
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/marquee", marqueeRouter);
app.use("/api/order", orderRouter);
app.use("/api/slider", sliderRouter);

app.get("/", (req, res) => {
  res.send("API Working for Brozzo");
});

app.listen(port, () => console.log("Server started on PORT : " + port));