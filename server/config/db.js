import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

export default connectDB;
