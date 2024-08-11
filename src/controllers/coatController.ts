import { deleteOne, getAll, getOne, updateOne } from "../utils/handlerFactory";
import { AppError } from "../utils/appError";
import Coat from "../models/coatModel";
import asyncHandler from "express-async-handler";

export const getAllCoats = getAll(Coat);
export const getCoat = getOne(Coat);
export const updateCoat = updateOne(Coat);
export const deleteCoat = deleteOne(Coat);

export const createCoat = asyncHandler(async (req, res, next) => {
    const similarCoats = await Coat.find({
        name: req.body.name,
    });

    const isColorRepeat = similarCoats.some(
        (coat) => coat.color.label === req.body.color.label
    );
    if (isColorRepeat) {
        return next(new AppError("Coat with that color already exists", 404));
    }

    const doc = await Coat.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            data: doc,
        },
    });
});

export const getCoatColors = asyncHandler(async (req, res, next) => {
    const coatById = await Coat.findById(req.params.id);

    if (!coatById) {
        return next(new AppError("No coat found with that ID", 404));
    }

    const coatsWithSameColor = await Coat.find({
        name: coatById.name,
    });

    res.status(200).json({
        status: "success",
        data: {
            data: coatsWithSameColor.map((coat) => ({
                label: coat.color.label,
                hex: coat.color.hex,
                coatId: coat._id,
            })),
        },
    });
});
