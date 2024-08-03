import asyncHandler from "express-async-handler";
import Coat from "../models/coatModel";

export const getAllCoats = asyncHandler(async (req, res, next) => {
    const doc = await Coat.find();
    console.log(await Coat.findById({ _id: "669398c91178c6b6ddf36f6d" }));

    res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
            data: doc,
        },
    });
});

export const createCoat = () =>
    asyncHandler(async (req, res, next) => {
        const doc = await Coat.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });
