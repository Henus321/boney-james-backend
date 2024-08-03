import mongoose from "mongoose";

const DB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;

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
