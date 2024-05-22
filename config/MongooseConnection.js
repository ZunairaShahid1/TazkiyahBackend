import mongoose from "mongoose"
import { configDotenv } from "dotenv"

configDotenv();
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://szunaira905:TL4CKvsy7hXVR7JU@cluster0.4s7x1zf.mongodb.net/?retryWrites=true&w=majority")
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;