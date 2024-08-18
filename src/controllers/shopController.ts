import {
    deleteOne,
    getOne,
    createOne,
    updateOne,
} from "../utils/handlerFactory";
import Shop from "../models/shopModel";
import asyncHandler from "express-async-handler";

export const getShop = getOne(Shop);
export const createShop = createOne(Shop);
export const updateShop = updateOne(Shop);
export const deleteShop = deleteOne(Shop);

export const getAllShops = asyncHandler(async (req, res, next) => {
    const { city, type } = req.query;
    const query = {};

    if (city) Object.assign(query, { city });
    if (type) Object.assign(query, { types: type });

    const doc = await Shop.find(query);

    res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
            data: doc,
        },
    });
});
