import {
    deleteOne,
    getOne,
    createOne,
    updateOne,
} from "../utils/handlerFactory";
import Shop from "../models/shopModel";
import asyncHandler from "express-async-handler";
import ShopType from "../models/shopTypeModel";
import City from "../models/cityModel";

export const getShop = getOne(Shop);
export const createShop = createOne(Shop);
export const updateShop = updateOne(Shop);
export const deleteShop = deleteOne(Shop);

export const getAllShops = asyncHandler(async (req, res, next) => {
    const { city, type } = req.query;
    const query = {};

    if (city) Object.assign(query, { city });
    if (type) Object.assign(query, { types: type });

    const docShop = await Shop.find(query);
    const docCity = await City.find();
    const docShopTypes = await ShopType.find();

    const response = {
        status: "success",
        results: docShop.length,
        data: {
            data: docShop,
            options: {
                city: docCity,
                shopTypes: docShopTypes,
            },
        },
    };

    res.status(200).json(response);
});
