import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    // Updated the log message for your new project
    console.log("DB is Connected to Brozzo");
  });

  // Removed the hardcoded '/vividvalley' so it uses the .env perfectly
  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDB;
