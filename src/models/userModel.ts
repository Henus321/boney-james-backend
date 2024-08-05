import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Please tell us your name!"],
            trim: true,
            maxlength: [
                40,
                "A username must have less or equal then 40 characters!",
            ],
        },
        email: {
            type: String,
            required: [true, "Please provide your email"],
            trim: true,
            maxlength: [
                40,
                "An email must have less or equal then 40 characters!",
            ],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            trim: true,
            minlength: 6,
            maxlength: [
                40,
                "A password must have less or equal then 40 characters!",
            ],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            trim: true,
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords are not the same!",
            },
        },
    },
    {
        collection: "user",
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined as any;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
