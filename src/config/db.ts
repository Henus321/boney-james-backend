import { DB } from "../server";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB);
        console.log(`MongoDB connected to ${conn.connection.host}`);
    } catch (e) {
        const error = e as Error;
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
