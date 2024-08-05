import { AppError } from "../utils/appError";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { IUser } from "../types/user";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

const signToken = (id: string): string =>
    jwt.sign({ id }, process.env.JWT_SECRET || "", {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
    const token = signToken(user._id);
    const jwtCookieExpiresIn: number =
        typeof process.env.JWT_COOKIE_EXPIRES_IN === "number"
            ? process.env.JWT_COOKIE_EXPIRES_IN
            : 90;
    const cookieOptions: CookieOptions = {
        expires: new Date(
            Date.now() + jwtCookieExpiresIn * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    // Remove password
    user.password = undefined as any;

    res.status(statusCode).json({
        status: "success",
        token,
    });
};

export const registration = asyncHandler(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, res);
});

export const logout = (req: Request, res: Response) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.status(200).json({ status: "success" });
};

export const protect = asyncHandler(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Please log in to get access.",
                401
            )
        );
    }

    const jwtVerifyPromisified = (
        token: string,
        secret: string
    ): Promise<string | jwt.JwtPayload | undefined> => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, {}, (err, payload) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(payload);
                }
            });
        });
    };

    // 2) Verification token
    const { id } = (await jwtVerifyPromisified(
        token,
        process.env.JWT_SECRET || ""
    )) as jwt.JwtPayload;

    // 3) Check if user still exists
    const currentUser = await User.findById(id);
    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // roles ["user", "admin"]
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "Only the administrator has permission to perform this action",
                    403
                )
            );
        }

        next();
    };
};

export const passwordChange = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user?.id).select("+password");

    if (user?.email === "user@test.com") {
        return next(
            new AppError(
                "It is forbidden to change the password of the test user",
                400
            )
        );
    }

    if (
        !(await user?.correctPassword(
            req.body.currentPassword,
            user.password
        )) ||
        !user
    ) {
        return next(new AppError("Your current password is wrong.", 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
});
