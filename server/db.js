import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("MongoDB URI not set. Inquiries will be saved to server/data/inquiries.json.");
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected.");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed. Falling back to a local file.", error.message);
    return false;
  }
}
