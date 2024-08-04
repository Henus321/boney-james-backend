import express from "express";
import coatRoutes from "./routes/coatRoutes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { AppError } from "./utils/appError";

const app = express();

// Logging in development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Routes
app.use("/api/v1/coat", coatRoutes);

// Errors
app.all("*", (req, _, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
