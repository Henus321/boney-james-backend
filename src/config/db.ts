import mongoose from "mongoose";

const DB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB);
        console.log(`MongoDB connected to ${conn.connection.db.databaseName}`);
    } catch (e) {
        const error = e as Error;
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
