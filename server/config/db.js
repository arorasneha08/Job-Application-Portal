import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/job-portal', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to local MongoDB");
    } catch (err) {
        console.error(" Connection error", err);
        process.exit(1);
    }
};

export default connectDB;
