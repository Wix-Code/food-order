import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);

    if (db) {
      console.log("Connected to Database")
    }
  } catch (error) {
    throw (error)
  }
}