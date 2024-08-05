import express from "express";
import {
    protect,
    registration,
    login,
    logout,
    passwordChange,
} from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/registration", registration);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);

// Protect all routes after this middleware
authRoutes.use(protect);

authRoutes.route("/password-change").patch(passwordChange);

export default authRoutes;
