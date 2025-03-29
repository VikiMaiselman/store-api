import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    return await mongoose.connect(url);
  } catch (error) {
    mongoose.connection.close();
    throw error;
  }
};
