import mongoose from "mongoose"

async function connectMongoDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log("Connected to DB")
  } catch (error) {
    console.error("Failed connection", error)
  }
}

export default connectMongoDB