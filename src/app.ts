import express from "express";
import coatRoutes from "./routes/coatRoutes";
import { AppError } from "./utils/appError";

const app = express();

// Routes
app.use("/api/v1/coat", coatRoutes);

// Errors
app.all("*", (req, _, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
