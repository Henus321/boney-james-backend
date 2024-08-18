import {
    getAll,
    deleteOne,
    getOne,
    createOne,
    updateOne,
} from "../utils/handlerFactory";
import ShopType from "../models/shopTypeModel";

export const getAllShopTypes = getAll(ShopType);
export const getShopType = getOne(ShopType);
export const createShopType = createOne(ShopType);
export const updateShopType = updateOne(ShopType);
export const deleteShopType = deleteOne(ShopType);
