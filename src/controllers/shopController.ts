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

    if (city) Object.assign(query, { "city.value": city });
    if (type) Object.assign(query, { "types.value": type });

    const doc = await Shop.find(query);

    const cityOptions = await Shop.aggregate([
        { $group: { _id: { label: "$city.label", value: "$city.value" } } },
    ]);
    const typeOptions = await Shop.aggregate([
        {
            $unwind: "$types",
        },
        { $group: { _id: { label: "$types.label", value: "$types.value" } } },
    ]);

    res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
            data: doc,
            options: {
                city: cityOptions.map((o) => o._id),
                types: typeOptions.map((t) => t._id),
            },
        },
    });
});
