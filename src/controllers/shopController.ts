import {
    deleteOne,
    getAll,
    getOne,
    createOne,
    updateOne,
} from "../utils/handlerFactory";
import Shop from "../models/shopModel";

export const getAllShops = getAll(Shop);
export const getShop = getOne(Shop);
export const createShop = createOne(Shop);
export const updateShop = updateOne(Shop);
export const deleteShop = deleteOne(Shop);
