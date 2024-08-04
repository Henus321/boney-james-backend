import { Model } from "mongoose";
import { AppError } from "./appError";
import asyncHandler from "express-async-handler";

export const getAll = <T>(Model: Model<T>) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.find();

        res.status(200).json({
            status: "success",
            results: doc.length,
            data: {
                data: doc,
            },
        });
    });

export const getOne = <T>(Model: Model<T>) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.findById(req.params.id);

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

export const createOne = <T>(Model: Model<T>) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

export const updateOne = <T>(Model: Model<T>) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

export const deleteOne = <T>(Model: Model<T>) =>
    asyncHandler(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });
