// src/index.js
import { connectDB } from "./config/db";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

export const DB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
export const PORT = process.env.PORT || 5000;

connectDB();
const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Any unhandled error
process.on("unhandledRejection", (err: Error) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
        console.log("💥 Process terminated!");
    });
});
