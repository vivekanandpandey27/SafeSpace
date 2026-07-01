import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/SafeSpace`);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); //Safe exist(force close node.js app) on failure
  }
};

export default connectDB;