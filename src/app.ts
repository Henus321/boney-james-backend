import express from "express";
import coatRoutes from "./routes/coatRoutes";
import authRoutes from "./routes/authRoutes";
import shopRoutes from "./routes/shopRoutes";
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cors from "cors";

import { AppError } from "./utils/appError";
import { globalErrorHandler } from "../src/controllers/errorsController";

const app = express();

// Cross-Origin Resource Sharing settings
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Security HTTP headers
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "firebasestorage.googleapis.com"],
        },
    })
);

// Logging in development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Request limit
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Compress text on response
app.use(compression());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/coat", coatRoutes);
app.use("/api/v1/shop", shopRoutes);

// Errors
app.all("*", (req, _, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
